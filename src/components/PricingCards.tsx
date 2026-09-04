import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import checkIcon from '@/assets/icons/check-icon.png';
import cardIcon from '@/assets/icons/card-icon.png';

export const pricingPlans = [
  {
    name: 'Starter',
    description: 'For solo agents building a first roster and testing club requests.',
    price: '$50',
    period: '/mo',
    features: [
      'Up to 25 player profiles',
      'Club request tracking',
      'Basic match scoring',
      'PDF agency reports',
      'Shared club contacts',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'invofyOutline' as const,
    featured: false,
  },
  {
    name: 'Professional',
    description: 'For established agents managing an active roster across several leagues.',
    price: '$100',
    period: '/mo',
    features: [
      'Everything in Starter',
      'Unlimited player profiles',
      'AI match explanations',
      'Integrated match statistics',
      'Branded report templates',
      'Mobile app access',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'invofy' as const,
    featured: true,
  },
  {
    name: 'Agency',
    description: 'For multi-agent agencies coordinating clubs, scouts, and deals at scale.',
    price: '$500',
    period: '/mo',
    features: [
      'Everything in Professional',
      'Multi-agent workspaces',
      'Deal pipeline & reminders',
      'Custom scouting fields',
      'Priority support',
      'Mobile app access',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'invofyOutline' as const,
    featured: false,
  },
];

interface PricingCardsProps {
  className?: string;
  showStagger?: boolean;
}

const PricingCards = ({ className, showStagger = true }: PricingCardsProps) => {
  return (
    <div className={cn('grid grid-cols-3 max-[991px]:grid-cols-1 gap-6 lg:items-start', className)}>
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          className={cn(
            'bg-card border border-border rounded-[30px] flex flex-col p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
            showStagger && !plan.featured ? 'lg:mt-4' : ''
          )}
        >
          {/* Card Header */}
          <div
            className="p-6 max-[479px]:p-5 text-left bg-cover bg-center rounded-[24px]"
            style={{
              backgroundImage:
                'radial-gradient(120% 120% at 0% 0%, hsl(var(--brand-beige-light)) 0%, hsl(var(--brand-beige)) 55%, hsl(var(--brand-beige-deep)) 100%)',
            }}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-base text-muted-foreground mb-4 font-normal">{plan.description}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[2.5rem] max-[479px]:text-[2rem] font-bold font-display leading-none">
                {plan.price}
              </span>
              <span className="text-base text-muted-foreground">{plan.period}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 max-[479px]:p-5 flex-1 flex flex-col">
            <Button variant={plan.buttonVariant} size="invofy" className="w-full mb-6">
              {plan.buttonText}
            </Button>
            
            <h4 className="text-sm font-semibold mb-4">What You Get</h4>
            
            <ul className="flex flex-col gap-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <img src={checkIcon} alt="" width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5 flex-shrink-0" />
                  <span className="text-base text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Footer */}
          <div className="px-6 pb-6 max-[479px]:px-5 max-[479px]:pb-5">
            <div className="flex items-center gap-2">
              <img src={cardIcon} alt="" width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5" />
              <span className="text-base text-muted-foreground">Pause or cancel anytime</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
