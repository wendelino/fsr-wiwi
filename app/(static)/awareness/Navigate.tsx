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
      <h2 className="text-xl font-bold pb-2">Inhaltsverzeichnis</h2>
      <ul className="list-inside space-y-4">
      <li>
          <button onClick={() => scrollToSection('awareness')} className="text-start hover:underline">
          <strong>I. </strong>Was ist Awareness?  
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
 
 
