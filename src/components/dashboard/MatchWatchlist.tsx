import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface Match {
  initials: string;
  name: string;
  meta: string;
  from: string;
  to: string;
  score: number;
}

const matches: Match[] = [
  { initials: 'MF', name: 'Mateo Fernández', meta: 'RW · 19 · River Plate', from: 'River Plate', to: 'Real Madrid', score: 94 },
  { initials: 'AO', name: 'Adaeze Okafor', meta: 'ST · 21 · Enyimba FC', from: 'Enyimba FC', to: 'Chelsea', score: 91 },
  { initials: 'LS', name: 'Lucas Santos', meta: 'CM · 20 · Flamengo', from: 'Flamengo', to: 'FC Barcelona', score: 88 },
  { initials: 'JB', name: 'Jonas Berg', meta: 'CB · 22 · FC Midtjylland', from: 'Midtjylland', to: 'AC Milan', score: 84 },
];

function ScoreRing({ score }: { score: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="stroke-muted" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="stroke-primary"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-foreground">
        {score}
      </span>
    </div>
  );
}

export function MatchWatchlist() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          Top AI Matches
        </h3>
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Updated today
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Highest fit scores across your tracked players and open club briefs.
      </p>

      <div className="space-y-3 flex-1">
        {matches.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{m.meta}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="truncate">{m.from}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate font-medium text-foreground">{m.to}</span>
              </p>
            </div>
            <ScoreRing score={m.score} />
          </div>
        ))}
      </div>
    </div>
  );
}
