"use client";

import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const navItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Activity", icon: <ActivityIcon /> },
    { label: "Explore", icon: <ExploreIcon /> },
    { label: "Profile", icon: <ProfileIcon /> },
  ];

  const posts = [
    {
      name: "Sarah Johnson",
      handle: "@sarahwrites",
      time: "2h ago",
      slug: "how-consistency-builds-online-income",
      title: "How Consistency Builds Online Income",
      category: "Business",
      likes: 128,
      comments: 24,
      text: "Consistency builds what motivation cannot. Real online income comes from showing up repeatedly and earning trust over time.",
      avatarClass: "from-emerald-400 to-teal-500",
    },
    {
      name: "Daniel Brooks",
      handle: "@danielmedia",
      time: "5h ago",
      slug: "sports-business-behind-modern-football",
      title: "The Sports Business Behind Modern Football",
      category: "Sports",
      likes: 214,
      comments: 39,
      text: "Modern football is now a billion-dollar business powered by branding and global media rights.",
      avatarClass: "from-orange-400 to-amber-500",
    },
    {
      name: "Olivia Grant",
      handle: "@oliviabuilds",
      time: "1d ago",
      slug: "why-small-brands-win-online",
      title: "Why Small Brands Win Online",
      category: "Business",
      likes: 175,
      comments: 28,
      text: "Smaller brands move faster, connect deeper, and build stronger trust than large corporate systems.",
      avatarClass: "from-purple-400 to-pink-500",
    },
    {
      name: "Marcus Reed",
      handle: "@sportsmind",
      time: "1d ago",
      slug: "athletes-as-global-brands",
      title: "Athletes Are Becoming Global Brands",
      category: "Sports",
      likes: 245,
      comments: 44,
      text: "Athletes today are media companies, brand ambassadors, and business founders beyond the field.",
      avatarClass: "from-orange-500 to-red-500",
    },
    {
      name: "Lena Fox",
      handle: "@entdaily",
      time: "1d ago",
      slug: "streaming-platforms-changing-hollywood",
      title: "How Streaming Platforms Changed Hollywood",
      category: "Entertainment",
      likes: 201,
      comments: 36,
      text: "Streaming shifted power from traditional studios to audiences who now decide what survives.",
      avatarClass: "from-cyan-500 to-indigo-500",
    },
    {
      name: "Victor Hayes",
      handle: "@startupfocus",
      time: "1d ago",
      slug: "startup-founders-and-focus",
      title: "Startup Founders Need Focus, Not More Ideas",
      category: "Startups",
      likes: 149,
      comments: 21,
      text: "Most founders fail from distraction, not lack of ideas. Focus is the real competitive advantage.",
      avatarClass: "from-violet-500 to-purple-600",
    },
    {
      name: "Ella Monroe",
      handle: "@showbizdaily",
      time: "2d ago",
      slug: "celebrity-culture-and-digital-power",
      title: "Celebrity Culture and Digital Power",
      category: "Entertainment",
      likes: 205,
      comments: 35,
      text: "Celebrities now compete with creators in real-time. Digital relevance moves faster than traditional fame.",
      avatarClass: "from-cyan-600 to-blue-600",
    },
    {
      name: "Nathan Cole",
      handle: "@startupengine",
      time: "2d ago",
      slug: "launch-fast-learn-faster",
      title: "Launch Fast, Learn Faster",
      category: "Startups",
      likes: 158,
      comments: 23,
      text: "Waiting for perfection kills momentum. Startups grow by testing reality, not planning forever.",
      avatarClass: "from-violet-600 to-purple-700",
    },
    {
      name: "Ariana West",
      handle: "@techshift",
      time: "2d ago",
      slug: "automation-is-the-new-advantage",
      title: "Automation Is the New Competitive Advantage",
      category: "Technology",
      likes: 295,
      comments: 54,
      text: "Teams that automate repetitive work create more time for strategy, creativity, and scale.",
      avatarClass: "from-pink-600 to-rose-600",
    },
    {
      name: "Leo Bennett",
      handle: "@freelancewins",
      time: "2d ago",
      slug: "raising-prices-without-losing-clients",
      title: "Raise Your Prices Without Losing Clients",
      category: "Freelancing",
      likes: 211,
      comments: 32,
      text: "Clients pay for confidence and outcomes, not just hours. Better positioning supports premium pricing.",
      avatarClass: "from-yellow-600 to-orange-700",
    },
    {
      name: "Clara James",
      handle: "@conversionlab",
      time: "3d ago",
      slug: "why-simple-offers-convert-more",
      title: "Why Simple Offers Convert More",
      category: "Marketing",
      likes: 187,
      comments: 25,
      text: "Confused customers do not buy. Clear offers outperform clever but complicated messaging.",
      avatarClass: "from-indigo-600 to-blue-700",
    },
    {
      name: "David Stone",
      handle: "@disciplinefirst",
      time: "3d ago",
      slug: "protecting-focus-in-a-distracted-world",
      title: "Protecting Focus in a Distracted World",
      category: "Personal Growth",
      likes: 322,
      comments: 66,
      text: "Focus is now a business skill. Protecting attention protects performance and long-term growth.",
      avatarClass: "from-lime-600 to-green-700",
    },
    {
      name: "Julia Reyes",
      handle: "@creatoreconomy",
      time: "3d ago",
      slug: "community-first-business-models",
      title: "Community-First Business Models",
      category: "Creator Economy",
      likes: 230,
      comments: 38,
      text: "The strongest digital businesses begin with community. Revenue becomes stronger when trust comes first.",
      avatarClass: "from-sky-600 to-cyan-700",
    },
    {
      name: "Brandon Scott",
      handle: "@zerofounder",
      time: "3d ago",
      slug: "solving-small-problems-for-big-profit",
      title: "Solve Small Problems for Big Profit",
      category: "Business",
      likes: 248,
      comments: 40,
      text: "Massive companies often begin by solving one simple painful problem better than everyone else.",
      avatarClass: "from-red-600 to-pink-700",
    },
    {
      name: "Jordan Miles",
      handle: "@freelanceflow",
      time: "1d ago",
      slug: "high-paying-clients-without-cold-dms",
      title: "Finding High-Paying Clients Without Cold DMs",
      category: "Freelancing",
      likes: 196,
      comments: 30,
      text: "Positioning and authority attract better clients faster than random outreach ever will.",
      avatarClass: "from-yellow-500 to-orange-600",
    },
    {
      name: "Grace Allen",
      handle: "@marketqueen",
      time: "1d ago",
      slug: "storytelling-sells-better-than-ads",
      title: "Storytelling Sells Better Than Ads",
      category: "Marketing",
      likes: 183,
      comments: 26,
      text: "People ignore advertisements but remember stories. Narrative creates emotional conversion.",
      avatarClass: "from-blue-500 to-indigo-600",
    },
    {
      name: "Kevin Ross",
      handle: "@growthmode",
      time: "2d ago",
      slug: "daily-systems-for-high-performance",
      title: "Daily Systems for High Performance",
      category: "Personal Growth",
      likes: 310,
      comments: 61,
      text: "Peak performance is built by repeatable habits, not occasional motivation spikes.",
      avatarClass: "from-lime-500 to-green-600",
    },
    {
      name: "Isabella Cruz",
      handle: "@creatorfuture",
      time: "2d ago",
      slug: "monetizing-trust-in-the-creator-economy",
      title: "Monetizing Trust in the Creator Economy",
      category: "Creator Economy",
      likes: 223,
      comments: 37,
      text: "Trust converts faster than attention. Communities buy from creators they genuinely believe in.",
      avatarClass: "from-sky-500 to-cyan-600",
    },
    {
      name: "Ethan Blake",
      handle: "@founderjournal",
      time: "2d ago",
      slug: "profitable-business-before-scaling",
      title: "Build a Profitable Business Before Scaling",
      category: "Business",
      likes: 259,
      comments: 42,
      text: "Scaling a broken model only creates bigger problems. Profitability should come before expansion.",
      avatarClass: "from-red-500 to-pink-600",
    },
    {
      name: "Nina Park",
      handle: "@futuretech",
      time: "1d ago",
      slug: "future-of-remote-work-with-ai",
      title: "The Future of Remote Work with AI",
      category: "Technology",
      likes: 288,
      comments: 52,
      text: "AI tools are changing productivity, hiring, and collaboration across global remote teams.",
      avatarClass: "from-pink-500 to-rose-500",
    },
    {
      name: "Sophie Carter",
      handle: "@clientgrowth",
      time: "1d ago",
      slug: "building-client-trust-that-converts",
      title: "Building Client Trust That Converts",
      category: "Freelancing",
      likes: 207,
      comments: 34,
      text: "Clients buy confidence before they buy services. Trust is the fastest path to premium opportunities.",
      avatarClass: "from-amber-500 to-yellow-600",
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

  const heroSlides = [
    {
      title: "Make money doing the work you believe in.",
      words:
        "Turn your ideas into income with clear positioning, focused content, and consistent execution.",
    },
    {
      title: "Build trust first, and revenue follows.",
      words:
        "People buy confidence, clarity, and outcomes. Show up with value every week and let momentum compound.",
    },
    {
      title: "Create once, grow for years.",
      words:
        "Design systems that publish, repurpose, and distribute your best work across platforms without burning out.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const postsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const listRef = useRef(null);

  const start = (currentPage - 1) * postsPerPage;
  const visiblePosts = posts.slice(start, start + postsPerPage);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <div className="mx-auto flex w-full max-w-360 items-start gap-4 px-4 py-6 lg:gap-6 lg:px-6">
        <aside className="hidden min-h-[92vh] w-62.5 flex-col rounded-3xl border border-white/10 bg-linear-to-b from-[#121212] via-[#0d0d0d] to-[#111111] p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] md:sticky md:top-6 md:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">Pulse</p>

            <h1 className="mt-2 text-xl font-semibold text-zinc-100">Creator Hub</h1>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                href={
                  item.label === "Explore"
                    ? "/explore"
                    : item.label === "Profile"
                      ? "/dashboard"
                      : item.label === "Home"
                        ? "/"
                        : "#"
                }
                key={item.label}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-zinc-800/80 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                <span className="text-zinc-300 transition group-hover:text-zinc-100">{item.icon}</span>

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
                {heroSlides[activeSlide].title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-emerald-950/90 sm:text-base">
                {heroSlides[activeSlide].words}
              </p>

              <div className="mt-4 flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.title}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index ? "w-9 bg-[#0a0f0b]" : "w-2.5 bg-emerald-950/40 hover:bg-emerald-950/70"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link href="/dashboard" className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400">
                  Open profile dashboard
                </Link>

                <a href="#" className="text-sm font-semibold text-emerald-950 underline-offset-4 transition hover:underline">
                  Learn more
                </a>
              </div>
            </div>
          </section>

          <section ref={listRef} className="h-375 space-y-6 overflow-y-auto pr-2">
            {visiblePosts.map((post) => (
              <BlogCard key={post.handle} post={post} />
            ))}
          </section>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                    currentPage === page ? "bg-orange-500 text-zinc-950" : "border border-white/10 text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </main>

        <aside className="hidden w-[320px] shrink-0 space-y-4 rounded-3xl border border-white/10 bg-[#101010] p-5 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.9)] xl:sticky xl:top-6 xl:block">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2.5">
            <SearchIcon />

            <input
              type="search"
              placeholder="Search posts, writers, topics"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </label>

          <section className="rounded-3xl border border-white/10 bg-[#161616] p-5 shadow-[0_25px_40px_-32px_rgba(0,0,0,0.95)]">
            <h3 className="text-xl font-semibold text-zinc-100">Log in or sign up</h3>

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
                <article key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-[#1d1d1d] p-3 transition hover:border-white/20">
                  <div className={`h-16 w-16 rounded-xl bg-linear-to-br ${item.thumbClass}`} />

                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-5 text-zinc-200">{item.title}</p>

                    <p className="mt-1 text-xs text-zinc-500">{item.readTime}</p>
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
      <path d="M4 11.8L12 5l8 6.8V20a1 1 0 0 1-1 1h-4.8v-5.6H9.8V21H5a1 1 0 0 1-1-1v-8.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h4l2-5 4 10 2-5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.8 8.2-2.6 5.6-5.6 2.6 2.6-5.6 5.6-2.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
      <rect x="32" y="36" width="130" height="88" rx="12" fill="#ffffff" fillOpacity="0.95" />
      <rect x="44" y="52" width="74" height="8" rx="4" fill="#9ca3af" />
      <rect x="44" y="68" width="104" height="8" rx="4" fill="#d1d5db" />
      <rect x="44" y="84" width="90" height="8" rx="4" fill="#d1d5db" />
      <path d="m156 32 25 25-50 50-25-25 50-50Z" fill="#f97316" />
      <path d="m168 44 13 13" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" />
      <circle cx="178" cy="116" r="18" fill="#fb923c" fillOpacity="0.86" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-zinc-500">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16.2 16.2 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
