import Link from "next/link";

export default function MainLayout({ children }) {
  const navItems = [
    { label: "Home" },
    { label: "Activity" },
    { label: "Explore" },
    { label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-zinc-100">
      <div className="mx-auto flex w-full max-w-360 items-start gap-4 px-4 py-6 lg:gap-6 lg:px-6">

        <aside className="hidden min-h-[92vh] w-62.5 flex-col rounded-3xl border border-white/10 bg-linear-to-b from-[#121212] via-[#0d0d0d] to-[#111111] p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] md:sticky md:top-6 md:flex">
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
                key={item.label}
                href={
                  item.label === "Explore"
                    ? "/explore"
                    : item.label === "Activity"
                    ? "/activity"
                    : item.label === "Profile"
                    ? "/dashboard"
                    : item.label === "Home"
                    ? "/"
                    : "#"
                }
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  item.label === "Home"
                    ? "bg-zinc-800/80 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <button className="mt-auto rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[0_14px_35px_-20px_rgba(249,115,22,0.9)] transition hover:bg-orange-400">
            <Link href="/register">
              Create
            </Link>
          </button>
        </aside>

        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
