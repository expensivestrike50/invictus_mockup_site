const stages = [
  { label: 'Scouted', count: 24, color: 'bg-[#93C5FD]' },
  { label: 'Contacted', count: 14, color: 'bg-[#60A5FA]' },
  { label: 'In Talks', count: 8, color: 'bg-[#2563EB]' },
  { label: 'Offer on Table', count: 3, color: 'bg-[#F59E0B]' },
  { label: 'Closed', count: 5, color: 'bg-[#34D399]' },
];

const max = Math.max(...stages.map((s) => s.count));

export function DealPipeline() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">Transfer Pipeline</h3>
        <span className="text-[11px] text-muted-foreground">This window</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Where every deal stands, from first scout report to signed.
      </p>
      <div className="grid gap-4 sm:grid-cols-5">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">{s.label}</span>
              <span className="text-sm font-bold text-foreground">{s.count}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`${s.color} h-full rounded-full`}
                style={{ width: `${(s.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
