// Plätze, Losverfahren und Anmeldestatus an einer Stelle

/** Detailseite eines Termins – Klicks auf Termine führen immer dorthin. */
export const eventHref = (event: EventItem) => `/kalender/${encodeURIComponent(event.slug)}`;

/** Plätze werden verlost – Anmeldung bleibt auch ohne freie Plätze offen. */
export function isLottery(event: EventItem) {
  return event.registrable && event.isRandomSelection;
}

/** Ausgebucht und keine Anmeldung mehr möglich (nie bei Losverfahren). */
export function isFull(event: EventItem) {
  return (
    event.registrable &&
    !event.isRandomSelection &&
    event.restSeats != null &&
    event.restSeats <= 0
  );
}

/** Losverfahren mit mehr (oder gleich vielen) Anmeldungen als Plätzen. */
export function isOverbooked(event: EventItem) {
  return isLottery(event) && event.restSeats != null && event.restSeats <= 0;
}

/** Freie Plätze, nur wenn es noch welche gibt. */
export function freeSeats(event: EventItem) {
  return event.restSeats != null && event.restSeats > 0 ? event.restSeats : null;
}

/** Bisherige Anmeldungen, sofern das CMS die Platzzahlen liefert. */
export function signupCount(event: EventItem) {
  return event.maxGuests != null && event.restSeats != null
    ? event.maxGuests - event.restSeats
    : null;
}

export function canRegister(event: EventItem, past = false) {
  return event.registrable && !isFull(event) && !past;
}

export const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

/** Kurzer Status für Badges, z. B. "Anmeldung nötig · 12 Plätze frei". */
export function seatsLabel(event: EventItem) {
  if (!event.registrable) return null;
  if (isFull(event)) return "Ausgebucht";
  if (isOverbooked(event)) return "Anmeldung nötig – es wird gelost";
  const seats = freeSeats(event);
  if (seats == null) return "Anmeldung nötig";
  return `Anmeldung nötig · ${plural(seats, "Platz", "Plätze")} frei`;
}

/** Erklärung zum Losverfahren, passend zum aktuellen Stand. */
export function lotteryText(event: EventItem) {
  if (!isOverbooked(event))
    return "Gibt es am Ende mehr Anmeldungen als Plätze, entscheidet das Los.";
  const count = signupCount(event);
  const intro =
    count != null && event.maxGuests != null
      ? `Schon ${count} Anmeldungen auf ${plural(event.maxGuests, "Platz", "Plätze")}.`
      : "Schon mehr Anmeldungen als Plätze.";
  return `${intro} Du kannst dich trotzdem anmelden – die Plätze werden unter allen Anmeldungen verlost.`;
}

export function signupButtonLabel(event: EventItem) {
  return isOverbooked(event) ? "Zur Verlosung anmelden" : "Jetzt anmelden";
}

export function signupSuccessText(event: EventItem) {
  return isLottery(event)
    ? "Deine Anmeldung ist eingegangen, du bekommst eine Bestätigung per E-Mail. Die Plätze werden verlost, falls es mehr Anmeldungen als Plätze gibt."
    : "Du bekommst eine Bestätigung per E-Mail.";
}

/** Markdown grob zu Fließtext, für gekürzte Vorschauen. */
export function plainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/(\*\*|__|\*|_|~~|`)(.+?)\1/g, "$2")
    .replace(/\s*\n+\s*/g, " ")
    .trim();
}
