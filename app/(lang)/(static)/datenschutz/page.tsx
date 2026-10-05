import { PageHero } from "@/components/page-hero";
import { Prose } from "@/components/prose";

export default function page() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <PageHero eyebrow="Rechtliches" title={<>Datenschutz&shy;erklärung</>} poster />
      <Prose>
        <p>
          Wir freuen uns sehr über Ihr Interesse an den Angeboten und
          Veranstaltungen des Fachschaftsrates Wirtschaftswissenschaften.
          Datenschutz hat einen besonders hohen Stellenwert für uns. Eine
          Nutzung unserer Internetseiten ist grundsätzlich ohne jede Angabe
          personenbezogener Daten möglich. Sofern eine betroffene Person
          besondere Services, wie die Anmeldung zu einer Veranstaltung, über
          unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine
          Verarbeitung personenbezogener Daten erforderlich werden.
        </p>

        <h2>Name und Anschrift des für die Verarbeitung Verantwortlichen</h2>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          Fachschaftsrat Wirtschaftswissenschaften <br />
          Große Steinstraße 73 <br />
          06108 Halle (Saale) <br />
          E-Mail: fachschaftsrat@wiwi.uni-halle.de <br />
          Website: https://fsr-wiwi-halle.de
        </p>

        <h2>Erfassung von allgemeinen Daten und Informationen</h2>
        <p>
          Die Internetseite des Fachschaftsrates Wirtschaftswissenschaften
          erfasst mit jedem Aufruf der Internetseite durch eine betroffene
          Person oder ein automatisiertes System eine Reihe von allgemeinen
          Daten und Informationen. Diese allgemeinen Daten und Informationen
          werden in den Logfiles des Servers gespeichert. Erfasst werden können
          die (1) verwendeten Browsertypen und Versionen, (2) das vom
          zugreifenden System verwendete Betriebssystem, (3) die Internetseite,
          von welcher ein zugreifendes System auf unsere Internetseite gelangt
          (sogenannte Referrer), (4) die Unterwebseiten, welche über ein
          zugreifendes System auf unserer Internetseite angesteuert werden, (5)
          das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6)
          eine Internet-Protokoll-Adresse (IP-Adresse), (7) der
          Internet-Service-Provider des zugreifenden Systems und (8) sonstige
          ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von
          Angriffen auf unsere informationstechnologischen Systeme dienen.
        </p>

        <h2>
          Verarbeitung personenbezogener Daten bei der Anmeldung zu
          Veranstaltungen
        </h2>
        <p>
          Auf unserer Website bieten wir die Möglichkeit, sich für verschiedene
          Veranstaltungen anzumelden. Für die Anmeldung erheben und verarbeiten
          wir die folgenden personenbezogenen Daten:
        </p>
        <ul>
          <li>Name</li>
          <li>E-Mail-Adresse</li>
        </ul>
        <p>
          Die Verarbeitung dieser Daten erfolgt ausschließlich zur Organisation
          und Durchführung der jeweiligen Veranstaltung. Ohne die Bereitstellung
          dieser Daten ist eine Anmeldung nicht möglich. Die Daten werden nach
          Abschluss der Veranstaltung gelöscht, sofern keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>

        <h2>Kontaktmöglichkeit über die Internetseite</h2>
        <p>
          Unsere Internetseite enthält aufgrund gesetzlicher Vorschriften
          Angaben, die eine schnelle elektronische Kontaktaufnahme zu uns sowie
          eine unmittelbare Kommunikation ermöglichen, was ebenfalls eine
          allgemeine Adresse der sogenannten elektronischen Post
          (E-Mail-Adresse) umfasst. Sofern eine betroffene Person per E-Mail
          oder über ein Kontaktformular den Kontakt mit dem Verantwortlichen
          aufnimmt, werden die von der betroffenen Person übermittelten
          personenbezogenen Daten automatisch gespeichert. Solche auf
          freiwilliger Basis von einer betroffenen Person an den
          Verantwortlichen übermittelten personenbezogenen Daten werden für
          Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person
          gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen
          Daten an Dritte.
        </p>

        <h2>Rechte der betroffenen Person</h2>
        <p>Sie haben das Recht:</p>
        <ul>
          <li>
            gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten
            personenbezogenen Daten zu verlangen;
          </li>
          <li>
            gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder
            Vervollständigung Ihrer bei uns gespeicherten personenbezogenen
            Daten zu verlangen;
          </li>
          <li>
            gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten
            personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung
            zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist;
          </li>
          <li>
            gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen;
          </li>
          <li>
            gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns
            bereitgestellt haben, in einem strukturierten, gängigen und
            maschinenlesebaren Format zu erhalten oder die Übermittlung an einen
            anderen Verantwortlichen zu verlangen;
          </li>
          <li>
            gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung
            jederzeit gegenüber uns zu widerrufen;
          </li>
          <li>
            gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren.
          </li>
        </ul>

        <h2>Widerspruchsrecht</h2>
        <p>
          Soweit Ihre personenbezogenen Daten auf Grundlage von berechtigten
          Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden,
          haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die
          Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür
          Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder
          sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall
          haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer
          besonderen Situation von uns umgesetzt wird.
        </p>

        <h2>Datensicherheit</h2>
        <p>
          Wir verwenden innerhalb des Website-Besuchs das verbreitete
          SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
          höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
          wird. In der Regel handelt es sich dabei um eine
          256-Bit-Verschlüsselung. Falls Ihr Browser keine
          256-Bit-Verschlüsselung unterstützt, greifen wir stattdessen auf
          128-Bit-v3-Technologie zurück. Ob eine einzelne Seite unseres
          Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der
          geschlossenen Darstellung des Schüssel- beziehungsweise
          Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
        </p>

        <h2>Aktualität und Änderung dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August
          2024. Durch die Weiterentwicklung unserer Website und Angebote darüber
          oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher
          Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu
          ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf
          der Website unter{" "}
          <a href="/datenschutz">https://fsr-wiwi-halle.de/datenschutz</a>{" "}
          abgerufen und ausgedruckt werden.
        </p>
      </Prose>
    </div>
  );
}
