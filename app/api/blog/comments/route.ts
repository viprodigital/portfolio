import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const COMMENTS_FILE = path.join(process.cwd(), "content", "data", "comments.json");

export interface CommentItem {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  created_at: string;
}

function getLocalComments(): CommentItem[] {
  try {
    if (fs.existsSync(COMMENTS_FILE)) {
      const data = fs.readFileSync(COMMENTS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Local comments read error:", e);
  }
  return [];
}

function saveLocalComments(comments: CommentItem[]) {
  try {
    const dir = path.dirname(COMMENTS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf8");
  } catch (e) {
    console.error("Local comments write error:", e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ success: false, error: "Slug is required." }, { status: 400 });
  }

  // 1. Try Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json({ success: true, comments: data, source: "database" });
      }
    } catch {
      // Fallback
    }
  }

  // 2. Local Fallback
  const allComments = getLocalComments();
  const filtered = allComments
    .filter((c) => c.post_slug === slug)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json({ success: true, comments: filtered, source: "local" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, content } = body;
    const author_name = body.author_name || body.authorName;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug is required." }, { status: 400 });
    }

    if (!author_name || typeof author_name !== "string" || author_name.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Comment must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const sanitizedComment: CommentItem = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      post_slug: slug,
      author_name: author_name.trim().slice(0, 60),
      content: content.trim().slice(0, 2000),
      created_at: new Date().toISOString(),
    };

    // 1. Try Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("post_comments")
          .insert([
            {
              post_slug: sanitizedComment.post_slug,
              author_name: sanitizedComment.author_name,
              content: sanitizedComment.content,
              status: "approved",
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, comment: data, source: "database" });
        }
      } catch {
        // Fallback
      }
    }

    // 2. Local Fallback
    const local = getLocalComments();
    local.push(sanitizedComment);
    saveLocalComments(local);

    return NextResponse.json({ success: true, comment: sanitizedComment, source: "local" });
  } catch (error: any) {
    console.error("Comments POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to post comment." },
      { status: 500 }
    );
  }
}
