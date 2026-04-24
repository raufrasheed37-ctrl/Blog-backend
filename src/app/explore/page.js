export default function ExplorePage() {
  const topics = [
    "Technology",
    "Business",
    "AI",
    "Freelancing",
    "Startups",
    "Marketing",
    "Writing",
    "Design",
  ];

  return (
    <main className="min-h-screen bg-[#090909] p-6 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Explore Topics</h1>

        <p className="mt-3 text-zinc-400">
          Discover trending topics, creators, and popular blog posts.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Trending Topics</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-2xl border border-white/10 bg-[#161616] p-5 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.9)] transition hover:border-white/20"
              >
                <h3 className="text-lg font-semibold">{topic}</h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Explore articles and insights about {topic}.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}