import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx"; 

import Home from "./Home";
import Moto from "./Moto";
import CustomKeychains from "./CustomKeychains";
import Okazje from "./Okazje";
import ProductDetails from "./ProductDetails"; 
import Cart from "./Cart";

// NOWY IMPORT - CHECKOUT
import Checkout from "./Checkout"; 

// Stopka
import Regulamin from "./Regulamin";
import Zwroty from "./Zwroty";
import PolitykaPrywatnosci from "./PolitykaPrywatnosci";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/Home" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/Moto" element={<Layout currentPageName="Moto"><Moto /></Layout>} />
        <Route path="/CustomKeychains" element={<Layout currentPageName="CustomKeychains"><CustomKeychains /></Layout>} />
        <Route path="/Okazje" element={<Layout currentPageName="Okazje"><Okazje /></Layout>} />
        
        <Route path="/product/:id" element={<Layout currentPageName="Produkt"><ProductDetails /></Layout>} />
        <Route path="/Cart" element={<Layout currentPageName="Koszyk"><Cart /></Layout>} />

        {/* NOWA TRASA - CHECKOUT */}
        <Route path="/Checkout" element={<Layout currentPageName="Zamowienie"><Checkout /></Layout>} />
        
        <Route path="/Regulamin" element={<Layout currentPageName="Regulamin"><Regulamin /></Layout>} />
        <Route path="/Zwroty" element={<Layout currentPageName="Zwroty"><Zwroty /></Layout>} />
        <Route path="/PolitykaPrywatnosci" element={<Layout currentPageName="Polityka"><PolitykaPrywatnosci /></Layout>} />
      </Routes>
    </Router>
  );
};

export default Pages;