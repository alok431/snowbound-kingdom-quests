import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Timer } from "lucide-react";
import trophy from "@/assets/trophy.png";
import snowmobile from "@/assets/snowmobile.png";
import gifts from "@/assets/gifts.png";
import avatar from "@/assets/avatar.jpg";
import warrior from "@/assets/warrior.jpg";
import { Chips } from "@/components/snow/Shell";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Ice Tournament — SnowQuest" },
      { name: "description", content: "Climb the Ice Leaderboard, join the Snow Race and win the Invite Contest." },
      { property: "og:title", content: "Ice Tournament — SnowQuest" },
      { property: "og:description", content: "Leaderboards, races and contests in the frozen kingdom." },
    ],
  }),
  component: Events,
});

const players = [
  ["SnowKing", "2,580", "5 TON"], ["IceQueen", "1,980", "3 TON"], ["FrostDragon", "1,650", "1 TON"],
  ["GlacierX", "1,320", "500 IQ"], ["PolarMaster", "1,100", "500 IQ"],
];
const rankStyle = ["bg-gold text-background", "bg-[oklch(0.82_0.02_250)] text-background", "bg-[oklch(0.65_0.13_50)] text-background"];

function Countdown({ t }: { t: string }) {
  return <span className="inline-flex items-center gap-1 rounded-md bg-background/70 px-2 py-0.5 font-display text-gold"><Timer size={14} /> {t}</span>;
}

function Events() {
  const [cat, setCat] = useState("Leaderboard");
  return (
    <>
      <Chips items={["Leaderboard", "Contests", "Special", "History"]} active={cat} onChange={setCat} />
      <section className="ice-panel snow-cap overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary/40 to-royal/30 p-4">
          <p className="font-display text-2xl text-ice text-glow">ICE LEADERBOARD</p>
          <p className="text-sm text-crystal">Top Players Win Huge Rewards</p>
          <div className="mt-2"><Countdown t="6D 12H 30M" /></div>
          <img src={trophy} alt="Trophy" className="absolute -top-1 right-2 h-28 w-28 animate-floaty object-contain" />
        </div>
        <div className="grid grid-cols-[28px_minmax(0,1fr)_auto_64px] gap-2 px-3 pt-2 text-xs text-ice/70">
          <span>#</span><span>Player</span><span>Invites / IQ</span><span className="text-right">Reward</span>
        </div>
        <ul className="space-y-1 p-2">
          {players.map(([n, s, r], i) => (
            <li key={n} className="grid grid-cols-[28px_minmax(0,1fr)_auto_64px] items-center gap-2 rounded-lg border border-frost/50 bg-background/50 px-1.5 py-1.5">
              <span className={`grid h-6 w-6 place-items-center rounded-full font-display text-sm ${rankStyle[i] ?? "bg-deep"}`}>{i + 1}</span>
              <span className="flex min-w-0 items-center gap-2">
                <img src={i % 2 ? avatar : warrior} alt="" className="h-7 w-7 shrink-0 rounded-full border border-crystal object-cover" />
                <span className="truncate text-sm">{n}</span>
              </span>
              <span className="text-sm">{s}</span>
              <span className="text-right font-display text-gold">{r}</span>
            </li>
          ))}
        </ul>
        <div className="p-3 pt-0"><button className="btn-ice w-full py-2">View Full Leaderboard</button></div>
      </section>

      <Promo title="SNOW RACE EVENT" sub="Race · Play · Earn" time="3D 08H 20M" cta="Join Now" img={snowmobile} />
      <Promo title="INVITE CONTEST" sub="Invite Friends & Earn Extra" time="5D 06H 40M" cta="Invite Now" img={gifts} purple />
    </>
  );
}

function Promo({ title, sub, time, cta, img, purple }: { title: string; sub: string; time: string; cta: string; img: string; purple?: boolean }) {
  return (
    <section className={`ice-panel snow-cap relative overflow-hidden p-4 ${purple ? "bg-gradient-to-r from-deep to-royal/50" : "bg-gradient-to-r from-deep to-primary/40"}`}>
      <div className="relative z-[1] max-w-[62%] space-y-1.5">
        <p className="font-display text-xl leading-tight text-ice">{title}</p>
        <p className="text-sm text-cyan">{sub}</p>
        <Countdown t={time} />
        <div><button className="btn-ice mt-1 px-5 py-1.5">{cta}</button></div>
      </div>
      <img src={img} alt="" className="absolute -right-2 bottom-0 h-36 w-36 animate-floaty object-contain" />
    </section>
  );
}
