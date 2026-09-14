// ──────────────────────────────────────────────────────────
//  api/contact.js  — Vercel Serverless Function
//  Secured: rate limiting · honeypot · input validation · sanitization
//  Connected: optional webhook delivery to Slack/Discord/n8n
//
//  Required env vars:
//    RESEND_API_KEY    — resend.com
//    CONTACT_EMAIL     — notification recipient
//  Optional:
//    WEBHOOK_URL       — POST contact payload to any endpoint (Slack/Discord/Zapier/n8n)
//    WEBHOOK_SECRET    — HMAC-SHA256 signature for webhook verification
// ──────────────────────────────────────────────────────────
import { Resend }           from "resend";
import { applyRateLimit }   from "./middleware/rateLimit.js";
import { validateContact, sanitize } from "./middleware/validate.js";
import { createHmac }       from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "Portfolio <onboarding@resend.dev>";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  /* ── Rate limiting ── */
  if (applyRateLimit(req, res, "contact")) return;

  /* ── Validate + honeypot check ── */
  const body = req.body ?? {};
  const { valid, errors, silent } = validateContact(body);

  if (!valid) {
    if (silent) {
      // Honeypot triggered or spam detected — respond as if successful
      return res.status(200).json({ success: true, message: "Message sent!" });
    }
    return res.status(400).json({ error: errors?.join(". ") ?? "Invalid input" });
  }

  /* ── Sanitize inputs ── */
  const name    = sanitize(body.name);
  const email   = sanitize(body.email);
  const subject = sanitize(body.subject ?? "");
  const message = sanitize(body.message);

  const ownerEmail = process.env.CONTACT_EMAIL ?? "srivathsavkommineni@gmail.com";
  const timestamp  = new Date().toUTCString();

  /* ── 1. Deliver webhook (non-blocking, connectivity layer) ── */
  if (process.env.WEBHOOK_URL) {
    const payload = JSON.stringify({ name, email, subject, message, timestamp, source: "portfolio-contact" });
    const sig = process.env.WEBHOOK_SECRET
      ? createHmac("sha256", process.env.WEBHOOK_SECRET).update(payload).digest("hex")
      : null;

    fetch(process.env.WEBHOOK_URL, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        ...(sig ? { "X-Signature": `sha256=${sig}` } : {}),
      },
      body: payload,
    }).catch((e) => console.error("[api/contact] Webhook delivery failed:", e.message));
  }

  /* ── 2. Send emails via Resend ── */
  try {
    await Promise.all([
      /* Notify owner */
      resend.emails.send({
        from:    FROM,
        to:      ownerEmail,
        subject: `💬 Portfolio: ${subject || "New message"} from ${name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;color:#1d1d1f">
            <div style="background:linear-gradient(135deg,#6366f1,#a855f7);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:#fff;margin:0;font-size:20px">New Portfolio Contact</h2>
            </div>
            <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
              <table style="border-collapse:collapse;width:100%;font-size:14px">
                <tr><td style="padding:8px 0;font-weight:600;color:#6e6e73;width:80px">Name</td><td style="padding:8px 0">${name}</td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#6e6e73">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#6366f1">${email}</a></td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#6e6e73">Subject</td><td style="padding:8px 0">${subject || "—"}</td></tr>
              </table>
              <div style="margin-top:16px;padding:16px;background:#f5f5f7;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
              <p style="color:#aaa;font-size:11px;margin-top:20px">Received ${timestamp}</p>
            </div>
          </div>
        `,
      }),

      /* Auto-reply to visitor */
      resend.emails.send({
        from:    FROM,
        to:      email,
        subject: "Got your message — I'll be in touch! 👋",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;color:#1d1d1f">
            <div style="background:linear-gradient(135deg,#6366f1,#a855f7);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:#fff;margin:0">Hi ${name}! 👋</h2>
            </div>
            <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
              <p style="line-height:1.7">Thanks for reaching out through my portfolio! I've received your message and will get back to you within <strong>24–48 hours</strong>.</p>
              <blockquote style="border-left:3px solid #6366f1;margin:20px 0;padding:12px 16px;background:#f5f5f7;border-radius:0 8px 8px 0;color:#6e6e73;font-style:italic;font-size:14px">
                "${message.slice(0, 200)}${message.length > 200 ? "…" : ""}"
              </blockquote>
              <p style="line-height:1.7">In the meantime, feel free to explore my work on <a href="https://github.com/ksrivathsav" style="color:#6366f1">GitHub</a> or connect on <a href="https://www.linkedin.com/in/srivathsav-kommineni/" style="color:#6366f1">LinkedIn</a>.</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
              <p style="color:#6e6e73;font-size:13px;margin:0">
                <strong style="color:#1d1d1f">Srivathsav Kommineni</strong><br>
                Full Stack Engineer · srivathsavkommineni@gmail.com
              </p>
            </div>
          </div>
        `,
      }),
    ]);

    return res.status(200).json({ success: true, message: "Message sent! I'll be in touch soon." });

  } catch (err) {
    console.error("[api/contact] Email error:", err.message);
    return res.status(500).json({
      error: "Email delivery failed. Please email me directly at srivathsavkommineni@gmail.com",
    });
  }
}
