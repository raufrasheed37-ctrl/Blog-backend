import Link from "next/link";

export default function SinglePostPage({ params }) {
  const posts = [
  {
    name: "Sarah Johnson",
    slug: "how-consistency-builds-online-income",
    title: "How Consistency Builds Online Income",
    category: "Business",
    likes: 128,
    comments: 24,
    readTime: "8 min read",
    published: "2h ago",
    content:
      "Consistency builds what motivation cannot. Real online income comes from showing up repeatedly and earning trust over time.",
  },
  {
    name: "Daniel Brooks",
    slug: "sports-business-behind-modern-football",
    title: "The Sports Business Behind Modern Football",
    category: "Sports",
    likes: 214,
    comments: 39,
    readTime: "7 min read",
    published: "5h ago",
    content:
      "Modern football is now a billion-dollar business powered by branding and global media rights.",
  },
  {
    name: "Olivia Grant",
    slug: "why-small-brands-win-online",
    title: "Why Small Brands Win Online",
    category: "Business",
    likes: 175,
    comments: 28,
    readTime: "6 min read",
    published: "1d ago",
    content:
      "Smaller brands move faster, connect deeper, and build stronger trust than large corporate systems.",
  },
  {
    name: "Marcus Reed",
    slug: "athletes-as-global-brands",
    title: "Athletes Are Becoming Global Brands",
    category: "Sports",
    likes: 245,
    comments: 44,
    readTime: "7 min read",
    published: "1d ago",
    content:
      "Athletes today are media companies, brand ambassadors, and business founders beyond the field.",
  },
  {
    name: "Lena Fox",
    slug: "streaming-platforms-changing-hollywood",
    title: "How Streaming Platforms Changed Hollywood",
    category: "Entertainment",
    likes: 201,
    comments: 36,
    readTime: "8 min read",
    published: "1d ago",
    content:
      "Streaming shifted power from traditional studios to audiences who now decide what survives.",
  },
  {
    name: "Victor Hayes",
    slug: "startup-founders-and-focus",
    title: "Startup Founders Need Focus, Not More Ideas",
    category: "Startups",
    likes: 149,
    comments: 21,
    readTime: "6 min read",
    published: "1d ago",
    content:
      "Most founders fail from distraction, not lack of ideas. Focus is the real competitive advantage.",
  },
  {
    name: "Ella Monroe",
    slug: "celebrity-culture-and-digital-power",
    title: "Celebrity Culture and Digital Power",
    category: "Entertainment",
    likes: 205,
    comments: 35,
    readTime: "7 min read",
    published: "2d ago",
    content:
      "Celebrities now compete with creators in real-time. Digital relevance moves faster than traditional fame.",
  },
  {
    name: "Nathan Cole",
    slug: "launch-fast-learn-faster",
    title: "Launch Fast, Learn Faster",
    category: "Startups",
    likes: 158,
    comments: 23,
    readTime: "6 min read",
    published: "2d ago",
    content:
      "Waiting for perfection kills momentum. Startups grow by testing reality, not planning forever.",
  },
  {
    name: "Ariana West",
    slug: "automation-is-the-new-advantage",
    title: "Automation Is the New Competitive Advantage",
    category: "Technology",
    likes: 295,
    comments: 54,
    readTime: "8 min read",
    published: "2d ago",
    content:
      "Teams that automate repetitive work create more time for strategy, creativity, and scale.",
  },
  {
    name: "Leo Bennett",
    slug: "raising-prices-without-losing-clients",
    title: "Raise Your Prices Without Losing Clients",
    category: "Freelancing",
    likes: 211,
    comments: 32,
    readTime: "7 min read",
    published: "2d ago",
    content:
      "Clients pay for confidence and outcomes, not just hours. Better positioning supports premium pricing.",
  },
  {
    name: "Clara James",
    slug: "why-simple-offers-convert-more",
    title: "Why Simple Offers Convert More",
    category: "Marketing",
    likes: 187,
    comments: 25,
    readTime: "6 min read",
    published: "3d ago",
    content:
      "Confused customers do not buy. Clear offers outperform clever but complicated messaging.",
  },
  {
    name: "David Stone",
    slug: "protecting-focus-in-a-distracted-world",
    title: "Protecting Focus in a Distracted World",
    category: "Personal Growth",
    likes: 322,
    comments: 66,
    readTime: "8 min read",
    published: "3d ago",
    content:
      "Focus is now a business skill. Protecting attention protects performance and long-term growth.",
  },
  {
    name: "Julia Reyes",
    slug: "community-first-business-models",
    title: "Community-First Business Models",
    category: "Creator Economy",
    likes: 230,
    comments: 38,
    readTime: "7 min read",
    published: "3d ago",
    content:
      "The strongest digital businesses begin with community. Revenue becomes stronger when trust comes first.",
  },
  {
    name: "Brandon Scott",
    slug: "solving-small-problems-for-big-profit",
    title: "Solve Small Problems for Big Profit",
    category: "Business",
    likes: 248,
    comments: 40,
    readTime: "7 min read",
    published: "3d ago",
    content:
      "Massive companies often begin by solving one simple painful problem better than everyone else.",
  },
  {
    name: "Jordan Miles",
    slug: "high-paying-clients-without-cold-dms",
    title: "Finding High-Paying Clients Without Cold DMs",
    category: "Freelancing",
    likes: 196,
    comments: 30,
    readTime: "7 min read",
    published: "1d ago",
    content:
      "Positioning and authority attract better clients faster than random outreach ever will.",
  },
  {
    name: "Grace Allen",
    slug: "storytelling-sells-better-than-ads",
    title: "Storytelling Sells Better Than Ads",
    category: "Marketing",
    likes: 183,
    comments: 26,
    readTime: "6 min read",
    published: "1d ago",
    content:
      "People ignore advertisements but remember stories. Narrative creates emotional conversion.",
  },
  {
    name: "Kevin Ross",
    slug: "daily-systems-for-high-performance",
    title: "Daily Systems for High Performance",
    category: "Personal Growth",
    likes: 310,
    comments: 61,
    readTime: "8 min read",
    published: "2d ago",
    content:
      "Peak performance is built by repeatable habits, not occasional motivation spikes.",
  },
  {
    name: "Isabella Cruz",
    slug: "monetizing-trust-in-the-creator-economy",
    title: "Monetizing Trust in the Creator Economy",
    category: "Creator Economy",
    likes: 223,
    comments: 37,
    readTime: "7 min read",
    published: "2d ago",
    content:
      "Trust converts faster than attention. Communities buy from creators they genuinely believe in.",
  },
  {
    name: "Ethan Blake",
    slug: "profitable-business-before-scaling",
    title: "Build a Profitable Business Before Scaling",
    category: "Business",
    likes: 259,
    comments: 42,
    readTime: "7 min read",
    published: "2d ago",
    content:
      "Scaling a broken model only creates bigger problems. Profitability should come before expansion.",
  },
  {
    name: "Nina Park",
    slug: "future-of-remote-work-with-ai",
    title: "The Future of Remote Work with AI",
    category: "Technology",
    likes: 288,
    comments: 52,
    readTime: "8 min read",
    published: "1d ago",
    content:
      "AI tools are changing productivity, hiring, and collaboration across global remote teams.",
  },
  {
    name: "Sophie Carter",
    slug: "building-client-trust-that-converts",
    title: "Building Client Trust That Converts",
    category: "Freelancing",
    likes: 207,
    comments: 34,
    readTime: "7 min read",
    published: "1d ago",
    content:
      "Clients buy confidence before they buy services. Trust is the fastest path to premium opportunities.",
  },
];

  const slug = params.slug;

const post = posts.find((item) => item.slug === slug);

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
              <span>• {post.published}</span>
              <span>• {post.readTime}</span>
              <span>• {post.category}</span>
              <span>• ❤️ {post.likes}</span>
              <span>• 💬 {post.comments}</span>
            </div>
          </div>

          <div className="p-8 space-y-8 text-zinc-300 leading-8">
            <p>{post.content}</p>

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
