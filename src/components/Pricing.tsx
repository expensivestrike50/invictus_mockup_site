import { cn } from '@/lib/utils';

import PricingCards from '@/components/PricingCards';

interface PricingProps extends React.ComponentProps<'section'> {}

const Pricing = ({ className, ...props }: PricingProps) => {
  return (
    <section
      className={cn(
        'py-32 px-10 max-lg:py-24 max-md:py-24 max-md:px-6 max-xs:py-20 max-xs:px-5 bg-cover bg-center rounded-[64px] max-md:rounded-[48px]',
        className
      )}
      style={{
        backgroundImage:
          'radial-gradient(90% 70% at 15% 10%, hsl(var(--brand-beige)) 0%, transparent 60%), radial-gradient(80% 70% at 85% 20%, hsl(var(--brand-blue-light) / 0.45) 0%, transparent 60%), radial-gradient(100% 90% at 50% 100%, hsl(var(--brand-beige-deep)) 0%, hsl(var(--brand-beige-light)) 70%)',
        backgroundColor: 'hsl(var(--brand-beige-light))',
      }}
      {...props}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4 max-w-[48.75rem] mx-auto text-center mb-16 max-md:mb-12 max-md:max-w-full">
          <span className="text-xs tracking-[1px] uppercase font-semibold">
            Flexible Options
          </span>
          <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
            Start free, upgrade anytime
          </h2>
          <div className="w-full">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
              Choose a plan that fits your workflow. Whether you're just getting started or scaling fast, Invictus grows with you.
            </p>
          </div>
        </div>

        <PricingCards />
      </div>
    </section>
  );
};

export default Pricing;
