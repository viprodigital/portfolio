import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      description,
      category,
      tags,
      content,
      draft = false,
      featured = false,
      authorName = "Ruban",
      authorRole = "Network Engineer & Systems Architect",
    } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Content is required." }, { status: 400 });
    }

    const slug = slugify(customSlug || title);
    const dateStr = new Date().toISOString().split("T")[0];
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / wordsPerMinute))} min read`;

    const tagList = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : ["General"];

    // 1. Write MDX file directly to content/posts/
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
    }

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
description: "${(description || "").replace(/"/g, '\\"')}"
date: "${dateStr}"
category: "${category || "General"}"
tags: [${tagList.map((t: string) => `"${t}"`).join(", ")}]
readingTime: "${readingTime}"
featured: ${Boolean(featured)}
draft: ${Boolean(draft)}
author:
  name: "${authorName}"
  role: "${authorRole}"
  avatar: "/images/ruban-profile.jpg"
---

${content.trim()}
`;

    const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    fs.writeFileSync(filePath, frontmatter, "utf8");

    // 2. Also persist into Supabase PostgreSQL if table exists
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("posts").upsert({
          slug,
          title,
          description: description || "",
          category: category || "General",
          tags: tagList,
          content,
          reading_time: readingTime,
          featured: Boolean(featured),
          draft: Boolean(draft),
          author_name: authorName,
          author_role: authorRole,
          author_avatar: "/images/ruban-profile.jpg",
          updated_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn("[Blog Post API] Supabase sync notice:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      message: "Article published successfully!",
    });
  } catch (error: any) {
    console.error("[Blog Post API] Exception:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create blog post." },
      { status: 500 }
    );
  }
}
