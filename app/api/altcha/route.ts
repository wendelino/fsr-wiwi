import { createChallenge } from "altcha-lib";
import { NextResponse } from "next/server";
import { rateLimitRequest } from "../rate-limiting";

// Nur die Challenge kommt von hier. Geprüft wird die Lösung in der Server Action
// des jeweiligen Formulars (lib/captcha.ts).
const CHALLENGE_TTL_MS = 2 * 60 * 1000;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const key = process.env.ALTCHA_HMAC_KEY;
  if (!key) {
    console.error("ALTCHA_HMAC_KEY fehlt");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const limited = rateLimitRequest(request);
  if (limited) return limited;

  try {
    const challenge = await createChallenge({
      hmacKey: key,
      maxNumber: 300_000,
      expires: new Date(Date.now() + CHALLENGE_TTL_MS),
    });
    return NextResponse.json(challenge, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("ALTCHA-Challenge fehlgeschlagen:", error);
    return NextResponse.json({ error: "challenge_creation_failed" }, { status: 500 });
  }
}
