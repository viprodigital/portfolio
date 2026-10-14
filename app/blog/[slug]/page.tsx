import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  Tag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { PostLikes } from "@/components/blog/PostLikes";
import { PostComments } from "@/components/blog/PostComments";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(false);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, false);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const siteUrl = "https://portfolio-omega-six-vei2m47p70.vercel.app";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Ruban Technical Field Guide`,
    description: post.description,
    keywords: [...post.tags, post.category, "Network Engineering", "Ruban"],
    authors: [{ name: post.author.name, url: siteUrl }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl,
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug, false);

  if (!post || post.draft) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags, post.category, 2);

  const siteUrl = "https://portfolio-omega-six-vei2m47p70.vercel.app";
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Ruban",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <main className="min-h-screen bg-[#080B11] text-white selection:bg-primary selection:text-white relative">
      <Navbar />

      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header Section */}
      <header className="relative pt-36 pb-14 border-b border-white/5 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-primary/[0.08] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Back to Blog Navigation */}
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-cyan-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Technical Tutorials</span>
              </Link>
            </div>

            {/* Category & Meta pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gradient-to-r from-primary/20 to-indigo-600/20 text-indigo-300 border border-primary/30">
                {post.category}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Published {post.date}
              </span>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {post.description}
            </p>

            {/* Author info & Share Header */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 hairline-t">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-primary/40">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{post.author.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{post.author.role}</p>
                </div>
              </div>

              {/* Likes & Share Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <PostLikes slug={post.slug} />
                <ShareButtons title={post.title} url={articleUrl} />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Article Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 max-w-none">
            <div className="p-6 sm:p-10 rounded-3xl card-2026 bg-[#080B11]/90 backdrop-blur-xl border border-white/10">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Tags footer */}
            <div className="mt-8 p-6 rounded-3xl card-2026 border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tagged Technical Domains</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Biography Card */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl card-2026 border border-primary/20 bg-gradient-to-br from-indigo-500/[0.05] to-transparent flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary/40 shrink-0 shadow-lg">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-bold text-white">{post.author.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Network & Systems Architect
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ruban is an enterprise network engineer and systems architect specializing in Cisco routing & switching, Fortinet firewalls, VMware virtualization, and modern automated workflows.
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href="https://www.linkedin.com/in/ruban-p-68634814b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    Connect on LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Comments & Discussions */}
            <PostComments slug={post.slug} />

          </article>

          {/* Sticky Table of Contents & Telemetry Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <TableOfContents toc={post.toc} />

            {/* Quick Like & Share Widget */}
            <div className="p-5 rounded-3xl card-2026 bg-[#080B11]/80 border border-white/10 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold mb-2">
                  Appreciate This Guide
                </span>
                <PostLikes slug={post.slug} />
              </div>

              <div className="pt-3 hairline-t">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold mb-2">
                  Share This Guide
                </span>
                <ShareButtons title={post.title} url={articleUrl} />
              </div>
            </div>
          </aside>

        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Related Technical Guides
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Continue exploring related network and security architecture tutorials
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>View All Tutorials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="p-6 rounded-3xl card-2026 card-2026-hover border border-white/5 flex flex-col justify-between group"
                >
                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {rPost.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {rPost.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-3 hairline-t">
                    <span className="text-slate-500">{rPost.readingTime}</span>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
