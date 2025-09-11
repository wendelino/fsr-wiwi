declare type EventItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  registrable: boolean;
  maxGuests: number | null;
  restSeats: number | null;
  masterOnly: boolean | null;
  slug: string;
  tagsNew: string[];
};
