import { Play, ExternalLink, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videos = [
    {
      title: "Clip Officiel #1",
      youtubeId: "TI8SpyOR21g",
      thumbnail: `https://img.youtube.com/vi/TI8SpyOR21g/maxresdefault.jpg`,
      description: "Mon dernier clip officiel qui cartonne sur YouTube !",
      views: "50K+ vues"
    },
    {
      title: "Performance Live",
      youtubeId: "bRc272Eoqnc", 
      thumbnail: `https://img.youtube.com/vi/bRc272Eoqnc/maxresdefault.jpg`,
      description: "Une performance live inoubliable qui a fait danser toute la salle.",
      views: "25K+ vues"
    }
  ];

  const openVideo = (index: number) => {
    setSelectedVideo(index);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="videos" className="py-12 md:py-20 px-4 md:px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="gradient-text">Mes Vidéos</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Plongez dans l'univers visuel de Kerozen DJ avec mes clips officiels 
            et performances live qui capturent l'essence de ma musique.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl music-card cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openVideo(index)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-deep-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-neon neon-glow group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-warm-white mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm md:text-base text-warm-white/80 mb-2 md:mb-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-primary font-medium">
                    {video.views}
                  </span>
                  <div className="flex items-center text-warm-white/60">
                    <Youtube className="w-4 h-4 mr-1" />
                    <span className="text-xs md:text-sm">YouTube</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-gold/10 rounded-xl md:rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="music-card p-6 md:p-8 inline-block">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 gradient-text">
              Plus de contenu sur YouTube
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-md mx-auto">
              Abonnez-vous à ma chaîne pour ne manquer aucune de mes nouvelles vidéos et performances !
            </p>
            <Button
              className="hero-button group text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
              onClick={() => window.open('https://youtube.com/@kerozendj', '_blank')}
            >
              <Youtube className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Ma Chaîne YouTube
            </Button>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-deep-black/95 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-8 md:-top-12 right-0 text-warm-white hover:text-primary z-10"
                onClick={closeVideo}
              >
                <span className="text-2xl md:text-3xl">×</span>
              </Button>

              {/* Video Container */}
              <div className="relative bg-card rounded-lg md:rounded-xl overflow-hidden shadow-neon">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videos[selectedVideo].youtubeId}?autoplay=1&rel=0`}
                    title={videos[selectedVideo].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                {/* Video Info */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    {videos[selectedVideo].title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                    {videos[selectedVideo].description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs md:text-sm text-primary font-medium">
                      {videos[selectedVideo].views}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/40 text-primary hover:bg-primary/10 text-xs md:text-sm"
                      onClick={() => window.open(`https://youtube.com/watch?v=${videos[selectedVideo].youtubeId}`, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Voir sur YouTube
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;