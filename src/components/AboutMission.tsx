import { useTranslation } from 'react-i18next';

const AboutMission = () => {
  const { t } = useTranslation();
  const missionBlocks = t('aboutMission.blocks', { returnObjects: true }) as { title: string; description: string }[];
  return (
    <section className="w-full bg-background py-32 max-[991px]:py-24 max-[479px]:py-20 px-10 max-[767px]:px-6 max-[479px]:px-5">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-[479px]:mb-12">
          <span className="text-foreground text-sm font-semibold uppercase tracking-[0.2em] mb-6 max-[479px]:text-xs max-[479px]:mb-4">
            {t('aboutMission.eyebrow')}
          </span>
          <h2 className="text-[2.5rem] max-[991px]:text-[2rem] max-[479px]:text-2xl font-bold leading-[1.2] max-w-[50rem]">
            {t('aboutMission.title')}
          </h2>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-3 max-[991px]:grid-cols-1 gap-6">
          {missionBlocks.map((block, index) => (
            <div
              key={index}
              className="bg-[hsl(var(--brand-beige))] border border-border rounded-[30px] p-8"
            >
              <h3 className="text-[2rem] max-[479px]:text-2xl font-bold mb-8">
                {block.title}
              </h3>
              <div className="border-b border-dashed border-border mb-8" />
              <p className="text-lg leading-[1.5] text-muted-foreground">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
