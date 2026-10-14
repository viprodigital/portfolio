"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import {
  ArrowLeft,
  Sparkles,
  Send,
  Eye,
  Edit3,
  FileCode,
  Tag,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Networking",
    tags: "Cisco, Routing, CLI",
    authorName: "Ruban",
    authorRole: "Network Engineer & Systems Architect",
    content: `## Executive Overview

Provide an engineering summary of this lab setup or configuration guide...

---

## 1. Prerequisites & Equipment Checklist

- Hardware appliance or virtual machine image
- Serial console or management SSH access
- Active Layer 2 trunk connection

---

## 2. Command Line Implementation

\`\`\`bash
# Run diagnostics
show version
\`\`\`

> [!NOTE]
> Always verify configuration syntax before committing to NVRAM.
`,
    draft: false,
    featured: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.title.trim()) {
      setErrorMsg("Please enter an article title.");
      return;
    }

    if (!formData.content.trim()) {
      setErrorMsg("Please write some article content.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success && data.slug) {
        // Redirect directly to the live article!
        router.push(`/blog/${data.slug}`);
      } else {
        setErrorMsg(data.error || "Failed to publish article.");
        setIsSubmitting(false);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080B11] text-white selection:bg-primary selection:text-white relative">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Technical Tutorials</span>
          </Link>

          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            In-Browser Markdown & Database Publisher
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Create Technical Article
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
            Author and publish blueprints with live Markdown formatting, automatic reading time calculation, and database synchronization.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl card-2026 bg-[#0B1120]/95 border border-white/10 space-y-6">
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., Enterprise BGP Peering and Route Reflectors"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="enterprise-bgp-peering"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>

            {/* Excerpt / Summary */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Description / Excerpt (SEO &amp; Cards)
              </label>
              <input
                type="text"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A concise architectural summary for social previews and search engines..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none"
              />
            </div>

            {/* Category & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-white/10 focus:border-cyan-400 text-white text-sm outline-none"
                >
                  <option value="Networking">Networking</option>
                  <option value="Security">Security</option>
                  <option value="Linux">Linux</option>
                  <option value="Cloud">Cloud</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI & Systems">AI & Systems</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Cisco, BGP, OSPF, Routing"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>

            {/* Tabs: Write vs Live Preview */}
            <div className="pt-2">
              <div className="flex items-center justify-between pb-3 hairline-b mb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === "write"
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Markdown Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      activeTab === "preview"
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  Supports code blocks, alerts (&gt; [!NOTE]), and tables
                </span>
              </div>

              {activeTab === "write" ? (
                <textarea
                  rows={16}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-[#06080F] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-slate-200 text-xs font-mono leading-relaxed outline-none transition-all resize-y"
                  placeholder="Write your tutorial markdown here..."
                />
              ) : (
                <div className="p-6 rounded-2xl bg-[#06080F] border border-white/10 min-h-[350px]">
                  <MarkdownRenderer content={formData.content} />
                </div>
              )}
            </div>

            {/* Publish Actions */}
            <div className="pt-4 hairline-t flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded bg-white/10 border-white/20 text-primary focus:ring-0"
                />
                <span className="text-cyan-400">Mark as Featured Guide</span>
              </label>

              <div className="flex items-center gap-3">
                <Link
                  href="/blog"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono transition-colors"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-primary/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Post to Website</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
