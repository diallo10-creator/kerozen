import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Input validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to database
      const { error } = await supabase
        .from('contacts')
        .insert({
          nom: formData.name.trim(),
          email: formData.email.trim(),
          telephone: '', // Optional field
          message: formData.message.trim(),
          status: 'nouveau'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Salut Kerozen DJ ! J'aimerais discuter avec toi.");
    window.open(`https://wa.me/2250102828245?text=${message}`, '_blank');
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Contact depuis votre portfolio");
    const body = encodeURIComponent("Bonjour Kerozen DJ,\n\nJ'aimerais vous contacter concernant...\n\nCordialement,");
    window.location.href = `mailto:yobojoel@hotmail.fr?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-neon-orange blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-neon-gold blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Contactez-moi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prêt à faire vibrer votre événement ? Parlons de votre projet musical ! 
            Je suis disponible pour des collaborations, événements et prestations DJ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="music-card p-6">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Parlons Musique !
              </h3>
              
              <div className="space-y-6">
                {/* WhatsApp */}
                <div 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-muted/10 hover:bg-primary/10 transition-colors cursor-pointer group"
                  onClick={openWhatsApp}
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">WhatsApp</h4>
                    <p className="text-muted-foreground">+225 01 02 82 82 45</p>
                    <p className="text-sm text-green-400">Réponse rapide garantie !</p>
                  </div>
                </div>

                {/* Email */}
                <div 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-muted/10 hover:bg-primary/10 transition-colors cursor-pointer group"
                  onClick={sendEmail}
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">yobojoel@hotmail.fr</p>
                    <p className="text-sm text-primary">Pour les demandes détaillées</p>
                  </div>
                </div>

                {/* Services */}
                <div className="p-4 rounded-lg bg-muted/10">
                  <h4 className="font-semibold text-foreground mb-3">Mes Services</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-center">DJ Événements</span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-center">Mariages</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-center">Soirées Privées</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-center">Festivals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 hero-button h-14"
                onClick={openWhatsApp}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Direct
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 h-14 border-primary/40 text-primary hover:bg-primary/10"
                onClick={sendEmail}
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyer un Email
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="music-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Envoyez-moi un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sujet *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hero-button h-12"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              Temps de réponse habituel : 24h maximum ⚡
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;