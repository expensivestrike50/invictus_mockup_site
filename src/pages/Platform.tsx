import { Link } from 'react-router-dom';
import { Target, Search, ClipboardList, Send, TrendingUp, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const FIGURE_COLOR = `${import.meta.env.BASE_URL}invictus-platform/assets/ai-assistant.png`;
const FIGURE_OUTLINE = `${import.meta.env.BASE_URL}invictus-platform/assets/ai-assistant-outline.png`;

const LaurelIcon = ({ className, strokeWidth = 2.5 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 64 64" className={className ?? 'h-14 w-14'} fill="none" aria-hidden="true">
    <path
      d="M32 10c-6 8-6 30 0 44M14 16c4 6 4 12 10 16M12 26c5 4 6 9 12 12M14 36c5 3 7 7 13 9M50 16c-4 6-4 12-10 16M52 26c-5 4-6 9-12 12M50 36c-5 3-7 7-13 9"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const apps = [
  {
    icon: LaurelIcon,
    name: 'Augustus',
    description: 'The command center AI that runs your agency — shortlists, outreach and deal tracking in one place.',
  },
  {
    icon: Target,
    name: 'Maradona Tactics Simulator',
    description: 'Simulate a player against a club’s system before you pitch the fit to a sporting director.',
  },
  {
    icon: Search,
    name: 'Pelé Scout',
    description: 'AI-powered scouting that surfaces overlooked talent from match data and video.',
  },
  {
    icon: ClipboardList,
    name: 'Cruyff Playbook',
    description: 'Turn player data into a tailored pitch deck, ready for the next director meeting.',
  },
  {
    icon: Send,
    name: 'Beckham Outreach',
    description: 'Draft and send personalized outreach to clubs and directors, on brand every time.',
  },
  {
    icon: TrendingUp,
    name: 'Ronaldinho Insights',
    description: 'Deep player analytics and career-trajectory forecasting, built for the next negotiation.',
  },
];

const Platform = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      {/* Hero */}
      <section className="px-5 md:px-10 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="w-full max-w-[100rem] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-foreground text-sm font-semibold uppercase tracking-[0.2em]">
              Augustus Platform
            </span>
            <h1 className="mt-6 text-foreground text-[2.75rem] leading-[1.15] md:text-[3.5rem] md:leading-[1.1] font-bold font-display">
              Football agents and AI&nbsp;working as one team
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-[1.4] max-w-xl">
              Augustus brings every agent, every club request and every AI tool in your agency into one
              command center — built for how football deals actually get done.
            </p>
            <div className="mt-8">
              <Button variant="invofy" size="invofy" asChild>
                <Link to="/reports">Explore Augustus</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[340px] md:h-[440px]" aria-hidden="true">
            <div className="absolute inset-0 rounded-[2.5rem] bg-brand-beige" />
            <img
              src={FIGURE_OUTLINE}
              alt=""
              loading="eager"
              className="absolute left-[6%] bottom-0 h-[92%] w-auto object-contain opacity-40 -rotate-6"
            />
            <img
              src={FIGURE_COLOR}
              alt="Augustus AI agent"
              loading="eager"
              className="absolute right-[4%] bottom-0 h-full w-auto object-contain rotate-3 drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="px-5 md:px-10 pb-24">
        <div className="w-full max-w-[100rem] mx-auto grid lg:grid-cols-[26rem_1fr] gap-6 lg:gap-10 bg-card border border-border rounded-[2rem] p-4 md:p-6">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-blue-deep via-brand-ink to-brand-ink text-white flex flex-col items-center text-center px-8 py-12">
            <LaurelIcon />
            <h2 className="mt-6 text-3xl font-bold font-display leading-[1.15] max-w-[16rem]">
              Introducing Augustus
            </h2>
            <p className="mt-4 text-white/70 text-base leading-[1.5] max-w-[20rem]">
              Build autonomous agents that shortlist talent, draft outreach and prep the pitch — before
              you've had your first coffee.
            </p>
            <Link
              to="/reports"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore Augustus agents
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="py-4 pr-2">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="text-foreground text-sm font-semibold uppercase tracking-[0.2em]">
                Featured Tools
              </span>
              <Link to="/pricing" className="text-primary text-sm font-semibold inline-flex items-center gap-2 no-underline">
                See all tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-10">
              {apps.map((app) => (
                <article key={app.name} className="flex gap-4 items-start">
                  <app.icon className="h-9 w-9 text-primary shrink-0" strokeWidth={2} />
                  <div>
                    <h3 className="text-foreground text-xl font-bold font-display leading-tight">{app.name}</h3>
                    <p className="mt-2 text-muted-foreground text-sm leading-[1.4]">{app.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Platform;
