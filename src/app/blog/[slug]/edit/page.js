"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { blogAPI } from "@/utils/api";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300, "Excerpt must be less than 300 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
});

export default function EditPostPage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await blogAPI.getById(params.slug);
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
        });
      } catch (error) {
        setErrors({ form: error?.message || "Failed to load post" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = postSchema.safeParse(formData);

      if (!result.success) {
        const newErrors = {};

        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0];

          if (fieldName) {
            newErrors[fieldName] = issue.message;
          }
        });

        setErrors(newErrors);
        return;
      }

      await blogAPI.update(params.slug, result.data.title, result.data.content, result.data.excerpt);
      router.push(`/blog/${params.slug}`);
    } catch (error) {
      setErrors({ form: error?.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-white">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">Edit Post</h1>

      {isLoading && <p className="text-center text-zinc-400">Loading post...</p>}

      {!isLoading && (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Post title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <input
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Short summary"
          />
          {errors.excerpt && <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Write your post content"
          />
          {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
        </div>

        {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-zinc-950 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
      )}
    </main>
  );
}
