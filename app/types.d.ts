declare type EventItem = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    registrable: boolean; 
    maxGuests: number | null;
    masterOnly: boolean | null; 
    rest_seats: number | null;
    slug: string;
    tags: string[];
  };