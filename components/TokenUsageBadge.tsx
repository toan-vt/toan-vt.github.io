import React, { useEffect, useMemo, useRef, useState } from 'react';

// Built and deployed by the token-usage repo on every upload; fetched at runtime so this site
// never needs a commit when usage changes. GitHub Pages serves it with CORS * and a 10 min cache.
const DATA_URL = 'https://toan-vt.github.io/token-usage/data/daily.json';
const DAY_MS = 86400000;
const BAR_H = 52; // px; tallest day of the week

// Dashboard blue, lifted for contrast on the navy banner (7.6:1); today is partial, so lighter.
const BAR = '#86b6ef';
const BAR_TODAY = '#cde2fb';

type Day = { input: number; output: number; cache_write: number; cache_read: number };
type UsageDoc = { generated_at: string; tz: string; hosts: Record<string, string>; days: Record<string, Day> };

const total = (d?: Day) => (d ? d.input + d.output + d.cache_write + d.cache_read : 0);
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 3 });
const fmt = (n: number) => compact.format(n);
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const utc = (s: string) => Date.parse(s + 'T00:00:00Z');
const label = (s: string) =>
  new Date(utc(s)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function ago(when: string): string {
  const min = Math.max(0, Math.round((Date.now() - Date.parse(when)) / 60000));
  if (min < 60) return `${min} min ago`;
  if (min < 48 * 60) return `${Math.round(min / 60)} h ago`;
  return `${Math.round(min / 1440)} days ago`;
}

interface Props {
  onOpen: () => void;
}

export const TokenUsageBadge: React.FC<Props> = ({ onOpen }) => {
  const [doc, setDoc] = useState<UsageDoc | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [roomy, setRoomy] = useState(true); // banner wide enough for the calendar
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch(DATA_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d?.days && setDoc(d))
      .catch(() => {}); // widget simply stays hidden
    return () => {
      alive = false;
    };
  }, []);

  // Windows are resizable, so size to the banner rather than the viewport.
  useEffect(() => {
    const banner = ref.current?.parentElement;
    if (!banner || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setRoomy(e.contentRect.width >= 560));
    ro.observe(banner);
    return () => ro.disconnect();
  }, [doc]);

  const view = useMemo(() => {
    if (!doc) return null;
    const keys = Object.keys(doc.days).sort();
    const nz = keys.map((k) => total(doc.days[k])).filter((v) => v > 0);
    if (!nz.length) return null;

    // Last 7 days ending today, in the dashboard's time zone (days in the JSON are local days).
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: doc.tz || 'America/New_York' }).format(new Date());
    const week = Array.from({ length: 7 }, (_, i) => {
      const t = utc(today) - (6 - i) * DAY_MS;
      const date = iso(t);
      return { date, tokens: total(doc.days[date]), dow: 'SMTWTFS'[new Date(t).getUTCDay()], today: i === 6 };
    });
    const peak = Math.max(1, ...week.map((d) => d.tokens));

    return {
      week: week.map((d) => ({ ...d, h: d.tokens ? Math.max(3, Math.round((d.tokens / peak) * BAR_H)) : 0 })),
      weekSum: week.reduce((a, d) => a + d.tokens, 0),
      sum: nz.reduce((a, b) => a + b, 0),
      active: nz.length,
      machines: Object.keys(doc.hosts || {}).length,
      since: label(keys[0]),
      fresh: Date.now() - Date.parse(doc.generated_at) < 6 * 3600000,
    };
  }, [doc]);

  if (!doc || !view) return null;

  const status = hover
    ? `${label(hover)} · ${total(doc.days[hover]) ? fmt(total(doc.days[hover])) + ' tokens' : 'no usage'}`
    : `${fmt(view.weekSum)} in the last 7 days`;

  const dot = (
    <span className="relative flex w-2 h-2 shrink-0">
      {view.fresh && <span className="absolute inset-0 rounded-full bg-[#4ade80] opacity-75 motion-safe:animate-ping" />}
      <span className={`relative w-2 h-2 rounded-full ${view.fresh ? 'bg-[#4ade80]' : 'bg-gray-400'}`} />
    </span>
  );

  const aria = `LLM token usage: ${fmt(view.sum)} tokens over ${view.active} active days since ${view.since}. Open the dashboard.`;
  const tip =
    `LLM tokens since ${view.since}: ${view.active} active days on ${view.machines} ` +
    `machine${view.machines === 1 ? '' : 's'}, synced automatically (updated ${ago(doc.generated_at)}). ` +
    `Click for the full dashboard.`;

  return (
    <div ref={ref} className="w-full md:w-auto md:ml-auto shrink-0 font-sans">
      {/* Phones: one line under the name. */}
      <button
        onClick={onOpen}
        aria-label={aria}
        className="md:hidden flex items-center gap-2 text-xs text-gray-200 hover:text-white"
      >
        {dot}
        <span>
          <b className="text-white">{fmt(view.sum)}</b> LLM tokens · {fmt(view.weekSum)} last 7 days ›
        </span>
      </button>

      {/* Desktop: number + last-7-days bars, fits inside the banner's avatar height. */}
      <button
        onClick={onOpen}
        title={tip}
        aria-label={aria}
        className="hidden md:flex items-center gap-3 px-2 py-1 border border-transparent hover:border-white/30 hover:bg-white/5 text-left"
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-300">
            {dot}
            LLM tokens
          </div>
          <div className="text-[28px] leading-8 font-bold text-white tabular-nums">{fmt(view.sum)}</div>
          <div className="text-[11px] text-gray-300 whitespace-nowrap tabular-nums min-w-[140px]">{status}</div>
        </div>
        {roomy && (
          <div className="flex items-end" aria-hidden="true">
            {view.week.map((d) => (
              // Whole column is the hover target, wider and taller than the bar itself.
              <div
                key={d.date}
                onMouseEnter={() => setHover(d.date)}
                className="flex flex-col items-center gap-1 px-[2px]"
              >
                <div className="flex items-end" style={{ height: BAR_H }}>
                  <div
                    className="w-[10px] rounded-t-[2px]"
                    style={{
                      height: d.h || 2,
                      background: d.h ? (d.today ? BAR_TODAY : BAR) : 'rgba(255,255,255,0.18)',
                      outline: hover === d.date ? '1px solid #fff' : undefined,
                      outlineOffset: 1,
                    }}
                  />
                </div>
                <div className={`text-[9px] leading-none ${d.today ? 'text-white font-bold' : 'text-gray-400'}`}>
                  {d.dow}
                </div>
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
