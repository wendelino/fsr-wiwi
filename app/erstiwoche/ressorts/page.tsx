// import { Header, SubHeader } from "@/components/TextComponents";

// export default function page() {
//   const blocks = [
//     {
//       id: 1,
//       title: "Head Orga",
//       description:
//         "Koordiniert alle organisatorischen Aspekte der ersten Woche und sorgt für einen reibungslosen Ablauf der verschiedenen Aktivitäten. Stellt sicher, dass alle Ressorts ihre Aufgaben effizient erfüllen.",
//     },
//     {
//       id: 2,
//       title: "Spaß-Programm",
//       description:
//         "Verantwortlich für die Planung und Durchführung von unterhaltsamen Aktivitäten und Events, um den Einstieg für die neuen Studierenden angenehm und spaßig zu gestalten.",
//     },
//     {
//       id: 3,
//       title: "Bildung",
//       description:
//         "Organisiert und koordiniert bildungsbezogene Veranstaltungen und Workshops, die den neuen Studierenden einen hilfreichen Einstieg in ihre Studienrichtung bieten.",
//     },
//     {
//       id: 4,
//       title: "Awareness",
//       description:
//         "Fokussiert auf das Bewusstsein für wichtige Themen wie Diversität, Inklusion und mentale Gesundheit, und organisiert dazu passende Informationsveranstaltungen und Workshops.",
//     },
//     {
//       id: 5,
//       title: "Finanzen & Logistik",
//       description:
//         "Kümmert sich um das Budget und die logistischen Anforderungen der Veranstaltungen. Stellt sicher, dass alle finanziellen und materiellen Ressourcen effizient genutzt werden.",
//     },
//     {
//       id: 6,
//       title: "Social Media",
//       description:
//         "Verantwortlich für die Pflege und Aktualisierung der Social-Media-Kanäle, um Informationen und Updates zur ersten Woche effektiv an die Studierenden zu kommunizieren.",
//     },
//     {
//       id: 7,
//       title: "IT",
//       description:
//         "Betreut alle technischen Aspekte, wie die Einrichtung und Wartung von Online-Plattformen und digitalen Tools, die für die Organisation und Kommunikation der ersten Woche benötigt werden.",
//     },
//     {
//       id: 8,
//       title: "Ersti-Guide",
//       description:
//         "Erstellt und pflegt einen umfassenden Leitfaden für die neuen Studierenden, der hilfreiche Informationen und Tipps für den Start in das Studium enthält.",
//     },
//     {
//       id: 9,
//       title: "Sponsoring",
//       description:
//         "Verantwortlich für die Akquise und Verwaltung von Sponsoren, die die Veranstaltungen und Aktivitäten der ersten Woche finanziell unterstützen.",
//     },
//     {
//       id: 10,
//       title: "Stadtrallye",
//       description: "Habt ihr Lust neue Kontakte zu knüpfen und gleichzeitig euer Wissen und Geschick zu testen? Dann ist die Stadtralley genau das Richtige für euch! Gemeinsam gestalten wir eine Reihe an kleinen Wettbewerben, die ihr in Teams gemeinsam meistert und nebenbei viele Ort in Halle und Fakten zu diesen kennenlernt. "
//      },
//     {
//       id: 11,
//       title: "Teamer*innen-/Helfer*innen-Koordination",
//       description:
//         "Koordiniert die Einsätze und Aufgaben der Teamenden und Helfenden, um sicherzustellen, dass alle Unterstützer effizient eingebunden werden.",
//     },
//   ];

//   return (
//     <>
//       <Header>
//         Unsere <span className="fsr-gradient">Ressorts</span>
//       </Header>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
//         {blocks.map((block: any, index: number) => (
//           <div
//             key={block.id}
//             className="p-6 bg-secondary rounded-lg shadow-md fade-in"
//             style={{ "--delay": `${index * 0.2}s` } as React.CSSProperties}
//           >
//             <h2 className="text-xl font-semibold mb-4">{block.title}</h2>
//             <p>{block.description}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
