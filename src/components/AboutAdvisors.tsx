import advisor01 from '@/assets/about/advisor-01.png';
import advisor02 from '@/assets/about/advisor-02.png';
import advisor03 from '@/assets/about/advisor-03.png';
import advisor04 from '@/assets/about/advisor-04.png';

const advisors = [
  {
    name: 'TBD',
    role: 'Advisor',
    image: advisor01,
    bgColor: '#EEE6DA',
  },
  {
    name: 'TBD',
    role: 'Advisor',
    image: advisor02,
    bgColor: '#EEE6DA',
  },
  {
    name: 'TBD',
    role: 'Advisor',
    image: advisor03,
    bgColor: '#EEE6DA',
  },
  {
    name: 'TBD',
    role: 'Advisor',
    image: advisor04,
    bgColor: '#EEE6DA',
  },
];

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
  return (
    <section className="px-10 max-[767px]:px-6 max-[479px]:px-5 pb-32 max-[991px]:pb-24 max-[479px]:pb-20">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[50rem] mx-auto text-center mb-12">
          <span className="text-xs tracking-[0.15em] uppercase font-semibold">
            Advisors
          </span>
          <h2 className="text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2rem] leading-[1.2] font-bold font-display">
            Guided by Experience
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.4] font-normal">
            A network of operators, investors, and football people who help us stay close to the real work of agents and clubs.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6">
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.name + advisor.image} {...advisor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAdvisors;
