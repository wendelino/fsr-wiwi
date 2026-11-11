import { formatBerlin } from "@/lib/berlin";
import { siteConfig } from "@/lib/siteConfig";

export type ContactMessage = { name: string; email: string; message: string };

/** Content-ID des eingebetteten Logos (als Anhang mitgeschickt, kein externer Abruf). */
export const LOGO_CID = "logo@fsr-wiwi-halle.de";

const BORDEAUX = "#AA2639";
const INK = "#18181b";
const MUTED = "#71717a";
const LINE = "#e4e4e7";
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function contactSubject(name: string) {
  return `Kontaktanfrage von ${name}`;
}

export function renderContactMail(msg: ContactMessage, receivedAt = new Date()) {
  const date = formatBerlin(receivedAt, "EEEE, dd.MM.yyyy · HH:mm 'Uhr'");
  const name = escapeHtml(msg.name);
  const email = escapeHtml(msg.email);
  const body = escapeHtml(msg.message).replace(/\r?\n/g, "<br>");
  const replyHref = escapeHtml(
    `mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${contactSubject(msg.name)}`)}`
  );
  const host = new URL(siteConfig.url).host;

  const fact = (label: string, value: string, last = false) => `
              <tr>
                <td style="padding:12px 0;${last ? "" : `border-bottom:1px solid ${LINE};`}width:96px;vertical-align:top;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BORDEAUX};">${label}</td>
                <td style="padding:12px 0;${last ? "" : `border-bottom:1px solid ${LINE};`}vertical-align:top;font-size:15px;font-weight:500;color:${INK};">${value}</td>
              </tr>`;

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(contactSubject(msg.name))}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(msg.message.slice(0, 140))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;font-family:${FONT};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:16px;overflow:hidden;">
          <tr><td style="height:6px;background:${BORDEAUX};font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="cid:${LOGO_CID}" width="40" height="40" alt="" style="display:block;border:0;">
                  </td>
                  <td style="vertical-align:middle;font-size:13px;font-weight:700;line-height:1.3;color:${INK};">
                    Fachschaftsrat<br><span style="color:${MUTED};font-weight:500;">Wirtschaftswissenschaften</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BORDEAUX};">Kontaktformular</p>
              <h1 style="margin:0;font-size:28px;line-height:1.15;font-weight:900;letter-spacing:-0.5px;color:${INK};">Neue Nachricht von ${name}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fact("Name", name)}${fact(
                "E-Mail",
                `<a href="mailto:${email}" style="color:${INK};text-decoration:underline;">${email}</a>`
              )}${fact("Eingang", escapeHtml(date), true)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 0;">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BORDEAUX};">Nachricht</p>
              <div style="padding:20px;background:#faf5f6;border-left:4px solid ${BORDEAUX};border-radius:8px;font-size:15px;line-height:1.6;color:${INK};word-break:break-word;">${body}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:999px;background:${BORDEAUX};">
                    <a href="${replyHref}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${name} antworten</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:${MUTED};">Oder einfach auf diese E-Mail antworten – die Antwort geht direkt an ${email}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#fafafa;border-top:1px solid ${LINE};font-size:12px;line-height:1.5;color:${MUTED};">
              Gesendet über das Kontaktformular auf <a href="${siteConfig.url}/kontakt" style="color:${MUTED};">${host}</a><br>
              ${escapeHtml(siteConfig.company.owner)} · ${escapeHtml(siteConfig.company.strasse)} · ${escapeHtml(`${siteConfig.company.plz} ${siteConfig.company.ort}`)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Neue Nachricht über das Kontaktformular (${host})`,
    "",
    `Name:    ${msg.name}`,
    `E-Mail:  ${msg.email}`,
    `Eingang: ${date}`,
    "",
    "Nachricht:",
    msg.message,
    "",
    "—",
    `Antworten geht direkt an ${msg.email}.`,
  ].join("\n");

  return { html, text };
}
