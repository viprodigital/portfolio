"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface PostLikesProps {
  slug: string;
}

export const PostLikes: React.FC<PostLikesProps> = ({ slug }) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  // Get or initialize persistent client ID
  const getClientId = (): string => {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("ruban_blog_client_id");
    if (!id) {
      id = `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("ruban_blog_client_id", id);
    }
    return id;
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const clientId = getClientId();
        const res = await fetch(`/api/blog/likes?slug=${encodeURIComponent(slug)}&clientId=${encodeURIComponent(clientId)}`);
        const data = await res.json();
        if (data.success) {
          setLikesCount(data.count);
          setHasLiked(data.liked);
        }
      } catch (e) {
        console.error("Failed to load likes:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [slug]);

  const handleToggleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const clientId = getClientId();
    const previousLiked = hasLiked;
    const previousCount = likesCount;

    // Optimistic UI update
    setHasLiked(!previousLiked);
    setLikesCount(previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1);

    if (!previousLiked) {
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.8 },
          colors: ["#F43F5E", "#E11D48", "#FB7185", "#FDA4AF"],
        });
      } catch {
        // Fallback
      }
    }

    try {
      const res = await fetch("/api/blog/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, clientId }),
      });
      const data = await res.json();
      if (data.success) {
        setLikesCount(data.count);
        setHasLiked(data.liked);
      } else {
        // Revert on failure
        setHasLiked(previousLiked);
        setLikesCount(previousCount);
      }
    } catch {
      // Revert on failure
      setHasLiked(previousLiked);
      setLikesCount(previousCount);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`group relative flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-300 font-mono text-xs ${
          hasLiked
            ? "bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            : "bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08]"
        }`}
        aria-label={hasLiked ? "Unlike this article" : "Like this article"}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
            hasLiked ? "fill-rose-500 text-rose-500 animate-pulse" : "text-slate-400 group-hover:text-rose-400"
          }`}
        />
        <span className="font-semibold">{likesCount}</span>
        <span className="text-slate-400 hidden sm:inline">
          {likesCount === 1 ? "Like" : "Likes"}
        </span>
      </button>
    </div>
  );
};
