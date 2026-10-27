import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, Settings, Plus, Crown, Home, ListChecks, Trophy, User } from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import crystal from "@/assets/crystal.png";
import bg from "@/assets/bg.jpg";
import village from "@/assets/village.jpg";

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
    <div className={`relative h-3 rounded-full border border-frost bg-background/80 ${className}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan shadow-[var(--glow-cyan)]" style={{ width: `${(value / max) * 100}%` }} />
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
    <button aria-label={label} className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-crystal/70 bg-deep shadow-[var(--glow-cyan)] active:scale-95">
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
          <p className="truncate font-display text-lg leading-tight">Snow Explorer</p>
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
  { to: "/", label: "Home", icon: Home },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/games", label: "Games", icon: null },
  { to: "/events", label: "Events", icon: Trophy },
  { to: "/account", label: "Account", icon: User },
] as const;

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] px-2 pb-[max(env(safe-area-inset-bottom),8px)]">
      <div className="ice-panel snow-cap grid grid-cols-5 items-end bg-background/85 px-1 pb-1.5 pt-2 backdrop-blur-md">
        {tabs.map((t) => (
          <Link key={t.to} to={t.to} activeOptions={{ exact: true }}
            className="group flex flex-col items-center gap-0.5 text-xs text-ice/80 data-[status=active]:text-cyan">
            {t.icon ? (
              <t.icon size={24} className="transition group-data-[status=active]:drop-shadow-[0_0_8px_var(--cyan)]" />
            ) : (
              <span className="-mt-9 grid h-16 w-16 place-items-center rounded-full border-2 border-crystal bg-deep shadow-[var(--glow-cyan)]">
                <img src={crystal} alt="" className="h-12 w-12 animate-shimmer object-contain" />
              </span>
            )}
            <span className="font-medium group-data-[status=active]:underline group-data-[status=active]:underline-offset-4">{t.label}</span>
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
      <div className="mx-auto max-w-[480px] pb-28">
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
  return <span className="flex items-center gap-1 font-display text-gold"><span className="h-3 w-3 rounded-full bg-gold shadow-[0_0_6px_var(--gold)]" />{v} {unit}</span>;
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
