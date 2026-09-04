const missionBlocks = [
  {
    title: 'Close Deals, Not Chats',
    description: 'We replace scattered WhatsApp calls and endless email chains between agents, players, and sporting directors with one shared, searchable record.',
  },
  {
    title: 'Data Behind Every Pitch',
    description: 'Integrated match statistics and embedded AI help agents prove why a talent answers a specific club request, not just claim it.',
  },
  {
    title: 'Support the Career',
    description: 'From first shortlist to contract renewal, agents track players, clubs, and conversations in a CRM built for football, not adapted to it.',
  },
];

const AboutMission = () => {
  return (
    <section className="w-full bg-background py-32 max-[991px]:py-24 max-[479px]:py-20 px-10 max-[767px]:px-6 max-[479px]:px-5">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-[479px]:mb-12">
          <span className="text-foreground text-sm font-semibold uppercase tracking-[0.2em] mb-6 max-[479px]:text-xs max-[479px]:mb-4">
            Our Mission
          </span>
          <h2 className="text-[2.5rem] max-[991px]:text-[2rem] max-[479px]:text-2xl font-bold leading-[1.2] max-w-[50rem]">
            Our mission is to give football agents the intelligence and speed to win in the transfer market. One platform to find the right fit, pitch with data, and move before the market does.
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
