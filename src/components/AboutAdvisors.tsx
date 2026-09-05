import { useTranslation } from 'react-i18next';
import advisor01 from '@/assets/about/advisor-01.png';
import advisor02 from '@/assets/about/advisor-02.png';
import advisor03 from '@/assets/about/advisor-03.png';
import advisor04 from '@/assets/about/advisor-04.png';

const advisorImages = [advisor01, advisor02, advisor03, advisor04];

interface AdvisorCardProps {
  name: string;
  role: string;
  image: string;
  bgColor: string;
}

const AdvisorCard = ({ name, role, image, bgColor }: AdvisorCardProps) => (
  <div 
    className="rounded-[30px] overflow-hidden"
    style={{ backgroundColor: bgColor }}
  >
    {/* Photo area */}
    <div className="aspect-square overflow-hidden rounded-b-[20px]">
      <img 
        src={image} 
        alt={name}
        width={300}
        height={300}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
    
    {/* Info box */}
    <div className="bg-card rounded-[20px] m-4 p-6">
      <h3 className="text-xl font-bold leading-[1.4]">{name}</h3>
      <div className="border-b border-dashed border-border my-3" />
      <p className="text-base text-muted-foreground leading-[1.5]">{role}</p>
    </div>
  </div>
);

const AboutAdvisors = () => {
  const { t } = useTranslation();
  const role = t('aboutAdvisors.role');
  const advisors = advisorImages.map((image) => ({
    name: 'TBD',
    role,
    image,
    bgColor: '#EEE6DA',
  }));
  return (
    <section className="px-10 max-[767px]:px-6 max-[479px]:px-5 pb-32 max-[991px]:pb-24 max-[479px]:pb-20">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center mb-12">
          <span className="text-xs tracking-[0.15em] uppercase font-semibold">
            {t('aboutAdvisors.eyebrow')}
          </span>
          <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] leading-[1.2] font-bold font-display">
            {t('aboutAdvisors.title')}
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
            {t('aboutAdvisors.description')}
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6">
          {advisors.map((advisor, index) => (
            <AdvisorCard key={index} {...advisor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAdvisors;
