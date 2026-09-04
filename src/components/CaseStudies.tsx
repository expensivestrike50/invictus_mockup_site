import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import caseImage01 from '@/assets/case-studies/case-01.jpg';
import caseImage02 from '@/assets/case-studies/case-02.jpg';
import caseImage03 from '@/assets/case-studies/case-03.jpg';
import caseImage04 from '@/assets/case-studies/case-04.jpg';

const caseStudies = [
  {
    name: 'Player Shortlists',
    image: caseImage01,
    alt: 'CRM dashboard showing a shortlist of football players',
  },
  {
    name: 'AI Match Scores',
    image: caseImage02,
    alt: 'AI panel scoring how well a player fits a club request',
  },
  {
    name: 'Agency Reports',
    image: caseImage03,
    alt: 'PDF agency report explaining a player-to-club match',
  },
  {
    name: 'Club Pipeline',
    image: caseImage04,
    alt: 'Pipeline board of clubs and sporting director contacts',
  },
];

interface CaseStudiesProps extends React.ComponentProps<'section'> {}

const CaseStudies = ({ className, ...props }: CaseStudiesProps) => {
  return (
    <section className={cn('px-5 md:px-10 max-xs:px-5 py-32 max-lg:py-24 max-xs:py-20', className)} {...props}>
      <div className="max-w-[100rem] mx-auto flex flex-col gap-16 max-lg:gap-12">
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center">
          <span className="text-xs tracking-[1px] uppercase font-semibold">
            Proven Results
          </span>
          <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
            Built for How Agencies Actually Work
          </h2>
          <div className="w-full max-w-[36rem] mx-auto">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
              See how agents use Invictus to shortlist talent, prove the fit with data, and close deals with sporting directors faster.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:gap-6">
          {caseStudies.map((study, index) => {
            // First row stays put; second row flies in from its side of the
            // grid (left column from the left, right column from the right)
            // once it scrolls into view.
            const isSecondRow = index >= 2;
            const fromLeft = index % 2 === 0;

            return (
            <motion.div
              key={study.name}
              initial={isSecondRow ? { opacity: 0, x: fromLeft ? -90 : 90, y: 40 } : false}
              whileInView={isSecondRow ? { opacity: 1, x: 0, y: 0 } : undefined}
              viewport={isSecondRow ? { once: true, amount: 0.35 } : undefined}
              transition={isSecondRow ? { duration: 0.75, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] } : undefined}
              className="bg-card border border-border rounded-[40px] max-xs:rounded-[30px] p-3 flex flex-col gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between gap-4 bg-card border border-border rounded-[30px] max-xs:rounded-[22px] pl-8 pr-4 py-4 max-xs:pl-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-signal-coral" />
                    <span className="w-2.5 h-2.5 rounded-full bg-signal-amber" />
                    <span className="w-2.5 h-2.5 rounded-full bg-signal-green" />
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wide">{study.name}</h3>
                </div>
                <Link
                  to="/contact"
                  aria-label={`View the ${study.name} case study`}
                  className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-colors hover:bg-brand-blue-deep"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="rounded-[30px] max-xs:rounded-[22px] overflow-hidden aspect-[16/15] max-xs:aspect-square">
                <img
                  src={study.image}
                  alt={study.alt}
                  width={1024}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
