"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ postId, requireAuth }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch comments when component loads
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${postId}`
      );
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Send comment
  const handleComment = async () => {
    if (!requireAuth()) return;

    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          postId,
        }),
      });

      const data = await res.json();

      setComments((prev) => [data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-4">

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-xl bg-zinc-900 p-3 text-sm outline-none"
        />

        <button
          onClick={handleComment}
          disabled={loading}
          className="rounded-xl bg-orange-500 px-4 text-sm font-semibold text-black"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Comments */}
      <div className="space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-zinc-500">No comments yet</p>
        )}

        {comments.map((comment, index) => (
          <div
            key={index}
            className="rounded-xl bg-zinc-900 p-3 text-sm"
          >
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}

Rasheed Rauf <raufrasheed37@gmail.com>
5:00 PM (0 minutes ago)
to me

"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ postId, requireAuth }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // 🔹 Fetch comments when post changes
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      setFetching(true);

      const res = await fetch(
        `http://localhost:5000/api/comments/${postId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  // 🔹 Send comment
  const handleComment = async () => {
    if (!requireAuth()) return;

    if (!commentText.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          postId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await res.json();

      if (data) {
        setComments((prev) => [data, ...prev]);
      }

      setCommentText("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 space-y-4 border-t border-white/10 pt-4">

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleComment();
          }}
          disabled={loading}
          placeholder="Write a comment..."
          className="flex-1 rounded-xl bg-zinc-900 p-3 text-sm outline-none text-white placeholder:text-zinc-500"
        />

        <button
          onClick={handleComment}
          disabled={loading}
          className="rounded-xl bg-orange-500 px-4 text-sm font-semibold text-black hover:bg-orange-400 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Loading state */}
      {fetching && (
        <p className="text-sm text-zinc-500">Loading comments...</p>
      )}

      {/* Comments */}
      <div className="space-y-3">
        {!fetching && comments.length === 0 && (
          <p className="text-sm text-zinc-500">No comments yet</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 rounded-2xl border border-white/10 bg-[#111111] p-3"
          >
            {/* Avatar */}
            <div className="h-9 w-9 rounded-full bg-zinc-700" />

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-white">
                  {comment.user?.name || "User"}
                </span>

                <span className="text-xs text-zinc-500">
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-300">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
