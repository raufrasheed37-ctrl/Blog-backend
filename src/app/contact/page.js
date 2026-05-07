"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNo: z.string().min(1, "Phone Number only"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phoneNo: "", email: "", address: "" });
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
      setFormData({ name: "", phoneNo: "", email: "", address: ""});
      router.push("/dashboard");
    } catch (error) {
      setErrors({ form: error?.message || "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-white">
      <h1 className="mb-3 text-3xl font-bold text-orange-500">Contact Address</h1>
      <p className="text-orange-500 mb-6">
          Please fill in the details below to add a new address to your profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
        <div>
          <label className=" mb-3 block text-sm font-medium">Full Name <span className="text-orange-500">*</span></label>
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
          <label className=" mb-3 block text-sm font-medium">Phone Number <span className="text-orange-500">*</span></label>
          <input
            name="phoneNo"
            type="tel"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Phone Number"
          />
          {errors.phoneNo && <p className="mt-1 text-sm text-red-400">{errors.phoneNo}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email Address <span className="text-orange-500">*</span></label>
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
        <hr className="mt-5"/>

        <div>
          {/* <label className="mb-2 block text-sm font-medium">Message</label> */}
          {/* <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={8}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Tell us what you need"
          /> */}

          {/* {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>} */}
          
          <label className="mb-2 block text-sm font-medium">Address <span className="text-orange-500 text-sm">(Optional)</span></label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="Ikeja, Lagos. Nigeria"
          />
        </div>

        {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-zinc-950 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save contact"}
        </button>

        <p className=" text-sm">
          <Link
            href="/dashboard"
            className="font-medium text-orange-500 hover:text-orange-400"
            >
              Back to dashboard
          </Link>
        </p>
      </form>
    </main>
  );
}
