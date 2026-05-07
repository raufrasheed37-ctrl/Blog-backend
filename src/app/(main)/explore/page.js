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

    const likeCount =
      (post.likes || 0) +
      (actions.liked ? 1 : 0);

    const restackCount =
      (post.restacks || 0) +
      (actions.restacked ? 1 : 0);

    return (
      <article className="border-b border-white/10 pb-10">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          <div className="flex gap-4">

            <div className="h-12 w-12 rounded-full bg-zinc-700" />

            <div>
              <h3 className="text-lg font-semibold">
                {post.author?.name || "User"}
              </h3>

              <p className="text-sm text-zinc-400">
                @{post.author?.name || "user"}
              </p>

              <p className="text-sm text-zinc-400">
                {new Date(
                  post.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              toggleAction("subscribed")
            }
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              actions.subscribed
                ? "bg-zinc-800 text-zinc-100"
                : "bg-orange-500 text-black hover:bg-orange-400"
            }`}
          >
            {actions.subscribed
              ? "Subscribed"
              : "Subscribe"}
          </button>

        </div>

        {/* CONTENT */}
        <div
          className="mt-5 cursor-pointer"
          onClick={() =>
            router.push(
              `/blog/${post.slug || post._id}`
            )
          }
        >

          <h2 className="text-2xl font-bold text-white">
            {post.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-zinc-300">
            {post.content}
          </p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="mt-6 w-full rounded-3xl object-cover"
            />
          )}

        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">

          {/* LIKE */}
          <button
            type="button"
            onClick={() =>
              toggleAction("liked")
            }
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

              setShowComments(
                (prev) => !prev
              );
            }}
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-orange-500/40 hover:text-orange-400"
          >
            💬 {post.replyCount || 0} Replies
          </button>

          {/* RESTACK */}
          <button
            type="button"
            onClick={() =>
              toggleAction("restacked")
            }
            className={`rounded-full border px-4 py-2 transition ${
              actions.restacked
                ? "border-orange-500/60 bg-orange-500/10 text-orange-400"
                : "border-white/10 hover:border-orange-500/40 hover:text-orange-400"
            }`}
          >
            🔁 {restackCount} Restacks
          </button>

        </div>

        {/* COMMENT SECTION */}
        {showComments && (
          <CommentSection
            postId={postId}
            requireAuth={requireAuth}
          />
        )}

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
              className={`whitespace-nowrap rounded-xl px-5 py-2 text-sm font-medium ${
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
                  ? "border-b-2 border-white pb-2 text-white"
                  : "text-zinc-500"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* FEED */}
        <div className="mt-8 space-y-8">

          {posts.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-[#151515] p-10 text-center">

              <h2 className="text-xl font-semibold text-white">
                No posts yet
              </h2>

              <p className="mt-3 text-zinc-400">
                Be the first person to create a post.
              </p>

            </div>
          )}

          {posts.map((post) => (
            <ExplorePostCard
              key={post._id || post.id}
              post={post}
            />
          ))}

        </div>

      </div>

    </div>
  );
}
