"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/store/authstore";
import { getLoginRedirect } from "@/utils/auth";
import { isClientAuthenticated } from "@/store/authstore";
import { API_URL } from "@/lib/api";
import CommentSection from "@/components/CommentSection";

export default function BlogCard({ post }) {
  const pathname = usePathname();
  const router = useRouter();

  const token = useAuthStore(
    (state) => state.token
  );

  const [liked, setLiked] =
  useState(post.liked || false);

const [restacked, setRestacked] =
  useState(post.restacked || false);

  const [subscribed, setSubscribed] =
    useState(false);

  const [showComments, setShowComments] =
    useState(false);

  const [likes, setLikes] = useState(
    post.likes || 0
  );

  const [restacks, setRestacks] =
    useState(post.restacks || 0);

  const requireAuth = () => {
    if (
      token ||
      isClientAuthenticated()
    ) {
      return true;
    }

    router.push(
      getLoginRedirect(pathname)
    );

    return false;
  };

  // REAL LIKE
  const handleLike = async () => {
    alert("Alert Clicked");
  if (!requireAuth()) return;

  try {
    const currentToken =
      token ||
      localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/api/posts/${post._id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    const updatedPost =
      await res.json();

    alert(JSON.stringify(updatedPost));

    setLikes(updatedPost.likes);

    setLiked(updatedPost.liked);
  } catch (err) {
    console.log(err);
  }
};
  
  // REAL RESTACK
const handleRestack = async () => {
  alert("Alert Clicked");
  if (!requireAuth()) return;

  try {
    const currentToken =
      token ||
      localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/api/posts/${post._id}/restack`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    const updatedPost =
      await res.json();

    alert(JSON.stringify(updatedPost));

    setRestacks(
      updatedPost.restacks
    );

    setRestacked(
      updatedPost.restacked
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#151515] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.98)]">

      <div className="flex items-start justify-between gap-4">

        <div className="flex flex-1 gap-3">

          {/* AVATAR */}

       <div
  className={`h-11 w-11 shrink-0 rounded-full bg-linear-to-br shadow-[0_10px_30px_-12px_rgba(255,255,255,0.25)] ${
    post.avatarClass ||
    "from-orange-400 to-amber-500"
  }`}
/>

<div className="min-w-0 flex-1">

  {/* HEADER */}
  <div className="flex flex-wrap items-center gap-2">

    <p className="text-sm font-semibold text-white">
      {post.name}
    </p>

    <p className="text-xs text-zinc-500">
      {post.handle}
    </p>

    <span className="text-xs text-zinc-600">
      •
    </span>

    <p className="text-xs text-zinc-500">
      {post.time}
    </p>

  </div>

  {/* CLICKABLE CONTENT */}
  <Link href={`/blog/${post.slug}`}>

    {/* TITLE */}
    <h2 className="mt-3 text-[22px] font-semibold leading-8 tracking-tight text-white transition group-hover:text-orange-300">

      {post.title}

    </h2>

    {/* CONTENT */}
    <p className="mt-3 text-[15px] leading-7 text-zinc-300">

      {post.text}

    </p>

    {/* IMAGE */}
    {post.coverImage && (
      <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">

        <img
          src={post.coverImage}
          alt={post.title}
          className="h-auto w-full object-cover"
        />

      </div>
    )}

  </Link>

  {/* ACTIONS */}
  <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-zinc-500">

    {/* LIKE */}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        handleLike();
      }}
      className={`rounded-full border px-3 py-1.5 transition ${
        liked
          ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
          : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
      }`}
    >
      ❤️ {likes}
    </button>

    {/* COMMENTS */}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!requireAuth())
          return;

        setShowComments(
          (prev) => !prev
        );
      }}
      className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-orange-500/40 hover:text-orange-400"
    >
      💬 {post.commentCount || 0}
    </button>

    {/* RESTACK */}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        handleRestack();
      }}
      className={`rounded-full border px-3 py-1.5 transition ${
        restacked
          ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
          : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
      }`}
    >
      🔁 {restacks}
    </button>

    {/* SHARE */}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        navigator.share?.({
          title: post.title,
          url: `${window.location.origin}/blog/${post.slug}`,
        });
      }}
      className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-orange-500/40 hover:text-orange-400"
    >
      Share
    </button>

  </div>

  {/* COMMENT SECTION */}
  {showComments && (
    <div className="mt-6">
      <CommentSection
        postId={post._id}
      />
    </div>
  )}

</div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-3">

          <button
            type="button"
            onClick={() =>
              setSubscribed(
                !subscribed
              )
            }
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              subscribed
                ? "bg-zinc-800 text-zinc-100"
                : "bg-orange-500 text-black hover:bg-orange-400"
            }`}
          >
            {subscribed
              ? "Subscribed"
              : "Subscribe"}
          </button>

          <span className="text-xs text-zinc-500">
            {post.category || "Post"}
          </span>

        </div>

      </div>
            </div>

    </article>
  );
}
