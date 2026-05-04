"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useAuthStore from "@/store/authstore";
import { getLoginRedirect } from "@/utils/auth";
import { isClientAuthenticated } from "@/store/authstore";

export default function ExplorePage() {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const categories = [
    "Explore",
    "Culture",
    "Technology",
    "Business",
    "Sports",
    "Entertainment",
  ];

  const tabs = ["Top", "Recent", "Posts"];

  const posts = [
    {
      id: 1,
      name: "Creator Name",
      handle: "@creatorname",
      time: "3h ago",
      likes: 25,
      replies: 4,
      restacks: 2,
      text:
        "This is where the real explore content will show. Backend will later load actual user posts, images, and creator content here exactly like Substack.",
    },
    {
      id: 2,
      name: "Builder Studio",
      handle: "@builderstudio",
      time: "6h ago",
      likes: 18,
      replies: 7,
      restacks: 3,
      text:
        "Explore is a discovery surface for fresh posts, trending creators, and community conversations.",
    },
    {
      id: 3,
      name: "Daily Notes",
      handle: "@dailynotes",
      time: "1d ago",
      likes: 41,
      replies: 9,
      restacks: 5,
      text:
        "Clicking the engagement actions should feel immediate and stay on this page instead of navigating away.",
    },
  ];

  const ExplorePostCard = ({ post }) => {
    const [actions, setActions] = useState({
      liked: false,
      replied: false,
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
    const replyCount = post.replies + (actions.replied ? 1 : 0);
    const restackCount = post.restacks + (actions.restacked ? 1 : 0);

    return (
      <article className="border-b border-white/10 pb-10">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-zinc-700" />

            <div>
              <h3 className="text-lg font-semibold">{post.name}</h3>

              <p className="text-sm text-zinc-400">{post.handle}</p>

              <p className="text-sm text-zinc-400">{post.time}</p>
            </div>
          </div>

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
        </div>

        <div className="mt-5">
          <p className="text-lg leading-8 text-zinc-200">{post.text}</p>
        </div>

        <div className="mt-6 h-72 rounded-3xl bg-zinc-800" />

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          <button
            type="button"
            onClick={() => toggleAction("liked")}
            className={`rounded-full border px-4 py-2 transition ${
              actions.liked
                ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
            }`}
          >
            ❤️ {likeCount} Likes
          </button>

          <button
            type="button"
            onClick={() => toggleAction("replied")}
            className={`rounded-full border px-4 py-2 transition ${
              actions.replied
                ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
            }`}
          >
            💬 {replyCount} Replies
          </button>

          <button
            type="button"
            onClick={() => toggleAction("restacked")}
            className={`rounded-full border px-4 py-2 transition ${
              actions.restacked
                ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
            }`}
          >
            🔁 {restackCount} Restacks
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-6">

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map((item, index) => (
            <button
              key={item}
              className={`rounded-xl px-5 py-2 text-sm font-medium whitespace-nowrap ${
                index === 0
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Top / Recent / Posts */}
        <div className="mt-6 flex justify-center gap-16 border-b border-white/10 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-semibold ${
                index === 0
                  ? "text-white border-b-2 border-white pb-2"
                  : "text-zinc-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <ExplorePostCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
}
