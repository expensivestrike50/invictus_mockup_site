import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import waveBg from '@/assets/about/wave-bg-values.png';

import valuesImage from '@/assets/about/values-image.jpg';

const valuesData = [
  {
    number: 1,
    title: 'Football First',
    description: 'Every feature is built for agents, players, and sporting directors, designed around how football recruitment actually works.',
  },
  {
    number: 2,
    title: 'Evidence Over Instinct',
    description: 'Every recommendation is backed by integrated performance data and explainable AI, so a pitch to a club is proven, not just claimed.',
  },
  {
    number: 3,
    title: 'One Conversation',
    description: 'We replace scattered WhatsApp threads and email chains with a single shared record that agents, players, and clubs can trust.',
  },
  {
    number: 4,
    title: 'Agent Ownership',
    description: 'Your player lists, reports, and club relationships stay yours, exportable as professional PDF agency reports at any time.',
  },
];

interface ValueCardProps {
  number: number;
  title: string;
  description: string;
}

const ValueCard = ({ number, title, description }: ValueCardProps) => (
  <div className="bg-card border border-border rounded-[30px] p-8 flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl max-[991px]:text-xl leading-[1.4] font-bold">
        {number}. {title}
      </h3>
      <p className="text-base leading-[1.5] text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
);

const AboutValues = () => {
  return (
    <section className="px-10 max-[767px]:px-6 max-[479px]:px-5 pb-32 max-[991px]:pb-24 max-[479px]:pb-20">
      <div className="max-w-[100rem] mx-auto">
        {/* Values Container */}
        <div className="relative bg-[hsl(var(--brand-beige))] rounded-[4rem] max-[479px]:rounded-[3rem] overflow-hidden">
          {/* Wave Background */}
          <img
            src={waveBg}
            alt=""
            width={1920}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-20 z-[1] pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-[2] py-24 max-[991px]:py-20 max-[479px]:py-16">
            <div className="flex flex-col gap-12 px-12 max-[991px]:px-10 max-[767px]:px-8 max-[479px]:px-4">
              {/* Header */}
              <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center">
                <span className="text-xs tracking-[1px] uppercase font-semibold">
                  Our Values
                </span>
                <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] leading-[1.2] font-bold font-display">
                  Principles Behind Everything We Build
                </h2>
                <div className="w-full">
                  <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
                    We believe the best football tools get out of the way, so agents can focus on players and clubs instead of admin.
                  </p>
                </div>
              </div>

              {/* Values Grid - Desktop: 3 columns, Tablet/Mobile: stacked */}
              <div className="grid grid-cols-[1fr_1.3fr_1fr] max-[991px]:grid-cols-1 gap-6">
                {/* Left Column - Cards 1 & 3 */}
                <div className="flex flex-col justify-between gap-4 max-[991px]:hidden">
                  <ValueCard {...valuesData[0]} />
                  <ValueCard {...valuesData[2]} />
                </div>

                {/* Center Column - Image Block */}
                <div className="relative rounded-[30px] overflow-hidden min-h-[500px] max-[991px]:min-h-[400px] max-[479px]:min-h-[350px]">
                  <img
                    src={valuesImage}
                    alt="Football agent reviewing player data on a tablet at the stadium"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right Column - Cards 2 & 4 */}
                <div className="flex flex-col justify-between gap-4 max-[991px]:hidden">
                  <ValueCard {...valuesData[1]} />
                  <ValueCard {...valuesData[3]} />
                </div>

                {/* Tablet/Mobile: 2x2 Grid for cards */}
                <div className="hidden max-[991px]:grid grid-cols-2 max-[767px]:grid-cols-1 gap-4">
                  {valuesData.map((value, index) => (
                    <ValueCard key={index} {...value} />
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Button variant="invofy" size="invofy" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
