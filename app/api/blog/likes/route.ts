import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const LIKES_FILE = path.join(process.cwd(), "content", "data", "likes.json");

function getLocalLikes(): Record<string, string[]> {
  try {
    if (fs.existsSync(LIKES_FILE)) {
      const data = fs.readFileSync(LIKES_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Local likes read error:", e);
  }
  return {};
}

function saveLocalLikes(likes: Record<string, string[]>) {
  try {
    const dir = path.dirname(LIKES_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LIKES_FILE, JSON.stringify(likes, null, 2), "utf8");
  } catch (e) {
    console.error("Local likes write error:", e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const clientId = searchParams.get("clientId") || "";

  if (!slug) {
    return NextResponse.json({ success: false, error: "Slug is required." }, { status: 400 });
  }

  // 1. Try Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("post_likes")
        .select("client_id")
        .eq("post_slug", slug);

      if (!error && data) {
        const count = data.length;
        const liked = clientId ? data.some((item) => item.client_id === clientId) : false;
        return NextResponse.json({ success: true, count, liked, source: "database" });
      }
    } catch {
      // Fallback
    }
  }

  // 2. Local Fallback
  const localLikes = getLocalLikes();
  const clients = localLikes[slug] || [];
  return NextResponse.json({
    success: true,
    count: clients.length,
    liked: clientId ? clients.includes(clientId) : false,
    source: "local",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, clientId } = body;

    if (!slug || !clientId) {
      return NextResponse.json(
        { success: false, error: "Slug and clientId are required." },
        { status: 400 }
      );
    }

    let isLikedNow = false;
    let newCount = 0;

    // 1. Try Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: existing, error: checkErr } = await supabase
          .from("post_likes")
          .select("id")
          .eq("post_slug", slug)
          .eq("client_id", clientId)
          .maybeSingle();

        if (!checkErr) {
          if (existing) {
            // Remove like
            await supabase
              .from("post_likes")
              .delete()
              .eq("post_slug", slug)
              .eq("client_id", clientId);
            isLikedNow = false;
          } else {
            // Add like
            await supabase
              .from("post_likes")
              .insert([{ post_slug: slug, client_id: clientId }]);
            isLikedNow = true;
          }

          // Get fresh count
          const { count } = await supabase
            .from("post_likes")
            .select("*", { count: "exact", head: true })
            .eq("post_slug", slug);

          return NextResponse.json({
            success: true,
            liked: isLikedNow,
            count: count ?? (isLikedNow ? 1 : 0),
            source: "database",
          });
        }
      } catch {
        // Fallback
      }
    }

    // 2. Local Fallback
    const localLikes = getLocalLikes();
    let clients = localLikes[slug] || [];

    if (clients.includes(clientId)) {
      clients = clients.filter((id) => id !== clientId);
      isLikedNow = false;
    } else {
      clients.push(clientId);
      isLikedNow = true;
    }

    localLikes[slug] = clients;
    saveLocalLikes(localLikes);
    newCount = clients.length;

    return NextResponse.json({
      success: true,
      liked: isLikedNow,
      count: newCount,
      source: "local",
    });
  } catch (error: any) {
    console.error("Likes API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update like." },
      { status: 500 }
    );
  }
}
