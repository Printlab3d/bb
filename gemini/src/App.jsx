import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Importy Twoich stron
import Home from "./pages/Home";
import Moto from "./pages/Moto";
import CustomKeychains from "./pages/CustomKeychains";
import Okazje from "./pages/Okazje";
import ProductDetails from "./pages/ProductDetails"; 
import Cart from "./pages/Cart";
// Jeśli masz Checkout.jsx to odkomentuj:
// import Checkout from "./pages/Checkout"; 

// --- NOWE IMPORTY (Naprawa stopki) ---
import Regulamin from "./pages/Regulamin";
import Zwroty from "./pages/Zwroty";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";

function App() {
  return (
    <Router>
      <Routes>
        {/* Główne podstrony */}
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/Home" element={<Layout currentPageName="Home"><Home /></Layout>} />
        <Route path="/Moto" element={<Layout currentPageName="Moto"><Moto /></Layout>} />
        <Route path="/CustomKeychains" element={<Layout currentPageName="CustomKeychains"><CustomKeychains /></Layout>} />
        <Route path="/Okazje" element={<Layout currentPageName="Okazje"><Okazje /></Layout>} />
        
        <Route path="/product/:id" element={<Layout currentPageName="Produkt"><ProductDetails /></Layout>} />
        <Route path="/Cart" element={<Layout currentPageName="Koszyk"><Cart /></Layout>} />
        {/* <Route path="/Checkout" element={<Layout currentPageName="Zamowienie"><Checkout /></Layout>} /> */}

        {/* --- TUTAJ JEST NAPRAWA --- 
            Dzięki temu React wie, co pokazać po kliknięciu w stopce */}
        <Route path="/Regulamin" element={<Layout currentPageName="Regulamin"><Regulamin /></Layout>} />
        <Route path="/Zwroty" element={<Layout currentPageName="Zwroty"><Zwroty /></Layout>} />
        <Route path="/PolitykaPrywatnosci" element={<Layout currentPageName="Polityka"><PolitykaPrywatnosci /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;