import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import waveBg from '@/assets/wave-bg.png';

import featureIcon01 from '@/assets/icons/feature-icon-01.png';
import featureIcon02 from '@/assets/icons/feature-icon-02.png';
import featureIcon03 from '@/assets/icons/feature-icon-03.png';
import featureIcon04 from '@/assets/icons/feature-icon-04.png';
import featureIcon05 from '@/assets/icons/feature-icon-05.png';

const featuresData = [
  {
    icon: featureIcon01,
    title: 'AI Match Scoring',
    description: 'Embedded AI ranks your players against each club request and explains why.',
  },
  {
    icon: featureIcon02,
    title: 'Agency Reports',
    description: 'Export a polished PDF arguing why a talent fits a specific club brief.',
  },
  {
    icon: featureIcon03,
    title: 'Live Player Data',
    description: 'Integrated match and performance statistics on every profile you manage.',
  },
  {
    icon: featureIcon04,
    title: 'Shortlists & Pipeline',
    description: 'Update your roster, build shortlists, and track every deal to signature.',
  },
  {
    icon: featureIcon05,
    title: 'Club Relationships',
    description: 'Move sporting directors, scouts, and clubs out of WhatsApp and into one shared thread.',
  },
];

interface FeaturesProps extends React.ComponentProps<'section'> {}

const Features = ({ className, ...props }: FeaturesProps) => {
  return (
    <section className={cn('px-5 md:px-10 max-xs:px-5', className)} {...props}>
      <div className="max-w-[100rem] mx-auto">
        <div className="relative bg-[hsl(var(--brand-beige))] rounded-[4rem] max-xs:rounded-[3rem] overflow-hidden">
          <img
            src={waveBg}
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-20 z-[1] pointer-events-none"
          />

          <div className="relative z-[2] py-32 max-lg:py-24 max-xs:py-20">
            <div className="flex flex-col gap-8 px-12 max-lg:px-10 max-md:px-8 max-xs:px-4">
              <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center">
                <span className="text-xs tracking-[1px] uppercase font-semibold">
                  Complete Control
                </span>
                <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
                  Everything Your Agency Runs On
                </h2>
                <div className="w-full">
                  <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
                    From AI match scoring to statistical profiles and exportable agency reports, Invictus gives you full control over every player, club, and conversation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1 gap-6">
                {featuresData.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-[30px] p-8 flex flex-col gap-6"
                  >
                    <img src={feature.icon} alt="" width={40} height={40} loading="lazy" decoding="async" className="w-10 h-10" />
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl leading-[1.4] font-bold">{feature.title}</h3>
                      <p className="text-lg leading-[1.4] text-muted-foreground w-[90%] font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  className="rounded-[30px] p-8 flex flex-col justify-between gap-6 bg-cover bg-center border border-brand-beige-deep"
                  style={{
                    backgroundImage:
                      'radial-gradient(120% 120% at 0% 0%, hsl(var(--brand-beige-light)) 0%, hsl(var(--brand-beige)) 55%, hsl(var(--brand-beige-deep)) 100%)',
                  }}
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl leading-[1.4] font-bold">Start Matching</h3>
                    <p className="text-lg leading-[1.4] w-[90%] font-normal">
                      Build your first shortlist and send a club-ready report in minutes.
                    </p>
                  </div>
                  <div>
                    <Button variant="invofy" size="invofy" asChild>
                      <Link to="/reports">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
