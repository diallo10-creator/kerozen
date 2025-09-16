import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import MusicSection from '@/components/MusicSection';
import VideoSection from '@/components/VideoSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <GallerySection />
        <MusicSection />
        <VideoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
