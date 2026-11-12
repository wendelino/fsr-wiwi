import "server-only";
import { NextResponse } from "next/server";

// Einfaches Rate-Limit im Speicher, pro IP und Minute
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 6;

const hits = new Map<string, { count: number; resetAt: number }>();

// x-real-ip setzt der Proxy selbst; in x-forwarded-for hängt er die echte IP
// hinten an – alles davor kann der Client frei wählen.
function getClientIp(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = req.headers.get("x-forwarded-for");
  const last = forwarded?.split(",").pop()?.trim();
  return last || "unknown";
}

function allow(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 10_000) {
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

export function rateLimitRequest(req: Request): NextResponse | null {
  if (allow(getClientIp(req))) return null;
  return NextResponse.json(
    { error: "rate_limited", message: "Zu viele Anfragen. Warte kurz und versuch es erneut." },
    { status: 429 }
  );
}
