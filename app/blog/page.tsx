import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogSearchFilter } from "@/components/blog/BlogSearchFilter";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog";
import { BookOpen, Terminal, Sparkles, Rss, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Field Guides",
  description:
    "Production-tested technical tutorials, CLI blueprints, and lab guides on Cisco Catalyst switching, FortiOS 7.6 firewalls, Linux administration, and Zero Trust architecture by Ruban.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Engineering Blog & Technical Field Guides | Ruban",
    description:
      "Production-tested technical tutorials, CLI blueprints, and lab guides on Cisco Catalyst switching, FortiOS 7.6 firewalls, Linux administration, and Zero Trust architecture.",
    url: "/blog",
    type: "website",
  },
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BlogPage() {
  const posts = getAllPosts(false); // drafts strictly excluded
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-[#080B11] text-white selection:bg-primary selection:text-white relative">
      <Navbar />

      {/* Blog Page Header */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full card-2026">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-medium text-slate-300">
                Network & Systems Field Notes &bull; Production Blueprints
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] text-white leading-[1.1]">
              Technical Engineering{" "}
              <span className="text-gradient-brand">Tutorials</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Original, battle-tested field manuals on Cisco CLI switching, FortiOS 7.6 firewall architectures, Linux systems diagnostics, VLAN segmentation, and Zero Trust security engineering.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <Link
                href="/blog/new"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white font-medium shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write Article</span>
              </Link>

              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS Feed</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline">Updated Bi-Weekly</span>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline">{posts.length} Core Guides Published</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BlogSearchFilter
            initialPosts={posts}
            categories={categories}
            tags={tags}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
