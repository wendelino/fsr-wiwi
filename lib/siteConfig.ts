export const siteConfig = {
  logo: "/logo.png",
  name: "FSR Wiwi",
  url: "https://fsr-wiwi-halle.de",
  pages: [
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
    {
      label: "Ersti-Woche",
      dropdown: [
        { href: "/files/guide.pdf", label: "Ersti-Guide", prefetch: false }, 
        { href: "/lageplan", label: "Lageplan" }, 
      ],
    },
    { href: "/kontakt", label: "Kontakt" },
  ],
  company: {
    owner: "Fachschaftsrat Wirtschafswissenschaften",
    plz: "06108",
    ort: "Halle (Saale)",
    strasse: "Grosse Steinstrasse 73",
    mail: "fachschaftsrat@wiwi.uni-halle.de",
  },
  footerDescription:
    "Ihr Partner für professionelle Gartengestaltung und -pflege seit über 20 Jahren.",
};
