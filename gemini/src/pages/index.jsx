import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// NAPRAWA: Zmieniamy "../Layout.jsx" na "./Layout.jsx"
// (kropka oznacza "ten sam folder", bo plik jest obok)
import Layout from "./Layout.jsx"; 

// Importy podstron (są w tym samym folderze, więc ./ jest ok)
import Home from "./Home";
import Moto from "./Moto"; 
import Keychains from "./CustomKeychains"; 
import Okazje from "./Okazje"; 
import Cart from "./Cart"; 
import ProductDetails from "./ProductDetails"; 

const Pages = () => {
  return (
    <Router>
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