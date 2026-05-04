"use client";

import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const result = contactSchema.safeParse(formData);

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

      console.log("Contact form payload:", result.data);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setErrors({ form: error?.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-white">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={8}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Tell us what you need"
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-zinc-950 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}
