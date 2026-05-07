"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/authstore";
import { getLoginRedirect } from "@/utils/auth";
import { isClientAuthenticated } from "@/store/authstore";
import CommentSection from "@/components/CommentSection";

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

  const [posts, setPosts] = useState([]);
  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/posts"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();

      setPosts(data.posts || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchPosts();
}, []);

  const ExplorePostCard = ({ post }) => {
    // ✅ future-proof id
    const postId = post._id || post.id;

    const [actions, setActions] = useState({
      liked: false,
      restacked: false,
      subscribed: false,
    });

    const [showComments, setShowComments] = useState(false);

    const requireAuth = () => {
      if (token || isClientAuthenticated()) {
        return true;
      }

      router.push(getLoginRedirect(pathname));
      return false;
    };

    const toggleAction = (action) => {
      if (!requireAuth()) return;

      setActions((current) => ({
        ...current,
        [action]: !current[action],
      }));
    };

    const likeCount = post.likes + (actions.liked ? 1 : 0);
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

        <div
  className="mt-5 cursor-pointer"
  onClick={() =>
    router.push(`/blog/${post.slug || post._id || post.id}`)
  }
>
          <p className="text-lg leading-8 text-zinc-200">{post.text}</p>
        </div>

  

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">

          {/* LIKE */}
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

          {/* COMMENT */}
          <button
            type="button"
            onClick={() => {
             if (!requireAuth()) return;
           setShowComments((prev) => !prev);
            }}
            className="rounded-full border px-4 py-2 transition border-white/10 hover:border-orange-500/40 hover:text-orange-400"
          >
            💬 {post.replies} Replies
          </button>

          {/* RESTACK */}
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

        {/* Tabs */}
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
            <ExplorePostCard key={post._id || post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
}
