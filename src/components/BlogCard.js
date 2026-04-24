import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="rounded-3xl border border-white/10 bg-[#161616] p-5">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-full bg-linear-to-br ${post.avatarClass}`}
          />

          <div>
            <p>{post.name}</p>
            <p>{post.handle} • {post.time}</p>
          </div>
        </div>

        <p>{post.text}</p>
      </article>
    </Link>
  );
}