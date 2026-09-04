import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import waveBg from '@/assets/testimonials/wave-bg-03.png';
import quoteIcon from '@/assets/testimonials/quote-icon.png';
import client01 from '@/assets/testimonials/client-01.jpg';
import client02 from '@/assets/testimonials/client-02.jpg';
import client03 from '@/assets/testimonials/client-03.jpg';
import client04 from '@/assets/testimonials/client-04.jpg';
import client05 from '@/assets/testimonials/client-05.jpg';
import client06 from '@/assets/testimonials/client-06.jpg';

const testimonialAvatars = [client01, client02, client03, client04, client05, client06];

interface TestimonialCardProps {
  avatar: string;
  name: string;
  role: string;
  quote: string;
  isStaggered?: boolean;
}

const TestimonialCard = ({ avatar, name, role, quote, isStaggered }: TestimonialCardProps) => (
  <div
    className={cn(
      'bg-card border border-border rounded-[30px] p-8 flex flex-col gap-6 w-[380px] max-lg:w-[340px] max-md:w-[300px] shrink-0',
      isStaggered && 'mt-16'
    )}
  >
    <img src={quoteIcon} alt="" width={40} height={40} loading="lazy" decoding="async" className="w-10 h-10" />
    <p className="text-lg leading-[1.5] text-muted-foreground font-sans font-normal">{quote}</p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full border border-border p-[3px]">
        <img
          src={avatar}
          alt={name}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-base">{name}</span>
        <span className="text-muted-foreground text-sm font-normal">{role}</span>
      </div>
    </div>
  </div>
);

interface TestimonialSliderProps {
  testimonials: typeof testimonialsData;
  direction?: 'left' | 'right';
}

const TestimonialSlider = ({ testimonials, direction = 'left' }: TestimonialSliderProps) => {
  const gap = 24;
  const speed = 80;

  return (
    <div
      className="flex overflow-hidden"
      style={
        {
          '--gap': `${gap}px`,
          '--speed': `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'flex shrink-0 items-start',
          direction === 'left' ? 'animate-testimonial-scroll' : 'animate-testimonial-scroll-reverse'
        )}
        style={{ gap: `${gap}px` }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`original-${index}`} {...testimonial} isStaggered={index % 2 === 1} />
        ))}
      </div>
      <div
        className={cn(
          'flex shrink-0 items-start',
          direction === 'left' ? 'animate-testimonial-scroll' : 'animate-testimonial-scroll-reverse'
        )}
        style={{ gap: `${gap}px`, marginLeft: `${gap}px` }}
        aria-hidden
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`duplicate-${index}`} {...testimonial} isStaggered={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

interface TestimonialsProps extends React.ComponentProps<'section'> {}

const Testimonials = ({ className, ...props }: TestimonialsProps) => {
  const { t } = useTranslation();
  const testimonialsData = testimonialAvatars.map((avatar, index) => ({
    avatar,
    name: t(`testimonials.items.${index}.name`),
    role: t(`testimonials.items.${index}.role`),
    quote: t(`testimonials.items.${index}.quote`),
  }));

  return (
    <section
      className={cn(
        'px-5 md:px-10 max-xs:px-5 pt-24 pb-16 max-lg:pt-20 max-lg:pb-12 max-md:pt-16 max-md:pb-10',
        className
      )}
      {...props}
    >
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
            <div className="flex flex-col gap-12 max-md:gap-8">
              <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center px-12 max-lg:px-10 max-md:px-8 max-xs:px-4">
                <span className="text-xs tracking-[1px] uppercase font-semibold">
                  {t('testimonials.eyebrow')}
                </span>
                <h2 className="text-[4.5rem] max-lg:text-[3rem] max-md:text-[2rem] leading-[1.2] font-bold font-display">
                  {t('testimonials.title')}
                </h2>
                <div className="w-full">
                  <p className="text-muted-foreground text-lg leading-[1.4] font-sans font-normal">
                    {t('testimonials.description')}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 max-md:w-12 bg-gradient-to-r from-[hsl(var(--brand-beige))] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 max-md:w-12 bg-gradient-to-l from-[hsl(var(--brand-beige))] to-transparent z-10 pointer-events-none" />

                <div className="pb-6">
                  <TestimonialSlider testimonials={testimonialsData} direction="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
