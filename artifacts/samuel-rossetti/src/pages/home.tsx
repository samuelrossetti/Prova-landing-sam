import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  LineChart, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Search, 
  Star, 
  Target, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// --- CONTACT FORM SCHEMA ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri." }),
  email: z.string().email({ message: "Inserisci un'email valida." }),
  message: z.string().min(10, { message: "Il messaggio deve avere almeno 10 caratteri." }),
});

export default function Home() {
  const { toast } = useToast();
  const contactRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Richiesta inviata con successo!",
      description: "Ti ricontatterò entro 24 ore.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-tight text-foreground">
            Samuel Rossetti<span className="text-primary">.</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#come-funziona" className="hover:text-foreground transition-colors">Come Funziona</a>
            <a href="#servizi" className="hover:text-foreground transition-colors">Servizi</a>
            <a href="#recensioni" className="hover:text-foreground transition-colors">Risultati</a>
          </nav>
          <Button onClick={scrollToContact} data-testid="button-nav-contact" className="font-medium">
            Parliamone
          </Button>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Accetto 2 nuovi clienti questo mese
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-serif text-foreground leading-[1.1] mb-6 tracking-tight">
                  Più clienti. Zero chiacchiere. <br className="hidden md:block"/> 
                  <span className="text-primary italic">Risultati concreti</span> per la tua attività.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Aiuto attività locali e liberi professionisti a costruire un sistema prevedibile per acquisire nuovi clienti ogni mese. Senza sprecare budget, senza termini incomprensibili.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto text-base h-14 px-8"
                    onClick={scrollToContact}
                    data-testid="button-hero-cta"
                  >
                    Scopri come posso aiutarti
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-12 border-y border-border bg-card">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { number: "50+", label: "Clienti Soddisfatti" },
                { number: "€2M+", label: "Fatturato Generato" },
                { number: "4.9/5", label: "Media Recensioni" },
                { number: "100%", label: "Focus sui Risultati" }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS / PROCESS */}
        <section id="come-funziona" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Il mio metodo di lavoro</h2>
              <p className="text-lg text-muted-foreground">Niente pacchetti standard. Un processo in 4 fasi per trasformare perfetti sconosciuti in clienti paganti.</p>
            </div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: Search,
                  title: "1. Analisi Iniziale",
                  desc: "Studiamo il tuo mercato, i tuoi competitor e capiamo cosa cercano davvero i tuoi clienti."
                },
                {
                  icon: Target,
                  title: "2. Strategia su Misura",
                  desc: "Costruiamo un piano d'azione basato sui tuoi obiettivi. Solo le piattaforme che portano ROI."
                },
                {
                  icon: TrendingUp,
                  title: "3. Lancio & Ottimizzazione",
                  desc: "Attiviamo le campagne e monitoriamo ogni centesimo per massimizzare le conversioni."
                },
                {
                  icon: LineChart,
                  title: "4. Scala i Risultati",
                  desc: "Quando il sistema è profittevole, aumentiamo la spinta per dominare il tuo mercato locale."
                }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="relative group">
                  <div className="absolute inset-0 bg-card rounded-2xl shadow-sm border border-border transition-all duration-300 group-hover:shadow-md group-hover:border-primary/50"></div>
                  <div className="relative p-8">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-serif mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servizi" className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                className="lg:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Cosa posso fare per te</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Sono specializzato nel portare risultati misurabili. Non mi limito a "farti i post su Facebook". Costruisco macchine per acquisire clienti.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Google Ads", desc: "Fatti trovare esattamente nel momento in cui le persone cercano i tuoi servizi." },
                    { title: "Meta Ads (Facebook & Instagram)", desc: "Stimola la domanda latente e attira un flusso costante di nuove persone interessate." },
                    { title: "SEO Locale", desc: "Domina le ricerche su Google Maps nella tua città." },
                    { title: "Funnel di Acquisizione", desc: "Pagine studiate psicologicamente per trasformare i clic in appuntamenti o vendite." }
                  ].map((service, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{service.title}</h4>
                        <p className="text-muted-foreground">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="lg:w-1/2 relative">
                <div className="aspect-square bg-primary/5 rounded-full absolute -inset-4 blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-8">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-border">
                      <BarChart3 className="h-8 w-8 text-primary mb-4" />
                      <div className="text-2xl font-bold">+140%</div>
                      <div className="text-sm text-muted-foreground">Contatti mensili</div>
                    </div>
                    <div className="bg-primary p-6 rounded-2xl shadow-sm text-primary-foreground">
                      <Users className="h-8 w-8 mb-4 opacity-80" />
                      <div className="text-2xl font-bold">5x</div>
                      <div className="text-sm opacity-80">Ritorno sull'investimento</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background p-6 rounded-2xl shadow-sm border border-border">
                      <MapPin className="h-8 w-8 text-primary mb-4" />
                      <div className="text-2xl font-bold">Top 3</div>
                      <div className="text-sm text-muted-foreground">Su Google Maps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="recensioni" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Chi ha lavorato con me</h2>
              <p className="text-lg text-muted-foreground">Imprenditori che hanno smesso di sperare nel passaparola.</p>
            </div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  text: "Eravamo stanchi di affidarci al caso e sperare che entrasse qualcuno. Samuel ha creato una campagna locale che ha letteralmente riempito i nostri tavoli anche il martedì sera.",
                  name: "Marco S.",
                  role: "Titolare di Ristorante"
                },
                {
                  text: "Cercavo un professionista serio, non la solita web agency che ti fa il sito e sparisce. In 3 mesi le mie consulenze private sono raddoppiate grazie a Google Ads.",
                  name: "Elena M.",
                  role: "Avvocato Freelance"
                },
                {
                  text: "I contatti arrivano ogni singolo giorno. Abbiamo dovuto assumere due nuovi trainer per gestire le iscrizioni in palestra. Il miglior investimento fatto finora.",
                  name: "Giorgio T.",
                  role: "Titolare Palestra"
                }
              ].map((testimonial, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-card p-8 rounded-2xl border border-border relative">
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA & CONTACT FORM */}
        <section ref={contactRef} className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row text-foreground">
              
              <div className="md:w-1/2 p-10 md:p-14 bg-background">
                <h2 className="text-3xl font-serif font-bold mb-4">Pronto a riempire la tua agenda?</h2>
                <p className="text-muted-foreground mb-8">
                  Raccontami brevemente di cosa ti occupi. Ti risponderò per fissare una chiamata conoscitiva gratuita e senza impegno di 15 minuti.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+39 345 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>samuel@rossettidigital.it</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-10 md:p-14 border-t md:border-t-0 md:border-l border-border bg-card">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Mario Rossi" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="mario@esempio.it" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parlane del tuo business</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Quali sono i tuoi obiettivi attuali?" 
                              className="resize-none h-24"
                              {...field} 
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-12 text-base" data-testid="button-submit-contact">
                      Invia Richiesta
                    </Button>
                  </form>
                </Form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-serif text-xl font-bold text-foreground mb-2">Samuel Rossetti<span className="text-primary">.</span></div>
            <p className="text-sm text-muted-foreground">Esperto in acquisizione clienti in Italia.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Samuel Rossetti. Tutti i diritti riservati.<br/>
            P.IVA 12345678901
          </div>
        </div>
      </footer>
    </div>
  );
}
