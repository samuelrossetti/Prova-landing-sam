import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </Button>
          <div className="font-serif text-lg font-bold text-foreground">
            Samuel Rossetti<span className="text-primary">.</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-10"
        >
          {/* TITLE */}
          <motion.div variants={fadeUp} className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                Privacy Policy & Cookie Policy
              </h1>
              <p className="text-muted-foreground">
                Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="prose prose-neutral max-w-none space-y-8 text-foreground">

            {/* 1 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">1. Titolare del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il Titolare del trattamento dei dati personali è <strong className="text-foreground">Samuel Rossetti</strong>,
                con sede in Italia. Per qualsiasi comunicazione relativa alla privacy puoi scrivere a:{" "}
                <a href="mailto:samuel@rossettidigital.it" className="text-primary underline underline-offset-4">
                  samuel@rossettidigital.it
                </a>
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">2. Dati Raccolti e Finalità del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Il presente sito raccoglie dati personali nelle seguenti circostanze:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Modulo di sblocco caso studio",
                    desc: "Nome, numero di telefono e indirizzo email. Finalità: fornire accesso al contenuto video richiesto e, previo consenso, inviare comunicazioni commerciali relative ai servizi offerti.",
                  },
                  {
                    title: "Modulo di contatto",
                    desc: "Nome, indirizzo email e messaggio libero. Finalità: rispondere alle richieste di informazioni e instaurare una comunicazione precontrattuale.",
                  },
                  {
                    title: "Dati di navigazione",
                    desc: "Indirizzo IP, tipo di browser, sistema operativo, pagine visitate e orari di accesso. Raccolti automaticamente dai sistemi informatici per garantire il corretto funzionamento del sito.",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">3. Base Giuridica del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il trattamento dei dati personali si fonda sulle seguenti basi giuridiche ai sensi dell'art. 6 del
                Regolamento (UE) 2016/679 (GDPR):
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
                <li><strong className="text-foreground">Esecuzione di misure precontrattuali</strong> — per rispondere alle richieste di contatto (art. 6, par. 1, lett. b).</li>
                <li><strong className="text-foreground">Consenso dell'interessato</strong> — per l'invio di comunicazioni promozionali (art. 6, par. 1, lett. a).</li>
                <li><strong className="text-foreground">Legittimo interesse</strong> — per la sicurezza del sito e la prevenzione di frodi (art. 6, par. 1, lett. f).</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">4. Conservazione dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati raccolti tramite i moduli del sito sono conservati per il tempo strettamente necessario a
                soddisfare le finalità per cui sono stati raccolti e, comunque, non oltre <strong className="text-foreground">24 mesi</strong>{" "}
                dall'ultima interazione. I dati di navigazione vengono cancellati automaticamente entro 12 mesi.
                Alla scadenza del periodo di conservazione, i dati saranno cancellati o anonimizzati in modo irreversibile.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">5. Condivisione dei Dati con Terze Parti</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati personali non vengono venduti né ceduti a terze parti per finalità commerciali proprie.
                Potranno essere comunicati esclusivamente a:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
                <li>Fornitori di servizi tecnici (hosting, email) che agiscono in qualità di Responsabili del trattamento ai sensi dell'art. 28 GDPR.</li>
                <li>Autorità competenti, qualora richiesto dalla legge.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">6. Diritti dell'Interessato</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Ai sensi degli artt. 15–22 del GDPR, hai il diritto di:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Accedere ai tuoi dati personali",
                  "Rettificare dati inesatti o incompleti",
                  "Richiedere la cancellazione (diritto all'oblio)",
                  "Limitare il trattamento dei tuoi dati",
                  "Opporti al trattamento per finalità di marketing",
                  "Richiedere la portabilità dei dati",
                  "Revocare il consenso in qualsiasi momento",
                  "Proporre reclamo al Garante Privacy (www.garanteprivacy.it)",
                ].map((right, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{right}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                Per esercitare i tuoi diritti scrivi a{" "}
                <a href="mailto:samuel@rossettidigital.it" className="text-primary underline underline-offset-4">
                  samuel@rossettidigital.it
                </a>. Risponderemo entro 30 giorni.
              </p>
            </section>

            {/* 7 — COOKIE */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">7. Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Il sito utilizza cookie e tecnologie di tracciamento simili ai sensi del D.Lgs. 196/2003 e della Direttiva
                ePrivacy 2009/136/CE (recepita in Italia).
              </p>
              <div className="space-y-3">
                {[
                  {
                    type: "Cookie tecnici / di sessione",
                    necessity: "Necessari",
                    desc: "Indispensabili per il funzionamento del sito. Non richiedono consenso.",
                    color: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
                  },
                  {
                    type: "Cookie analitici (Google Analytics)",
                    necessity: "Con consenso",
                    desc: "Raccolgono dati aggregati e anonimi sulle visite per migliorare il sito.",
                    color: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
                  },
                  {
                    type: "Pixel di Meta (Facebook/Instagram)",
                    necessity: "Con consenso",
                    desc: "Traccia le azioni degli utenti per ottimizzare le campagne pubblicitarie su Meta.",
                    color: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
                  },
                ].map((cookie, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{cookie.type}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cookie.color}`}>
                        {cookie.necessity}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cookie.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                Puoi gestire o disabilitare i cookie in qualsiasi momento dalle impostazioni del tuo browser.
                La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">8. Trasferimento dei Dati Extra-UE</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alcuni fornitori di servizi (es. Google, Meta) potrebbero trasferire dati al di fuori dell'Unione Europea.
                In tali casi, il trasferimento avviene nel rispetto delle garanzie previste dal GDPR (artt. 44–49), come le
                Clausole Contrattuali Standard approvate dalla Commissione Europea.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-serif font-bold text-foreground mb-3">9. Modifiche alla Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento.
                Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in cima al documento.
                Ti invitiamo a consultare periodicamente questa pagina.
              </p>
            </section>

          </motion.div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Samuel Rossetti. Tutti i diritti riservati. &mdash; P.IVA 12345678901
        </div>
      </footer>
    </div>
  );
}
