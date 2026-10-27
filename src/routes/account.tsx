import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Users, ReceiptText, Gift, Trophy, Settings, HelpCircle, ChevronRight, LogOut, Pencil, Flame } from "lucide-react";
import { Avatar, XpBar } from "@/components/snow/Shell";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Player Profile — SnowQuest" },
      { name: "description", content: "Your SnowQuest profile, stats, wallet, referrals and achievements." },
      { property: "og:title", content: "Player Profile — SnowQuest" },
      { property: "og:description", content: "Your profile, stats, wallet and achievements." },
    ],
  }),
  component: Account,
});

const rows = [
  { t: "Wallet", s: "Balance & Withdrawal", I: Wallet, g: "from-cyan to-primary" },
  { t: "My Referrals", s: "Invite Friends & Earn", I: Users, g: "from-primary to-frost" },
  { t: "Transaction History", s: "View All Transactions", I: ReceiptText, g: "from-royal to-[oklch(0.4_0.2_290)]" },
  { t: "Promo Code", s: "Redeem Promo Code", I: Gift, g: "from-destructive to-[oklch(0.45_0.2_15)]" },
  { t: "Achievements", s: "Your Badges & Progress", I: Trophy, g: "from-gold to-[oklch(0.65_0.17_50)]" },
  { t: "Settings", s: "App Settings", I: Settings, g: "from-primary to-[oklch(0.4_0.15_255)]" },
  { t: "Help & Support", s: "Get Help", I: HelpCircle, g: "from-cyan to-frost" },
];

function Account() {
  return (
    <>
      <section className="ice-panel snow-cap p-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Avatar size={76} />
          <div className="min-w-0">
            <p className="truncate font-display text-xl">Snow Explorer</p>
            <p className="truncate text-sm text-crystal">@snowquest_user</p>
            <p className="text-xs text-ice/75">Player ID: 123456789</p>
          </div>
          <button aria-label="Edit profile" className="btn-ice grid h-10 w-10 place-items-center"><Pencil size={18} /></button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex shrink-0 items-center gap-1 font-display text-gold"><Flame size={16} fill="currentColor" /> Lv. 12</span>
          <XpBar className="flex-1" />
          <span className="text-xs">380/1000</span>
        </div>
      </section>

      <section className="ice-panel grid grid-cols-3 divide-x divide-frost/60 py-3 text-center">
        {[["Total Earned", "25,680 IQ"], ["Friends", "128"], ["Rank", "#124"]].map(([l, v]) => (
          <div key={l}><p className="text-xs text-ice/75">{l}</p><p className="font-display text-xl">{v}</p></div>
        ))}
      </section>

      <div className="space-y-2">
        {rows.map(({ t, s, I, g }) => (
          <button key={t} className="ice-panel grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-2.5 text-left active:scale-[0.98]">
            <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${g} shadow-[var(--glow-cyan)]`}><I size={22} /></span>
            <span className="min-w-0"><span className="block truncate font-display">{t}</span><span className="block truncate text-xs text-ice/75">{s}</span></span>
            <ChevronRight className="text-crystal" />
          </button>
        ))}
      </div>

      <button className="mx-auto flex w-3/4 items-center justify-center gap-2 rounded-xl border-2 border-destructive bg-destructive/20 py-3 font-display text-lg text-destructive shadow-[0_0_14px_color-mix(in_oklab,var(--destructive)_50%,transparent)] active:scale-95">
        <LogOut size={20} /> Logout
      </button>
    </>
  );
}
