import { Header, SubHeader } from "@/components/TextComponents";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";
import Navigate from "./Navigate"; 

export default async function page({ params }: { params: { lang: string } }) {

  
 

  return (
    <>
      <div className="relative flex flex-col gap-16 items-center justify-center py-8 mb-8">
        <img src="/logo.png" className="absolute max-h-full mt-8 opacity-10 " />
        <Header>Geschäftsordnung</Header>
        <SubHeader className="text-center">
          der Fachschaft und des Fachschaftsrates des
          wirtschaftswissenschaftlichen Bereichs der juristischen und
          wirtschaftswissenschaftlichen Fakultät der Martin-Luther- Universität
          Halle-Wittenberg
        </SubHeader>
        <SubHeader>Fassung vom 03.07.2024</SubHeader>
      </div>
      <a
        href="/files/ordnung_fsr_wiwi.pdf"  
        download
      >
        <Button>
          <PaperclipIcon className="pr-2" /> Als PDF herunterladen
        </Button>
      </a>
      <Navigate/>
      <section id="preambel" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">I. PRÄAMBEL</h2>
        <p>
          Die Fachschaft Wirtschaftswissenschaften besteht aus den Mitgliedern
          der Studierendenschaft des Wirtschaftswissenschaftlichen Bereiches der
          Juristischen und Wirtschaftswissenschaftlichen Fakultät der
          Martin-Luther-Universität Halle- Wittenberg, § 5 Nr. 3 Satzung der
          Studierendenschaft. Der Fachschaftsrat Wirtschaftswissenschaften,
          folgend „FSR WiWi“ genannt, gibt sich als Organ der Studierendenschaft
          gemäß § 29 Satzung der Studierendenschaft folgende Geschäftsordnung.
        </p>
      </section>

      <section id="fachschaft" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">II. DIE FACHSCHAFT</h2>
        <section id="begriff" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 1 BEGRIFFSBESTIMMUNG UND RECHTSSTELLUNG
          </h3>
          <p>
            (1) Alle Mitglieder der verfassten Studierendenschaft, deren
            Studiengänge der Fachschaft zugeordnet sind, bilden die Fachschaft
            Wirtschaftswissenschaften.
            <br />
            (2) Die Studierendenschaft ist rechtsfähige Körperschaft des
            öffentlichen Rechtes und als solches Glied der
            Martin-Luther-Universität Halle-Wittenberg. Die Fachschaft
            Wirtschaftswissenschaften ist damit eine rechtsfähige
            Teilkörperschaft der MLU Halle-Wittenberg.
            <br />
            (3) Die Fachschaft Wirtschaftswissenschaften ordnet ihre
            Angelegenheiten im Rahmen der gesetzlichen Regelungen, insbesondere
            dem HSG LSA, der Grundordnung der MLU Halle-Wittenberg, der Satzung
            der Studierendenschaft der MLU Halle-Wittenberg, der Finanzordnung
            der Studierendenschaft der MLU Halle- Wittenberg, sowie dieser
            Geschäftsordnung selbstständig.
          </p>
        </section>
        <section id="organ" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 2 ORGAN DER FACHSCHAFT
          </h3>
          <p>
            (1) Das Organ der Fachschaft Wirtschafswissenschaften ist der FSR
            WiWi.
            <br />
            (2) Besondere Organe sind darüber hinaus:
            <br />
            1. die entsprechenden Vertreter*innen der Fachschaft im Fakultätsrat
            und
            <br />
            2. die entsprechenden Vertreter*innen der Fachschaft im
            Studierendenrat.
          </p>
        </section>
      </section>

      <section id="fachschaftsrat" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">III. DER FACHSCHAFTSRAT</h2>
        <section id="rechte" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 3 RECHTE UND AUFGABEN DES FACHSCHAFTSRATES
          </h3>
          <p>
            (1) Der FSR WiWi vertritt die Interessen der Fachschaft. Er ist das
            beschlussfassende Organ der Fachschaft und verwaltet ihre
            Angelegenheiten im Rahmen der gesetzlichen Bestimmungen,
            insbesondere dem HSG LSA, der Grundordnung der MLU Halle-Wittenberg,
            der Satzung der Studierendenschaft der MLU Halle-Wittenberg, der
            Finanzordnung der Studierendenschaft der MLU Halle- Wittenberg,
            sowie dieser Geschäftsordnung selbstständig.
          </p>
        </section>
        <section id="konstituierung" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">§ 4 KONSTITUIERUNG</h3>
          <p>
            (1) Der Wahlausschuss und die Wahlleitung des Studierendenrates
            berufen die konstituierende Sitzung des FSR WiWi ein und führen sie
            durch. Es gilt § 14 der Satzung der Studierendenschaft.
            <br />
            (2) Der FSR WiWi wählt in der konstituierenden Sitzung aus seiner
            Mitte:
            <br />
            1. eine*n vorsitzende*n Sprecher*in,
            <br />
            2. zwei Sprecher*innen für Finanzen.
          </p>
        </section>
        <section id="wahlen" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">§ 5 WAHLEN</h3>
          <p>
            (1) Alle Wahlen werden durch die jeweilige Sitzungsleitung geleitet.
            <br />
            (2) Die Wahl wird als Abstimmung per Handzeichen durchgeführt
            werden, sofern kein gewähltes Mitglied eine geheime Wahl beantragt.
            Im Falle einer geheimen Wahl wird mit verdeckten Stimmzetteln
            abgestimmt. Die Auszählung ist von mindestens zwei Personen
            durchzuführen, welche nicht für die Wahl kandidieren. Gewählt ist,
            wer die einfache Mehrheit der Stimmen der gewählten Mitglieder auf
            sich vereinigt.
            <br />
            (3) Eine Wahl in Abwesenheit ist möglich, sofern die Kandidatur
            schriftlich erklärt wurde und das Fernbleiben nach §12 dieser
            Geschäftsordnung entschuldigt ist.
            <br />
            (4) Gewählte müssen zur Annahme der Wahl aufgefordert werden. Nehmen
            die Gewählten die Wahl nicht an, so kann die Wahl nach den Maßgaben
            der vorstehenden Absätze unmittelbar wiederholt werden.
          </p>
        </section>
        <section id="mitgliedschaft" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 6 MITGLIEDSCHAFT IM FACHSCHAFTSRAT
          </h3>
          <p>
            (1) Satzungsgemäße Mitglieder des FSR WiWi sind die direkt gewählten
            Mitglieder beziehungsweise die aufgrund der Beendigung von Mandaten
            nachgerückten Mitglieder.
            <br />
            (2) Wurden für ein Mandat keine Vertreter*in gewählt oder stehen bei
            einer Beendigung eines Mandates keine Nachrückenden zur Verfügung,
            wird dieses Mandat bis zur nächsten Wahl nicht neu vergeben.
            <br />
            (3) Der FSR WiWi ermöglicht die Mitarbeit durch eine freie
            Mitgliedschaft. Freie Mitglieder können alle Positionen mit Ausnahme
            von Finanzer*innen- und Vorstandsposten übernehmen. Der FSR WiWi
            begrüßt die Übernahme von Verantwortung in Referaten und
            Arbeitsgruppen durch freie Mitglieder.
            <br />
            (4) Die Qualifikation zur Aufnahme einer freien Mitgliedschaft ist
            gegeben, wenn drei ordnungsgemäß geladene Sitzungen besucht wurden,
            oder wenn eine Person von einem gewählten Mitglied vorgeschlagen
            wird. Nach Qualifikation und Interesse des*r Kandidat*in auf eine
            freie Mitgliedschaft, wird die Aufnahme unter den gewählten
            Mitgliedern abgestimmt. Die Wahl erfolgt nach dem §5 dieser
            Geschäftsordnung.
            <br />
            (5) Gewählte Mitglieder des FSR WiWi können einen Antrag auf
            Aufhebung der freien Mitgliedschaft Einzelner stellen. Für die
            Abwahl ist eine einfache Mehrheit der gewählten Mitglieder nötig.
            <br />
            (6) Die Amtszeit der Mitglieder beginnt mit dem Tag der
            konstituierenden Sitzung gemäß §14 Abs. 2 der Satzung der
            Studierendenschaft.
            <br />
            (7) Die Amtszeit endet:
            <br />
            1. durch schriftlich erklärten Rücktritt,
            <br />
            2. durch Exmatrikulation,
            <br />
            3. durch Wechsel der Fachschaft,
            <br />
            4. durch Austritt aus der Studierendenschaft oder spätestens
            <br />
            5. am Tag der konstituierenden Sitzung nach einer Neuwahl des
            Fachschaftsrates.
            <br />
            (8) Ferner verliert ein Mitglied sein Mandat, wenn es zu drei
            aufeinander folgenden, ordnungsgemäß geladenen Sitzungen
            unentschuldigt fernbleibt. Ein Mandatsverlust muss betroffenen
            Person schriftlich mitgeteilt werden. Innerhalb von vier Wochen nach
            der Benachrichtigung kann die betroffene Person begründeten
            Widerspruch erheben. Wird dem Widerspruch stattgegeben, ist der
            Mandatsverlust rückgängig zu machen.
            <br />
            (9) Eine Beurlaubung ist möglich. Für die Zeit der Beurlaubung
            erhält der*die nächste Nachrücker*in das Mandat.
          </p>
        </section>
        <section id="rechte-mitglieder" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 7 RECHTE UND PFLICHTEN DER MITGLIEDER DES FACHSCHAFTSRATES
          </h3>
          <p>
            (1) Die Mitglieder des Fachschaftsrates sind verpflichtet, an den
            Arbeiten des Fachschaftsrates aktiv mitzuwirken.
            <br />
            (2) Sie unterliegen in persönlichen, vertraulichen und
            nichtöffentlichen Angelegenheiten der Schweigepflicht.
            <br />
            (3) Weitere Rechte und Pflichten der Mitglieder des Fachschaftsrates
            ergeben sich direkt aus § 27 der Satzung der Studierendenschaft.
          </p>
        </section>
        <section id="vorstand" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 8 VORSTAND DES FACHSCHAFTSRATES
          </h3>
          <p>
            (1) Der oder die vorsitzende*r Sprecher*in repräsentiert den
            Fachschaftsrat nach außen und koordiniert den Fachschaftsrat intern.
            <br />
            (2) Der Vorstand besteht aus dem oder der vorsitzendenden
            Sprecher*in, einem oder einer stellvertretenden Sprecher*in und den
            Sprecher*innen für Finanzen.
            <br />
            (3) Vorstandsmitglieder können vom FSR WiWi durch ein
            Misstrauensvotum abgewählt werden. Hierfür ist eine Mehrheit von
            zwei Dritteln der gewählten Mitglieder des Fachschaftsrates
            notwendig.
            <br />
            (4) Der Rücktritt von einem Vorstandsmitglied ist jederzeit möglich.
            Der Rücktritt ist schriftlich oder in einer ordentlich geladen
            Sitzung gegenüber den Mitgliedern des Fachschaftsrates zu erklären.
            Die ordnungsgemäße Einarbeitung der Nachfolger*in ist
            sicherzustellen. Gleiches gilt im Falle einer Neuwahl des FSR WiWi.
            <br />
            (5) Soweit nicht anders geregelt, sind im offiziellen Schriftverkehr
            und bei Verträgen der Vorstand vertretungsberechtigt.
            <br />
            (6) Kann eine Aufgabe nicht eindeutig zugeordnet werden, so ist
            zunächst der Vorstand zuständig.
          </p>
        </section>
        <section id="referate" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 9 REFERATE UND SPRECHER*INNEN FÜR BESONDERE AUFGABEN
          </h3>
          <p>
            (1) Der FSR WiWi bildet neben dem Vorstand verschiedene Referate und
            besondere Aufgabenbereiche, um die Arbeitsfähigkeit des Gremiums zu
            gewährleisten.
            <br />
            (2) Der FSR WiWi arbeitet in folgenden Referaten:
            <br />
            1. Referat für Bildung,
            <br />
            2. Referat für Öffentlichkeitsarbeit und
            <br />
            3. Referat für Veranstaltungen.
            <br />
            (3) Besondere Aufgabenbereiche decken grundlegende organisatorische
            Tätigkeiten des FSR WiWi ab und werden nach Ermessen des FSR WiWi
            bestimmt. Die Koordination jedes Referats und der besonderen
            Aufgabenbereiche wird durch ein*e Sprecher*in erfüllt. Die
            Sprecher*in und etwaige Stellvertreter*innen werden in getrennten
            Wahlgängen nach den Vorschriften des § 5 dieser Geschäftsordnung
            gewählt. Wählbar sind nur die ordnungsgemäßen Mitglieder des FSR
            WiWi. Die Kandidatur muss bei der jeweiligen Sitzungsleitung
            angezeigt werden.
            <br />
            (4) Die Amtszeit der Sprecher*innen bestimmt sich nach §6 dieser
            Geschäftsordnung. Scheidet ein*e Sprecher*in aus ihrem Amt aus, so
            erfolgt eine Wahl für den frei gewordenen Posten.
            <br />
            (5) Sprecher*innen können vom FSR WiWi durch ein Misstrauensvotum
            abgewählt werden. Hierfür ist eine Mehrheit von zwei Dritteln der
            Mitglieder des FSR WiWi notwendig.
            <br />
            (6) Der Rücktritt von einem Sprecher*innenposten ist jederzeit
            möglich. Er ist schriftlich gegenüber dem oder der vorsitzenden
            Sprecher*in zu erklären. Die ordnungsgemäße Einarbeitung des oder
            der Nachfolger*in ist sicherzustellen. Gleiches gilt im Falle einer
            Neuwahl des FSR WiWi.
            <br />
            (7) Die Sprecher*innen sind innerhalb ihrer Zuständigkeit für die
            Arbeits- und Funktionsfähigkeit der Referate verantwortlich.
          </p>
        </section>
        <section id="arbeitsgruppen" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">§ 10 ARBEITSGRUPPEN</h3>
          <p>
            (1) Arbeitsgruppen werden mit einfacher Mehrheit der anwesenden
            Mitglieder gegründet. Die Arbeitsgruppe soll ein konkretes Ziel bzw.
            einen konkreten Zweck verfolgen und offen stehen für alle Mitglieder
            des FSR WiWi und Studierenden der Fachschaft. Beschlüsse der
            Arbeitsgruppe haben den Status einer Empfehlung und müssen vom
            Fachschaftsrat bestätigt werden. Einer Arbeitsgruppe muss mindestens
            ein Mitglied des Fachschaftsrates angehören. Nach Gründung der
            Arbeitsgruppe wählen die Mitglieder der Arbeitsgruppe eine
            Arbeitsgruppenleiter*in. Arbeitsgruppen können durch Beschluss mit
            einfacher Mehrheit aufgelöst werden.
          </p>
        </section>
        <section id="einberufung" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 11 EINBERUFUNG UND BESCHLUSSFÄHIGKEIT
          </h3>
          <p>
            (1) Die Einladung zu den Sitzungen des Fachschaftsrates werden vom
            Vorstand mit dem Vorschlag zur Tagesordnung auf elektronischem Wege
            verschickt. Die Einladung muss drei Kalendertage vor der Sitzung
            zugehen. Ort und Zeit sind zu veröffentlichen.
            <br />
            (2) Der Fachschaftsrat ist beschlussfähig, wenn zu der Sitzung
            ordnungsgemäß geladen wurde und mehr als die Hälfte der gewählten
            Mitglieder anwesend ist.
          </p>
        </section>
        <section id="fernbleiben" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">§ 12 FERNBLEIBEN</h3>
          <p>
            (1) Kann ein Mitglied an einer Sitzung nicht teilnehmen, so hat es
            sich spätestens am Vorabend des Sitzungstages bis 18.00 Uhr beim
            Vorstand abzumelden. Andernfalls gilt das Mitglied als
            unentschuldigt.
            <br />
            (2) Unabhängig von Absatz 1 gilt ein Mitglied als entschuldigt, wenn
            es für den Zeitraum der Sitzung spätestens 5 Tage nach der Sitzung
            einen Krankenschein vorlegt oder durch höhere Gewalt verhindert ist.
          </p>
        </section>
        <section id="abstimmung" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 13 ABSTIMMUNG UND BESCHLUSSFASSUNG
          </h3>
          <p>
            (1) Der Fachschaftsrat entscheidet mit der Mehrheit der abgegebenen
            gültigen Stimmen, sofern keine andere Mehrheit vorgeschrieben ist.
            Ein Beschluss gilt als mit einfacher Mehrheit gefasst, wenn die
            Anzahl der abgegebenen Ja-Stimmen die der Nein-Stimmen übersteigt,
            sofern sich nicht mehr als die Hälfte der anwesenden
            Stimmberechtigten ihrer Stimme enthalten. Die Gegenstände der
            Beschlüsse sowie die Abstimmungsergebnisse sind zu protokollieren.
            <br />
            (2) Abstimmungen werden in der Regel durch Handzeichen durchgeführt.
            Auf Antrag eines Mitglieds ist geheim abzustimmen.
            <br />
            (3) Stimmberechtigt sind nur die anwesenden gewählten Mitglieder des
            Fachschaftsrates sowie im Falle der Abwesenheit von gewählten
            Mitgliedern als Folge von Beurlaubung deren nächste anwesende
            Stellvertreter*innen.
            <br />
            (4) Ein Mitglied ist nicht stimmberechtigt, sofern die Abstimmung
            die Erledigung eines Rechtsgeschäftes mit diesem Mitglied betrifft.
            <br />
            (5) Der Vorstand oder ein beauftragtes Mitglied hat die Möglichkeit,
            Entscheidungen über dringliche Fragen durch schriftlichen
            Umlaufbeschluss innerhalb einer Frist von mindestens 24 Stunden
            einzuholen. Die Abwicklung in elektronischer Form ist zulässig,
            sofern Vorkehrungen getroffen wurden, um Missbrauch zu verhindern.
            <br />
            (6) Von Umlaufbeschlüssen sind ausgenommen:
            <br />
            1. Misstrauensvoten,
            <br />
            2. Personalentscheidungen.
            <br />
            (7) Ein Umlaufbeschluss gilt als gefasst, sobald das notwendige
            Quorum erreicht und das Abstimmungsergebnis klar zu deuten ist. mehr
            als die Hälfte der gewählten Mitglieder diesem Zugestimmt haben
          </p>
        </section>
        <section id="offentlichkeit" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 14 ÖFFENTLICHKEIT UND REDERECHT
          </h3>
          <p>
            (1) Die Sitzungen des Fachschaftsrates sind öffentlich. Die
            Öffentlichkeit kann ganz oder teilweise mit der Mehrheit von zwei
            Dritteln der anwesenden Mitglieder ausgeschlossen werden.
            <br />
            (2) Die Öffentlichkeit ist auszuschließen, wenn Personalfragen oder
            persönliche Angelegenheiten behandelt werden sollen.
            <br />
            (3) Über nichtöffentliche Teile der Sitzung haben alle Beteiligten
            Verschwiegenheit zu bewahren.
          </p>
        </section>
        <section id="sitzungsleitung" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 15 SITZUNGSLEITUNG UND SITZUNGSABLAUF
          </h3>
          <p>
            (1) Der Vorstand hat, soweit eine Sitzungsleitung nicht gesondert
            festgelegt worden ist, unparteiisch zu leiten. Die Sitzungsleitung
            eröffnet und schließt die Sitzung.
            <br />
            (2) Die Sitzungsleitung wird vor Beginn der Sitzung durch Gegenrede
            legitimiert. Sollte es Gegenrede geben, so wird über die
            Sitzungsleitung abgestimmt. Hierzu reicht eine einfache Mehrheit
            nach § 13 dieser Geschäftsordnung. Solle keine Sitzungsleitung
            zustande kommen, findet keine Sitzung statt.
            <br />
            (3) Die Sitzungsleitung erteilt und entzieht das Wort. Es wird eine
            Redner*innenliste geführt. Die Reihenfolge der Redner*innen bestimmt
            sich im Normalfall nach der Reihenfolge der Meldung. Die
            Sitzungsleitung kann Anwesenden, die sich noch nicht zur Sache
            geäußert haben, den Vorzug geben. Die Sitzungsleitung kann jederzeit
            das Wort zu Verfahrensfragen, Richtigstellungen und
            Zusammenfassungen ergreifen. Antragsstellenden kann das Wort auch
            außerhalb der Redeliste erteilt werden.
            <br />
            (4) Die Sitzungsleitung kann Redner*innen zur Sache rufen. Kommen
            diese auch dem zweiten Ruf nicht nach, kann ihnen die
            Sitzungsleitung das Wort entziehen und darf es ihnen zum aktuellen
            Tagesordnungspunkt nicht wieder erteilen.
            <br />
            (5) Die Sitzungsleitung kann Anwesende zur Ordnung rufen. Kommen
            diese auch dem zweiten Ruf nicht nach, kann die Sitzungsleitung sie
            der Sitzung verweisen, sofern beim zweiten Ordnungsruf auf diese
            Konsequenz aufmerksam gemacht wurde. Bei schweren Verstößen gegen
            die Ordnung kann die Sitzungsleitung Anwesende auch ohne Ordnungsruf
            verweisen.
            <br />
            (6) Auf den Sitzungen des Fachschaftsrates gilt Alkoholverbot.
          </p>
        </section>
        <section id="tagesordnung" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">§ 16 TAGESORDNUNG</h3>
          <p>
            (1)Der Fachschaftsrat gibt sich zu jeder Sitzung eine Tagesordnung.
            Anträge zur Tagesordnung sind vor der Sitzung bei der
            Sitzungsleitung einzureichen oder zu Beginn der Sitzung mündlich zu
            stellen. Nach Feststellung der Beschlussfähigkeit ist zunächst über
            die Tagesordnung abzustimmen.
          </p>
        </section>
        <section id="antrage" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 17 ANTRÄGE ZUR GESCHÄFTSORDNUNG
          </h3>
          <p>
            (1) Mitglieder des Fachschaftsrates können jederzeit, außer während
            der Durchführung von Wahlen und Abstimmungen, Anträge zur
            Geschäftsordnung stellen. Dies umfasst Anträge auf
            <br />
            1. Änderung der Tagesordnung;
            <br />
            2. Beschränkung der Redezeit;
            <br />
            3. Schluss der Redner*innenliste;
            <br />
            4. Abbruch der Debatte, gegebenenfalls sofortige Abstimmung;
            <br />
            5. Wiederaufnahme der Debatte;
            <br />
            6. begründete Nichtbehandlung eines Antrages;
            <br />
            7. Vertagung eines Punktes der Tagesordnung oder Verweis an ein
            Referat, eine Arbeitsgruppe oder die jeweilige Sprecher*in;
            <br />
            8. Unterbrechung der Sitzung;
            <br />
            9. Schluss der Sitzung;
            <br />
            10. Ausschluss der Öffentlichkeit;
            <br />
            11. Vorzug eines Tagesordnungspunktes;
            <br />
            12. Änderung des Abstimmungsmodus;
            <br />
            13. geheime Abstimmung;
            <br />
            14. Neuauszählung eines Abstimmungs- oder Wahlergebnisses sowie
            <br />
            15. Feststellung der Beschlussfähigkeit.
            <br />
            (2) Anträge zur Geschäftsordnung sind durch das Heben beider Hände
            anzuzeigen. Der antragsstellenden Person ist als nächstes das Wort
            zu erteilen. Redebeiträge dürfen dadurch nicht unterbrochen werden.
            <br />
            (3) Auf einen Antrag zur Geschäftsordnung folgen maximal eine
            Gegenrede, anschließend ist offen über den Antrag abzustimmen.
            Stimmenthaltungen bleiben unberücksichtigt. Erfolgt keine Gegenrede,
            ist der Antrag ohne Abstimmung angenommen.
            <br />
            (4) Auf Anträge nach Absatz 1 Nummer 12 bis 13 ist keine Gegenrede
            möglich. Ein Antrag nach Absatz 1 Nummer 12 darf von einem Mitglied
            nur einmal pro Abstimmung bzw. Wahlgestellt werden.
          </p>
        </section>
      </section>

      <section id="schlussbestimmungen" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">IV. SCHLUSSBESTIMMUNGEN</h2>
        <section id="inkrafttreten" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 18 INKRAFTTRETEN, ÄNDERUNG
          </h3>
          <p>
            (1) Diese Geschäftsordnung tritt nach Beschluss durch den
            Fachschaftsrat mit Zweidrittelmehrheit der Mitglieder des
            Fachschaftsrates in Kraft. Sie ist in geeigneter Weise zu
            veröffentlichen.
            <br />
            (2) Eine Änderung dieser Geschäftsordnung bedarf der Zustimmung von
            zwei Dritteln der satzungsgemäßen Mitglieder des Fachschaftsrates
            und ist nur auf einer ordnungsgemäßen Sitzung im Sinne von § 13
            dieser Geschäftsordnung möglich.
          </p>
        </section>
        <section id="uberordnete" className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            § 19 ÜBERGEORDNETE VORSCHRIFTEN
          </h3>
          <p>
            (1) Die Fachschafts- und Geschäftsordnung des Fachschaftsrates WiWi
            ergeht im Einklang mit der Satzung der Studierendenschaft der
            Martin-Luther-Universität Halle- Wittenberg und der Finanzordnung
            der Studierendenschaft der Martin-Luther- Universität
            Halle-Wittenberg.
            <br />
            (2) Für alle Fälle, in denen diese Geschäftsordnung keine Regelung
            trifft, sind die Vorschriften aus der Satzung der Studierendenschaft
            der Martin-Luther-Universität Halle-Wittenberg, der Finanzordnung
            der Studierendenschaft sowie der Geschäftsordnung des
            Studierendenrates zu entnehmen.
          </p>
        </section>
      </section>
    </>
  );
}
