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
      <h2 className="text-xl font-bold">Inhaltsverzeichnis</h2>
      <ul className="list-inside space-y-4">
        <li>
          <button onClick={() => scrollToSection('preambel')} className="text-start hover:underline">
            <strong>I.</strong> PRÄAMBEL
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('fachschaft')} className="text-start hover:underline">
            <strong>II.</strong> DIE FACHSCHAFT
          </button>
          <ul className="list-inside ml-4 space-y-1">
            <li>
              <button onClick={() => scrollToSection('begriff')} className="text-start hover:underline">
                <strong>§ 1 </strong>BEGRIFFSBESTIMMUNG UND RECHTSSTELLUNG
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('organ')} className="text-start hover:underline">
                <strong>§ 2 </strong>ORGAN DER FACHSCHAFT
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={() => scrollToSection('fachschaftsrat')} className="text-start hover:underline">
            <strong>III.</strong> DER FACHSCHAFTSRAT
          </button>
          <ul className="list-inside ml-4 space-y-1">
            <li>
              <button onClick={() => scrollToSection('rechte')} className="text-start hover:underline">
                <strong>§ 3 </strong>RECHTE UND AUFGABEN DES FACHSCHAFTSRATES
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('konstituierung')} className="text-start hover:underline">
                <strong>§ 4 </strong>KONSTITUIERUNG
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('wahlen')} className="text-start hover:underline">
                <strong>§ 5 </strong>WAHLEN
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('mitgliedschaft')} className="text-start hover:underline">
                <strong>§ 6 </strong>MITGLIEDSCHAFT IM FACHSCHAFTSRAT
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('rechte-mitglieder')} className="text-start hover:underline">
                <strong>§ 7 </strong>RECHTE UND PFLICHTEN DER MITGLIEDER DES FACHSCHAFTSRATES
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('vorstand')} className="text-start hover:underline">
                <strong>§ 8 </strong>VORSTAND DES FACHSCHAFTSRATES
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('referate')} className="text-start hover:underline">
                <strong>§ 9 </strong>REFERATE UND SPRECHER*INNEN FÜR BESONDERE AUFGABEN
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('arbeitsgruppen')} className="text-start hover:underline">
                <strong>§ 10</strong> ARBEITSGRUPPEN
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('einberufung')} className="text-start hover:underline">
                <strong>§ 11</strong> EINBERUFUNG UND BESCHLUSSFÄHIGKEIT
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('fernbleiben')} className="text-start hover:underline">
                <strong>§ 12</strong> FERNBLEIBEN
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('abstimmung')} className="text-start hover:underline">
                <strong>§ 13</strong> ABSTIMMUNG UND BESCHLUSSFASSUNG
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('offentlichkeit')} className="text-start hover:underline">
                <strong>§ 14</strong> ÖFFENTLICHKEIT UND REDERECHT
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sitzungsleitung')} className="text-start hover:underline">
                <strong>§ 15</strong> SITZUNGSLEITUNG UND SITZUNGSABLAUF
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('tagesordnung')} className="text-start hover:underline">
                <strong>§ 16</strong> TAGESORDNUNG
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('antrage')} className="text-start hover:underline">
                <strong>§ 17</strong> ANTRÄGE ZUR GESCHÄFTSORDNUNG
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={() => scrollToSection('schlussbestimmungen')} className="text-start hover:underline">
            <strong>IV.</strong> SCHLUSSBESTIMMUNGEN
          </button>
          <ul className="list-inside ml-4 space-y-1">
            <li>
              <button onClick={() => scrollToSection('inkrafttreten')} className="text-start hover:underline">
                <strong>§ 18</strong> INKRAFTTRETEN, ÄNDERUNG
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('uberordnete')} className="text-start hover:underline">
                <strong>§ 19</strong> ÜBERGEORDNETE VORSCHRIFTEN
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
 
 
