import BlogCard from "@/components/BlogCard";

export default function BlogListPage() {
  const posts = [
    // PAGE 1
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
      name: "Mia Chen",
      handle: "@miastories",
      time: "8h ago",
      slug: "entertainment-industry-and-audience-power",
      title: "Entertainment Industry and Audience Power",
      category: "Entertainment",
      likes: 176,
      comments: 31,
      text: "Entertainment today runs on trust and attention. Viral moments fade, community stays.",
      avatarClass: "from-cyan-400 to-blue-500",
    },
    {
      name: "James Carter",
      handle: "@jamesbiz",
      time: "10h ago",
      slug: "startup-growth-with-small-audiences",
      title: "Startup Growth with Small Audiences",
      category: "Startups",
      likes: 143,
      comments: 19,
      text: "Niche communities convert faster and trust deeper than broad weak audiences.",
      avatarClass: "from-violet-400 to-purple-500",
    },
    {
      name: "Sophia Lee",
      handle: "@sophiatech",
      time: "12h ago",
      slug: "ai-changing-digital-marketing",
      title: "How AI Is Changing Digital Marketing",
      category: "Technology",
      likes: 267,
      comments: 48,
      text: "AI is transforming how brands connect with customers and make strategic decisions.",
      avatarClass: "from-pink-400 to-rose-500",
    },
    {
      name: "Michael Stone",
      handle: "@freelancepro",
      time: "14h ago",
      slug: "freelancing-without-burnout",
      title: "Freelancing Without Burning Out",
      category: "Freelancing",
      likes: 189,
      comments: 27,
      text: "Freedom without structure becomes chaos. Systems protect your energy and income.",
      avatarClass: "from-yellow-400 to-orange-500",
    },
    {
      name: "Ava Wilson",
      handle: "@brandgrowth",
      time: "16h ago",
      slug: "content-marketing-that-converts",
      title: "Content Marketing That Actually Converts",
      category: "Marketing",
      likes: 155,
      comments: 22,
      text: "Good marketing solves real problems before asking for a sale.",
      avatarClass: "from-indigo-400 to-blue-500",
    },
    {
      name: "Chris Nolan",
      handle: "@mindsetdaily",
      time: "18h ago",
      slug: "discipline-over-motivation",
      title: "Discipline Will Always Beat Motivation",
      category: "Personal Growth",
      likes: 301,
      comments: 57,
      text: "Motivation fades. Systems and discipline create long-term success.",
      avatarClass: "from-lime-400 to-green-500",
    },
    {
      name: "Emma Rodriguez",
      handle: "@futurecreator",
      time: "20h ago",
      slug: "creator-economy-is-the-future",
      title: "Why the Creator Economy Is the Future",
      category: "Creator Economy",
      likes: 198,
      comments: 33,
      text: "Creators are becoming businesses and communities are becoming economies.",
      avatarClass: "from-sky-400 to-cyan-500",
    },
    {
      name: "Ryan Adams",
      handle: "@nextfounder",
      time: "1d ago",
      slug: "building-business-from-zero",
      title: "Building a Business from Absolute Zero",
      category: "Business",
      likes: 241,
      comments: 41,
      text: "Clarity beats capital. Solve one painful problem really well first.",
      avatarClass: "from-red-400 to-pink-500",
    },

    // PAGE 2
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
    name: "Sophia Turner",
    handle: "@brandmaker",
    time: "2d ago",
    slug: "personal-brand-vs-company-brand",
    title: "Personal Brand vs Company Brand",
    category: "Business",
    likes: 190,
    comments: 29,
    text: "People trust faces before logos. Personal branding often grows faster than company branding.",
    avatarClass: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "Noah Grant",
    handle: "@sportstalk",
    time: "2d ago",
    slug: "why-fans-buy-emotion",
    title: "Why Sports Fans Buy Emotion",
    category: "Sports",
    likes: 272,
    comments: 46,
    text: "Sports businesses thrive because fans invest emotionally, not logically. Emotion drives loyalty.",
    avatarClass: "from-orange-600 to-amber-600",
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
  ];

  return (
    <main className="min-h-screen bg-[#090909] p-6 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Latest Articles</h1>

        <p className="mt-3 text-zinc-400">
          Explore powerful ideas, fresh stories, and creator insights.
        </p>

        <section className="mt-8 h-[750px] overflow-y-auto space-y-6 pr-2">
          {posts.map((post) => (
            <BlogCard
              key={post.handle}
              post={post}
            />
          ))}
        </section>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="rounded-xl border border-white/10 px-4 py-2">
            Previous
          </button>

          <button className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-zinc-950">
            1
          </button>

          <button className="rounded-xl border border-white/10 px-4 py-2">
            2
          </button>

          <button className="rounded-xl border border-white/10 px-4 py-2">
            3
          </button>

          <button className="rounded-xl border border-white/10 px-4 py-2">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
