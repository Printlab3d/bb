import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- TU BYŁ BŁĄD ---
// Zmieniamy "@/Layout" na "../Layout.jsx"
// Dzięki temu Netlify dokładnie wie, gdzie szukać pliku
import Layout from "../Layout.jsx"; 

// Importy Twoich podstron
import Home from "./Home";
import Moto from "./Moto"; 
import Keychains from "./CustomKeychains"; 
import Okazje from "./Okazje"; 
import Cart from "./Cart"; 

// WAŻNE: Tu importujemy ten nowy plik ze szczegółami produktu
import ProductDetails from "./ProductDetails"; 

const Pages = () => {
  return (
    <Router>
      {/* Layout otacza wszystko, żeby nagłówek był zawsze widoczny */}
      <Layout>
        <Routes>
          {/* Strona główna */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          
          {/* Kategorie */}
          <Route path="/Moto" element={<Moto />} />
          <Route path="/CustomKeychains" element={<Keychains />} />
          <Route path="/Okazje" element={<Okazje />} />
          
          {/* Koszyk */}
          <Route path="/Cart" element={<Cart />} />

          {/* Strona produktu */}
          <Route path="/product/:id" element={<ProductDetails />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;