import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Calendly: any;
  }
}

interface CalendlyEventType {
  uri: string;
  name: string;
  description_plain: string;
  duration: number;
  scheduling_url: string;
}

const CalendlySection = () => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [eventTypes, setEventTypes] = useState<CalendlyEventType[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadEventTypes();
  }, []);

  const loadEventTypes = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('calendly-api', {
        body: { action: 'event-types' }
      });

      if (error) {
        console.error('Error fetching event types:', error);
        return;
      }

      if (data?.collection) {
        setEventTypes(data.collection);
        // Set default to consultation if available
        const consultationEvent = data.collection.find((et: CalendlyEventType) => 
          et.name.toLowerCase().includes('consultation')
        );
        if (consultationEvent) {
          setSelectedEventType(consultationEvent.scheduling_url);
        } else if (data.collection.length > 0) {
          setSelectedEventType(data.collection[0].scheduling_url);
        }
      }
    } catch (error) {
      console.error('Error loading event types:', error);
    }
  };

  useEffect(() => {
    if (!selectedEventType) return;
    
    let script: HTMLScriptElement | null = null;

    const loadCalendly = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      
      if (existingScript) {
        // Script already loaded, initialize widget
        initializeWidget();
        return;
      }

      // Load Calendly script
      script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      script.onload = () => {
        initializeWidget();
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly script');
        setLoadError(true);
      };
      
      document.head.appendChild(script);
    };

    const initializeWidget = () => {
      // Wait a bit for Calendly to be available
      setTimeout(() => {
        if (window.Calendly && widgetRef.current && selectedEventType) {
          try {
            // Clear previous widget
            widgetRef.current.innerHTML = '';
            
            // Initialize the inline widget with selected event type
            window.Calendly.initInlineWidget({
              url: selectedEventType,
              parentElement: widgetRef.current,
              prefill: {},
              utm: {}
            });
            setIsCalendlyLoaded(true);
          } catch (error) {
            console.error('Error initializing Calendly widget:', error);
            setLoadError(true);
          }
        }
      }, 100);
    };

    loadCalendly();

    return () => {
      // Clean up - remove script only if we added it
      if (script && script.parentElement) {
        script.parentElement.removeChild(script);
      }
    };
  }, [selectedEventType]);

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
        
        <div className="max-w-5xl mx-auto">
          {/* Event Type Selector */}
          {eventTypes.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Type de rendez-vous
              </label>
              <select 
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {eventTypes.map((eventType) => (
                  <option key={eventType.uri} value={eventType.scheduling_url}>
                    {eventType.name} ({eventType.duration} min)
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="bg-card rounded-xl shadow-neon border border-border overflow-hidden">
            {/* Calendly Widget Container */}
            <div className="relative min-h-[600px] md:min-h-[700px]">
              {!isCalendlyLoaded && !loadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement du calendrier...</p>
                  </div>
                </div>
              )}
              
              {loadError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6 text-center">
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      Calendrier temporairement indisponible
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Le calendrier ne peut pas être chargé pour le moment. 
                      Vous pouvez prendre rendez-vous directement sur Calendly.
                    </p>
                    <a 
                      href={selectedEventType || "https://calendly.com/kerozen-dj/consultation"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Ouvrir Calendly
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
              
              {/* Calendly widget will be injected here */}
              <div 
                ref={widgetRef}
                className={`w-full h-full ${isCalendlyLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm text-muted-foreground">
              Vous préférez ouvrir dans une nouvelle fenêtre ? 
              <a 
                href={selectedEventType || "https://calendly.com/kerozen-dj/consultation"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 ml-1 underline transition-colors"
              >
                Cliquez ici
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;