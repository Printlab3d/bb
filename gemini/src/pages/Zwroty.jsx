import React from "react";
import { Mail, Package, RefreshCw } from "lucide-react";

export default function Zwroty() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-12 text-center uppercase tracking-widest">Zwroty i Reklamacje</h1>
      
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12 rounded-r-lg">
        <h3 className="text-lg font-bold text-orange-900 mb-2">Zasady w skrócie:</h3>
        <p className="text-orange-800">
          Masz 14 dni na decyzję. Koszt przesyłki zwrotnej pokrywa Kupujący.
          Nie przyjmujemy zwrotów produktów w pełni personalizowanych (np. z Twoim imieniem).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold mb-2">1. Napisz do nas</h3>
          <p className="text-sm text-gray-600">
            {/* NOWY EMAIL */}
            Wyślij wiadomość na <strong>contact@printlab3d.eu</strong> z informacją, że chcesz zwrócić produkt. Podaj numer zamówienia.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold mb-2">2. Otrzymaj adres</h3>
          <p className="text-sm text-gray-600">
            W odpowiedzi zwrotnej prześlemy Ci dokładny adres magazynu, na który należy nadać paczkę.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="font-bold mb-2">3. Wyślij i czekaj</h3>
          <p className="text-sm text-gray-600">
            Nadaj paczkę (na własny koszt). Zwrot środków otrzymasz w ciągu 14 dni od momentu, gdy paczka do nas dotrze.
          </p>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700 space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Ważne informacje</h3>
        <ul className="list-disc pl-5">
          <li>Zwracany produkt nie może nosić śladów użytkowania i musi być kompletny.</li>
          <li>Prosimy o bezpieczne zapakowanie towaru – elementy z druku 3D muszą być zabezpieczone przed zgnieceniem w transporcie.</li>
          <li><strong>Produkty personalizowane</strong> (np. breloki z indywidualnym napisem) nie podlegają zwrotom, chyba że posiadają wadę fabryczną.</li>
        </ul>
      </div>
    </div>
  );
}