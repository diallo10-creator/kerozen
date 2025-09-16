import { Music, Heart, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/kerozen_dj',
      color: 'hover:text-pink-400'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://youtube.com/@kerozen-dj',
      color: 'hover:text-red-400'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/kerozen.dj',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-background to-background" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-neon-orange blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full bg-neon-gold blur-2xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center neon-glow">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold gradient-text">
                Kerozen DJ
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Artiste ivoirien passionné de Coupé-Décalé et Afrobeats. 
              Je fais vibrer les dancefloors avec des sons authentiques qui font danser l'Afrique.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Navigation</h3>
            <div className="space-y-2">
              {['Accueil', 'Galerie', 'Musique', 'Vidéos', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block w-full text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-foreground mb-4">Suivez-moi</h3>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-6 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-primary/20 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📱 +225 01 02 82 82 45</p>
              <p>📧 yobojoel@hotmail.fr</p>
              <p>🌍 Côte d'Ivoire</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <span>© {currentYear} Kerozen DJ. Tous droits réservés.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              <span>pour la musique africaine</span>
            </div>
          </div>
        </div>

        {/* Music Quote */}
        <div className="text-center mt-8 pt-8 border-t border-border/10">
          <p className="text-lg font-medium gradient-text italic">
            "La musique est le langage universel qui unit les peuples"
          </p>
          <p className="text-sm text-muted-foreground mt-2">- Kerozen DJ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;