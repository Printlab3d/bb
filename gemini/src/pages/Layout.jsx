import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, Instagram, Facebook, Mail, Phone, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// UPEWNIJ SIĘ, ŻE ŚCIEŻKA DO TWOJEGO LOGO JEST POPRAWNA!
// Jeśli wrzuciłeś do folderu 'public/assets', to ścieżka to '/assets/nazwa-pliku.png'
const LOGO_SRC = "/assets/logo-viberush.png"; 

// Funkcja pomocnicza języka
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
    // DODANO: overflow-x-hidden na główny kontener, żeby nic nie wystawało
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col overflow-x-hidden">
      
      {/* --- HEADER / NAWIGACJA --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-gray-200 py-2 shadow-sm" // Zmniejszono py-3 na py-2 przy scrollu
            : "bg-white border-transparent py-4" // Zmniejszono py-5 na py-4 na górze
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex container - zapewnia, że logo jest po lewej, menu na środku/prawej */}
          <div className="flex items-center justify-between h-12"> {/* Ustawiono stałą wysokość kontenera h-12 */}
            
            {/* --- LOGO VIBERUSH (OBRAZEK) --- */}
            <Link to="/Home" className="flex-shrink-0 flex items-center">
              <img 
                src={LOGO_SRC} 
                alt="VibeRush Logo" 
                // KLUCZOWE KLASY DLA LOGO:
                // h-8 md:h-10 -> wysokość 8 jednostek na mobile, 10 na desktopie (dopasuj wedle uznania)
                // w-auto -> szerokość automatyczna, żeby zachować proporcje
                // object-contain -> upewnia się, że całe logo jest widoczne i nieucięte
                className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group py-2 ${
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

            {/* IKONY PRAWEJ STRONY (KOSZYK, MOBILE) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/Cart" className="relative p-2 group rounded-full hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU TRIGGER */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                      <Menu className="w-6 h-6 text-gray-600" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-orange-500/20 p-0">
                     <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        {/* Logo w menu mobilnym */}
                        <img src={LOGO_SRC} alt="VibeRush" className="h-8 w-auto object-contain" />
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon"><X className="w-5 h-5"/></Button>
                        </SheetClose>
                     </div>
                    
                    <div className="flex flex-col h-full p-6">
                      <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.name}>
                            <Link
                              to={link.path}
                              className={`text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
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

                      <div className="mt-auto mb-8 space-y-4 text-sm text-gray-500">
                        <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-600" /> kontakt@viberush.pl</p>
                        <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-600" /> +48 123 456 789</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- GŁÓWNA ZAWARTOŚĆ --- */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- STOPKA (FOOTER) --- */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Kolumna 1: Brand */}
            <div className="space-y-4">
              {/* Logo w stopce */}
              <img src={LOGO_SRC} alt="VibeRush" className="h-8 w-auto object-contain mb-4" />
              
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Twoje źródło unikalnych akcesoriów motocyklowych. 
                Jakość, styl i pasja w każdym detalu druku 3D.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Kolumna 2: Sklep */}
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Sklep</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/Moto" className="hover:text-orange-600 transition-colors flex items-center gap-2">Akcesoria Moto</Link></li>
                <li><Link to="/CustomKeychains" className="hover:text-purple-600 transition-colors flex items-center gap-2">Breloki 3D</Link></li>
                <li><Link to="/Okazje" className="hover:text-orange-600 transition-colors flex items-center gap-2">Wyprzedaż</Link></li>
              </ul>
            </div>

            {/* Kolumna 3: Pomoc */}
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Pomoc Klienta</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/Regulamin" className="hover:text-orange-600 transition-colors">Regulamin Sklepu</Link></li>
                <li><Link to="/Zwroty" className="hover:text-orange-600 transition-colors">Zwroty i Reklamacje</Link></li>
                <li><Link to="/PolitykaPrywatnosci" className="hover:text-orange-600 transition-colors">Polityka Prywatności</Link></li>
              </ul>
            </div>

            {/* Kolumna 4: Kontakt */}
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Kontakt</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>ul. Przykładowa 123<br />00-000 Warszawa</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <a href="mailto:kontakt@viberush.pl" className="hover:text-orange-600 transition-colors">kontakt@viberush.pl</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <a href="tel:+48123456789" className="hover:text-orange-600 transition-colors">+48 123 456 789</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; 2025 VibeRush. Wszelkie prawa zastrzeżone.</p>
            <div className="flex gap-6">
              <span className="hover:text-gray-600 cursor-pointer">Bezpieczne płatności (Stripe)</span>
              <span className="hover:text-gray-600 cursor-pointer">Szybka dostawa</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WAŻNE: NIE MA TUTAJ KOMPONENTU <Toaster />!
        ZOSTAŁ USUNIĘTY, ŻEBY NIE BYŁO DUPLIKATÓW.
      */}
    </div>
  );
}