import { Play, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-kerozen.jpg';
import heroPortrait from '@/assets/kerozen-hero.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-0">
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
      <div className="absolute top-20 left-4 md:left-10 w-16 md:w-20 h-16 md:h-20 rounded-full bg-neon-orange/20 blur-xl animate-float" />
      <div className="absolute bottom-32 right-4 md:right-20 w-24 md:w-32 h-24 md:h-32 rounded-full bg-neon-gold/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 md:w-16 h-12 md:h-16 rounded-full bg-accent/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
              <span className="gradient-text">KEROZEN</span>
              <br />
              <span className="text-foreground">DJ</span>
            </h1>
          
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Artiste ivoirien passionné, je fais vibrer les dancefloors avec mes sons 
              <span className="text-primary font-semibold"> Coupé-Décalé </span> 
              et 
              <span className="text-secondary font-semibold"> Afrobeats</span>. 
              Ma mission : faire danser l'Afrique et le monde entier !
            </p>

            <div className="mb-8 md:mb-12 p-4 md:p-6 music-card">
              <h3 className="text-base md:text-lg font-semibold mb-3 text-foreground">🎵 Style Musical</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-primary/20 text-primary rounded-full text-xs md:text-sm font-medium">
                  Coupé-Décalé
                </span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-secondary/20 text-secondary rounded-full text-xs md:text-sm font-medium">
                  Afrobeats
                </span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-accent/20 text-accent rounded-full text-xs md:text-sm font-medium">
                  Musique Africaine
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <Button 
                className="hero-button group text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                onClick={() => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 md:w-5 h-4 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Écouter ma Musique
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary/40 text-primary hover:bg-primary/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg backdrop-blur-sm"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ExternalLink className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Me Contacter
              </Button>
            </div>
          </div>

          {/* Right Content - Artist Image */}
          <div className="relative animate-fade-in-up order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-sm md:max-w-md lg:max-w-full">
              <img 
                src={heroPortrait} 
                alt="Kerozen DJ Portrait"
                className="w-full h-auto rounded-2xl md:rounded-3xl object-cover shadow-2xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-2 md:-top-4 -left-2 md:-left-4 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br from-neon-orange to-neon-gold rounded-full opacity-60 blur-xl animate-pulse" />
              <div className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-40 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-neon-orange/20 via-transparent to-neon-gold/20 opacity-75" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">5+</div>
            <div className="text-sm md:text-base text-muted-foreground">Années d'Expérience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">100K+</div>
            <div className="text-sm md:text-base text-muted-foreground">Fans sur les Réseaux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-sm md:text-base text-muted-foreground">Événements Animés</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-0.5 md:w-1 h-2 md:h-3 bg-primary rounded-full mt-1.5 md:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;