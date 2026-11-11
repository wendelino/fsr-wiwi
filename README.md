# fsr-wiwi-halle.de

Website des Fachschaftsrats Wirtschaftswissenschaften der MLU Halle-Wittenberg.
Next.js 15 (App Router), Tailwind, shadcn/ui; Paketmanager ist bun.

```bash
bun install
# .env mit CMS_ENDPOINT, CMS_TOKEN, ALTCHA_HMAC_KEY, EVALUATION_ENDPOINT,
# GMAIL_USER, GMAIL_APP_PASSWORD (Gmail-App-Passwort) und CONTACT_MAIL_TO
# (Empfänger der Kontaktanfragen)
bun dev
```

Vor jedem Commit: `npx tsc --noEmit -p .` und `bun run lint`.
Projekt- und Design-Regeln stehen in [AGENTS.md](AGENTS.md).
