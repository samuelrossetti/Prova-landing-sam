import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const RECIPIENT = "samuelricevimento@gmail.com";

function createTransporter() {
  const user = process.env["EMAIL_USER"];
  const pass = process.env["EMAIL_PASS"];

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

router.post("/email/lead", async (req, res) => {
  const { name, phone, email } = req.body as {
    name?: string;
    phone?: string;
    email?: string;
  };

  if (!name || !phone || !email) {
    res.status(400).json({ error: "Campi mancanti." });
    return;
  }

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Sito Samuel Rossetti" <${process.env["EMAIL_USER"]}>`,
        to: RECIPIENT,
        subject: `Nuovo lead caso studio — ${name}`,
        html: `
          <h2>Nuovo lead dal caso studio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Telefono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          <p style="color:#888;font-size:12px">Inviato dal sito samuelrossetti.it</p>
        `,
      });
    } catch (err) {
      req.log.error({ err }, "Errore invio email lead");
    }
  } else {
    req.log.warn("EMAIL_USER / EMAIL_PASS non configurati — email non inviata");
  }

  res.json({ ok: true });
});

router.post("/email/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Campi mancanti." });
    return;
  }

  const transporter = createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Sito Samuel Rossetti" <${process.env["EMAIL_USER"]}>`,
        to: RECIPIENT,
        subject: `Nuovo messaggio di contatto — ${name}`,
        html: `
          <h2>Nuovo messaggio dal modulo di contatto</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Messaggio:</strong></p>
          <blockquote style="border-left:3px solid #c84b0f;padding-left:12px;color:#555">
            ${message.replace(/\n/g, "<br/>")}
          </blockquote>
          <hr/>
          <p style="color:#888;font-size:12px">Inviato dal sito samuelrossetti.it</p>
        `,
      });
    } catch (err) {
      req.log.error({ err }, "Errore invio email contatto");
    }
  } else {
    req.log.warn("EMAIL_USER / EMAIL_PASS non configurati — email non inviata");
  }

  res.json({ ok: true });
});

export default router;
