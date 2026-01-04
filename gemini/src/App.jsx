import React from 'react';
import './App.css';
import Pages from "@/pages/index.jsx";
// IMPORTUJEMY TOASTER
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Pages />
      
      {/* TOASTER JEST TYLKO TUTAJ - POWIADOMIENIA BĘDĄ POJEDYNCZE */}
      <Toaster />
    </>
  );
}

export default App;