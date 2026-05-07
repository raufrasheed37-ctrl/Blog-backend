"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/store/authstore";
import { getLoginRedirect } from "@/utils/auth";
import { isClientAuthenticated } from "@/store/authstore";

export default function BlogCard({ post }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [actions, setActions] = useState({
    liked: false,
    commented: false,
    restacked: false,
    subscribed: false,
  });

  const requireAuth = () => {
    if (token || isClientAuthenticated()) {
      return true;
    }

    router.push(getLoginRedirect(pathname));
    return false;
  };

  const toggleAction = (action) => {
    if (!requireAuth()) {
      return;
    }

    setActions((current) => ({
      ...current,
      [action]: !current[action],
    }));
  };

  const likeCount = post.likes + (actions.liked ? 1 : 0);
  const commentCount = post.comments + (actions.commented ? 1 : 0);
  const restackCount = (post.restacks ?? 0) + (actions.restacked ? 1 : 0);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#151515] hover:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.95)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 gap-3">
        <div
  className={`h-11 w-11 shrink-0 rounded-full bg-linear-to-br shadow-[0_10px_30px_-12px_rgba(255,255,255,0.25)] ${post.avatarClass}`}
/>

          <Link
  href={`/blog/${post.slug}`}
  className="min-w-0 flex-1 block"
>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-white">
                {post.name}
              </p>

              <p className="text-xs text-zinc-500">
                {post.handle}
              </p>

              <span className="text-xs text-zinc-600">•</span>

              <p className="text-xs text-zinc-500">
                {post.time}
              </p>
            </div>

            
              <h2 className="mt-3 text-lg font-semibold leading-7 text-white transition hover:text-orange-400">
                {post.title}
              </h2>
            

            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {post.text}
            </p>
    
             <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-zinc-800">
  <div className="flex h-72 items-center justify-center text-sm text-zinc-500">
    Featured Visual
  </div>
</div>
    
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <button
                type="button"
                onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleAction("liked");
}}
                className={`rounded-full border px-3 py-1.5 transition ${
                  actions.liked
                    ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                    : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
                }`}
              >
                ❤️ {likeCount}
              </button>

              <button
                type="button"
                onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleAction("commented");
}}
                className={`rounded-full border px-3 py-1.5 transition ${
                  actions.commented
                    ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                    : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
                }`}
              >
                💬 {commentCount}
              </button>

              <button
                type="button"
                onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleAction("restacked");
}}
                className={`rounded-full border px-3 py-1.5 transition ${
                  actions.restacked
                    ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                    : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
                }`}
              >
                🔁 {restackCount}
              </button>

              <span className="rounded-full border border-white/10 px-3 py-1.5">
                Share
              </span>
            </div>
        </Link>

        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={() => toggleAction("subscribed")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              actions.subscribed
                ? "bg-zinc-800 text-zinc-100"
                : "bg-orange-500 text-black hover:bg-orange-400"
            }`}
          >
            {actions.subscribed ? "Subscribed" : "Subscribe"}
          </button>

          <span className="text-xs text-zinc-500">
            {post.category}
          </span>
        </div>
      </div>
    </article>
  );
}
