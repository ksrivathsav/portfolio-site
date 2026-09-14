// ──────────────────────────────────────────────────────────
//  api/middleware/rateLimit.js
//  LLD: IP-based sliding-window rate limiter
//  Works per Vercel function instance (in-memory).
//  For distributed rate limiting at scale → swap store with
//  Upstash Redis: https://upstash.com/docs/redis/sdks/ts/ratelimit
// ──────────────────────────────────────────────────────────

const WINDOW_MS = 60_000; // 1-minute window

/** Per-endpoint limits (requests per window per IP) */
const LIMITS = {
  chat:    20,   // 20 AI messages / min  — generous for natural conversation
  contact:  3,   // 3 form submissions / min — spam guard
  default: 30,
};

/** In-memory store: key → { count, resetAt } */
const store = new Map();

/** Prune expired entries every 5 minutes to prevent memory leaks */
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.resetAt) store.delete(key);
  }
}, 5 * 60_000);

/**
 * Check and increment rate limit for a request.
 * @param {import('http').IncomingMessage} req
 * @param {'chat'|'contact'|'default'} endpoint
 * @returns {{ limited: boolean, remaining: number, retryAfter?: number }}
 */
export function rateLimit(req, endpoint = "default") {
  // Extract real client IP (Vercel forwards via x-forwarded-for)
  const ip =
    (req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown";

  const limit = LIMITS[endpoint] ?? LIMITS.default;
  const key   = `${endpoint}:${ip}`;
  const now   = Date.now();

  const record = store.get(key);

  // First request or window expired — start fresh
  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: limit - 1 };
  }

  // Within window — check limit
  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { limited: true, remaining: 0, retryAfter };
  }

  record.count++;
  return { limited: false, remaining: limit - record.count };
}

/**
 * Convenience: send a 429 response if limited.
 * @returns {boolean} true if the request was rate-limited (caller should return)
 */
export function applyRateLimit(req, res, endpoint) {
  const result = rateLimit(req, endpoint);
  if (result.limited) {
    res.setHeader("Retry-After", String(result.retryAfter ?? 60));
    res.setHeader("X-RateLimit-Limit",     String(LIMITS[endpoint] ?? LIMITS.default));
    res.setHeader("X-RateLimit-Remaining", "0");
    res.status(429).json({
      error: `Too many requests. Please wait ${result.retryAfter}s before trying again.`,
    });
    return true;
  }
  return false;
}
