import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import checkIcon from '@/assets/icons/check-icon.png';
import cardIcon from '@/assets/icons/card-icon.png';

const planMeta = [
  { buttonVariant: 'invofyOutline' as const, featured: false },
  { buttonVariant: 'invofy' as const, featured: true },
  { buttonVariant: 'invofyOutline' as const, featured: false },
];

export function usePricingPlans() {
  const { t } = useTranslation();
  return planMeta.map((meta, index) => ({
    name: t(`pricing.plans.${index}.name`),
    description: t(`pricing.plans.${index}.description`),
    price: t(`pricing.plans.${index}.price`),
    period: t(`pricing.plans.${index}.period`),
    features: t(`pricing.plans.${index}.features`, { returnObjects: true }) as string[],
    buttonText: t(`pricing.plans.${index}.button`),
    ...meta,
  }));
}

interface PricingCardsProps {
  className?: string;
  showStagger?: boolean;
}

const PricingCards = ({ className, showStagger = true }: PricingCardsProps) => {
  const { t } = useTranslation();
  const pricingPlans = usePricingPlans();
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
            
            <h4 className="text-sm font-semibold mb-4">{t('pricing.whatYouGet')}</h4>
            
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
              <span className="text-base text-muted-foreground">{t('pricing.cancelAnytime')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
