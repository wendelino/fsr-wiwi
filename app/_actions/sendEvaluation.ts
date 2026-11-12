"use server";
import { z } from "zod";
import type { FormFnRes } from "@/components/forms/generic-form";
import { CAPTCHA_ERROR, verifyCaptcha } from "@/lib/captcha";

// Server Actions sind öffentlich aufrufbar, darum hier noch einmal prüfen
const EvaluationSchema = z.object({
  bewertung: z.string().trim().min(5).max(10_000),
  slug: z.string().trim().min(1).max(200),
});

export async function sendEvaluation(
  input: z.input<typeof EvaluationSchema>,
  captcha: string
): Promise<FormFnRes> {
  const parsed = EvaluationSchema.safeParse(input);
  if (!parsed.success) {
    return { sx: false, msg: "Bitte prüfe deine Eingaben." };
  }
  if (!(await verifyCaptcha(captcha))) {
    return { sx: false, msg: CAPTCHA_ERROR };
  }

  const endpoint = process.env.EVALUATION_ENDPOINT;
  if (!endpoint) {
    console.error("EVALUATION_ENDPOINT fehlt");
    return { sx: false, msg: "Fehler beim Senden der Bewertung" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!response.ok) {
      console.error("Bewertung fehlgeschlagen:", response.status, response.statusText);
      return { sx: false, msg: "Fehler beim Senden der Bewertung" };
    }
  } catch (error) {
    console.error("Bewertung fehlgeschlagen:", error);
    return { sx: false, msg: "Fehler beim Senden der Bewertung" };
  }
  return { sx: true, msg: "" };
}
