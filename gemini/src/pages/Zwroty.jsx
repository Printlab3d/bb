
import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

export default function Zwroty() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Package className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-light text-black mb-2 elegant-text">
              Zwroty i Reklamacje
            </h1>
            <p className="text-gray-600">Polityka zwrotów produktów</p>
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
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">Prawo odstąpienia od umowy</h2>
            <div className="space-y-3 text-gray-700">
              <p>Zgodnie z przepisami prawa, masz prawo odstąpić od umowy w terminie 14 dni bez podania jakiejkolwiek przyczyny.</p>
              <p>Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia, w którym weszłaś/wszedłeś w posiadanie rzeczy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">Jak odstąpić od umowy?</h2>
            <div className="space-y-3 text-gray-700">
              <p>Aby skorzystać z prawa odstąpienia od umowy, musisz poinformować nas o swojej decyzji w drodze jednoznacznego oświadczenia.</p>
              <p><strong>Możesz to zrobić poprzez:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wysłanie wiadomości e-mail na adres: kontakt@viberush.pl</li>
                <li>Wysłanie listu na adres siedziby firmy</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">Zwrot produktu</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Warunki zwrotu:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Produkt nie może nosić śladów używania</li>
                <li>Produkt musi być kompletny (wraz z dokumentacją, opakowaniem, akcesoriami)</li>
                <li>Produkt nie może być uszkodzony</li>
              </ul>
              <p className="mt-4 font-bold text-orange-600">WAŻNE: Koszty bezpośredniego zwrotu rzeczy ponosi Klient.</p>
              <p className="mt-3">Zalecamy wysyłkę przesyłki poleconej lub kurierem z potwierdzeniem odbioru.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">Zwrot pieniędzy</h2>
            <div className="space-y-3 text-gray-700">
              <p>Po otrzymaniu zwracanego produktu dokonamy jego weryfikacji. Jeśli produkt spełnia warunki zwrotu, zwrócimy Ci wszystkie otrzymane płatności.</p>
              <p>Zwrot płatności nastąpi w terminie 14 dni od dnia otrzymania oświadczenia o odstąpieniu od umowy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-black mb-4 elegant-text">Reklamacje - Gwarancja</h2>
            <div className="space-y-3 text-gray-700">
              <p>Wszystkie nasze produkty objęte są 12-miesięczną gwarancją producenta.</p>
              <p><strong>Zgłoszenie reklamacji:</strong></p>
              <p>Reklamacje można zgłaszać na adres e-mail: kontakt@viberush.pl</p>
              <p className="mt-3">Rozpatrzenie reklamacji następuje w ciągu 14 dni od daty jej zgłoszenia.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
