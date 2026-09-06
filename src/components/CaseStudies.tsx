import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface CaseStudiesProps extends React.ComponentProps<'section'> {}

const CaseStudies = ({ className, ...props }: CaseStudiesProps) => {
  const { t } = useTranslation();

  return (
    <section className={cn('px-5 md:px-10 max-xs:px-5 py-32 max-lg:py-24 max-xs:py-20', className)} {...props}>
      <div className="max-w-[100rem] mx-auto">
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center">
          <span className="text-xs tracking-[1px] uppercase font-semibold">
            {t('caseStudies.eyebrow')}
          </span>
          <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
            {t('caseStudies.title')}
          </h2>
          <div className="w-full max-w-[36rem] mx-auto">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
              {t('caseStudies.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
