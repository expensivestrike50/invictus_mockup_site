import talentMap from '@/assets/dashboard/talent-map.jpg';
import { cn } from '@/lib/utils';

interface MapPoint {
  x: number; // percent of width
  y: number; // percent of height
  label: string;
  detail: string;
  kind: 'club' | 'talent';
}

const points: MapPoint[] = [
  { x: 49.7, y: 23, label: 'London', detail: 'Chelsea brief: left-footed CB', kind: 'club' },
  { x: 46.8, y: 32.5, label: 'Madrid', detail: 'Real Madrid: U21 winger', kind: 'club' },
  { x: 28.5, y: 30, label: 'Cleveland', detail: 'Agency HQ', kind: 'club' },
  { x: 32, y: 79, label: 'Buenos Aires', detail: 'M. Fernández · 19 · RW', kind: 'talent' },
  { x: 49, y: 51, label: 'Lagos', detail: 'A. Okafor · 21 · ST', kind: 'talent' },
  { x: 34.5, y: 69, label: 'Rio de Janeiro', detail: 'L. Santos · 20 · CM', kind: 'talent' },
];

// Arcs from clubs to talents (in viewBox 100x100 space)
const arcs: Array<[MapPoint, MapPoint]> = [
  [points[0], points[3]], // London -> Buenos Aires
  [points[1], points[5]], // Madrid -> Rio
  [points[2], points[4]], // Cleveland -> Lagos
  [points[0], points[4]], // London -> Lagos
];

function arcPath(a: MapPoint, b: MapPoint) {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 14;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

export function TalentMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#0A0F1A] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Global Talent Map</h3>
          <p className="text-xs text-white/50">Live scouting coverage and active club briefs</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#60A5FA]" /> Club brief
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22D3EE]" /> Tracked talent
          </span>
        </div>
      </div>

      <div className="relative flex-1 min-h-[280px]">
        <img
          src={talentMap}
          alt="Dotted world map showing scouting coverage"
          loading="lazy"
          width={1600}
          height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        {/* Connection arcs */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {arcs.map(([a, b], i) => (
            <path
              key={i}
              d={arcPath(a, b)}
              fill="none"
              stroke="#2563EB"
              strokeOpacity="0.55"
              strokeWidth="0.35"
              strokeDasharray="1.6 1.2"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1.5 }}
            />
          ))}
        </svg>

        {/* Markers */}
        {points.map((p) => (
          <div
            key={p.label}
            className="absolute group"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span
              className={cn(
                'absolute -inset-2 rounded-full animate-ping opacity-40',
                p.kind === 'club' ? 'bg-[#60A5FA]' : 'bg-[#22D3EE]'
              )}
            />
            <span
              className={cn(
                'relative block h-2.5 w-2.5 rounded-full ring-2 ring-[#0A0F1A]',
                p.kind === 'club' ? 'bg-[#60A5FA]' : 'bg-[#22D3EE]'
              )}
            />
            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1.5 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <p className="text-[11px] font-semibold text-white">{p.label}</p>
              <p className="text-[10px] text-white/60">{p.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
        {[
          { value: '14', label: 'Countries covered' },
          { value: '38', label: 'Players tracked' },
          { value: '9', label: 'Open club briefs' },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3">
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
