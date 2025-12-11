import Layout from "./Layout.jsx"; // POPRAWIONY IMPORT NA ŚCIEŻKĘ WZGLĘDNĄ

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

// POPRAWIONY IMPORT: Wskazuje na nowo utworzony plik narzędziowy
import { createPageUrl } from "@/lib/utils/index.ts"; 

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Cart: Cart,
    
    CustomKeychains: CustomKeychains,
    
    Moto: Moto,
    
    Okazje: Okazje,
    
    Regulamin: Regulamin,
    
    PolitykaPrywatnosci: PolitykaPrywatnosci,
    
    Zwroty: Zwroty,
    
    ProductDetails: ProductDetails,
    
    Success: Success,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
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