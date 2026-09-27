const WINDOW_MS = 60_000;

const LIMITS = {
  chat:    20,
  default: 30,
};

const store = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.resetAt) store.delete(key);
  }
}, 5 * 60_000);

export function rateLimit(req, endpoint = "default") {
  const ip =
    (req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown";

  const limit = LIMITS[endpoint] ?? LIMITS.default;
  const key   = `${endpoint}:${ip}`;
  const now   = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { limited: true, remaining: 0, retryAfter };
  }

  record.count++;
  return { limited: false, remaining: limit - record.count };
}

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
