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
    <section id="videos" className="py-20 px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Mes Vidéos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plongez dans l'univers visuel de Kerozen DJ avec mes clips officiels 
            et performances live qui capturent l'essence de ma musique.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group music-card overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openVideo(index)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-deep-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center neon-glow">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Views Badge */}
                <div className="absolute top-4 right-4 bg-deep-black/80 text-warm-white px-3 py-1 rounded-full text-sm font-medium">
                  {video.views}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent">
                    <Youtube className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">YouTube</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-glow opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://youtu.be/${video.youtubeId}`, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Voir sur YouTube
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="text-center">
          <div className="music-card p-8 max-w-2xl mx-auto">
            <Youtube className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Abonnez-vous à ma chaîne YouTube
            </h3>
            <p className="text-muted-foreground mb-6">
              Soyez les premiers à découvrir mes nouveaux clips, performances live 
              et contenus exclusifs !
            </p>
            <Button
              className="hero-button"
              onClick={() => window.open('https://youtube.com/@kerozen-dj', '_blank')}
            >
              <Youtube className="w-5 h-5 mr-2" />
              S'abonner maintenant
            </Button>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/95 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-warm-white hover:text-primary z-10"
                onClick={closeVideo}
              >
                ✕
              </Button>

              {/* Video Player */}
              <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videos[selectedVideo].youtubeId}?autoplay=1`}
                  title={videos[selectedVideo].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-warm-white mb-2">
                  {videos[selectedVideo].title}
                </h3>
                <p className="text-muted-foreground">
                  {videos[selectedVideo].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;