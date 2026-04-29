import React from "react";

const data = [
  {
    section: "Today",
    items: [
      {
        type: "like",
        user: "Alex Chen",
        time: "3h",
        post: "Writing online is thinking in public",
        meta: "May 12 · 8 min read",
      },
      {
        type: "restack",
        user: "Priya Patel",
        time: "5h",
        post: "Writing online is thinking in public",
        meta: "May 12 · 8 min read",
      },
      {
        type: "reply",
        user: "Noah Williams",
        time: "6h",
        content:
          "Totally agree with this! The part about showing up even when you don't feel ready really hit home.",
      },
    ],
  },
  {
    section: "Yesterday",
    items: [
      {
        type: "subscribe",
        user: "Emma Lee",
        time: "Yesterday",
      },
      {
        type: "like",
        user: "David Kim",
        time: "Yesterday",
        post: "The creative process is non-linear",
        meta: "May 10 · 6 min read",
      },
      {
        type: "reply",
        user: "Maria Garcia",
        time: "Yesterday",
        content:
          "This framework is so helpful—saving this one!",
      },
    ],
  },
];

const Icon = ({ type }) => {
  const map = {
    like: "❤️",
    restack: "🔁",
    reply: "💬",
    subscribe: "⭐",
  };

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a1a1a] text-xl border border-white/10">
      {map[type] || "🔔"}
    </div>
  );
};

const NotificationItem = ({ item }) => {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.95)]">
      <div className="flex items-start gap-4">
        <Icon type={item.type} />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-orange-400">
              {item.user}
            </span>

            <span className="text-zinc-400 text-sm">
              {item.type === "like" && "liked your post"}
              {item.type === "restack" && "restacked your post"}
              {item.type === "reply" && "replied to your post"}
              {item.type === "subscribe" && "subscribed to your blog"}
            </span>
          </div>

          {item.content && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#181818] p-4 text-sm leading-7 text-zinc-300">
              {item.content}
            </div>
          )}

          {item.post && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#181818] p-4">
              <p className="font-medium text-white">
                {item.post}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {item.meta}
              </p>
            </div>
          )}
        </div>

        <div className="text-xs text-zinc-500 whitespace-nowrap">
          {item.time}
        </div>
      </div>
    </article>
  );
};

export default function ActivityPage() {
  const filters = [
    "All",
    "Likes",
    "Replies",
    "Restacks",
    "Subscriptions",
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-5xl px-6 py-6">

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.95)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Notifications
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Activity
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            A feed of likes, replies, subscriptions, and restacks.
          </p>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <button
                key={filter}
                className={`rounded-xl px-5 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "bg-orange-500 text-black"
                    : "border border-white/10 text-zinc-300 hover:bg-[#1a1a1a]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Feed */}
        <div className="mt-8 space-y-8">
          {data.map((section, idx) => (
            <div key={idx}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {section.section}
              </p>

              <div className="space-y-5">
                {section.items.map((item, i) => (
                  <NotificationItem
                    key={i}
                    item={item}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-2xl border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:bg-[#181818]">
            Load more
          </button>
        </div>

      </div>
    </div>
  );
}
