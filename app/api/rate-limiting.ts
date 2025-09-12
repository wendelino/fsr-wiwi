import { NextResponse } from "next/server";
import "server-only";

// Basic anti-replay cache and naive rate limiter (in-memory)
const REPLAY_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 6; // per IP per window

export const usedSignatures = new Map<string, number>(); // signature -> expiresAt
const ipHits = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: Request): string {
  try {
    // Best-effort IP extraction; behind proxies use X-Forwarded-For
    const xff =
      (req.headers as any).get?.("x-forwarded-for") ||
      req.headers.get("x-forwarded-for");
    if (xff) return String(xff).split(",")[0].trim();
    const xfRealIp = req.headers.get("x-real-ip");
    if (xfRealIp) return xfRealIp;
  } catch {}
  return "unknown";
}

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt <= now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  entry.count += 1;

  console.log("rateLimit", ipHits);
  return true;
}

export function pruneReplayCache(now: number) {
  for (const [sig, exp] of usedSignatures) {
    if (exp <= now) usedSignatures.delete(sig);
  }
}

export function checkReplay(signature: string) {
  const now = Date.now();
  pruneReplayCache(now);
  const existing = usedSignatures.get(signature);
  if (existing && existing > now) {
    return true;
  }
  return false;
}
export function markSignatureUsed(signature: string) {
  usedSignatures.set(signature, Date.now() + REPLAY_TTL_MS);
}

export function rateLimitRequest(req: Request): NextResponse | null {
  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests" },
      { status: 429 }
    );
  }
  return null;
}
