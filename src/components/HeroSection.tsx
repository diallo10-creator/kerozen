import { Play, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-kerozen.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Kerozen DJ Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-neon-orange/20 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-neon-gold/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">KEROZEN</span>
            <br />
            <span className="text-foreground">DJ</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Artiste ivoirien passionné, je fais vibrer les dancefloors avec mes sons 
            <span className="text-primary font-semibold"> Coupé-Décalé </span> 
            et 
            <span className="text-secondary font-semibold"> Afrobeats</span>. 
            Ma mission : faire danser l'Afrique et le monde entier !
          </p>

          <div className="mb-12 p-6 music-card max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-foreground">🎵 Style Musical</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Coupé-Décalé
              </span>
              <span className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                Afrobeats
              </span>
              <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
                Musique Africaine
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="hero-button group text-lg px-8 py-4"
              onClick={() => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Écouter ma Musique
            </Button>
            
            <Button 
              variant="outline" 
              className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-4 text-lg backdrop-blur-sm"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Me Contacter
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5+</div>
            <div className="text-muted-foreground">Années d'Expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100K+</div>
            <div className="text-muted-foreground">Fans sur les Réseaux</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-muted-foreground">Événements Animés</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;