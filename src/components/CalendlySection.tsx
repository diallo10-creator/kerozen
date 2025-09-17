import React, { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

const CalendlySection = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="calendly" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">Réservez un Rendez-vous</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Planifiez facilement une rencontre, un événement ou une collaboration. 
            Choisissez le créneau qui vous convient le mieux.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-neon border border-border overflow-hidden">
            {/* Calendly Widget Container */}
            <div className="relative">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/kerozen-dj/consultation"
                style={{ 
                  minWidth: '280px', 
                  width: '100%',
                  height: '600px'
                }}
              ></div>
              
              {/* Fallback for mobile - Direct link */}
              <div className="md:hidden absolute inset-0 bg-card/90 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  Rendez-vous Mobile
                </h3>
                <p className="text-muted-foreground mb-6">
                  Pour une meilleure expérience sur mobile, utilisez le lien direct :
                </p>
                <a 
                  href="https://calendly.com/kerozen-dj/consultation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Ouvrir Calendly
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm text-muted-foreground">
              Vous n'arrivez pas à voir le calendrier ? 
              <a 
                href="https://calendly.com/kerozen-dj/consultation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 ml-1 underline"
              >
                Ouvrir dans un nouvel onglet
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;