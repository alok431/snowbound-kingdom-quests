import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame } from "lucide-react";
import icEarn from "@/assets/ic-earn.png";
import icWallet from "@/assets/ic-wallet.png";
import icInvite from "@/assets/ic-invite.png";
import crystal from "@/assets/crystal.png";
import iceTex from "@/assets/ice-tex.jpg";
import chest from "@/assets/chest.png";
import tools from "@/assets/tools.png";
import wheel from "@/assets/wheel.png";
import village from "@/assets/village.jpg";
import lantern from "@/assets/lantern.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnowQuest — Frozen Kingdom" },
      { name: "description", content: "Your SnowQuest balance, daily streak, lucky spin and winter events." },
      { property: "og:title", content: "SnowQuest — Frozen Kingdom" },
      { property: "og:description", content: "Your balance, daily streak, lucky spin and winter events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const streak = [50, 80, 100, 150, 200, 300, 500];

function Home() {
  return (
    <>
      {/* Balance */}
      <section className="snow-cap relative overflow-visible rounded-2xl border-[4px] border-[oklch(0.92_0.07_215)] [border-bottom-color:oklch(0.45_0.16_248)] shadow-[0_7px_0_var(--ice-depth-dark),0_14px_26px_oklch(0_0_0/0.6),0_0_26px_color-mix(in_oklab,var(--cyan)_55%,transparent),inset_0_0_24px_color-mix(in_oklab,var(--cyan)_45%,transparent)]">
        <img src={iceTex} alt="" className="absolute inset-0 h-full w-full rounded-xl object-cover opacity-70" />
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(160deg,oklch(0.55_0.16_235/0.55),oklch(0.16_0.08_258/0.85))]" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-background/20 to-background/60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-crystal/35 to-transparent" />
        <Lantern className="left-1.5" />
        <Lantern className="right-1.5" />
        <div className="relative flex items-center gap-2 px-10 py-6">
          <img src={crystal} alt="" className="h-20 w-16 shrink-0 animate-shimmer object-contain" />
          <div className="min-w-0 flex-1 text-center">
            <p className="text-3d text-sm tracking-wide">YOUR BALANCE</p>
            <p className="font-display text-5xl leading-none text-gold-grad">5,680 <span className="text-2xl">IQ</span></p>
            <p className="mt-1.5 inline-block rounded-full border border-crystal/40 bg-background/60 px-3 py-0.5 text-sm text-ice/90">≈ $0.56 (0.59 TON)</p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-3 gap-3 pt-2">
        {[
          { l: "Earn", img: icEarn },
          { l: "Withdraw", img: icWallet },
          { l: "Invite", img: icInvite },
        ].map(({ l, img }) => (
          <button key={l} className="stone snow-cap relative flex flex-col items-center gap-1 rounded-2xl pb-2 pt-3">
            <img src={img} alt="" width={64} height={64} className="h-16 w-16 animate-floaty object-contain drop-shadow-[0_6px_6px_oklch(0_0_0/0.6)]" />
            <span className="text-3d text-lg leading-none">{l}</span>
          </button>
        ))}
      </section>

      {/* Streak */}
      <section className="ice-panel p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-3d flex items-center gap-1 text-lg"><Flame size={18} className="text-gold" fill="currentColor" /> Daily Streak</h2>
          <span className="font-display text-gold">7 Days</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {streak.map((v, i) => {
            const done = i < 3, last = i === 6;
            return (
              <div key={i} className={`flex flex-col items-center gap-1 ice-tile py-1 ${last ? "!border-gold" : ""} ${done ? "!border-cyan" : ""}`}>
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
          <button className="btn-ice snow-cap mt-4 px-7 py-2 text-xl">Play Now</button>
        </div>
      </section>
    </>
  );
}

function MiniCard({ img, title, sub, cta, to, spin }: { img: string; title: string; sub: string; cta: string; to?: "/tasks"; spin?: boolean }) {
  const btn = "btn-ice snow-cap block w-full py-1.5 text-center text-lg";
  return (
    <div className="ice-panel snow-cap p-3">
      <div className="flex items-center gap-2">
        <img src={img} alt="" className={`h-12 w-12 shrink-0 object-contain ${spin ? "animate-[spin_12s_linear_infinite]" : ""}`} />
        <div className="min-w-0">
          <p className="text-3d truncate">{title}</p>
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
      <img src={lantern} alt="" width={28} height={42} className="h-11 w-auto drop-shadow-[0_0_14px_var(--gold)] animate-shimmer" />
    </div>
  );
}

