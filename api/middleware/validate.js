const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCRIPT_RE = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const HTML_TAG  = /<[^>]+>/g;

export function sanitize(str = "") {
  return String(str)
    .replace(SCRIPT_RE, "")
    .replace(HTML_TAG, "")
    .trim();
}

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
