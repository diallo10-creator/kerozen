import React from 'react';

const CalendlySection = () => {
  return (
    <section id="calendly" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Réservez un Rendez-vous
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planifiez facilement une rencontre, un événement ou une collaboration. 
            Choisissez le créneau qui vous convient le mieux.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-neon border border-border overflow-hidden">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/votre-calendly-username"
              style={{ minWidth: '320px', height: '630px' }}
            >
              <script 
                type="text/javascript" 
                src="https://assets.calendly.com/assets/external/widget.js" 
                async
              ></script>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Vous n'arrivez pas à voir le calendrier ? 
              <a 
                href="https://calendly.com/votre-calendly-username" 
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