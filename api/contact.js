// ──────────────────────────────────────────────────────────
//  api/contact.js  — Vercel Serverless Function
//  HLD: API Layer — Contact form handler
//  LLD: Validates input → sends notification email to owner
//       → sends confirmation email to visitor → responds 200
//
//  Required env vars:
//    RESEND_API_KEY   — from resend.com (free tier: 3k emails/month)
//    CONTACT_EMAIL    — where to send notifications (default: srivathsavkommineni@gmail.com)
// ──────────────────────────────────────────────────────────
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Simple email regex (LLD: fail-fast validation) ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  /* ── Input validation ── */
  const { name, email, subject, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "Message is too long (max 2000 characters)" });
  }

  const ownerEmail = process.env.CONTACT_EMAIL ?? "srivathsavkommineni@gmail.com";
  const from       = "Portfolio <onboarding@resend.dev>";   // swap with verified domain later

  try {
    /* ── 1. Notify the portfolio owner ── */
    await resend.emails.send({
      from,
      to:      ownerEmail,
      subject: `💬 Portfolio Contact: ${subject?.trim() || "New message"} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#6366f1">New Portfolio Contact</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:700;color:#555">Name</td><td style="padding:8px">${name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:700;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:700;color:#555">Subject</td><td style="padding:8px">${subject?.trim() || "—"}</td></tr>
          </table>
          <h3 style="color:#555;margin-top:24px">Message</h3>
          <div style="background:#f5f5f7;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</div>
          <p style="color:#999;font-size:12px;margin-top:24px">Sent from your portfolio — ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    /* ── 2. Send confirmation to visitor ── */
    await resend.emails.send({
      from,
      to:      email,
      subject: "Got your message — I'll be in touch! 👋",
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#6366f1">Hi ${name}!</h2>
          <p>Thanks for reaching out through my portfolio. I've received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
          <blockquote style="border-left:3px solid #6366f1;margin:24px 0;padding:12px 16px;background:#f9f9f9;border-radius:0 8px 8px 0;color:#555;font-style:italic">
            "${message.slice(0, 200)}${message.length > 200 ? "…" : ""}"
          </blockquote>
          <p>In the meantime, feel free to explore my work on <a href="https://github.com/ksrivathsav" style="color:#6366f1">GitHub</a> or connect on <a href="https://www.linkedin.com/in/srivathsav-kommineni/" style="color:#6366f1">LinkedIn</a>.</p>
          <p style="margin-top:32px">Best,<br><strong>Srivathsav Kommineni</strong><br><span style="color:#888">Full Stack Engineer</span></p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Message sent! I'll be in touch soon." });

  } catch (err) {
    console.error("[api/contact] Resend error:", err.message);
    /* Graceful degradation — still acknowledge receipt */
    return res.status(500).json({ error: "Email service issue. Please email me directly at srivathsavkommineni@gmail.com" });
  }
}
