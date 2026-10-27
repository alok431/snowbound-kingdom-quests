import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, Lock, Users } from "lucide-react";
import crystal from "@/assets/crystal.png";
import wood from "@/assets/wood.jpg";
import chest from "@/assets/chest.png";
import tools from "@/assets/tools.png";
import wheel from "@/assets/wheel.png";
import village from "@/assets/village.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnowQuest — Frozen Kingdom" },
      { name: "description", content: "Your SnowQuest balance, daily streak, lucky spin and winter events." },
      { property: "og:title", content: "SnowQuest — Frozen Kingdom" },
      { property: "og:description", content: "Your balance, daily streak, lucky spin and winter events." },
    ],
  }),
  component: Home,
});

const streak = [50, 80, 100, 150, 200, 300, 500];

function Home() {
  return (
    <>
      {/* Balance */}
      <section className="snow-cap relative overflow-visible rounded-2xl border-4 border-[oklch(0.35_0.06_55)] shadow-[0_0_18px_color-mix(in_oklab,var(--gold)_35%,transparent)]">
        <img src={wood} alt="" className="absolute inset-0 h-full w-full rounded-xl object-cover" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-background/20 to-background/60" />
        <Icicles />
        <Lantern className="left-1.5" />
        <Lantern className="right-1.5" />
        <div className="relative flex items-center gap-2 px-8 py-6">
          <img src={crystal} alt="" className="h-20 w-16 shrink-0 animate-shimmer object-contain" />
          <div className="min-w-0 flex-1 text-center">
            <p className="font-display text-sm tracking-wide text-ice">YOUR BALANCE</p>
            <p className="font-display text-5xl leading-none text-gold-grad">5,680 <span className="text-2xl">IQ</span></p>
            <p className="mt-1 text-sm text-ice/90">≈ $0.56 (0.59 TON)</p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-3 gap-3 pt-2">
        {[
          { l: "Earn", I: Flame, c: "text-gold", g: "from-[oklch(0.7_0.2_45)] to-[oklch(0.45_0.2_30)]" },
          { l: "Withdraw", I: Lock, c: "text-ice", g: "from-cyan to-primary" },
          { l: "Invite", I: Users, c: "text-ice", g: "from-royal to-[oklch(0.35_0.2_290)]" },
        ].map(({ l, I, c, g }) => (
          <button key={l} className="stone snow-cap relative flex flex-col items-center gap-1.5 rounded-2xl pb-2 pt-4 active:scale-95">
            <span className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-b ${g} shadow-[var(--glow-cyan)] animate-floaty`}>
              <I size={28} className={c} fill="currentColor" />
            </span>
            <span className="font-display text-lg">{l}</span>
          </button>
        ))}
      </section>

      {/* Streak */}
      <section className="ice-panel p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-1 font-display text-lg"><Flame size={18} className="text-gold" fill="currentColor" /> Daily Streak</h2>
          <span className="font-display text-gold">7 Days</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {streak.map((v, i) => {
            const done = i < 3, last = i === 6;
            return (
              <div key={i} className={`flex flex-col items-center gap-1 rounded-lg border py-1 ${last ? "border-gold bg-gold/15" : "border-frost bg-background/60"}`}>
                <span className={`text-[10px] ${last ? "text-gold" : "text-ice/80"}`}>Day {i + 1}</span>
                {last ? <img src={chest} alt="Treasure chest" className="h-7 w-7 object-contain" />
                  : done ? <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan shadow-[var(--glow-cyan)]"><Check size={14} strokeWidth={4} className="text-background" /></span>
                  : <img src={crystal} alt="" className="h-6 w-6 object-contain" />}
                <span className={`text-[11px] font-semibold ${last ? "text-gold" : "text-ice"}`}>+{v}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Task center + spin */}
      <section className="grid grid-cols-2 gap-3">
        <MiniCard img={tools} title="Task Center" sub="Complete Tasks" cta="Go" to="/tasks" />
        <MiniCard img={wheel} title="Lucky Spin" sub="Win Rewards" cta="Spin" spin />
      </section>

      {/* Event */}
      <section className="ice-panel snow-cap relative overflow-hidden">
        <img src={village} alt="Snow village" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="relative p-4">
          <p className="font-display text-gold">SPECIAL EVENT</p>
          <p className="font-display text-3xl leading-tight text-ice text-glow">SNOW VILLAGE</p>
          <p className="font-display text-crystal">Build · Trade · Earn</p>
          <button className="btn-ice mt-3 px-6 py-2 text-xl">Play Now</button>
        </div>
      </section>
    </>
  );
}

function MiniCard({ img, title, sub, cta, to, spin }: { img: string; title: string; sub: string; cta: string; to?: "/tasks"; spin?: boolean }) {
  const btn = "btn-ice block w-full py-1.5 text-center text-lg";
  return (
    <div className="ice-panel snow-cap p-3">
      <div className="flex items-center gap-2">
        <img src={img} alt="" className={`h-12 w-12 shrink-0 object-contain ${spin ? "animate-[spin_12s_linear_infinite]" : ""}`} />
        <div className="min-w-0">
          <p className="truncate font-display">{title}</p>
          <p className="truncate text-xs text-ice/75">{sub}</p>
        </div>
      </div>
      <div className="mt-3">{to ? <Link to={to} className={btn}>{cta}</Link> : <button className={btn}>{cta}</button>}</div>
    </div>
  );
}

function Lantern({ className }: { className: string }) {
  return (
    <div className={`absolute top-1/2 z-[3] -translate-y-1/2 ${className}`}>
      <div className="h-8 w-5 rounded-md border-2 border-[oklch(0.3_0.04_55)] bg-gold shadow-[0_0_18px_6px_color-mix(in_oklab,var(--gold)_60%,transparent)]" />
    </div>
  );
}

function Icicles() {
  return (
    <div className="pointer-events-none absolute inset-x-4 -bottom-3 z-[3] flex justify-between">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="block w-1.5 bg-gradient-to-b from-ice to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)]" style={{ height: 6 + ((i * 7) % 11) }} />
      ))}
    </div>
  );
}
