import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { PartnersSection } from '@/components/landing/PartnersSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { PortalPreview } from '@/components/landing/PortalPreview';
import { RoadmapSection } from '@/components/landing/RoadmapSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <PortalPreview />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
