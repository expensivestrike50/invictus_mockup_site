import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactLocationProps extends React.ComponentProps<'section'> {}

// Slide-up double text link component (matches footer animation)
const SlideUpLink = ({ 
  label, 
  href, 
  external = false,
  className = "text-base font-semibold"
}: { 
  label: string; 
  href: string; 
  external?: boolean;
  className?: string;
}) => (
<a 
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={`no-underline group flex flex-col ${className}`}
  >
    <div className="relative h-[1.5em] overflow-hidden">
      <div className="flex flex-col transition-transform duration-300 will-change-transform group-hover:-translate-y-[1.5em]">
        <span className="block text-foreground font-semibold whitespace-nowrap leading-[1.5]">
          {label}
        </span>
        <span className="block text-foreground font-semibold whitespace-nowrap leading-[1.5]">
          {label}
        </span>
      </div>
    </div>
  </a>
);

const ContactLocation = ({ className, ...props }: ContactLocationProps) => {
  return (
    <section
      className={cn(
        'py-32 px-10 max-[991px]:py-24 max-[767px]:py-24 max-[767px]:px-6 max-[479px]:py-20 max-[479px]:px-5',
        className
      )}
      {...props}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center mb-16 max-[767px]:mb-12">
          <span className="text-xs tracking-[1px] uppercase font-semibold">
            Our Locations
          </span>
          <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] leading-[1.2] font-bold font-display">
            Find Us Near You
          </h2>
          <div className="w-full">
            <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
            Whether you prefer to visit in person or connect online, we are here to help. Reach out anytime, we would love to hear from you.
            </p>
          </div>
        </div>

        {/* Location Blocks */}
        <div className="grid grid-cols-2 gap-8 max-[991px]:grid-cols-1">
          {/* Cleveland */}
          <div className="bg-[hsl(var(--brand-beige))] rounded-[40px] max-[767px]:rounded-[30px] p-8 max-[767px]:p-6 max-[479px]:p-5">
            <div className="bg-card border border-border rounded-[30px] p-10 max-[991px]:p-8 max-[767px]:p-6 max-[479px]:p-5 h-full flex flex-col gap-8">
              <div>
                <h3 className="text-3xl max-[991px]:text-2xl max-[767px]:text-xl font-bold mb-3">
                  Cleveland, Ohio
                </h3>
                <p className="text-muted-foreground text-base leading-[1.6]">
                  Our North American home for agents, clubs, and sporting directors across the region.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <SlideUpLink label="hello@invictus.agency" href="mailto:hello@invictus.agency" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <SlideUpLink label="(216) 555-0123" href="tel:+12165550123" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Address</span>
                    <SlideUpLink 
                      label="127 Public Square, Suite 500" 
                      href="https://www.google.com/maps"
                      external
                      className="text-base font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barcelona */}
          <div className="bg-[hsl(var(--brand-beige))] rounded-[40px] max-[767px]:rounded-[30px] p-8 max-[767px]:p-6 max-[479px]:p-5">
            <div className="bg-card border border-border rounded-[30px] p-10 max-[991px]:p-8 max-[767px]:p-6 max-[479px]:p-5 h-full flex flex-col gap-8">
              <div>
                <h3 className="text-3xl max-[991px]:text-2xl max-[767px]:text-xl font-bold mb-3">
                  Barcelona, Spain
                </h3>
                <p className="text-muted-foreground text-base leading-[1.6]">
                  Our European hub for scouting networks, club partnerships, and player operations.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <SlideUpLink label="hello@invictus.agency" href="mailto:hello@invictus.agency" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <SlideUpLink label="+34 93 555 0123" href="tel:+34935550123" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ink rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Address</span>
                    <SlideUpLink 
                      label="Carrer de València, 350" 
                      href="https://www.google.com/maps"
                      external
                      className="text-base font-semibold"
                    />
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

export default ContactLocation;
