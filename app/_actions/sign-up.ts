"use server";
import { z } from "zod";
import type { FormFnRes } from "@/components/forms/generic-form";
import { CAPTCHA_ERROR, verifyCaptcha } from "@/lib/captcha";

// Server Actions sind öffentlich aufrufbar, darum hier noch einmal prüfen
const SignupSchema = z.object({
  eventSlug: z.string().trim().min(1).max(200),
  eventType: z.literal("bar-hopping").optional(),
  guest: z.object({
    name: z.string().trim().min(1).max(120),
    surname: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    // Bei Teams steckt hier Teamname + Mitglieder als JSON
    course: z.string().trim().max(2000).optional(),
    friends: z.array(z.object({ name: z.string().trim().min(1).max(120) })).max(20).optional(),
  }),
});

type POST_Response = {
  msg: string;
  success: boolean;
};

const BASE_URL = `${process.env.CMS_ENDPOINT}/participant`;
const token = process.env.CMS_TOKEN;

export async function addGuestToEvent(
  input: z.input<typeof SignupSchema>,
  captcha: string
): Promise<FormFnRes> {
  const parsed = SignupSchema.safeParse(input);
  if (!parsed.success) {
    return { sx: false, msg: "Bitte prüfe deine Eingaben." };
  }
  if (!(await verifyCaptcha(captcha))) {
    return { sx: false, msg: CAPTCHA_ERROR };
  }

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      console.error("Anmeldung fehlgeschlagen:", response.status, response.statusText);
      return { sx: false, msg: `Fehler – ${response.statusText}` };
    }

    const data: POST_Response = await response.json();
    return { sx: data.success, msg: data.msg };
  } catch (error) {
    console.error("Anmeldung fehlgeschlagen:", error);
  }
  return { sx: false, msg: "Fehler – API Request fehlgeschlagen" };
}
