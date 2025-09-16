import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "https://drive.google.com/uc?id=1s4ZTO4LjeQfqZaLp1",
      alt: "Kerozen DJ en performance live",
      description: "Performance live électrisante"
    },
    {
      src: "https://drive.google.com/uc?id=10EcnWgwDDp1m4pirx", 
      alt: "Kerozen DJ en studio",
      description: "Session studio créative"
    },
    {
      src: "https://drive.google.com/uc?id=10sw3m3xztHafQXc1N",
      alt: "Kerozen DJ portrait artistique",
      description: "Portrait artistique"
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
    <section id="gallery" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Galerie</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'univers visuel de Kerozen DJ à travers ses performances, 
            ses moments en studio et ses créations artistiques.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl music-card cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-warm-white font-medium text-lg mb-2">
                    {image.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <ZoomIn className="w-5 h-5 mr-2" />
                    <span className="text-sm">Cliquer pour agrandir</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/20 via-transparent to-neon-gold/20 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/90 backdrop-blur-sm">
            <div className="relative max-w-5xl w-full">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-warm-white hover:text-primary z-10"
                onClick={closeModal}
              >
                <X className="w-8 h-8" />
              </Button>

              {/* Image */}
              <div className="relative">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
                
                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-deep-black/80 text-warm-white p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  ←
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-deep-black/80 text-warm-white p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  →
                </button>

                {/* Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-transparent p-6 rounded-b-xl">
                  <h3 className="text-xl font-semibold text-warm-white mb-2">
                    {images[selectedImage].description}
                  </h3>
                  <p className="text-muted-foreground">
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