import { useState } from 'react';
import { Menu, X, Music, Image, Video, Phone, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Accueil', href: '#home', icon: Music },
    { name: 'Galerie', href: '#gallery', icon: Image },
    { name: 'Musique', href: '#music', icon: Music },
    { name: 'Vidéos', href: '#videos', icon: Video },
    { name: 'Contact', href: '#contact', icon: Phone },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 music-card backdrop-blur-md border-b border-neon-orange/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center neon-glow">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Kerozen DJ
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Actions */}
            {user ? (
              <Button
                variant="ghost"
                onClick={signOut}
                className="text-foreground hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-muted/10"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              
              {/* Mobile Auth Actions */}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-muted/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              ) : (
                <Link 
                  to="/auth" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-muted/10"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Admin</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;