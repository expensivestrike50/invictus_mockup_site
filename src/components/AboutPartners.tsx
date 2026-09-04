import caaSports from '@/assets/partners/Image_5.png';
import invictusLogo from '@/assets/partners/Image_6.png';
import nikeLogo from '@/assets/partners/Image_8.png';
import adidasLogo from '@/assets/partners/Image_9.png';
import sparkLogo from '@/assets/partners/Image_10.png';
import nvidiaLogo from '@/assets/partners/Image_11.png';
import mikvonStars from '@/assets/partners/Image_12.png';
import talentFirst from '@/assets/partners/Image_13.png';
import soccerPro from '@/assets/partners/Image_14.png';
import theFootballAgents from '@/assets/partners/Image_15.png';
import caseWesternReserve from '@/assets/partners/Image_16.png';
import proFootballAgency from '@/assets/partners/Image_17.png';

const partners = [
  { src: caaSports, alt: 'CAA Sports' },
  { src: invictusLogo, alt: 'Invictus' },
  { src: nikeLogo, alt: 'Nike' },
  { src: adidasLogo, alt: 'Adidas' },
  { src: sparkLogo, alt: 'Spark' },
  { src: nvidiaLogo, alt: 'NVIDIA' },
  { src: mikvonStars, alt: 'Mikvon Stars Agency' },
  { src: talentFirst, alt: 'Talent First Agency' },
  { src: soccerPro, alt: 'Soccer Pro Agency' },
  { src: theFootballAgents, alt: 'The Football Agents' },
  { src: caseWesternReserve, alt: 'Case Western Reserve University' },
  { src: proFootballAgency, alt: 'Pro Football Agency' },
];

const AboutPartners = () => {
  return (
    <section className="px-10 max-[767px]:px-6 max-[479px]:px-5 pb-32 max-[991px]:pb-24 max-[479px]:pb-20">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center mb-16">
          <span className="text-xs tracking-[0.15em] uppercase font-semibold">
            PARTNERS AND COLLABORATORS
          </span>
          <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] leading-[1.2] font-bold font-display">
            Trusted Across the Game
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
            We work alongside agencies, brands, and football organisations that share our belief in better, data backed representation.
          </p>
        </div>

        {/* Logo grid */}
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 max-[767px]:gap-x-8 max-[767px]:gap-y-6">
            {partners.map((partner) => (
              <img
                key={partner.alt}
                src={partner.src}
                alt={partner.alt}
                loading="lazy"
                decoding="async"
                className="h-[72px] max-[767px]:h-[52px] w-auto max-w-[220px] max-[767px]:max-w-[150px] object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPartners;
