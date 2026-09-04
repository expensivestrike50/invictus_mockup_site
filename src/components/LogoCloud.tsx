import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import caaSports from "@/assets/partners/Image_5.png";
import invictusLogo from "@/assets/partners/Image_6.png";
import nikeLogo from "@/assets/partners/Image_8.png";
import adidasLogo from "@/assets/partners/Image_9.png";
import sparkLogo from "@/assets/partners/Image_10.png";
import nvidiaLogo from "@/assets/partners/Image_11.png";
import mikvonStars from "@/assets/partners/Image_12.png";
import talentFirst from "@/assets/partners/Image_13.png";
import soccerPro from "@/assets/partners/Image_14.png";
import theFootballAgents from "@/assets/partners/Image_15.png";
import caseWesternReserve from "@/assets/partners/Image_16.png";
import proFootballAgency from "@/assets/partners/Image_17.png";

const logos = [
  { src: caaSports, alt: "CAA Sports" },
  { src: invictusLogo, alt: "Invictus" },
  { src: nikeLogo, alt: "Nike" },
  { src: adidasLogo, alt: "Adidas" },
  { src: sparkLogo, alt: "Spark" },
  { src: nvidiaLogo, alt: "NVIDIA" },
  { src: mikvonStars, alt: "Mikvon Stars Agency" },
  { src: talentFirst, alt: "Talent First Agency" },
  { src: soccerPro, alt: "Soccer Pro Agency" },
  { src: theFootballAgents, alt: "The Football Agents" },
  { src: caseWesternReserve, alt: "Case Western Reserve University" },
  { src: proFootballAgency, alt: "Pro Football Agency" },
];

interface LogoCloudProps extends React.ComponentProps<"section"> {}

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <section
      className={cn(
        'pt-[420px] pb-32 max-lg:pt-[440px] max-lg:pb-20 max-md:pt-40 max-md:pb-16 bg-background',
        className
      )}
      {...props}
    >
      <div className="max-w-[1040px] mx-auto px-4 max-lg:max-w-full">
        <p className="text-center text-muted-foreground font-medium mb-12 max-md:mb-8 text-base font-sans">
          Trusted by Agencies and Clubs Worldwide
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 max-md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 max-md:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <InfiniteSlider gap={48} speed={25}>
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={170}
                height={45}
                loading="lazy"
                decoding="async"
                className="w-[100px] max-lg:w-[86px] max-md:w-[72px] h-auto object-contain shrink-0"
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

export default LogoCloud;
