import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link2, RefreshCw, Brain, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const featureIcons = [Link2, RefreshCw, Brain, Search, Users];

const HOLD_MS = 6500;

interface SignalsProps extends React.ComponentProps<'section'> {}

const ContextDiagram = () => (
  <svg viewBox="0 0 320 260" className="w-full h-full max-w-[22rem]" role="img" aria-label="Diagram of connected touchpoints feeding one shared record">
    <g stroke="hsl(var(--brand-ink))" strokeOpacity="0.25" strokeWidth="1.5">
      <line x1="160" y1="130" x2="60" y2="60" />
      <line x1="160" y1="130" x2="60" y2="130" />
      <line x1="160" y1="130" x2="60" y2="200" />
      <line x1="160" y1="130" x2="260" y2="60" />
      <line x1="160" y1="130" x2="260" y2="130" />
      <line x1="160" y1="130" x2="260" y2="200" />
    </g>
    <circle cx="160" cy="130" r="22" fill="hsl(var(--brand-blue))" />
    {[[60, 60], [60, 130], [60, 200], [260, 60], [260, 130], [260, 200]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="9" fill="hsl(var(--brand-ink))" fillOpacity="0.85" />
    ))}
  </svg>
);

const AgentsDiagram = () => {
  const points = [0.82, 0.62, 0.9, 0.7, 0.58];
  const center = { x: 160, y: 130 };
  const maxR = 92;
  const toXY = (fraction: number, index: number) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / points.length;
    return [center.x + Math.cos(angle) * maxR * fraction, center.y + Math.sin(angle) * maxR * fraction];
  };
  const path = points.map((p, i) => toXY(p, i)).map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 320 260" className="w-full h-full max-w-[22rem]" role="img" aria-label="Radar chart of player performance metrics">
      <g stroke="hsl(var(--brand-ink))" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
        {[0.4, 0.7, 1].map((r, i) => (
          <circle key={i} cx={center.x} cy={center.y} r={maxR * r} />
        ))}
        {points.map((_, i) => {
          const [x, y] = toXY(1, i);
          return <line key={i} x1={center.x} y1={center.y} x2={x} y2={y} />;
        })}
      </g>
      <path d={path} fill="hsl(var(--brand-blue))" fillOpacity="0.18" stroke="hsl(var(--brand-blue))" strokeWidth="2.5" />
      {points.map((p, i) => {
        const [x, y] = toXY(p, i);
        return <circle key={i} cx={x} cy={y} r="4.5" fill="hsl(var(--brand-blue))" />;
      })}
      <circle cx={center.x} cy={center.y} r="4" fill="hsl(var(--brand-ink))" />
    </svg>
  );
};

const EcosystemDiagram = () => {
  const outer = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 8;
    const r = 96;
    return [160 + Math.cos(angle) * r, 130 + Math.sin(angle) * r];
  });
  return (
    <svg viewBox="0 0 320 260" className="w-full h-full max-w-[22rem]" role="img" aria-label="Map of the wider club and agent network">
      <g stroke="hsl(var(--brand-ink))" strokeOpacity="0.2" strokeWidth="1.5">
        {outer.map(([x, y], i) => (
          <line key={i} x1="160" y1="130" x2={x} y2={y} />
        ))}
      </g>
      <circle cx="160" cy="130" r="20" fill="hsl(var(--brand-ink))" />
      {outer.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 8 : 6} fill="hsl(var(--brand-blue))" fillOpacity={i % 2 === 0 ? 0.9 : 0.55} />
      ))}
    </svg>
  );
};

const diagrams = [ContextDiagram, AgentsDiagram, EcosystemDiagram];

const Signals = ({ className, ...props }: SignalsProps) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const featuresData = featureIcons.map((Icon, index) => ({
    Icon,
    title: t(`signals.features.${index}.title`),
    description: t(`signals.features.${index}.description`),
  }));

  const accordionData = [0, 1, 2].map((index) => ({
    title: t(`signals.accordion.${index}.title`),
    description: t(`signals.accordion.${index}.description`),
  }));

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % accordionData.length);
    }, HOLD_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [accordionData.length, active]);

  const handleSelect = (index: number) => {
    setActive(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const ActiveDiagram = diagrams[active];

  return (
    <section className={cn('px-5 md:px-10 max-xs:px-5 py-32 max-lg:py-24 max-xs:py-20', className)} {...props}>
      <div className="max-w-[100rem] mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-5 max-lg:grid-cols-2 max-xs:grid-cols-1 border border-border rounded-[30px] overflow-hidden bg-card">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'p-8 max-md:p-6 flex flex-col gap-6 border-border',
                'max-lg:border-b lg:[&:not(:last-child)]:border-r',
                index % 2 === 0 ? 'max-lg:max-xs:border-r-0' : ''
              )}
            >
              <feature.Icon className="w-8 h-8 text-foreground/70" strokeWidth={1.5} />
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold leading-[1.4]">{feature.title}</h3>
                <p className="text-sm leading-[1.5] text-muted-foreground max-w-[15rem]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[hsl(var(--brand-beige))] rounded-[4rem] max-xs:rounded-[3rem] overflow-hidden">
          <div className="grid grid-cols-[43%_57%] max-lg:grid-cols-1">
            <div className="flex flex-col justify-between gap-14 max-lg:gap-10 p-14 max-lg:p-10 max-xs:p-6">
              <div className="flex flex-col gap-6 max-w-[30rem]">
                <span className="inline-flex items-center w-fit text-xs tracking-[1px] uppercase font-semibold bg-card border border-border rounded-full px-3 py-1">
                  {t('signals.eyebrow')}
                </span>
                <h2 className="text-[2.75rem] max-lg:text-[2.25rem] max-xs:text-[1.75rem] leading-[1.15] font-bold font-display">
                  {t('signals.title')} <span className="text-muted-foreground">{t('signals.titleAccent')}</span>
                </h2>
                <Link
                  to="/reports"
                  className="inline-flex items-center gap-3 w-fit border border-border rounded-full bg-card px-4 py-2 text-sm font-medium hover:bg-background transition-colors"
                >
                  {t('signals.moreLabel')} <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="flex flex-col">
                {accordionData.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={cn(
                        'w-full text-left border-t border-border py-4 last:border-b transition-colors',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}
                      aria-expanded={isActive}
                    >
                      <span className="text-sm font-semibold tracking-[-0.01em]">{item.title}</span>
                      <div
                        className={cn(
                          'grid transition-[grid-template-rows] duration-300 ease-out',
                          isActive ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm leading-[1.5] text-muted-foreground max-w-[26rem] pb-1">{item.description}</p>
                          <div className="h-px bg-border relative overflow-hidden">
                            <div
                              key={active}
                              className={cn('absolute inset-y-0 left-0 bg-foreground/50', isActive ? 'w-full' : 'w-0')}
                              style={isActive ? { transition: `width ${HOLD_MS}ms linear` } : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative flex items-center justify-center min-h-[24rem] max-lg:min-h-[18rem] p-10">
              <div key={active} className="w-full h-full flex items-center justify-center animate-in fade-in duration-500">
                <ActiveDiagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signals;
