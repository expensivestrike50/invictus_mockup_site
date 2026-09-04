import { lazy, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Footer = lazy(() => import('@/components/Footer'));

const SlideUpLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="no-underline group flex items-center gap-2 text-base"
  >
    <ArrowUpRight className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    <div className="relative h-[1.5em] overflow-hidden">
      <div className="flex flex-col transition-transform duration-300 will-change-transform group-hover:-translate-y-[1.5em]">
        <span className="block text-foreground font-medium whitespace-nowrap leading-[1.5]">
          {label}
        </span>
        <span className="block text-foreground font-medium whitespace-nowrap leading-[1.5]">
          {label}
        </span>
      </div>
    </div>
  </a>
);

const Licenses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="w-full px-10 max-md:px-6 max-xs:px-5 pt-48 max-lg:pt-40 max-md:pt-36 max-xs:pt-32 pb-24 max-md:pb-16">
        <div className="w-full max-w-[1440px] mx-auto">
          <h1 className="text-foreground text-[4.5rem] max-lg:text-[3rem] max-md:text-[2.5rem] max-xs:text-[2rem] font-bold font-display leading-[1.2] text-center mb-16 max-md:mb-12 max-xs:mb-10">
            Licenses
          </h1>

          <div className="bg-[hsl(var(--brand-beige))] rounded-[64px] max-xs:rounded-[48px] p-16 max-lg:p-12 max-md:p-10 max-xs:p-8 max-w-[800px] mx-auto">
            <div className="space-y-4 text-muted-foreground text-lg max-xs:text-base leading-[1.6]">
              <p>
                All fonts and images used in the Invictus template are free to use for both personal
                and commercial projects. Images were generated using AI Image FX, and the primary
                typeface used in this template is Inter Tight, which is licensed for commercial use.
              </p>
              <p>
                You are allowed to use, modify, and include these assets in your own products and
                client work without additional licensing fees. Redistribution or resale of the
                assets on their own, outside of this template, is not permitted.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <SlideUpLink label="Image FX" href="https://labs.google/fx/tools/image-fx" />
              <SlideUpLink
                label="Inter Tight"
                href="https://fonts.google.com/specimen/Inter+Tight/license"
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-48" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Licenses;
