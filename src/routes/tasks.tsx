import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Globe, Send, Gamepad2, ClipboardList, Gift } from "lucide-react";
import chest from "@/assets/chest.png";
import { Chips, Reward } from "@/components/snow/Shell";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Quest Center — SnowQuest" },
      { name: "description", content: "Complete daily quests, offers and promo codes to earn IQ in SnowQuest." },
      { property: "og:title", content: "Quest Center — SnowQuest" },
      { property: "og:description", content: "Complete daily quests and offers to earn IQ." },
    ],
  }),
  component: Tasks,
});

const XIcon = (p: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={p.size} height={p.size} fill="currentColor"><path d="M17.5 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.6 3h6.4l4.4 5.9L17.5 3Zm-1.1 16.2h1.7L7.2 4.7H5.4l11 14.5Z" /></svg>
);

const tasks = [
  { t: "Watch Ad", d: "Watch 30 sec video", r: 50, I: Play, c: "Watch", g: "from-royal to-primary" },
  { t: "Visit Website", d: "Explore for 30 sec", r: 80, I: Globe, c: "Offers", g: "from-primary to-frost" },
  { t: "Join Telegram", d: "Join our channel", r: 100, I: Send, c: "Follow", g: "from-cyan to-primary" },
  { t: "Follow on X", d: "Follow our page", r: 100, I: XIcon, c: "Follow", g: "from-deep to-background" },
  { t: "Play Game", d: "Play 2 minutes", r: 150, I: Gamepad2, c: "Daily", g: "from-royal to-[oklch(0.4_0.2_290)]" },
  { t: "Complete Survey", d: "Answer survey", r: 200, I: ClipboardList, c: "Offers", g: "from-royal to-primary" },
];

function Tasks() {
  const [cat, setCat] = useState("All");
  const list = tasks.filter((t) => cat === "All" || t.c === cat || (cat === "Daily" && t.c !== "Offers"));
  return (
    <>
      <Chips items={["All", "Daily", "Offers", "Watch", "Follow"]} active={cat} onChange={setCat} />
      <div className="space-y-2.5">
        {list.map(({ t, d, r, I, g }) => (
          <div key={t} className="ice-panel grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 p-2.5">
            <span className={`grid h-12 w-12 place-items-center rounded-xl border border-crystal/60 bg-gradient-to-br ${g} shadow-[var(--glow-cyan)]`}><I size={24} /></span>
            <div className="min-w-0">
              <p className="truncate font-display">{t}</p>
              <p className="truncate text-xs text-ice/75">{d}</p>
            </div>
            <Reward v={r} />
            <button className="btn-ice px-3 py-1.5">Start</button>
          </div>
        ))}
      </div>

      <section className="ice-panel snow-cap relative overflow-hidden border-royal bg-gradient-to-r from-royal/70 via-[oklch(0.3_0.15_280)] to-primary/60 p-4">
        <div className="relative z-[1] max-w-[60%]">
          <p className="font-display text-gold">SPECIAL OFFERS</p>
          <p className="font-display text-3xl leading-tight text-gold-grad">3X REWARDS</p>
          <p className="font-display text-ice">Limited Time Only!</p>
        </div>
        <img src={chest} alt="Treasure chest" className="absolute -right-2 bottom-0 h-32 w-32 animate-floaty object-contain" />
      </section>

      <section className="ice-panel p-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan to-primary"><Gift size={26} /></span>
          <div><p className="font-display text-lg">Promo Code</p><p className="text-xs text-ice/75">Enter promo code to get bonus</p></div>
        </div>
        <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Enter code here" className="min-w-0 flex-1 rounded-lg border border-frost bg-background/80 px-3 py-2 text-sm outline-none focus:border-cyan" />
          <button className="btn-ice px-4">Redeem</button>
        </form>
      </section>
    </>
  );
}
