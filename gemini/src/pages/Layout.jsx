import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, Instagram, Facebook, Mail, Phone, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// Logo VR.png
const LOGO_SRC = "/assets/VR.png"; 

export const useLanguage = () => ({ 
  t: (key) => key, 
  language: 'pl' 
});

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (e) {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "Strona Główna", path: "/Home", color: "orange" },
    { name: "Moto", path: "/Moto", color: "orange" },
    { name: "Breloki 3D", path: "/CustomKeychains", color: "purple" },
    { name: "Okazje", path: "/Okazje", color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col overflow-x-hidden">
      
      {/* HEADER */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-gray-200 py-2 shadow-sm" 
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Kontener paska nawigacji - Zwiększona wysokość do h-20 dla lepszego wyglądu dużych elementów */}
          <div className="relative flex items-center justify-between h-20"> 
            
            {/* 1. LOGO (LEWA STRONA) */}
            <Link to="/Home" className="flex-shrink-0 flex items-center z-20">
              <img 
                src={LOGO_SRC} 
                alt="Logo VR" 
                // Nieco większe logo
                className="h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

            {/* 2. MENU NA ŚRODKU (ABSOLUTE CENTER) - POWIĘKSZONE */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  // ZMIANA: text-lg (duża czcionka), font-medium
                  className={`text-lg font-medium transition-colors relative group py-2 ${
                    link.color === 'purple' 
                      ? "text-gray-800 hover:text-purple-600" 
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    link.color === 'purple' ? "bg-purple-600" : "bg-orange-600"
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* 3. IKONY (PRAWA STRONA) - POWIĘKSZONY KOSZYK */}
            <div className="flex items-center gap-4 z-20">
              <Link to="/Cart" className="relative p-2 group rounded-full hover:bg-gray-50 transition-colors">
                {/* ZMIANA: w-7 h-7 (większa ikona koszyka) */}
                <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-orange-600 transition-colors" />
                
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-orange-600 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU TRIGGER */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                      <Menu className="w-7 h-7 text-gray-700" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] border-l-orange-500/20 p-0 bg-white">
                     <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <img src={LOGO_SRC} alt="Logo" className="h-10 w-auto object-contain" />
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon"><X className="w-6 h-6"/></Button>
                        </SheetClose>
                     </div>
                    
                    <div className="flex flex-col h-full p-6">
                      <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.name}>
                            <Link
                              to={link.path}
                              className={`text-xl font-medium py-4 px-4 rounded-lg transition-colors ${
                                link.color === 'purple' 
                                  ? "text-purple-900 hover:bg-purple-50" 
                                  : "text-gray-800 hover:bg-orange-50"
                              }`}
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-28"> {/* Zwiększony padding-top bo nagłówek jest wyższy */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <img src={LOGO_SRC} alt="Logo" className="h-10 w-auto object-contain mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Twoje źródło unikalnych akcesoriów.
              </p>
              <div className="flex gap-4 pt-2">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Sklep</h4>
              <Link to="/Moto" className="block text-gray-500 hover:text-orange-600 mb-2">Moto</Link>
              <Link to="/CustomKeychains" className="block text-gray-500 hover:text-purple-600 mb-2">Breloki</Link>
            </div>
            <div>
              <h4 className="font-bold mb-4">Pomoc</h4>
              <Link to="/Regulamin" className="block text-gray-500 hover:text-orange-600 mb-2">Regulamin</Link>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <p className="text-gray-500 text-sm">kontakt@viberush.pl</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}