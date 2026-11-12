import "server-only";
import { verifySolution } from "altcha-lib";

// Gelöste Challenges merken, damit eine Lösung nur einmal zählt
const REPLAY_TTL_MS = 10 * 60 * 1000;
const used = new Map<string, number>();

export const CAPTCHA_ERROR =
  "Die Bot-Prüfung ist abgelaufen oder fehlgeschlagen. Bestätige bitte noch einmal „Ich bin kein Bot“.";

/** Prüft die ALTCHA-Lösung aus dem Formular. Jede Lösung gilt nur einmal. */
export async function verifyCaptcha(payload: unknown): Promise<boolean> {
  const key = process.env.ALTCHA_HMAC_KEY;
  if (!key) {
    console.error("ALTCHA_HMAC_KEY fehlt");
    return false;
  }
  if (typeof payload !== "string" || payload.length === 0 || payload.length > 4000) {
    return false;
  }

  let challenge: unknown;
  try {
    challenge = JSON.parse(Buffer.from(payload, "base64").toString("utf8"))?.challenge;
  } catch {
    return false;
  }
  if (typeof challenge !== "string") return false;

  const now = Date.now();
  for (const [c, expiresAt] of used) if (expiresAt <= now) used.delete(c);
  if (used.has(challenge)) return false;

  const ok = await verifySolution(payload, key, true).catch(() => false);
  if (ok) used.set(challenge, now + REPLAY_TTL_MS);
  return ok;
}
