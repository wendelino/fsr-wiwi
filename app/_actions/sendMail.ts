"use server";

const token = process.env.ACCESS_SECRET;

const mailOptions = {
  from: '"FSR Wiwi" <fachschaftsrat@wiwi.uni-halle.de>',
  replyTo: "fachschaftsrat@wiwi.uni-halle.de",
  priority: "high",

  recipient: "wendelin.beddermann@web.de",
  subject: "Test E-Mail", // Subject of the email
  html: "<p>Content</p>",
};

export interface sendMailProps {
  name: string;
  recipient?: string;
  replyTo?: string;
  subject: string;
  html: string;
  from?: string;
}
export async function sendMail({
  recipient,
  name,
  subject,
  html,
  from,
  replyTo
}: sendMailProps) {
  const response = await fetch("https://mailer-api.lnio.de/send-mail", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...mailOptions,
      recipient: recipient || mailOptions.recipient,
      replyTo: replyTo || mailOptions.replyTo,
      name,
      subject,
      html,
      from: from || mailOptions.from,
    }),
  });

  const json = await response.json();
  return json;
}
