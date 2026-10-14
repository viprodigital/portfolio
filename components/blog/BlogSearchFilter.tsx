"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/lib/blog";
import {
  Search,
  X,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  SlidersHorizontal,
} from "lucide-react";

interface BlogSearchFilterProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
}

export const BlogSearchFilter: React.FC<BlogSearchFilterProps> = ({
  initialPosts,
  categories,
  tags,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesDesc = post.description.toLowerCase().includes(q);
        const matchesCategory = post.category.toLowerCase().includes(q);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [initialPosts, searchQuery, selectedCategory, selectedTag]);

  // Featured post
  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  const showFeaturedHero = selectedCategory === "All" && !selectedTag && searchQuery.trim() === "";

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="p-6 rounded-3xl card-2026 bg-[#080B11]/90 backdrop-blur-xl border border-white/10 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutorials by keyword (e.g., Cisco, FortiGate, VLAN, Linux, Zero Trust)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-white placeholder-slate-500 text-sm outline-none transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & Active Filter Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25 border border-primary/50"
                      : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-cyan-400 font-bold">{filteredPosts.length}</span> of {initialPosts.length} tutorials
          </div>
        </div>

        {/* Tag Cloud Pills */}
        <div className="pt-3 hairline-t flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Tag className="w-3.5 h-3.5" /> Popular Tags:
          </span>
          {tags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isTagActive ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  isTagActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/5"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11px] font-mono text-rose-400 hover:underline ml-2"
            >
              Clear tag filter
            </button>
          )}
        </div>
      </div>

      {/* Featured Post Spotlight Banner (Shown when no active search/category filter) */}
      {showFeaturedHero && featuredPost && (
        <div className="relative rounded-3xl card-2026 p-8 sm:p-10 border border-primary/30 overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/20 text-indigo-300 border border-primary/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Featured Technical Guide
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                </span>
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readingTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {featuredPost.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {featuredPost.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Read In-Depth Tutorial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-2xl bg-[#06080F] border border-white/10 w-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/40">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{featuredPost.author.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{featuredPost.author.role}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-mono">
                  <span className="text-cyan-400 block mb-1">Architecture Standard:</span>
                  NIST SP 800-207 &bull; Cisco IOS CLI &bull; FortiOS 7.6 Validated
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-3xl card-2026 card-2026-hover p-6 sm:p-7 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-5">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-500 self-center">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 hairline-t flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{post.date}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl card-2026 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 mx-auto flex items-center justify-center text-slate-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No matching tutorials found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            No articles matched your filter criteria for &ldquo;{searchQuery || selectedCategory}&rdquo;. Try clearing your query or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedTag(null);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-white border border-white/10 transition-colors"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
