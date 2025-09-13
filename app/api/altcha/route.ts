"use server";
import { createChallenge, extractParams, verifySolution } from "altcha-lib";
import { NextResponse } from "next/server";
import {
  checkReplay,
  rateLimitRequest,
  markSignatureUsed,
} from "../rate-limiting";

// IMPORTANT: Use a dedicated HMAC key for ALTCHA. Do NOT reuse other secrets.
const ALTCHA_HMAC_KEY = process.env.ALTCHA_HMAC_KEY;

const CHALLENGE_TTL_MS = 2 * 60 * 1000; // 2 minutes

export async function GET(request: Request) {
  if (!ALTCHA_HMAC_KEY) {
    throw new Error("ALTCHA_HMAC_KEY is not set");
  }
  try {
    const limitReached = rateLimitRequest(request);
    if (limitReached) return limitReached;
    const challenge = await createChallenge({
      hmacKey: ALTCHA_HMAC_KEY,
      maxNumber: 500_000,
      expires: new Date(Date.now() + CHALLENGE_TTL_MS),
    });
    return NextResponse.json(challenge);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "challenge_creation_failed",
        message: "Failed to create challenge",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!ALTCHA_HMAC_KEY) {
    throw new Error("ALTCHA_HMAC_KEY is not set");
  }
  try {
    const limitReached = rateLimitRequest(request);
    if (limitReached) return limitReached;

    const body = await request.json().catch(() => ({}));
    const payload = body?.payload;
    if (!payload) {
      return NextResponse.json(
        { error: "missing_payload", message: "No payload provided" },
        { status: 400 }
      );
    }

    // Extract signature to prevent replay
    const { expires: signature } = extractParams(payload);
    if (!signature) {
      return NextResponse.json(
        { error: "invalid_payload", message: "Missing signature" },
        { status: 400 }
      );
    }

    const existing = checkReplay(signature);
    if (existing) {
      return NextResponse.json(
        { error: "replay_detected", message: "Payload already used" },
        { status: 409 }
      );
    }

    // Verify including expiration (default true). Keep explicit for clarity.
    const verified = await verifySolution(payload, ALTCHA_HMAC_KEY, true);
    if (!verified) {
      return NextResponse.json(
        { error: "verification_failed", message: "Invalid or expired payload" },
        { status: 400 }
      );
    }

    // Mark signature as used to block replays for REPLAY_TTL_MS
    markSignatureUsed(signature);
    return NextResponse.json({ verified: true, payload });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: "server_error",
        message: "Unexpected error during verification",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
