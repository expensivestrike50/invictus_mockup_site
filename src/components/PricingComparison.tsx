import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { pricingPlans } from '@/components/PricingCards';
import checkIcon from '@/assets/icons/check-icon.png';

interface ComparisonFeature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  business: boolean | string;
}

interface FeatureCategory {
  category: string;
  features: ComparisonFeature[];
}

const comparisonData: FeatureCategory[] = [
  {
    category: 'Talent & Clubs',
    features: [
      { name: 'Player profiles', starter: true, professional: true, business: true },
      { name: 'Club request tracking', starter: true, professional: true, business: true },
      { name: 'Shortlists', starter: true, professional: true, business: true },
      { name: 'Unlimited player profiles', starter: false, professional: true, business: true },
      { name: 'Deal pipeline & reminders', starter: false, professional: false, business: true },
      { name: 'Multi-agent workspaces', starter: false, professional: false, business: true },
    ],
  },
  {
    category: 'AI & Data',
    features: [
      { name: 'Basic match scoring', starter: true, professional: true, business: true },
      { name: 'AI match explanations', starter: false, professional: true, business: true },
      { name: 'Integrated match statistics', starter: false, professional: true, business: true },
      { name: 'Custom scouting fields', starter: false, professional: false, business: true },
    ],
  },
  {
    category: 'Reports & Output',
    features: [
      { name: 'PDF agency reports', starter: true, professional: true, business: true },
      { name: 'Branded report templates', starter: false, professional: true, business: true },
      { name: 'Priority support', starter: false, professional: false, business: true },
    ],
  },
];

const FeatureCell = ({ value }: { value: boolean | string }) => {
  if (typeof value === 'string') {
    return <span className="text-base text-foreground">{value}</span>;
  }
  if (value) {
    return <img src={checkIcon} alt="Included" width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5 mx-auto" />;
  }
  return <span className="text-muted-foreground text-lg">—</span>;
};

// Mobile/Tablet Card Component
const MobileComparisonCard = ({ 
  plan, 
  planKey 
}: { 
  plan: typeof pricingPlans[0]; 
  planKey: 'starter' | 'professional' | 'business';
}) => {
  return (
    <div className={cn(
      'bg-card rounded-[30px] border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden',
      planKey === 'professional' && 'ring-2 ring-primary'
    )}>
      {/* Card Header */}
      <div className={cn(
        'p-6 border-b border-border',
        planKey === 'professional' && 'bg-primary/5'
      )}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold">{plan.name}</span>
          {planKey === 'professional' && (
            <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
      </div>

      {/* Features List */}
      <div className="p-6">
        {comparisonData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6 last:mb-0">
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
              {category.category}
            </h4>
            <ul className="space-y-2">
              {category.features.map((feature, featureIndex) => {
                const value = feature[planKey];
                const isIncluded = value === true || typeof value === 'string';
                return (
                  <li key={featureIndex} className="flex items-center gap-3">
                    {isIncluded ? (
                      <img src={checkIcon} alt="" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-4 flex items-center justify-center text-muted-foreground flex-shrink-0">—</span>
                    )}
                    <span className={cn(
                      'text-sm',
                      isIncluded ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {feature.name}
                      {typeof value === 'string' && ` (${value})`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-6">
        <Button
          variant={plan.buttonVariant}
          size="invofy"
          className="w-full"
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};

interface PricingComparisonProps {
  className?: string;
}

const PricingComparison = ({ className }: PricingComparisonProps) => {
  const planKeys: ('starter' | 'professional' | 'business')[] = ['starter', 'professional', 'business'];

  return (
    <section className={cn('px-5 md:px-10 max-[479px]:px-5', className)}>
      <div className="max-w-[100rem] mx-auto">
        {/* Gray Background Container */}
        <div className="bg-[hsl(var(--brand-beige))] rounded-[4rem] max-[767px]:rounded-[3rem] overflow-hidden">
          {/* Inner Content with Padding */}
          <div className="py-24 max-[991px]:py-20 max-[767px]:py-16">
            <div className="px-12 max-[991px]:px-10 max-[767px]:px-8 max-[479px]:px-4">
              {/* Header */}
              <div className="text-center mb-16 max-[767px]:mb-12">
                <span className="inline-block text-xs tracking-[1px] uppercase font-semibold text-muted-foreground mb-4">
                  DETAILED BREAKDOWN
                </span>
                <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] font-bold leading-[1.1] mb-6">
                  Compare Plans Side by Side
                </h2>
                <p className="text-lg text-muted-foreground max-w-[40rem] mx-auto">
                  See exactly what's included in each plan. Whether you're a solo agent or running a multi-agent agency, find the features that match your roster.
                </p>
              </div>

              {/* Mobile/Tablet Card Layout - hidden on desktop */}
              <div className="hidden max-[991px]:block">
                <div className="flex flex-col gap-6">
                  {pricingPlans.map((plan, index) => (
                    <MobileComparisonCard 
                      key={plan.name} 
                      plan={plan} 
                      planKey={planKeys[index]} 
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Table - hidden on mobile/tablet */}
              <div className="max-[991px]:hidden">
                <div className="bg-card rounded-[30px] border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      {/* Table Header */}
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-6 w-[40%]">
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              Features
                            </span>
                          </th>
                          {pricingPlans.map((plan, index) => (
                            <th
                              key={plan.name}
                              className={cn(
                                'text-center p-6 w-[20%]',
                                index === 1 && 'bg-primary/5'
                              )}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-lg font-bold">{plan.name}</span>
                                <span className="text-2xl font-bold text-primary">{plan.price}</span>
                                <span className="text-sm text-muted-foreground">{plan.period}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {comparisonData.map((category, categoryIndex) => (
                          <>
                            {/* Category Header */}
                            <tr key={`category-${categoryIndex}`} className="bg-brand-ink">
                              <td
                                colSpan={4}
                                className="p-4 text-sm font-bold uppercase tracking-wide text-white"
                              >
                                {category.category}
                              </td>
                            </tr>
                            {/* Feature Rows */}
                            {category.features.map((feature, featureIndex) => (
                              <tr
                                key={`feature-${categoryIndex}-${featureIndex}`}
                                className="border-b border-border last:border-b-0"
                              >
                                <td className="p-4 text-base text-foreground">
                                  {feature.name}
                                </td>
                                <td className="p-4 text-center">
                                  <FeatureCell value={feature.starter} />
                                </td>
                                <td className="p-4 text-center bg-primary/5">
                                  <FeatureCell value={feature.professional} />
                                </td>
                                <td className="p-4 text-center">
                                  <FeatureCell value={feature.business} />
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}

                        {/* CTA Row */}
                        <tr className="border-t border-border">
                          <td className="p-6"></td>
                          {pricingPlans.map((plan, index) => (
                            <td
                              key={`cta-${plan.name}`}
                              className={cn(
                                'p-6 text-center',
                                index === 1 && 'bg-primary/5'
                              )}
                            >
                              <Button
                                variant={plan.buttonVariant}
                                size="invofy"
                                className="w-full max-w-[160px]"
                              >
                                {plan.buttonText}
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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

export default PricingComparison;
