export default function ExplorePage() {
  const categories = [
    "Explore",
    "Culture",
    "Technology",
    "Business",
    "Sports",
    "Entertainment",
  ];

  const tabs = ["Top", "Recent", "Posts"];

  const posts = [1, 2, 3];

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-6">

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map((item, index) => (
            <button
              key={item}
              className={`rounded-xl px-5 py-2 text-sm font-medium whitespace-nowrap ${
                index === 0
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Top / Recent / Posts */}
        <div className="mt-6 flex justify-center gap-16 border-b border-white/10 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-semibold ${
                index === 0
                  ? "text-white border-b-2 border-white pb-2"
                  : "text-zinc-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <article
              key={post}
              className="border-b border-white/10 pb-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-700" />

                  <div>
                    <h3 className="font-semibold text-lg">
                      Creator Name
                    </h3>

                    <p className="text-sm text-zinc-400">
                      3h ago
                    </p>
                  </div>
                </div>

                <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black">
                  Subscribe
                </button>
              </div>

              {/* Content */}
              <div className="mt-5">
                <p className="text-lg leading-8 text-zinc-200">
                  This is where the real explore content will show.
                  Backend will later load actual user posts, images,
                  and creator content here exactly like Substack.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="mt-6 h-72 rounded-3xl bg-zinc-800" />

              {/* Actions */}
              <div className="mt-6 flex items-center gap-8 text-sm text-zinc-400">
                <button>❤️ 25 Likes</button>
                <button>💬 4 Replies</button>
                <button>🔁 2 Restacks</button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
