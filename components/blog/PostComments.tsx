"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, User, Clock, AlertCircle, CheckCircle } from "lucide-react";

interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface PostCommentsProps {
  slug: string;
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

export const PostComments: React.FC<PostCommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/blog/comments?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      } catch (e) {
        console.error("Failed to load comments:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!content.trim() || content.trim().length < 2) {
      setErrorMsg("Comment must be at least 2 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, author_name: name, content }),
      });
      const data = await res.json();

      if (data.success && data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setContent("");
        setSuccessMsg("Your comment was posted successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(data.error || "Failed to post comment.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-14 pt-10 border-t border-white/10 space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Engineering Discussion
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {comments.length} {comments.length === 1 ? "thought" : "thoughts"} shared on this guide
            </p>
          </div>
        </div>
      </div>

      {/* Comment Submission Form */}
      <div className="p-6 sm:p-7 rounded-3xl card-2026 bg-[#0B1120]/90 border border-white/10 space-y-4">
        <h4 className="text-sm font-semibold text-white">Join the Discussion</h4>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Your Name / Handle
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex M. (DevOps Engineer)"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Comment / Feedback
            </label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, lab observations, or configuration questions..."
              className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none transition-all leading-relaxed resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-xs font-mono text-slate-400">
            Loading comments...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comm) => (
            <div
              key={comm.id}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary/30 to-cyan-500/30 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                    {comm.author_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {comm.author_name}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{timeAgo(comm.created_at)}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-9">
                {comm.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs sm:text-sm text-slate-400">
              No comments yet. Be the first to share your engineering observations!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
