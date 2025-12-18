import React from "react";

export default function Regulamin() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-8 text-center uppercase tracking-widest">Regulamin Sklepu</h1>
      
      <div className="prose max-w-none text-gray-700 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">I. Postanowienia ogólne</h2>
        <p>
          1. Sklep internetowy VibeRush, dostępny pod adresem internetowym viberush.pl, prowadzony jest przez firmę: 
          <strong> Global Effect Rafał Nowakowski</strong> z siedzibą w: <strong>70-354 Szczecin, ul. Ściegiennego 26/17</strong>, 
          NIP: <strong>6711079312</strong>, REGON: <strong>320689867</strong>.
        </p>
        <p>
          2. Kontakt ze Sprzedawcą możliwy jest pod adresem e-mail: <strong>contact@printlab3d.eu</strong>.
        </p>

        <h2 className="text-xl font-bold text-gray-900">II. Produkty i Płatności</h2>
        <p>
          1. Ceny produktów w Sklepie są cenami brutto i wyrażone są w złotych polskich.
        </p>
        <p>
          2. Sprzedawca realizuje zamówienia na akcesoria motocyklowe oraz produkty wykonywane w technologii druku 3D.
        </p>
        <p>
          3. Płatności obsługiwane są przez bezpiecznych operatorów (Stripe/Przelewy24/BLIK) lub kartą płatniczą.
        </p>

        <h2 className="text-xl font-bold text-gray-900">III. Dostawa</h2>
        <p>
          1. Towar wysyłany jest na terenie Polski w terminie od 1 do 5 dni roboczych od zaksięgowania wpłaty.
        </p>

        <h2 className="text-xl font-bold text-gray-900">IV. Zwroty (Prawo odstąpienia od umowy)</h2>
        <p>
          1. Konsument ma prawo odstąpić od umowy w terminie 14 dni od otrzymania towaru.
        </p>
        <p>
          2. <strong>Procedura zwrotu:</strong> Aby dokonać zwrotu, Konsument musi najpierw poinformować o tym Sprzedawcę drogą mailową na adres: <strong>contact@printlab3d.eu</strong>.
        </p>
        <p>
          3. W odpowiedzi na zgłoszenie, Sprzedawca przekaże Konsumentowi dokładny adres zwrotny.
        </p>
        <p>
          4. Bezpośredni koszt zwrotu towaru ponosi Konsument.
        </p>
        <p>
          5. <strong>Wyjątki:</strong> Prawo do zwrotu nie przysługuje w przypadku produktów personalizowanych (np. breloki z własnym napisem).
        </p>

        <h2 className="text-xl font-bold text-gray-900">V. Reklamacje</h2>
        <p>
          1. Reklamacje należy zgłaszać na adres: contact@printlab3d.eu.
        </p>
        <p>
          2. Specyfika druku 3D (widoczne warstwy) nie stanowi wady produktu podlegającej reklamacji.
        </p>

        {/* --- NOWA SEKCJA O OCHRONIE PRAWNEJ --- */}
        <div className="bg-gray-50 border-l-4 border-gray-800 p-4 my-8">
            <h2 className="text-xl font-bold text-gray-900 mt-0">VI. Prawa Autorskie i Własność Intelektualna</h2>
            <p>
              1. Wszystkie produkty dostępne w sklepie, w szczególności autorskie projekty wykonane w technologii druku 3D, a także nazwa sklepu, logotypy, zdjęcia oraz opisy, stanowią własność intelektualną firmy <strong>Global Effect Rafał Nowakowski</strong> i podlegają ochronie prawnej.
            </p>
            <p>
              2. <strong>Zakaz Kopiowania:</strong> Zabrania się kopiowania, skanowania, inżynierii wstecznej oraz powielania produktów (zarówno fizycznie jak i cyfrowo) bez wyraźnej, pisemnej zgody Sprzedawcy.
            </p>
            <p>
              3. <strong>Zakaz Dalszej Odprzedaży:</strong> Nabycie produktu nie uprawnia Kupującego do prowadzenia jego dalszej odsprzedaży w celach zarobkowych (dystrybucji komercyjnej) bez podpisania umowy partnerskiej ze Sprzedawcą. Naruszenie tego zakazu może skutkować odpowiedzialnością prawną.
            </p>
            <p>
              4. Wszelkie znaki towarowe (w tym logo VibeRush / VR) użyte na stronie są zastrzeżone.
            </p>
        </div>
      </div>
    </div>
  );
}