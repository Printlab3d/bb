import React from 'react';
import './App.css';
import Pages from "@/pages/index.jsx";
// Importujemy Toaster
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    // Używamy React.Fragment (<> ... </>)
    <>
      {/* Główna zawartość strony */}
      <Pages />
      
      {/* Toaster jest TUTAJ i TYLKO TUTAJ.
        Dzięki temu powiadomienia będą wyświetlane raz, na wierzchu całej aplikacji.
      */}
      <Toaster />
    </>
  );
}

export default App;