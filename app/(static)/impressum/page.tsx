import { Header, SubHeader } from "@/components/TextComponents";

export default function page() {
  return (
    <div>
      <Header>Impressum</Header>
      <SubHeader>Angaben gemäß § 5 TMG</SubHeader>
      <p>
        Fachschaftsrat Wirtschaftswissenschaften <br />
        Große Steinstraße 73 <br />
        06108 Halle (Saale) <br />
        Deutschland <br />
      </p>

      <SubHeader>Vertreten durch</SubHeader>
      <p>
        Den Vorsitzenden des Fachschaftsrates Wirtschaftswissenschaften <br />
        E-Mail: fachschaftsrat@wiwi.uni-halle.de <br />
        Website:{" "}
        <a
          href="https://fsr-wiwi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://fsr-wiwi.vercel.app/
        </a>
      </p>

      <SubHeader>Kontakt</SubHeader>
      <p>
        E-Mail: fachschaftsrat@wiwi.uni-halle.de <br />
      </p>
      <SubHeader>Rechtliche Hinweise</SubHeader>
      <p>
        Der Fachschaftsrat Wirtschaftswissenschaften ist eine Körperschaft
        öffentlichen Rechts und untersteht der Martin Luther Universität
        Halle-Wittenberg.
      </p>

      <SubHeader>Haftung für Inhalte</SubHeader>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>

      <SubHeader>Haftung für Links</SubHeader>
      <p>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      </p>
      <p>
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
        ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
        Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
        entfernen.
      </p>

      <SubHeader>Urheberrecht</SubHeader>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
      <p>
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
        werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
        Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Inhalte umgehend entfernen.
      </p>
    </div>
  );
}
