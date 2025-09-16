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
    <section id="music" className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-neon-orange blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-neon-gold blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Ma Musique</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez mes dernières créations, des rythmes Coupé-Décalé authentiques 
            aux Afrobeats modernes qui font vibrer les dancefloors.
          </p>
        </div>

        {/* Music Player Cards */}
        <div className="space-y-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="music-card p-8 group hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Play Button */}
                  <Button
                    className="w-16 h-16 rounded-full hero-button flex items-center justify-center group-hover:scale-110 transition-transform"
                    onClick={() => handlePlay(index, track.url)}
                  >
                    {currentPlaying === index ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </Button>

                  {/* Track Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {track.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        {track.genre}
                      </span>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Music2 className="w-4 h-4 mr-1" />
                        SoundCloud
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Link */}
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/40 text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={() => window.open(track.url, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>

              {/* Waveform Visual */}
              <div className="mt-6 flex items-end justify-center space-x-1 h-12 opacity-30 group-hover:opacity-60 transition-opacity">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
                    style={{
                      width: '3px',
                      height: `${Math.random() * 40 + 10}px`,
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
        <div className="mt-16 text-center">
          <div className="music-card p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Retrouvez toute ma musique sur SoundCloud
            </h3>
            <p className="text-muted-foreground mb-6">
              Suivez-moi pour ne manquer aucune nouveauté et découvrir mes derniers hits !
            </p>
            <Button
              className="hero-button"
              onClick={() => window.open('https://soundcloud.com/kerozen-dj', '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visiter mon SoundCloud
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;