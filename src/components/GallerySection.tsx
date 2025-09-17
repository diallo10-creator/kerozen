import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import performanceImg from '@/assets/kerozen-performance.jpg';
import formalImg from '@/assets/kerozen-formal.jpg';
import interviewImg from '@/assets/kerozen-interview.jpg';
import traditionalImg from '@/assets/kerozen-traditional.jpg';
import stageImg from '@/assets/kerozen-stage.jpg';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: performanceImg,
      alt: "Kerozen DJ en performance live",
      description: "Performance live électrisante"
    },
    {
      src: formalImg, 
      alt: "Kerozen DJ portrait professionnel",
      description: "Portrait professionnel élégant"
    },
    {
      src: interviewImg,
      alt: "Kerozen DJ en interview",
      description: "Interview exclusive"
    },
    {
      src: traditionalImg,
      alt: "Kerozen DJ style traditionnel",
      description: "Style traditionnel africain"
    },
    {
      src: stageImg,
      alt: "Kerozen DJ sur scène avec effets visuels",
      description: "Spectacle live avec effets spéciaux"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="gradient-text">Galerie</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Découvrez l'univers visuel de Kerozen DJ à travers ses performances, 
            ses moments en studio et ses créations artistiques.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl music-card cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-warm-white font-medium text-base md:text-lg mb-2">
                    {image.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <ZoomIn className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="text-xs md:text-sm">Cliquer pour agrandir</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/20 via-transparent to-neon-gold/20 rounded-xl md:rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-deep-black/90 backdrop-blur-sm">
            <div className="relative max-w-5xl w-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-8 md:-top-12 right-0 text-warm-white hover:text-primary z-10"
                onClick={closeModal}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </Button>

              {/* Image */}
              <div className="relative">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg md:rounded-xl"
                />
                
                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-deep-black/80 text-warm-white p-2 md:p-3 rounded-full hover:bg-primary/20 transition-colors text-lg md:text-xl"
                >
                  ←
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-deep-black/80 text-warm-white p-2 md:p-3 rounded-full hover:bg-primary/20 transition-colors text-lg md:text-xl"
                >
                  →
                </button>

                {/* Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-transparent p-4 md:p-6 rounded-b-lg md:rounded-b-xl">
                  <h3 className="text-lg md:text-xl font-semibold text-warm-white mb-2">
                    {images[selectedImage].description}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {selectedImage + 1} / {images.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;