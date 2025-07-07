export interface FsrMember {
  name: string;
  position: string;
  tasks: string;
}

export interface FsrLegislatur {
  period: string;
  legislatur_start: string;
  members: FsrMember[];
}

export const legislaturData: FsrLegislatur[] = [
  {
    period: "2025",
    legislatur_start: "24.06.2025",
    members: [
      { name: "Florence Hollerung", position: "Vorsitzende", tasks: "" },
      { name: "Julius Dallorso", position: "Sprecher für Finanzen", tasks: "" }, 
      { name: "Florian Geyer", position: "Sprecher für Finanzen", tasks: "Veranstaltungen" }, 
      { name: "Annika Diers", position: "", tasks: "Öffentlichkeitsarbeit" }, 
      { name: "Maja Juhnke", position: "", tasks: "Öffentlichkeitsarbeit" }, 
      { name: "Dennis Behnsen", position: "", tasks: "Veranstaltungen" }, 
      { name: "Nele Gutt", position: "", tasks: "" }, 
      { name: "Benjamin Knöppel", position: "", tasks: "" }, 
    ],
  },
  {
    period: "2024",
    legislatur_start: "20.06.2024",
    members: [
      { name: "Nico Gebhardt", position: "Vorsitzender", tasks: "" },
      { name: "Sophia Lomelino-Bergmann", position: "", tasks: "" },
      { name: "Ole Schmitt", position: "", tasks: "" },
      {
        name: "Richard Bormann",
        position: "Stellvertretender Vorsitzender",
        tasks: "",
      },
      { name: "Julius Dallorso", position: "Sprecher für Finanzen", tasks: "" },
      { name: "Lisa-Marie Wüst", position: "", tasks: "" },
      { name: "Elias Kaal", position: "Sprecher für Finanzen", tasks: "" },
      { name: "Florin Hensel", position: "", tasks: "" },
      { name: "Florence Hollerung", position: "", tasks: "" },
      { name: "Matti Reddersen", position: "", tasks: "" },
    ],
  },
  {
    period: "2023",
    legislatur_start: "04.07.2023",
    members: [
      { name: "Wienke Jensen", position: "", tasks: "Sponsoring" },
      { name: "Maxine Marie Kayser", position: "", tasks: "" },
      {
        name: "Ferdinand Kirchfeld",
        position: "Vorsitzender",
        tasks: "Uni-Kommunikation, Organisation der Ersti-Woche",
      },
      {
        name: "Sophia Lomelino-Bergmann",
        position: "Sprecherin für Finanzen",
        tasks: "Öffentlichkeitsarbeit",
      },
      { name: "Toni Matthes", position: "", tasks: "" },
      { name: "Lilly Metze", position: "", tasks: "Öffentlichkeitsarbeit" },
      { name: "Remus Lion Migura", position: "", tasks: "" },
      { name: "Bianka Sagan", position: "", tasks: "Öffentlichkeitsarbeit" },
      {
        name: "Franz Scheibner",
        position: "Sprecher für Finanzen",
        tasks: "Sponsoring",
      },
      {
        name: "Ole Schmitt",
        position: "Stellvertretender Vorsitzender",
        tasks: "Bildung, Partys",
      },
      {
        name: "Jan Benjamin Wulfhorst",
        position: "Stellvertretender Vorsitzender",
        tasks: "Veranstaltungen, Organisation der Ersti-Woche, IT",
      },
    ],
  },
  {
    period: "2022",
    legislatur_start: "31.05.2022",
    members: [
      { name: "Julius Brüggemann", position: "", tasks: "" },
      { name: "Ingun Dähne", position: "", tasks: "" },
      {
        name: "Leandra Eli",
        position: "",
        tasks: "Studium vor Ende der Legislatur beendet",
      },
      {
        name: "Ferdinand Kirchfeld",
        position: "Sprecher für Finanzen",
        tasks: "",
      },
      {
        name: "Selina Sophie Koryciak",
        position: "Stellvertretende Vorsitzende",
        tasks: "",
      },
      {
        name: "Isabelle Dora Kune",
        position: "",
        tasks: "Studium vor Ende der Legislatur beendet",
      },
      { name: "Toni Matthes", position: "Vorsitzender", tasks: "" },
      { name: "Remus Lion Migura", position: "", tasks: "" },
      { name: "Tran Bao Ngan Nguyen", position: "", tasks: "" },
      {
        name: "Emely Richter",
        position: "Stellvertretende Vorsitzende",
        tasks: "",
      },
      { name: "Louis Tizian Richter", position: "", tasks: "" },
      { name: "Simon Rogge", position: "", tasks: "" },
      { name: "Franz Scheibner", position: "Sprecher für Finanzen", tasks: "" },
      {
        name: "Ole Schmitt",
        position: "Stellvertretender Vorsitzender",
        tasks: "",
      },
      { name: "Jan Benjamin Wulfhorst", position: "", tasks: "" },
    ],
  },
  {
    period: "2021",
    legislatur_start: "SoSe 2021",
    members: [
      { name: "Sarah Franke", position: "", tasks: "zurückgetreten" },
      { name: "Ingun Dähne", position: "2. Vorsitz", tasks: "" },
      {
        name: "Tran Bao Ngan Nguyen",
        position: "",
        tasks: "Arbeitskreis Weihnachten",
      },
      {
        name: "Julius Brüggemann",
        position: "",
        tasks: "Arbeitskreis Sommerevents",
      },
      { name: "Jan Wulfhorst", position: "", tasks: "Arbeitskreis Erstiphase" },
      { name: "Thorsten Bangerth", position: "1. Vorsitz", tasks: "" },
      { name: "Tim Hildebrandt", position: "Finanzer", tasks: "" },
      { name: "Toni Matthes", position: "", tasks: "Arbeitskreis Weihnachten" },
      { name: "Jan Broschinski", position: "", tasks: "" },
      { name: "Benjamin Bost", position: "", tasks: "zurückgetreten" },
      {
        name: "Florian Kern",
        position: "",
        tasks: "Arbeitskreis Teambuilding",
      },
      { name: "Henri Meusel", position: "", tasks: "zurückgetreten" },
      { name: "Ole Schmitt", position: "", tasks: "ASQ Betreuer" },
      { name: "Maximilian Schoele", position: "Finanzer", tasks: "" },
      { name: "Louis Tizian Richter", position: "", tasks: "ASQ Betreuer" },
      { name: "Franz Windolph", position: "", tasks: "zurückgetreten" },
      {
        name: "Florian Krause",
        position: "",
        tasks: "Arbeitskreis Sommerevents",
      },
    ],
  }
];
