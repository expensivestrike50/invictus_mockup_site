import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import demoVideo from '@/assets/demo-video.mp4';
import demoVideoPoster from '@/assets/demo-video-poster.jpg';

const stepsData = [
  {
    number: '01',
    title: 'Log the Club Request',
    description: 'Capture what a sporting director needs in one place, from position and profile to budget and timeline.',
  },
  {
    number: '02',
    title: 'Let AI Automate Decisions',
    description: 'Invictus automates the scoring, ranking, and next move using your integrated performance data.',
  },
  {
    number: '03',
    title: 'Send the Agency Report',
    description: 'Export a club-ready PDF explaining why the talent is the right match, and track the reply.',
  },
];

interface HowItWorksProps extends React.ComponentProps<'section'> {}

const HowItWorks = ({ className, ...props }: HowItWorksProps) => {
  const cardsStackRef = useRef<HTMLDivElement>(null);
  const [cardsHeight, setCardsHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = cardsStackRef.current;
    if (!el) return;

    const measure = () => setCardsHeight(el.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        'py-32 px-10 max-lg:py-24 max-md:py-24 max-md:px-6 max-xs:py-20 max-xs:px-5',
        className
      )}
      {...props}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center mb-16 max-md:mb-12">
          <span className="text-xs tracking-[1px] uppercase font-semibold">
            How It Works
          </span>
          <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
            From Request to Signature
          </h2>
          <div className="w-full">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
              Three steps replace the scattered calls, voice notes, and email chains between agents, players, and sporting directors.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-start w-full gap-10 xl:gap-16 max-lg:flex-col max-lg:items-center max-lg:gap-8">
          <div className="shrink-0 max-lg:w-full">
            <div
              className="relative aspect-[1440/824] w-auto h-[var(--cards-h,470px)] overflow-hidden rounded-[40px] max-lg:!w-full max-lg:!h-auto"
              style={{ '--cards-h': cardsHeight ? `${cardsHeight}px` : undefined } as React.CSSProperties}
            >
              <video
                src={demoVideo}
                poster={demoVideoPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Invictus product demo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-fit max-w-full relative">
            <div className="flex flex-col items-end gap-6 2xl:gap-8">
              <div ref={cardsStackRef} className="flex flex-col gap-5 2xl:gap-8 max-md:gap-3">
                {stepsData.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-start items-start w-fit max-w-full bg-[hsl(var(--brand-beige))] border border-border rounded-[24px] p-4 xl:p-5 2xl:p-6 max-lg:p-6 max-xs:rounded-[20px] max-xs:p-4 gap-2"
                  >
                    <div className="flex justify-start items-center gap-3 max-xs:flex-col max-xs:items-start max-xs:gap-2">
                      <div className="flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 max-md:w-9 max-md:h-9 max-xs:w-8 max-xs:h-8 bg-primary text-primary-foreground rounded-full text-base xl:text-lg max-md:text-sm max-xs:text-sm font-semibold leading-none flex-shrink-0">
                        {step.number}
                      </div>
                      <h3 className="text-xl xl:text-[1.375rem] max-xs:text-lg font-bold leading-none m-0">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-base max-xs:text-sm leading-[1.4] text-muted-foreground m-0 font-normal max-w-[26rem]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="invofy" size="invofy" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
