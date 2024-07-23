import { Header, SubHeader } from "@/components/TextComponents";

export default function page() {
  return (
    <div>
      <Header>Impressum</Header>
      <div className="text-xl lg:text-4xl font-bold p-16 bg-red-600 text-center fixed bottom-0 rounded-lg left-0 right-0 ">
        GPT-GENERATED | Muss noch angepasst werden
      </div>

    <SubHeader>Angaben gemäß § 5 TMG</SubHeader>
    <p>
        [Ihr Unternehmen] <br />
        [Ihre Straße und Hausnummer] <br />
        [Ihre PLZ und Ort] <br />
    </p>
    
    <SubHeader>Vertreten durch</SubHeader>
    <p>
        [Name des Vertretungsberechtigten]
    </p>
    
    <SubHeader>Kontakt</SubHeader>
    <p>
        Telefon: [Ihre Telefonnummer] <br />
        Telefax: [Ihre Faxnummer, falls vorhanden] <br />
        E-Mail: [Ihre E-Mail-Adresse] <br />
    </p>
    
    <SubHeader>Registereintrag</SubHeader>
    <p>
        Eintragung im Handelsregister. <br />
        Registergericht: [Name des Registergerichts] <br />
        Registernummer: [Ihre Handelsregisternummer]
    </p>
    
    <SubHeader>Umsatzsteuer-ID</SubHeader>
    <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: [Ihre Umsatzsteuer-ID]
    </p>
    
    <SubHeader>Wirtschafts-ID</SubHeader>
    <p>
        Wirtschafts-Identifikationsnummer gemäß §139c Abgabenordnung: [Ihre Wirtschafts-ID, falls vorhanden]
    </p>
    
    <SubHeader>Aufsichtsbehörde</SubHeader>
    <p>
        [Name der Aufsichtsbehörde, falls zutreffend] <br />
        [Adresse der Aufsichtsbehörde]
    </p>
    
    <SubHeader>Berufshaftpflichtversicherung</SubHeader>
    <p>
        Name und Sitz des Versicherers: <br />
        [Name der Versicherung] <br />
        [Adresse der Versicherung] <br />
        Geltungsraum der Versicherung: [Geltungsraum, z.B. Deutschland, EU, weltweit]
    </p>
    
    <SubHeader>Streitschlichtung</SubHeader>
    <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a>. <br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
    </p>
    <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbr /aucherschlichtungsstelle teilzunehmen.
    </p>
    
    <SubHeader>Haftung für Inhalte</SubHeader>
    <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
    </p>
    <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
    </p>
    
    <SubHeader>Haftung für Links</SubHeader>
    <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
    </p>
    <p>
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
    </p>
    
    <SubHeader>Urheberrecht</SubHeader>
    <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbr /eitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebr /auch gestattet.
    </p>
    <p>
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
    </p>
      
    </div>
  );
}
