export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-8">

        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">
          Travel Companion
        </p>

        <h1 className="mt-6 text-6xl font-bold leading-tight">
          Plan.
          <br />
          Travel.
          <br />
          Remember.
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-slate-400">
          Your personal travel assistant for planning, navigating,
          budgeting, documenting and reliving every trip.
        </p>

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-widest text-slate-400">
                Current Trip
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                🇸🇬 Singapore 2026
              </h2>

              <p className="mt-3 text-slate-400">
                12 – 19 August 2026
              </p>

              <p className="mt-2 text-slate-500">
                Hotel Mi Rochor
              </p>

            </div>

            <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-400">
              Open Trip →
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}
