declare type EventItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  registrable: boolean;
  maxGuests: number | null;
  /** Bei Losverfahren auch 0 oder negativ (mehr Anmeldungen als Plätze) */
  restSeats: number | null;
  masterOnly: boolean | null;
  slug: string;
  tagsNew: string[];
  /** Plätze werden verlost: Anmeldung bleibt auch ohne freie Plätze offen */
  isRandomSelection: boolean;
  /** Wird in den Highlights der Ersti-Woche gezeigt */
  isHighlight: boolean;
};
