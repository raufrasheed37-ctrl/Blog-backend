"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthRedirect } from "@/utils/auth";

export default function CommentSection({ postId, requireAuth: requireAuthProp }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ edit states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      setFetching(true);

      const res = await fetch(
        `http://localhost:5000/api/comments/${postId}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      // call on next microtask to avoid synchronous setState inside effect
      Promise.resolve().then(() => fetchComments());
    }
  }, [postId, fetchComments]);

  // If parent didn't provide an auth guard, use local hook
  const { requireAuth: localRequireAuth } = useAuthRedirect();
  const requireAuth = requireAuthProp || localRequireAuth;

  

  // 🔹 Create comment
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

      if (!res.ok) throw new Error("Failed to post");

      const data = await res.json();

      setComments((prev) => [data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete comment
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "DELETE",
      });

      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Start edit
  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  // 🔹 Save edit (UI for now)
  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;

    setComments((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, text: editText } : c
      )
    );

    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="mt-8 border-t border-white/10 pt-8">

      {/* INPUT */}
<div className="rounded-[28px] border border-white/10 bg-[#151515] p-4">

  <textarea
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    placeholder="Share your thoughts..."
    rows={4}
    disabled={loading}
    className="w-full resize-none bg-transparent text-[15px] leading-7 text-white outline-none placeholder:text-zinc-500"
  />

  <div className="mt-4 flex items-center justify-between">

    <p className="text-xs text-zinc-500">
      Join the discussion respectfully.
    </p>

    <button
      onClick={handleComment}
      disabled={loading}
      className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
    >
      {loading ? "Posting..." : "Reply"}
    </button>

  </div>

</div>

      {/* LOADING */}
      {fetching && (
        <p className="text-sm text-zinc-500">Loading comments...</p>
      )}

      {/* COMMENTS */}
      <div className="space-y-5">
        {!fetching && comments.length === 0 && (
          <p className="text-sm text-zinc-500">No comments yet</p>
        )}

        {comments.map((comment) => (
          <div
  key={comment._id}
  className="rounded-[28px] border border-white/10 bg-[#151515] p-5 transition hover:border-white/20"
>
            <div className="flex items-start gap-4">
    <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-amber-500" />

              {/* EDIT OR TEXT */}
              {editingId === comment._id ? (
                <input
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#101010] p-3 text-[15px] text-white outline-none"
                />
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-[15px] font-semibold text-white">
                      {comment.user?.name || "User"}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="mt-3 text-[15px] leading-7 text-zinc-300">
                    {comment.text}
                  </p>
                             <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">

              {editingId === comment._id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(comment._id)}
                    className="rounded-full border border-white/10 px-3 py-1 transition hover:border-green-400 hover:text-green-400"
                  >
                    Save
                  </button>

                  <button
  onClick={handleCancelEdit}
  className="rounded-full border border-white/10 px-3 py-1 transition hover:text-white"
>
  Cancel
</button>
                </>
              ) : (
                <button
  onClick={() => handleEdit(comment)}
  className="transition hover:text-white"
>
  Edit
</button>
              )}

              <button
                onClick={() => handleDelete(comment._id)}
                className="transition hover:text-red-400"
              >
                Delete
              </button>

            </div>
          </div>
                </>
              )}
            </div>

        ))}
      </div>
    </div>
  );
}
