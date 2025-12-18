import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// KLUCZOWE: Importujemy Layout z tego samego folderu
import Layout from "./Layout.jsx"; 

// Importy podstron
import Home from "./Home";
import Cart from "./Cart";
import CustomKeychains from "./CustomKeychains";
import Moto from "./Moto";
import Okazje from "./Okazje";
import Regulamin from "./Regulamin";
import PolitykaPrywatnosci from "./PolitykaPrywatnosci";
import Zwroty from "./Zwroty";
import ProductDetails from "./ProductDetails";
import Success from "./Success";

function PagesContent() {
    const location = useLocation();
    // Proste pobieranie nazwy strony dla animacji w Layout
    const path = location.pathname.split('/').pop() || 'Home';
    
    return (
        <Layout currentPageName={path}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/CustomKeychains" element={<CustomKeychains />} />
                <Route path="/Moto" element={<Moto />} />
                <Route path="/Okazje" element={<Okazje />} />
                <Route path="/Regulamin" element={<Regulamin />} />
                <Route path="/PolitykaPrywatnosci" element={<PolitykaPrywatnosci />} />
                <Route path="/Zwroty" element={<Zwroty />} />
                <Route path="/ProductDetails" element={<ProductDetails />} />
                <Route path="/Success" element={<Success />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}