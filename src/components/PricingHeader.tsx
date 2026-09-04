import { cn } from '@/lib/utils';
import PricingCards from '@/components/PricingCards';


interface PricingHeaderProps extends React.ComponentProps<'section'> {}

const PricingHeader = ({ className, ...props }: PricingHeaderProps) => {
  return (
    <section 
      className={cn(
        'relative min-h-[120vh] max-[991px]:min-h-fit',
        className
      )} 
      {...props}
    >
      {/* Background - covers top 60% */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60%] max-[991px]:h-[50%] bg-cover bg-center bg-no-repeat rounded-b-[4rem] max-[767px]:rounded-b-[48px]"
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 50% 0%, hsl(var(--brand-beige-light)) 0%, hsl(var(--brand-beige)) 50%, hsl(var(--brand-blue-light) / 0.5) 100%)',
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-10 max-[767px]:px-6 max-[479px]:px-5">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center pt-48 max-[991px]:pt-40 max-[767px]:pt-36 max-[479px]:pt-32 pb-16 max-[767px]:pb-12 max-[479px]:pb-10">
            {/* Label */}
            <span className="text-foreground text-xs tracking-[1px] uppercase font-semibold mb-4">
              Straightforward Plans
            </span>
            
            {/* Heading */}
            <h1 className="text-foreground text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2.5rem] max-[479px]:text-[2rem] font-bold font-display leading-[1.2] mb-4 max-w-[48rem]">
              Flexible Plans for Agencies
            </h1>
            
            {/* Description */}
            <p className="text-muted-foreground text-lg max-[479px]:text-base leading-[1.4] font-normal max-w-[40rem]">
              Choose a plan that matches your roster and start matching talent to club requests with AI, live statistics, and club-ready reports.
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="pb-32 max-[991px]:pb-24 max-[767px]:pb-20 max-[479px]:pb-16">
            <PricingCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHeader;
