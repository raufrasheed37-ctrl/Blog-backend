import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="border-b border-white/10 py-6">
      <div className="flex items-start justify-between gap-4">
        {/* Left Side */}
        <div className="flex flex-1 gap-3">
          {/* Avatar */}
          <div
            className={`h-11 w-11 shrink-0 rounded-full bg-gradient-to-br ${post.avatarClass}`}
          />

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* User Info */}
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-white">
                {post.name}
              </p>

              <p className="text-xs text-zinc-500">
                {post.handle}
              </p>

              <span className="text-xs text-zinc-600">
                •
              </span>

              <p className="text-xs text-zinc-500">
                {post.time}
              </p>
            </div>

            {/* Post Title */}
            <Link href={`/blog/${post.slug}`}>
              <h2 className="mt-3 cursor-pointer text-lg font-semibold leading-7 text-white transition hover:text-orange-400">
                {post.title}
              </h2>
            </Link>

            {/* Post Text */}
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {post.text}
            </p>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-6 text-sm text-zinc-500">
              <button className="transition hover:text-red-400">
                ♡ {post.likes}
              </button>

              <button className="transition hover:text-white">
                💬 {post.comments}
              </button>

              <button className="transition hover:text-white">
                ↻ Share
              </button>

              <Link
                href={`/blog/${post.slug}`}
                className="transition hover:text-orange-400"
              >
                ↗ Read
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-3">
          <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400">
            Subscribe
          </button>

          <span className="text-xs text-zinc-500">
            {post.category}
          </span>
        </div>
      </div>
    </article>
  );
}
