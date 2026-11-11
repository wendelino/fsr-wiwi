"use server";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { z } from "zod";
import type { FormFnRes } from "@/components/forms/generic-form";
import { LOGO_CID, contactSubject, renderContactMail } from "@/lib/mail/contact-mail";

// Server Actions sind öffentlich aufrufbar, darum hier noch einmal prüfen
const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .transform((s) => s.replace(/[\r\n]+/g, " ")),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(10_000),
});

let transporter: Transporter | undefined;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER oder GMAIL_APP_PASSWORD fehlt");
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return { transporter, user };
}

export async function sendContactMail(input: z.input<typeof ContactSchema>): Promise<FormFnRes> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return { sx: false, msg: "Bitte prüfe deine Eingaben." };
  }
  const data = parsed.data;

  try {
    const to = process.env.CONTACT_MAIL_TO;
    if (!to) throw new Error("CONTACT_MAIL_TO fehlt");
    const { transporter, user } = getTransporter();
    const { html, text } = renderContactMail(data);

    await transporter.sendMail({
      // Gmail verschickt nur im Namen des angemeldeten Kontos
      from: { name: `${data.name} über fsr-wiwi-halle.de`, address: user },
      to,
      replyTo: { name: data.name, address: data.email },
      subject: contactSubject(data.name),
      html,
      text,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(process.cwd(), "public", "lion256.png"),
          cid: LOGO_CID,
        },
      ],
    });

    return { sx: true, msg: "" };
  } catch (error) {
    console.error("Kontaktmail konnte nicht gesendet werden:", error);
    return {
      sx: false,
      msg: "Deine Nachricht konnte gerade nicht gesendet werden. Bitte versuche es später erneut.",
    };
  }
}
