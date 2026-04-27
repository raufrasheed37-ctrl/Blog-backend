import BlogCard from "@/components/BlogCard";
import Link from "next/link";


export default function BlogListPage() {
  const posts = [
    {
      name: "Noah Chen",
      handle: "@noahwrites",
      time: "5h",
      slug: "how-to-build-a-100k-a-year-blog",
      text:
        "Creators who publish consistently for 90 days have the highest retention lift. Sharing my exact framework for drafting, editing, and shipping in under two hours.",
      avatarClass: "from-orange-400 to-amber-500",
    },
    {
      name: "Sarah Kim",
      handle: "@sarahcreates",
      time: "1d",
      slug: "the-creator-economy-isnt-slowing-down",
      text:
        "Your audience grows faster when your content solves one clear problem. Simplicity scales better than trying to impress everyone.",
      avatarClass: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <main className="min-h-screen bg-[#090909] p-6 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Latest Articles</h1>

        <p className="mt-3 text-zinc-400">
          Read fresh ideas, practical insights, and creator stories from our
          community.
        </p>

        <section className="mt-8 space-y-4">
          {posts.map((post) => (
            <BlogCard
              key={post.handle}
              post={post}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
