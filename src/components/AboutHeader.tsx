import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import aboutBg from '@/assets/about/about-bg.jpg';

const stats = [
  { value: '80K+', label: 'Players Tracked' },
  { value: '2.5K+', label: 'Agencies & Clubs' },
  { value: '120+', label: 'Countries Reached' },
];

const AboutHeader = () => {
  return (
    <section
      className="relative w-full overflow-hidden rounded-b-[4rem] max-[479px]:rounded-b-[3rem] min-h-screen max-[991px]:min-h-fit flex flex-col"
    >
      {/* Background Image */}
      <img 
        src={aboutBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full px-10 max-[767px]:px-6 max-[479px]:px-5 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[100rem] mx-auto">
          {/* Header Content with Images */}
          <div className="relative pt-48 pb-24 max-[991px]:pt-40 max-[991px]:pb-20 max-[767px]:pt-36 max-[767px]:pb-16 max-[479px]:pt-32 max-[479px]:pb-12">
            
            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-[42rem] mx-auto">
              {/* Label */}
              <span className="text-foreground text-sm font-semibold uppercase tracking-[0.2em] mb-6 max-[479px]:text-xs max-[479px]:mb-4">
                About Us
              </span>
              
              {/* Heading */}
              <h1 className="text-foreground text-[4.5rem] max-[991px]:text-[3.5rem] max-[767px]:text-[3rem] max-[479px]:text-[2.25rem] font-bold font-display leading-[1.1] mb-6 max-[479px]:mb-4">
                We Help Agents Place the Right Talent.
              </h1>
              
              {/* Description */}
              <p className="text-foreground/80 text-lg max-[479px]:text-base leading-relaxed mb-10 max-[479px]:mb-8 max-w-[32rem]">
                We build a CRM made for football that helps agents match players to club requests, prove it with data, and keep every conversation in one place.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="invofy" size="invofy" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button variant="invofyOutline" size="invofy" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="relative z-10 w-full px-10 max-[767px]:px-6 max-[479px]:px-5 pb-14 max-[767px]:pb-12 max-[479px]:pb-10">
        <div className="w-full max-w-[100rem] mx-auto">
          <div className="grid grid-cols-3 max-[767px]:grid-cols-1 max-[767px]:gap-8 w-full">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`flex flex-col gap-2 ${
                  index === 0 
                    ? 'items-start max-[767px]:items-center' 
                    : index === 1 
                      ? 'items-center' 
                      : 'items-end max-[767px]:items-center'
                }`}
              >
                <span className="text-[4rem] max-[991px]:text-[3rem] max-[767px]:text-[2.5rem] max-[479px]:text-[2rem] font-bold font-display leading-none text-foreground">
                  {stat.value}
                </span>
                <span className="text-base max-[479px]:text-sm font-medium text-foreground/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;
