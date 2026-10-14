"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  FileText,
  Mail,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  X,
  Search,
} from "lucide-react";

interface AdminPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  reading_time: string;
  featured: boolean;
  draft: boolean;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "messages">("posts");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorForm, setEditorForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Networking",
    tags: "Cisco, Switching, CLI",
    content: "",
    reading_time: "8 min read",
    featured: false,
    draft: false,
  });

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);

    try {
      // 1. Fetch posts from Supabase table
      const { data: postsData, error: postsErr } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!postsErr && postsData) {
        setPosts(postsData);
      }

      // 2. Fetch contact messages
      const { data: messagesData, error: messagesErr } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!messagesErr && messagesData) {
        setMessages(messagesData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      router.replace("/admin/login");
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setSessionUser(session.user);
        fetchData();
      }
    });
  }, [router, fetchData]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
    }
  };

  const handleOpenCreate = () => {
    setEditingPostId(null);
    setEditorForm({
      title: "",
      slug: "",
      description: "",
      category: "Networking",
      tags: "Cisco, CLI, Security",
      content: "## Overview\n\nEnter your technical tutorial here...\n\n```bash\n# CLI command\n```",
      reading_time: "8 min read",
      featured: false,
      draft: false,
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (post: AdminPost) => {
    setEditingPostId(post.id);
    setEditorForm({
      title: post.title,
      slug: post.slug,
      description: post.description,
      category: post.category,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      content: post.content,
      reading_time: post.reading_time || "8 min read",
      featured: post.featured,
      draft: post.draft,
    });
    setIsEditorOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    const formattedTags = editorForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: editorForm.title,
      slug: editorForm.slug.toLowerCase().replace(/\s+/g, "-"),
      description: editorForm.description,
      category: editorForm.category,
      tags: formattedTags,
      content: editorForm.content,
      reading_time: editorForm.reading_time,
      featured: editorForm.featured,
      draft: editorForm.draft,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingPostId) {
        // Update
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", editingPostId);

        if (error) throw error;
        setNotification({ type: "success", text: "Article updated successfully in PostgreSQL!" });
      } else {
        // Insert
        const { error } = await supabase
          .from("posts")
          .insert([{ ...payload, created_at: new Date().toISOString() }]);

        if (error) throw error;
        setNotification({ type: "success", text: "New article published to Supabase database!" });
      }

      setIsEditorOpen(false);
      fetchData();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to save post." });
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    if (!supabase) return;

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      setNotification({ type: "success", text: "Article deleted from database." });
      fetchData();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to delete post." });
    }
  };

  const handleToggleDraft = async (post: AdminPost) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from("posts")
        .update({ draft: !post.draft, updated_at: new Date().toISOString() })
        .eq("id", post.id);

      if (error) throw error;
      setNotification({
        type: "success",
        text: `Article status changed to ${!post.draft ? "Draft (Hidden)" : "Published (Public)"}!`,
      });
      fetchData();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to toggle draft." });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this contact inquiry?")) return;
    if (!supabase) return;

    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      setNotification({ type: "success", text: "Message removed." });
      fetchData();
    } catch (err: any) {
      setNotification({ type: "error", text: err.message || "Failed to delete message." });
    }
  };

  return (
    <main className="min-h-screen bg-[#080B11] text-white">
      {/* Admin Top Header */}
      <header className="hairline-b bg-[#0B1120]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#080B11] rounded-[11px] flex items-center justify-center font-bold text-xs text-white">
                R
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                Ruban Admin Console
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live DB
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              {sessionUser?.email || "rubanpooventhan@outlook.com"}
            </span>

            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 border border-white/5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Toast Notification */}
        {notification && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-mono ${
              notification.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            <span>{notification.text}</span>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Navigation Tabs & Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B1120] border border-white/10">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "posts"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Blog Articles ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === "messages"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Messages ({messages.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            {activeTab === "posts" && (
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-primary/20 hover:opacity-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Posts Management */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="rounded-3xl card-2026 border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Database Articles</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Articles stored in PostgreSQL. (Initial 5 MDX guides are repository-controlled in /content/posts).
                  </p>
                </div>
              </div>

              {posts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/5 font-mono text-slate-400">
                        <th className="px-6 py-3.5">Title &amp; Slug</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5">Created</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {posts.map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-white block text-sm">{p.title}</span>
                            <span className="text-[11px] font-mono text-slate-500">/blog/{p.slug}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleDraft(p)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] border ${
                                p.draft
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              }`}
                            >
                              {p.draft ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              <span>{p.draft ? "Draft (Hidden)" : "Published"}</span>
                            </button>
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-mono">
                            {new Date(p.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/blog/${p.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white"
                                title="View Live"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-cyan-400"
                                title="Edit Post"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(p.id, p.title)}
                                className="p-2 rounded-lg bg-white/[0.04] hover:bg-rose-500/10 text-rose-400"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center space-y-3">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400">
                    No custom articles in Supabase yet.
                  </p>
                  <button
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/20 text-indigo-300 text-xs font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Database Article</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Messages Management */}
        {activeTab === "messages" && (
          <div className="rounded-3xl card-2026 border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-lg font-bold text-white">Contact Form Inquiries</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Submissions securely validated and stored in Supabase &ldquo;messages&rdquo; table.
              </p>
            </div>

            {messages.length > 0 ? (
              <div className="divide-y divide-white/5">
                {messages.map((m) => (
                  <div key={m.id} className="p-6 hover:bg-white/[0.01] transition-colors space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs font-mono text-cyan-400 hover:underline"
                        >
                          &lt;{m.email}&gt;
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-500">
                          {new Date(m.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="font-semibold text-xs text-indigo-300 font-mono">
                      Subject: {m.subject}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#06080F] p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-2">
                <Mail className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No incoming messages yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl card-2026 bg-[#0B1120] border border-white/10 p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingPostId ? "Edit Technical Article" : "Compose New Technical Article"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editorForm.title}
                    onChange={(e) =>
                      setEditorForm({
                        ...editorForm,
                        title: e.target.value,
                        slug: editingPostId ? editorForm.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    placeholder="e.g. Cisco BGP Configuration Guide"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editorForm.slug}
                    onChange={(e) => setEditorForm({ ...editorForm, slug: e.target.value })}
                    placeholder="cisco-bgp-configuration-guide"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-mono outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Description / Excerpt
                </label>
                <input
                  type="text"
                  required
                  value={editorForm.description}
                  onChange={(e) => setEditorForm({ ...editorForm, description: e.target.value })}
                  placeholder="Summary for article cards and SEO metadata..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={editorForm.category}
                    onChange={(e) => setEditorForm({ ...editorForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-white/10 text-white text-sm outline-none"
                  >
                    <option value="Networking">Networking</option>
                    <option value="Security">Security</option>
                    <option value="Linux">Linux</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI & Systems">AI & Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editorForm.tags}
                    onChange={(e) => setEditorForm({ ...editorForm, tags: e.target.value })}
                    placeholder="Cisco, BGP, Routing"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={editorForm.reading_time}
                    onChange={(e) => setEditorForm({ ...editorForm, reading_time: e.target.value })}
                    placeholder="8 min read"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Markdown Content
                </label>
                <textarea
                  rows={14}
                  required
                  value={editorForm.content}
                  onChange={(e) => setEditorForm({ ...editorForm, content: e.target.value })}
                  className="w-full p-4 rounded-xl bg-[#06080F] border border-white/10 text-white text-xs font-mono leading-relaxed outline-none focus:border-cyan-400 resize-y"
                  placeholder="## Section Heading&#10;&#10;Write markdown and code blocks here..."
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={editorForm.draft}
                      onChange={(e) => setEditorForm({ ...editorForm, draft: e.target.checked })}
                      className="rounded bg-white/10 border-white/20 text-primary focus:ring-0"
                    />
                    <span className="text-amber-400">Save as Draft (Hide from Public)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={editorForm.featured}
                      onChange={(e) => setEditorForm({ ...editorForm, featured: e.target.checked })}
                      className="rounded bg-white/10 border-white/20 text-primary focus:ring-0"
                    />
                    <span className="text-cyan-400">Featured Article Spotlight</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-mono hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-primary/25 hover:opacity-95"
                  >
                    {editingPostId ? "Update Article" : "Publish Article"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
