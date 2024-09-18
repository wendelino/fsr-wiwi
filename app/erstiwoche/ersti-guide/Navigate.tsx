"use client"
export default function Navigate() {

    const scrollToSection = (id: any) => {
      const section = document.getElementById(id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 90, 
          behavior: 'smooth',
        });
      }
    };
    
  return (
    <nav className="my-8 ">
      <h2 className="text-xl font-bold pb-2">Inhalt</h2>
      <p>Bist du neu in Halle? Dann ist 
dieser Guide genau richtig für 
dich! Wir haben dir einige 
Spots in Halle zusammengestellt, 
damit du in Halle auch außerhalb von 
Bibliotheken kennenlernen kannst. 
Viel Spaß beim Erkunden der Orte!
<br /><br /> </p>
      <ul className="list-inside space-y-4">
      <li>
          <button onClick={() => scrollToSection('essen')} className="text-start hover:underline">
          <strong>I. </strong>Egal ob Hunger oder Durst, hier wird man glücklich
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('begriffsklaerung')} className="text-start hover:underline">
          <strong>II. </strong>Begriffsklärung  
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('selbstverstaendnis')} className="text-start hover:underline">
          <strong>III. </strong>Selbstverständnis 
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('code-of-conduct')} className="text-start hover:underline">
          <strong>IV. </strong>Code of Conduct  
          </button>
        </li>  
        <li>
          <button onClick={() => scrollToSection('betroffene-person')} className="text-start hover:underline">
          <strong>V. </strong>Was kann ich als betroffene Person tun?  
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('unterstuetzen')} className="text-start hover:underline">
          <strong>VI. </strong>Wie kann ich betroffene Personen unterstützen? 
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('self-awareness')} className="text-start hover:underline">
          <strong>VII. </strong>Self-Awareness 
          </button>
        </li>
        
      </ul>
    </nav>
  );
}
 
 
