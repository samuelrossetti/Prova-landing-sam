import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  LineChart,
  Lock,
  MessageCircle,
  Phone,
  Play,
  Search,
  Star,
  Target,
  TrendingUp,
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// --- LEAD CAPTURE SCHEMA ---
const leadSchema = z.object({
  name: z.string().min(2, { message: "Inserisci il tuo nome (almeno 2 caratteri)." }),
  phone: z
    .string()
    .min(8, { message: "Inserisci un numero di telefono valido." })
    .regex(/^[0-9+\s\-()]+$/, { message: "Formato non valido." }),
  email: z.string().email({ message: "Inserisci un'email valida." }),
});

// --- CONTACT FORM SCHEMA ---
const contactSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve avere almeno 2 caratteri." }),
  email: z.string().email({ message: "Inserisci un'email valida." }),
  message: z.string().min(10, { message: "Il messaggio deve avere almeno 10 caratteri." }),
});

export default function Home() {
  const { toast } = useToast();
  const contactRef = useRef<HTMLElement>(null);
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const leadForm = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onLeadSubmit(values: z.infer<typeof leadSchema>) {
    console.log("Lead captured:", values);
    setVideoUnlocked(true);
    toast({
      title: "Video sbloccato!",
      description: "Guarda ora il caso studio di Federico.",
    });
  }

  function onContactSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast({
      title: "Richiesta inviata con successo!",
      description: "Ti ricontatterò entro 24 ore.",
    });
    contactForm.reset();
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
            <a href="#caso-studio" className="hover:text-foreground transition-colors">
              Caso Studio
            </a>
            <a href="#come-funziona" className="hover:text-foreground transition-colors">
              Come Funziona
            </a>
            <a href="#recensioni" className="hover:text-foreground transition-colors">
              Risultati
            </a>
          </nav>
          <Button
            onClick={scrollToContact}
            data-testid="button-nav-contact"
            className="font-medium"
          >
            Parliamone
          </Button>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>

          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Accetto 2 nuovi clienti questo mese
                </div>
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground leading-[1.1] mb-6 tracking-tight">
                  Ecco come Federico ha{" "}
                  <span className="text-primary italic">aumentato il fatturato</span>{" "}
                  grazie al metodo a 4 step del{" "}
                  <span className="text-primary">Codice del Fatturato</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                  Aiuto attività locali e liberi professionisti a costruire un sistema
                  prevedibile per acquisire nuovi clienti ogni mese.
                </p>
                <p className="text-base font-semibold text-primary mb-10 tracking-wide uppercase">
                  Guarda il caso studio gratuito
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base h-14 px-8"
                    onClick={() => {
                      document
                        .getElementById("caso-studio")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-testid="button-hero-cta"
                  >
                    Scopri il caso studio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VIDEO CASE STUDY — GATED */}
        <section id="caso-studio" className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                  Il Caso Studio di Federico
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Da zero nuovi contatti online a un sistema che genera clienti ogni settimana.
                  Guarda come ci siamo riusciti.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-background">
                {/* VIDEO PLACEHOLDER */}
                <div className="relative aspect-video bg-foreground/5">
                  {/* Blurred thumbnail overlay when locked */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${
                      videoUnlocked ? "" : "blur-sm scale-105"
                    }`}
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--muted)/0.4) 100%)",
                    }}
                  />

                  {/* Fake video frame lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {videoUnlocked ? (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-4 opacity-60" />
                          <p className="text-lg font-medium opacity-70">
                            Caso Studio — Federico & il Codice del Fatturato
                          </p>
                          <p className="text-sm opacity-50 mt-2">
                            Sostituisci questo segnaposto con il link al video reale
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center px-6">
                        <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center mx-auto mb-4 border border-primary/30">
                          <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-foreground font-bold text-xl mb-1">
                          Video riservato
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Lascia i tuoi contatti per sbloccare il caso studio gratuito
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* LEAD CAPTURE GATE */}
                <AnimatePresence>
                  {!videoUnlocked && (
                    <motion.div
                      key="lead-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-8 md:p-10 border-t border-border"
                    >
                      <div className="max-w-2xl mx-auto">
                        <p className="text-center text-foreground font-semibold mb-6 text-lg">
                          Inserisci i tuoi dati per accedere gratuitamente al caso studio
                        </p>
                        <Form {...leadForm}>
                          <form
                            onSubmit={leadForm.handleSubmit(onLeadSubmit)}
                            className="grid md:grid-cols-3 gap-4"
                          >
                            <FormField
                              control={leadForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Es. Mario Rossi"
                                      {...field}
                                      data-testid="input-lead-name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={leadForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telefono</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Es. +39 345 123 4567"
                                      type="tel"
                                      {...field}
                                      data-testid="input-lead-phone"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={leadForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="mario@esempio.it"
                                      type="email"
                                      {...field}
                                      data-testid="input-lead-email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="md:col-span-3">
                              <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold"
                                data-testid="button-unlock-video"
                              >
                                <Play className="mr-2 h-5 w-5" />
                                Sblocca il caso studio gratuito
                              </Button>
                              <p className="text-center text-xs text-muted-foreground mt-3">
                                Nessuno spam. Puoi disiscriverti in qualsiasi momento.
                              </p>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUCCESS STATE AFTER UNLOCK */}
                <AnimatePresence>
                  {videoUnlocked && (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 border-t border-border bg-primary/5 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        Caso studio sbloccato — buona visione!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-12 border-b border-border bg-background">
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
                { number: "100%", label: "Focus sui Risultati" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS / PROCESS */}
        <section id="come-funziona" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Il Codice del Fatturato
              </h2>
              <p className="text-lg text-muted-foreground">
                Niente pacchetti standard. Un processo in 5 fasi per trasformare perfetti
                sconosciuti in clienti paganti.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: Search,
                  title: "1. Analisi Iniziale",
                  desc: "Studiamo il tuo mercato, i tuoi competitor e capiamo cosa cercano davvero i tuoi clienti.",
                },
                {
                  icon: Target,
                  title: "2. Strategia su Misura",
                  desc: "Costruiamo un piano d'azione basato sui tuoi obiettivi. Solo le piattaforme che portano ROI.",
                },
                {
                  icon: TrendingUp,
                  title: "3. Lancio & Ottimizzazione",
                  desc: "Attiviamo le campagne e monitoriamo ogni centesimo per massimizzare le conversioni.",
                },
                {
                  icon: BarChart2,
                  title: "4. Monitoraggio delle KPI",
                  desc: "Teniamo sotto controllo i dati chiave: costo per lead, tasso di conversione, ritorno sull'investimento. Nessuna sorpresa.",
                },
                {
                  icon: LineChart,
                  title: "5. Scala i Risultati",
                  desc: "Quando il sistema è profittevole, aumentiamo la spinta per dominare il tuo mercato locale.",
                },
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="relative group">
                  <div className="absolute inset-0 bg-card rounded-2xl shadow-sm border border-border transition-all duration-300 group-hover:shadow-md group-hover:border-primary/50"></div>
                  <div className="relative p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold font-serif mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="recensioni" className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Chi ha lavorato con me
              </h2>
              <p className="text-lg text-muted-foreground">
                Imprenditori che hanno smesso di sperare nel passaparola.
              </p>
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
                  role: "Titolare di Ristorante",
                },
                {
                  text: "Cercavo un professionista serio, non la solita web agency che ti fa il sito e sparisce. In 3 mesi le mie consulenze private sono raddoppiate grazie a Google Ads.",
                  name: "Elena M.",
                  role: "Avvocato Freelance",
                },
                {
                  text: "I contatti arrivano ogni singolo giorno. Abbiamo dovuto assumere due nuovi trainer per gestire le iscrizioni in palestra. Il miglior investimento fatto finora.",
                  name: "Giorgio T.",
                  role: "Titolare Palestra",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-background p-8 rounded-2xl border border-border relative"
                >
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
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
        <section
          ref={contactRef}
          className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row text-foreground">
              <div className="md:w-1/2 p-10 md:p-14 bg-background">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Pronto a riempire la tua agenda?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Raccontami brevemente di cosa ti occupi. Ti risponderò per fissare una
                  chiamata conoscitiva gratuita e senza impegno di 15 minuti.
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
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit(onContactSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Es. Mario Rossi"
                              {...field}
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="mario@esempio.it"
                              {...field}
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parlami del tuo business</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Quali sono i tuoi obiettivi attuali?"
                              className="resize-none h-24"
                              {...field}
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                      data-testid="button-submit-contact"
                    >
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
            <div className="font-serif text-xl font-bold text-foreground mb-2">
              Samuel Rossetti<span className="text-primary">.</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Esperto in acquisizione clienti in Italia.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Samuel Rossetti. Tutti i diritti riservati.
            <br />
            P.IVA 12345678901
          </div>
        </div>
      </footer>
    </div>
  );
}
