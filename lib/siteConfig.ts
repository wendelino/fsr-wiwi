export const siteConfig = {
  logo: "/logo.png",
  name: "FSR Wiwi",
  url: "https://fsr-wiwi-halle.de",
  pages: [
    {
      label: "Ersti-Woche",
      dropdown: [
        { href: "/erstiwoche", label: "Übersicht" },
        { href: "/erstiwoche/#programm", label: "Programm" },
        { href: "/anmeldung", label: "Anmeldung" },
        { href: "/files/guide.pdf", label: "Ersti-Guide", prefetch: false },
        // { href: "/lageplan", label: "Lageplan" },
      ],
    },
    { href: "/asq", label: "ASQ" },
    { href: "/kalender", label: "Kalender" },
    {
      label: "Über uns",
      dropdown: [
        { href: "/about", label: "Über uns" },
        { href: "/mitglieder", label: "Mitglieder" },
        { href: "/go", label: "Geschäftsordnung" },
        { href: "/awareness", label: "Awareness" },
      ],
    },
    { href: "/kontakt", label: "Kontakt" },
  ],
  apiEndpoint: "https://cms.fsr-wiwi-halle.de/api/public", 
  // apiEndpoint: "http://localhost:3000/api/public",  
  company: {
    owner: "Fachschaftsrat Wirtschaftswissenschaften",
    plz: "06108",
    ort: "Halle (Saale)",
    strasse: "Große Steinstraße 73",
    mail: "fachschaftsrat@wiwi.uni-halle.de",
  },
  footerDescription:
    "Ihr Partner für professionelle Gartengestaltung und -pflege seit über 20 Jahren.",
};
