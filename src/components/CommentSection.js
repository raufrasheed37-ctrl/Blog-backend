"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ postId, requireAuth }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ edit states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Fetch comments
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

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

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
    <div className="mt-5 space-y-4 border-t border-white/10 pt-4">

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleComment();
          }}
          disabled={loading}
          placeholder="Write a comment..."
          className="flex-1 rounded-xl bg-zinc-900 p-3 text-sm text-white outline-none"
        />

        <button
          onClick={handleComment}
          disabled={loading}
          className="rounded-xl bg-orange-500 px-4 text-sm font-semibold text-black"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* LOADING */}
      {fetching && (
        <p className="text-sm text-zinc-500">Loading comments...</p>
      )}

      {/* COMMENTS */}
      <div className="space-y-3">
        {!fetching && comments.length === 0 && (
          <p className="text-sm text-zinc-500">No comments yet</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-3"
          >
            <div className="flex-1">

              {/* EDIT OR TEXT */}
              {editingId === comment._id ? (
                <input
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full rounded bg-zinc-800 p-2 text-sm text-white"
                />
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 ml-3">

              {editingId === comment._id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(comment._id)}
                    className="text-xs text-green-400"
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="text-xs text-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(comment)}
                  className="text-xs text-blue-400"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(comment._id)}
                className="text-xs text-red-400"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
