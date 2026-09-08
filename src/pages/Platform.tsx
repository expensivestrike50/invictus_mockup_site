import Navbar from '@/components/Navbar';

const IFRAME_SRC = `${import.meta.env.BASE_URL}invictus-platform/index.html`;

const Platform = () => (
  <div className="h-screen overflow-hidden bg-background">
    <Navbar />
    <div className="h-full pt-20">
      <iframe
        src={IFRAME_SRC}
        title="Invictus Platform"
        className="w-full h-full border-0 block"
      />
    </div>
  </div>
);

export default Platform;
