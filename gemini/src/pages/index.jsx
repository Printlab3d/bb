import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";

// Importy Twoich podstron
import Home from "./Home";
import Moto from "./Moto"; // Zakładam, że masz te pliki
import Keychains from "./CustomKeychains"; // Jeśli tak się nazywa plik breloków
import Okazje from "./Okazje"; // Jeśli masz okazje
import Cart from "./Cart"; // Koszyk

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

          {/* --- TU JEST NAPRAWA --- */}
          {/* Ta linijka mówi: jak w adresie jest /product/COŚ, wyświetl ProductDetails */}
          <Route path="/product/:id" element={<ProductDetails />} />
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;