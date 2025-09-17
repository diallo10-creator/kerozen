import { Play, Pause, ExternalLink, Music2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MusicSection = () => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const tracks = [
    {
      title: "Mon Heure A Sonné",
      url: "/audio/kerozen-mon-heure.m4a",
      description: "Le dernier hit de Kerozen DJ",
      genre: "Coupé-Décalé"
    },
    {
      title: "C'est Son Temps",
      url: "/audio/kerozen-son-temps.m4a",
      description: "Un mélange explosif d'Afrobeats moderne",
      genre: "Afrobeats"
    }
  ];

  const handlePlay = (index: number, url: string) => {
    if (currentPlaying === index) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(index);
      // Create audio element and play local file
      const audio = new Audio(url);
      audio.play().catch(console.error);
    }
  };

  return (
    <section id="music" className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 md:top-20 left-4 md:left-10 w-32 md:w-40 h-32 md:h-40 rounded-full bg-neon-orange blur-3xl animate-pulse" />
        <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-40 md:w-60 h-40 md:h-60 rounded-full bg-neon-gold blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="gradient-text">Ma Musique</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Explorez mes dernières créations, des rythmes Coupé-Décalé authentiques 
            aux Afrobeats modernes qui font vibrer les dancefloors.
          </p>
        </div>

        {/* Music Player Cards */}
        <div className="space-y-6 md:space-y-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="music-card p-4 md:p-6 lg:p-8 group hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto">
                  {/* Play Button */}
                  <Button
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full hero-button flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
                    onClick={() => handlePlay(index, track.url)}
                  >
                    {currentPlaying === index ? (
                      <Pause className="w-5 h-5 md:w-8 md:h-8" />
                    ) : (
                      <Play className="w-5 h-5 md:w-8 md:h-8 ml-0.5 md:ml-1" />
                    )}
                  </Button>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-2 md:mb-3">
                      {track.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <span className="px-2 md:px-3 py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm font-medium">
                        {track.genre}
                      </span>
                      <div className="flex items-center text-muted-foreground text-xs md:text-sm">
                        <Music2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        Audio Local
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Link */}
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/40 text-primary hover:bg-primary/10 opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                  onClick={() => window.open(track.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>

              {/* Waveform Visual */}
              <div className="mt-4 md:mt-6 flex items-end justify-center space-x-0.5 md:space-x-1 h-8 md:h-12 opacity-20 md:opacity-30 group-hover:opacity-60 transition-opacity overflow-hidden">
                {Array.from({ length: window.innerWidth < 768 ? 30 : 50 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
                    style={{
                      width: window.innerWidth < 768 ? '2px' : '3px',
                      height: `${Math.random() * (window.innerWidth < 768 ? 20 : 40) + (window.innerWidth < 768 ? 5 : 10)}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${Math.random() * 2 + 1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SoundCloud Widget */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="music-card p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 gradient-text">
              Retrouvez toute ma musique sur SoundCloud
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-4">
              Suivez-moi pour ne manquer aucune nouveauté et découvrir mes derniers hits !
            </p>
            <Button
              className="hero-button text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
              onClick={() => window.open('https://soundcloud.com/kerozen-dj', '_blank')}
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Visiter mon SoundCloud
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;