"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore, { isClientAuthenticated } from "@/store/authstore";
import { getLoginRedirect } from "@/utils/auth";

export default function PostActions({ post }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [isAuthorState, setIsAuthorState] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // derive author status from user/post synchronously to avoid effect-setState
  const isAuthor = Boolean(user && post && user.name === post.name);

  const requireAuth = () => {
    if (token || isClientAuthenticated()) return true;
    router.push(getLoginRedirect(pathname));
    return false;
  };

  const toggleSubscribe = async () => {
    if (!requireAuth()) return;

    // Optimistic UI toggle. Replace with real API call if available.
    setSubscribed((v) => !v);

    try {
      // Example API call (optional) -- keep silent on failure for now.
      await fetch(`/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: post.name, slug: post.slug }),
      });
    } catch (err) {
      // revert on error
      setSubscribed((v) => !v);
      console.error("Subscribe failed", err);
    }
  };

  return (
    <div className="flex gap-2">
      {isAuthor && (
        <Link
          href={`/blog/${post.slug}/edit`}
          className="rounded-xl bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-600"
        >
          Edit
        </Link>
      )}

      <button
        type="button"
        onClick={toggleSubscribe}
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
          subscribed
            ? "bg-zinc-800 text-zinc-100"
            : "bg-orange-500 text-black hover:bg-orange-400"
        }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}
