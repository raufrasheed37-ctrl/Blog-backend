import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#161616] p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.9)] transition hover:border-white/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-full bg-linear-to-br ${post.avatarClass}`}
          />

          <div>
            <p className="text-sm font-semibold text-zinc-100">
              {post.name}
            </p>

            <p className="text-xs text-zinc-500">
              {post.handle} • {post.time}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
          {post.category}
        </span>
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="mt-5 text-xl font-semibold leading-8 text-zinc-100 transition hover:text-emerald-400">
          {post.title}
        </h2>
      </Link>

      <p className="mt-4 leading-7 text-zinc-300">
        {post.text}
      </p>

      <div className="mt-6 flex items-center gap-6 text-sm text-zinc-400">
        <button className="transition hover:text-red-400">
          ❤️ {post.likes} Likes
        </button>

        <button className="transition hover:text-emerald-400">
          💬 {post.comments} Comments
        </button>

        <Link
          href={`/blog/${post.slug}`}
          className="ml-auto font-medium text-emerald-400 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
