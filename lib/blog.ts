import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  draft?: boolean;
  author: Author;
  content: string;
  toc: TocItem[];
}

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      const title = trimmed.replace("## ", "").replace(/\*\*/g, "").trim();
      const id = slugify(title);
      toc.push({ id, title, level: 2 });
    } else if (trimmed.startsWith("### ")) {
      const title = trimmed.replace("### ", "").replace(/\*\*/g, "").trim();
      const id = slugify(title);
      toc.push({ id, title, level: 3 });
    }
  }

  return toc;
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  const posts: BlogPost[] = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = data.slug || fileName.replace(/\.mdx?$/, "");
      const toc = extractToc(content);
      const readingTime = data.readingTime || calculateReadingTime(content);

      const author: Author = {
        name: data.author?.name || "Ruban",
        role: data.author?.role || "Network Engineer & Systems Architect",
        avatar: data.author?.avatar || "/images/ruban-profile.jpg",
      };

      return {
        slug,
        title: data.title || "Untitled Post",
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingTime,
        featured: Boolean(data.featured),
        draft: Boolean(data.draft),
        author,
        content,
        toc,
      };
    })
    .filter((post) => (includeDrafts ? true : !post.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, includeDrafts = false): BlogPost | null {
  const posts = getAllPosts(includeDrafts);
  return posts.find((p) => p.slug === slug) || null;
}

export function getRelatedPosts(currentSlug: string, tags: string[], category: string, limit = 2): BlogPost[] {
  const posts = getAllPosts(false).filter((p) => p.slug !== currentSlug);

  return posts
    .map((post) => {
      let score = 0;
      if (post.category.toLowerCase() === category.toLowerCase()) score += 2;
      const commonTags = post.tags.filter((t) => tags.includes(t));
      score += commonTags.length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts(false);
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return ["All", ...categories];
}

export function getAllTags(): string[] {
  const posts = getAllPosts(false);
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}
