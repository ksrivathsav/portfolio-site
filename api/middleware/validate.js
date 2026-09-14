// ──────────────────────────────────────────────────────────
//  api/middleware/validate.js
//  LLD: Input validation helpers — fail-fast, sanitize-first
// ──────────────────────────────────────────────────────────

const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCRIPT_RE = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const HTML_TAG  = /<[^>]+>/g;

/**
 * Strip dangerous HTML/script tags from a string.
 * Keeps plain text content (server-side sanitization).
 */
export function sanitize(str = "") {
  return String(str)
    .replace(SCRIPT_RE, "")   // remove script blocks
    .replace(HTML_TAG, "")    // strip HTML tags
    .trim();
}

/** Validate a contact form payload — returns { valid, errors } */
export function validateContact({ name, email, subject, message, _honeypot }) {
  const errors = [];

  // Honeypot check: bots fill hidden fields, humans don't
  if (_honeypot) {
    // Return valid=false silently so bots think they succeeded
    return { valid: false, silent: true };
  }

  if (!name?.trim())    errors.push("Name is required");
  if (!email?.trim())   errors.push("Email is required");
  if (!message?.trim()) errors.push("Message is required");

  if (email && !EMAIL_RE.test(email))      errors.push("Invalid email address");
  if (name    && name.length    > 100)     errors.push("Name too long (max 100 chars)");
  if (subject && subject.length > 200)     errors.push("Subject too long (max 200 chars)");
  if (message && message.length > 2000)    errors.push("Message too long (max 2000 chars)");

  // Detect obvious spam patterns
  const combined = `${name} ${subject} ${message}`.toLowerCase();
  const spamWords = ["viagra", "casino", "crypto investment", "click here", "earn money fast"];
  if (spamWords.some((w) => combined.includes(w))) {
    return { valid: false, silent: true }; // silent reject
  }

  return { valid: errors.length === 0, errors };
}

/** Validate a chat messages payload */
export function validateChat({ messages }) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: "messages array is required" };
  }
  for (const msg of messages) {
    if (!["user", "assistant", "system"].includes(msg.role)) {
      return { valid: false, error: "Invalid message role" };
    }
    if (typeof msg.content !== "string") {
      return { valid: false, error: "Message content must be a string" };
    }
    if (msg.content.length > 4000) {
      return { valid: false, error: "Individual message too long" };
    }
  }
  return { valid: true };
}
