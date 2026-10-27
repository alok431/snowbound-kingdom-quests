import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, Settings, Plus, Crown } from "lucide-react";
import icHome from "@/assets/ic-home.png";
import icTasks from "@/assets/ic-tasks.png";
import icEvents from "@/assets/ic-events.png";
import icAccount from "@/assets/ic-account.png";
import avatar from "@/assets/avatar.jpg";
import crystal from "@/assets/crystal.png";
import bg from "@/assets/bg.jpg";
import village from "@/assets/village.jpg";
import iceCube from "@/assets/ice-cube.png";

export const IMG = { avatar, crystal };

function Snowfall() {
  const [flakes, setFlakes] = useState<{ l: number; d: number; s: number; delay: number; o: number }[]>([]);
  useEffect(() => {
    setFlakes(Array.from({ length: 40 }, () => ({
      l: Math.random() * 100, d: 7 + Math.random() * 10, s: 2 + Math.random() * 4,
      delay: -Math.random() * 15, o: 0.4 + Math.random() * 0.6,
    })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {flakes.map((f, i) => (
        <span key={i} className="absolute top-0 rounded-full bg-ice"
          style={{ left: `${f.l}%`, width: f.s, height: f.s, opacity: f.o,
            animation: `snowfall ${f.d}s linear ${f.delay}s infinite` }} />
      ))}
    </div>
  );
}

export function XpBar({ value = 380, max = 1000, className = "" }: { value?: number; max?: number; className?: string }) {
  return (
    <div className={`relative h-3.5 rounded-full border-2 border-crystal/80 bg-background/90 p-[1px] shadow-[0_2px_0_var(--ice-depth-dark),inset_0_2px_4px_oklch(0_0_0/0.6)] ${className}`}>
      <div className="h-full rounded-full bg-[linear-gradient(180deg,oklch(1_0_0/0.6),transparent_50%),linear-gradient(90deg,var(--royal),var(--cyan))] shadow-[0_0_8px_var(--cyan)] transition-[width] duration-1000" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

export function Avatar({ size = 56, src = avatar }: { size?: number; src?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <img src={src} alt="Player avatar" width={size} height={size}
        className="h-full w-full rounded-full border-2 border-crystal object-cover shadow-[var(--glow-cyan)]" />
    </div>
  );
}

function IconBtn({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="ice-tile grid h-10 w-10 shrink-0 place-items-center">
      {children}
    </button>
  );
}

export function Header() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 pt-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative">
          <Avatar size={58} />
          <span className="absolute -bottom-0.5 -left-0.5 grid h-5 w-5 place-items-center rounded-full border border-ice bg-primary"><Plus size={12} strokeWidth={3} /></span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-3d truncate text-lg leading-tight">Snow Explorer</p>
          <p className="flex items-center gap-1 text-sm text-gold"><Crown size={13} fill="currentColor" /> Lv. 12</p>
          <div className="mt-1 flex items-center gap-2">
            <XpBar className="flex-1" />
            <span className="shrink-0 text-xs text-ice/90">380/1000</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <IconBtn label="Notifications"><Bell size={18} className="text-gold" fill="currentColor" /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-destructive" /></IconBtn>
        <IconBtn label="Settings"><Settings size={18} className="text-crystal" /></IconBtn>
      </div>
    </header>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: icHome },
  { to: "/tasks", label: "Tasks", icon: icTasks },
  { to: "/games", label: "Games", icon: null },
  { to: "/events", label: "Events", icon: icEvents },
  { to: "/account", label: "Account", icon: icAccount },
] as const;

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] px-2 pb-[max(env(safe-area-inset-bottom),8px)]">
      <div className="ice-panel snow-cap snow-thin relative grid grid-cols-5 items-end !bg-background/85 px-1 pb-1.5 pt-2 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="animate-dock absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-crystal/25 to-transparent" />
        </div>
        {tabs.map((t) => (
          <Link key={t.to} to={t.to} activeOptions={{ exact: true }}
            className="group relative flex flex-col items-center outline-none focus-visible:[&>span:first-child]:ring-2 focus-visible:[&>span:first-child]:ring-cyan rounded-xl gap-0.5 text-xs text-ice/75 data-[status=active]:text-cyan">
            {t.icon ? (
              <span className="relative grid h-10 w-10 place-items-center transition-transform duration-300 group-data-[status=active]:-translate-y-2 group-data-[status=active]:animate-[rise_.5s_ease-out]">
                <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_20px_6px_var(--cyan)] transition group-data-[status=active]:opacity-60" />
                <img src={t.icon} alt="" width={40} height={40} className="relative h-10 w-10 object-contain drop-shadow-[0_3px_3px_oklch(0_0_0/0.7)] grayscale-[35%] group-data-[status=active]:grayscale-0" />
              </span>
            ) : (
              <span className="cube-medallion -mt-7 grid h-[60px] w-[60px] animate-floaty place-items-center">
                <img src={iceCube} alt="" width={52} height={52} className="relative h-[52px] w-[52px] object-contain transition-transform duration-300 group-data-[status=active]:scale-105" />
              </span>
            )}
            <span className="font-display tracking-wide group-data-[status=active]:[text-shadow:0_0_8px_var(--cyan)]">{t.label}</span>
            <span className="h-1 w-5 rounded-full bg-cyan opacity-0 shadow-[0_0_8px_var(--cyan)] group-data-[status=active]:opacity-100" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <img src={bg} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>
      <Snowfall />
      <div className="mx-auto max-w-[480px] pb-36">
        <div className="relative h-20 overflow-hidden">
          <img src={village} alt="" className="h-full w-full object-cover object-[70%_40%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute left-4 top-3 flex items-center gap-1.5">
            <img src={crystal} alt="" className="h-8 w-8 animate-shimmer" />
            <div>
              <p className="font-display text-xl leading-none text-ice text-glow">SNOWQUEST</p>
              <p className="text-[9px] tracking-[0.25em] text-crystal">PLAY · EXPLORE · EARN</p>
            </div>
          </div>
        </div>
        <div className="-mt-4"><Header /></div>
        <main key={path} className="animate-page space-y-4 px-4 pt-4">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}

export function Reward({ v, unit = "IQ" }: { v: string | number; unit?: string }) {
  return <span className="flex items-center gap-1 font-display text-gold"><span className="h-3.5 w-3.5 rounded-full border border-[oklch(0.95_0.08_90)] bg-[radial-gradient(circle_at_35%_30%,oklch(0.98_0.08_95),var(--gold)_55%,oklch(0.55_0.14_55))] shadow-[0_1px_0_oklch(0.35_0.08_50),0_0_6px_var(--gold)]" />{v} {unit}</span>;
}

export function Chips({ items, active, onChange }: { items: string[]; active: string; onChange: (s: string) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {items.map((c) => (
        <button key={c} data-active={c === active} onClick={() => onChange(c)} className="chip shrink-0 px-3.5 py-1.5 text-sm">{c}</button>
      ))}
    </div>
  );
}
