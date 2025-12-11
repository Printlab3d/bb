
import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-black mb-2 elegant-text">
              Polityka Prywatności
            </h1>
            <p className="text-gray-600">Dbamy o Twoją prywatność</p>
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
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">1. Administrator danych</h2>
            <div className="space-y-3 text-gray-700">
              <p>Administratorem Twoich danych osobowych jest [NAZWA FIRMY], z siedzibą w [ADRES], NIP: [NIP], REGON: [REGON].</p>
              <p>Kontakt: [EMAIL], [TELEFON]</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">2. Cele i podstawy przetwarzania</h2>
            <div className="space-y-3 text-gray-700">
              <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Realizacji zamówień złożonych w sklepie (podstawa: wykonanie umowy)</li>
                <li>Kontaktu z Klientem, w tym obsługi reklamacji (podstawa: wykonanie umowy, prawnie uzasadniony interes)</li>
                <li>Prowadzenia marketingu produktów i usług (podstawa: zgoda lub prawnie uzasadniony interes)</li>
                <li>Wystawiania faktur (podstawa: obowiązek prawny)</li>
                <li>Obrony przed roszczeniami (podstawa: prawnie uzasadniony interes)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">3. Rodzaje przetwarzanych danych</h2>
            <div className="space-y-3 text-gray-700">
              <p>Przetwarzamy następujące kategorie danych osobowych:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dane identyfikacyjne: imię, nazwisko</li>
                <li>Dane kontaktowe: adres e-mail, numer telefonu</li>
                <li>Dane adresowe: adres dostawy, adres do faktury</li>
                <li>Dane o zamówieniach: historia zakupów, preferencje</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">4. Odbiorcy danych</h2>
            <div className="space-y-3 text-gray-700">
              <p>Twoje dane osobowe mogą być przekazywane:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Firmom kurierskim - w celu realizacji dostawy</li>
                <li>Operatorom płatności (Przelewy24) - w celu realizacji płatności</li>
                <li>Dostawcom systemów IT - w celu utrzymania infrastruktury technicznej</li>
                <li>Organom państwowym - gdy wymaga tego prawo</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">5. Okres przechowywania danych</h2>
            <div className="space-y-3 text-gray-700">
              <p>Dane osobowe przechowujemy przez okres:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Realizacji zamówienia i dochodzenia roszczeń z nim związanych</li>
                <li>Wymagany przepisami prawa (np. przepisy podatkowe - 5 lat)</li>
                <li>Do momentu wycofania zgody (w przypadku przetwarzania na podstawie zgody)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">6. Twoje prawa</h2>
            <div className="space-y-3 text-gray-700">
              <p>Masz prawo do:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dostępu do swoich danych osobowych</li>
                <li>Sprostowania (poprawiania) danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania danych</li>
                <li>Przenoszenia danych</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania</li>
                <li>Wycofania zgody w dowolnym momencie</li>
                <li>Wniesienia skargi do organu nadzorczego (UODO)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">7. Pliki cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>Strona wykorzystuje pliki cookies w celu:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Zapamiętania sesji użytkownika i zawartości koszyka</li>
                <li>Analizy ruchu na stronie</li>
                <li>Dostosowania treści do preferencji użytkownika</li>
              </ul>
              <p className="mt-3">Możesz zarządzać cookies w ustawieniach swojej przeglądarki.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">8. Bezpieczeństwo</h2>
            <div className="space-y-3 text-gray-700">
              <p>Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych, w tym szyfrowanie połączenia SSL oraz bezpieczne przechowywanie danych.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
