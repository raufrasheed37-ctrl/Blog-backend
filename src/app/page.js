import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function Home() {
  const navItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Activity", icon: <ActivityIcon /> },
    { label: "Explore", icon: <ExploreIcon /> },
    { label: "Profile", icon: <ProfileIcon /> },
  ];

  const posts = [
    {
      name: "Ari Miles",
      handle: "@arimiles",
      time: "2h",
      text:
        "The best ideas usually come from the notes you almost threw away. I turned one rough sketch into a paid weekly newsletter and crossed my first 500 subscribers this month.",
      avatarClass: "from-emerald-400 to-teal-500",
    },
    {
      name: "Noah Chen",
      handle: "@noahwrites",
      time: "5h",
      text:
        "Creators who publish consistently for 90 days have the highest retention lift. Sharing my exact framework for drafting, editing, and shipping in under two hours.",
      avatarClass: "from-orange-400 to-amber-500",
    },
  ];

  const upNext = [
    {
      title: "How top newsletter writers structure weeklies",
      readTime: "6 min read",
      thumbClass: "from-orange-500 to-rose-500",
    },
    {
      title: "Monetizing niche audiences without sponsorships",
      readTime: "4 min read",
      thumbClass: "from-emerald-500 to-lime-500",
    },
    {
      title: "Building a repeatable content system",
      readTime: "8 min read",
      thumbClass: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <div className="mx-auto flex w-full max-w-360 gap-4 px-4 py-6 lg:gap-6 lg:px-6">
        <aside className="hidden min-h-[92vh] w-62.5 flex-col rounded-3xl border border-white/10 bg-linear-to-b from-[#121212] via-[#0d0d0d] to-[#111111] p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] md:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Pulse
            </p>

            <h1 className="mt-2 text-xl font-semibold text-zinc-100">
              Creator Hub
            </h1>
          </div>

         <nav className="mt-8 flex flex-col gap-1">
  {navItems.map((item, index) => (
    <Link
      href={item.label === "Explore" ? "/explore" : "#"}
      key={item.label}
      className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
        index === 0
          ? "bg-zinc-800/80 text-zinc-100"
          : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
      }`}
    >
      <span className="text-zinc-300 transition group-hover:text-zinc-100">
        {item.icon}
      </span>

      <span>{item.label}</span>
    </Link>
  ))}
</nav>

          <button className="mt-auto rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[0_14px_35px_-20px_rgba(249,115,22,0.9)] transition hover:bg-orange-400">
            Create
          </button>
        </aside>

        <main className="w-full min-w-0 flex-1 space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f] p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.95)] sm:p-5 lg:p-6">
          <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 p-6 shadow-[0_25px_60px_-30px_rgba(16,185,129,0.9)] sm:p-8">
            <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-white/20 blur-2xl" />

            <div className="absolute bottom-2 right-4 hidden opacity-95 sm:block">
              <HeroIllustration />
            </div>

            <div className="relative max-w-135">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                Build your own business
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0a0f0b] sm:text-4xl">
                Make money doing the work you believe in.
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400">
                  Start your Blog
                </button>

                <a
                  href="#"
                  className="text-sm font-semibold text-emerald-950 underline-offset-4 transition hover:underline"
                >
                  Learn more
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            {posts.map((post) => (
              <BlogCard
                key={post.handle}
                post={post}
              />
            ))}
          </section>
        </main>

        <aside className="hidden w-[320px] shrink-0 space-y-4 rounded-3xl border border-white/10 bg-[#101010] p-5 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.9)] xl:block">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2.5">
            <SearchIcon />

            <input
              type="search"
              placeholder="Search posts, writers, topics"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </label>

          <section className="rounded-3xl border border-white/10 bg-[#161616] p-5 shadow-[0_25px_40px_-32px_rgba(0,0,0,0.95)]">
            <h3 className="text-xl font-semibold text-zinc-100">
              Log in or sign up
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Join creators and readers building profitable communities.
            </p>

            <div className="mt-4 space-y-2.5">
              <button className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400">
                Get started
              </button>

              <button className="w-full rounded-xl bg-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-600">
                Sign in
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#161616] p-5 shadow-[0_25px_40px_-32px_rgba(0,0,0,0.95)]">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Up next
            </h4>

            <div className="mt-4 space-y-3">
              {upNext.map((item) => (
                <article
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-[#1d1d1d] p-3 transition hover:border-white/20"
                >
                  <div
                    className={`h-16 w-16 rounded-xl bg-linear-to-br ${item.thumbClass}`}
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-5 text-zinc-200">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {item.readTime}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11.8L12 5l8 6.8V20a1 1 0 0 1-1 1h-4.8v-5.6H9.8V21H5a1 1 0 0 1-1-1v-8.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12h4l2-5 4 10 2-5h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m15.8 8.2-2.6 5.6-5.6 2.6 2.6-5.6 5.6-2.6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 19a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
      <rect
        x="32"
        y="36"
        width="130"
        height="88"
        rx="12"
        fill="#ffffff"
        fillOpacity="0.95"
      />

      <rect
        x="44"
        y="52"
        width="74"
        height="8"
        rx="4"
        fill="#9ca3af"
      />

      <rect
        x="44"
        y="68"
        width="104"
        height="8"
        rx="4"
        fill="#d1d5db"
      />

      <rect
        x="44"
        y="84"
        width="90"
        height="8"
        rx="4"
        fill="#d1d5db"
      />

      <path
        d="m156 32 25 25-50 50-25-25 50-50Z"
        fill="#f97316"
      />

      <path
        d="m168 44 13 13"
        stroke="#7c2d12"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle
        cx="178"
        cy="116"
        r="18"
        fill="#fb923c"
        fillOpacity="0.86"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="m16.2 16.2 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}