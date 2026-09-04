import * as React from 'react';
import { Link } from 'react-router-dom';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import foregroundImage from '@/assets/image-06.jpg';

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

const FAQItem = ({ question, answer, value }: FAQItemProps) => (
  <AccordionPrimitive.Item
    value={value}
    className="bg-[hsl(var(--brand-beige))] border border-border rounded-[30px] overflow-hidden"
  >
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between p-7 max-xs:p-5 text-left group">
        <span className="text-2xl max-xs:text-xl font-medium leading-[1.3] pr-4">
          {question}
        </span>
        <div className="flex items-center justify-center w-11 h-11 max-xs:w-9 max-xs:h-9 bg-brand-ink rounded-full flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45">
          <Plus className="w-5 h-5 max-xs:w-4 max-xs:h-4 text-white" strokeWidth={2} />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className="px-7 pb-7 pt-0 max-xs:px-5 max-xs:pb-5">
        <p className="text-base max-xs:text-sm leading-[1.5] text-muted-foreground">
          {answer}
        </p>
      </div>
    </AccordionPrimitive.Content>
  </AccordionPrimitive.Item>
);

interface FAQProps extends React.ComponentProps<'section'> {}

const FAQ = ({ className, ...props }: FAQProps) => {
  const { t } = useTranslation();
  const faqData = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }));
  const accordionRef = React.useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = accordionRef.current;
    if (!el) return;

    const measure = () => setAccordionHeight(el.offsetHeight);
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
            {t('faq.eyebrow')}
          </span>
          <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
            {t('faq.title')}
          </h2>
          <div className="w-full">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
              {t('faq.description')}
            </p>
          </div>
        </div>

        <div className="flex justify-start items-stretch w-full gap-6 max-lg:flex-col max-lg:gap-8">
          <div className="w-1/2 max-lg:w-full">
            <div
              className="relative w-full h-[var(--faq-h,600px)] overflow-hidden rounded-[40px]"
              style={{ '--faq-h': accordionHeight ? `${accordionHeight}px` : undefined } as React.CSSProperties}
            >
              <img
                src={foregroundImage}
                alt="Football agent working on a laptop"
                width={512}
                height={640}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-1/2 max-lg:w-full flex flex-col">
            <div className="flex flex-col justify-between flex-1 gap-6 2xl:gap-8">
              <AccordionPrimitive.Root
                ref={accordionRef}
                type="single"
                collapsible
                className="flex flex-col w-full gap-4 2xl:gap-5"
              >
                {faqData.map((item, index) => (
                  <FAQItem
                    key={index}
                    value={`item-${index}`}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </AccordionPrimitive.Root>

              <div className="flex justify-end">
                <Button variant="invofy" size="invofy" asChild>
                  <Link to="/contact">{t('faq.askAQuestion')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
