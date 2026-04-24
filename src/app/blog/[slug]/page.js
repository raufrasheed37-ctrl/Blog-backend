export default function SinglePostPage({ params }) {
  return (
    <main className="min-h-screen bg-[#090909] p-6 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-emerald-400 uppercase tracking-[0.18em]">
          Featured Article
        </p>

        <h1 className="mt-3 text-4xl font-bold leading-tight">
  {params?.slug
    ? params.slug.replace(/-/g, " ")
    : "Blog Post"}
</h1>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />

          <div>
            <p className="text-sm font-semibold">Ari Miles</p>
            <p className="text-xs text-zinc-500">
              Published 2 hours ago
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#161616] p-6 leading-8 text-zinc-300">
          <p>
            Great ideas often begin as rough thoughts hidden inside old notes.
            The difference between creators who grow and those who stay stuck is
            often simple consistency.
          </p>

          <p className="mt-6">
            Publishing regularly builds trust, authority, and long-term
            opportunities. One post can become a newsletter, a product, or even
            a business.
          </p>

          <p className="mt-6">
            The goal is not perfection. The goal is momentum. Start small,
            improve fast, and let your work compound over time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Comments</h2>

          <div className="mt-4 rounded-2xl border border-white/10 bg-[#161616] p-5">
            <p className="text-zinc-400">
              Comments section coming soon...
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}