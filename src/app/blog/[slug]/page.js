export async function generateStaticParams() {
  return [
    { slug: "how-consistency-builds-online-income" },
    { slug: "sports-business-behind-modern-football" },
    { slug: "why-small-brands-win-online" },
    { slug: "athletes-as-global-brands" },
    { slug: "streaming-platforms-changing-hollywood" },
    { slug: "startup-founders-and-focus" },
    { slug: "celebrity-culture-and-digital-power" },
    { slug: "launch-fast-learn-faster" },
    { slug: "automation-is-the-new-advantage" },
    { slug: "raising-prices-without-losing-clients" },
    { slug: "why-simple-offers-convert-more" },
    { slug: "protecting-focus-in-a-distracted-world" },
    { slug: "community-first-business-models" },
    { slug: "solving-small-problems-for-big-profit" },
    { slug: "high-paying-clients-without-cold-dms" },
    { slug: "storytelling-sells-better-than-ads" },
    { slug: "daily-systems-for-high-performance" },
    { slug: "monetizing-trust-in-the-creator-economy" },
    { slug: "profitable-business-before-scaling" },
    { slug: "future-of-remote-work-with-ai" },
    { slug: "building-client-trust-that-converts" },
  ];
}

import Link from "next/link";

export default function SinglePostPage({ params }) {
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

  const slug = decodeURIComponent(params?.slug || "");

const post = posts.find(
  (item) => item.slug.trim().toLowerCase() === slug.trim().toLowerCase()
);

if (!post) {
  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <h1>Post not found</h1>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-[#090909] px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-400 hover:underline"
        >
          ← Back to Articles
        </Link>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111111] overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
              Featured Article
            </p>

            <h1 className="mt-4 text-4xl font-bold text-[#07110b]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-emerald-950">
                 <span>{post.name}</span>
                 <span>• {post.time}</span>
                 <span>• 7 min read</span>
                <span>• {post.category}</span>
                <span>• ❤️ {post.likes}</span>
                 <span>• 💬 {post.comments}</span>
            </div>
          </div>

          <div className="p-8 space-y-8 text-zinc-300 leading-8">
            <p>{post.text}</p>

            <h2 className="text-2xl font-semibold text-white">
              Why This Matters
            </h2>

            <p>
              Long-term success comes from trust, consistency, and strong
              systems. Professionals win by building what lasts instead of
              chasing temporary hype.
            </p>

            <blockquote className="rounded-2xl border border-white/10 bg-[#161616] p-5 italic text-zinc-200">
              “The goal is not perfection. The goal is momentum.”
            </blockquote>

            <h2 className="text-2xl font-semibold text-white">
              Final Thoughts
            </h2>

            <p>
              Start small. Improve fast. Let your work compound over time.
              Consistency always beats temporary hype.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
