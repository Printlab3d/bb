
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Regulamin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-black mb-2 elegant-text">
              Regulamin Sklepu
            </h1>
            <p className="text-gray-600">Obowiązuje od 01.01.2025</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8"
        >
          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§1 Postanowienia ogólne</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Sklep internetowy VibeRush.pl, działający pod adresem viberush.pl, prowadzony jest przez [NAZWA FIRMY], z siedzibą w [ADRES].</p>
              <p>2. Niniejszy Regulamin określa zasady korzystania ze Sklepu internetowego oraz zasady i tryb zawierania Umów Sprzedaży z Klientem na odległość za pośrednictwem Sklepu.</p>
              <p>3. Każdy Klient przed złożeniem zamówienia zobowiązany jest do zapoznania się z treścią Regulaminu i jego akceptacji.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§2 Definicje</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Klient</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która dokonuje zakupu w Sklepie.</p>
              <p><strong>Konsument</strong> – osoba fizyczna zawierająca ze Sprzedawcą umowę w ramach Sklepu, której przedmiot nie jest związany bezpośrednio z jej działalnością gospodarczą lub zawodową.</p>
              <p><strong>Sprzedawca</strong> – [NAZWA FIRMY], prowadzący działalność gospodarczą pod adresem [ADRES].</p>
              <p><strong>Sklep</strong> – sklep internetowy prowadzony przez Sprzedawcę pod adresem viberush.pl.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§3 Składanie zamówień</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Zamówienia można składać 24 godziny na dobę przez cały rok.</p>
              <p>2. Warunkiem złożenia zamówienia w Sklepie jest dodanie produktów do koszyka i wypełnienie formularza zamówienia.</p>
              <p>3. Po złożeniu zamówienia Klient otrzymuje wiadomość e-mail potwierdzającą przyjęcie zamówienia do realizacji.</p>
              <p>4. Umowa sprzedaży zawierana jest z chwilą potwierdzenia zamówienia przez Sprzedawcę.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§4 Ceny i płatności</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Ceny produktów podane w Sklepie są cenami brutto (zawierają podatek VAT).</p>
              <p>2. Klient ma możliwość dokonania płatności za zamówione produkty poprzez system płatności online Przelewy24.</p>
              <p>3. Koszty dostawy wynoszą 15 zł. Dostawa jest darmowa przy zamówieniach powyżej 150 zł.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§5 Dostawa</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Dostawa produktów następuje na terenie Polski.</p>
              <p>2. Termin realizacji zamówienia wynosi do 48 godzin od momentu zaksięgowania płatności.</p>
              <p>3. Dostawa realizowana jest za pośrednictwem firm kurierskich.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§6 Prawo odstąpienia od umowy</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Konsument może w terminie 14 dni odstąpić od umowy bez podania jakiejkolwiek przyczyny.</p>
              <p>2. Bieg terminu rozpoczyna się od dnia, w którym Konsument wszedł w posiadanie produktu.</p>
              <p>3. Konsument może odstąpić od Umowy, składając Sprzedawcy oświadczenie o odstąpieniu od Umowy.</p>
              <p>4. Konsument ponosi bezpośrednie koszty zwrotu rzeczy.</p>
              <p>5. Sprzedawca ma obowiązek zwrócić Konsumentowi wszystkie otrzymane od niego płatności, w terminie 14 dni od dnia otrzymania oświadczenia o odstąpieniu od umowy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§7 Reklamacje</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Podstawa i zakres odpowiedzialności Sprzedawcy wobec Klienta z tytułu rękojmi określone są przepisami Kodeksu cywilnego.</p>
              <p>2. Reklamacje należy składać na adres e-mail: [EMAIL] lub pisemnie na adres: [ADRES].</p>
              <p>3. Sprzedawca ustosunkuje się do reklamacji w terminie 14 dni od daty jej otrzymania.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§8 Dane osobowe</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Administratorem danych osobowych Klientów jest Sprzedawca.</p>
              <p>2. Dane osobowe Klientów przetwarzane są zgodnie z Polityką Prywatności dostępną w Sklepie.</p>
              <p>3. Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się w Polityce Prywatności.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">§9 Postanowienia końcowe</h2>
            <div className="space-y-3 text-gray-700">
              <p>1. Sprzedawca zastrzega sobie prawo do dokonywania zmian Regulaminu.</p>
              <p>2. W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie przepisy Kodeksu cywilnego oraz inne właściwe przepisy prawa polskiego.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
