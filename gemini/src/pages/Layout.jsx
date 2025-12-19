import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, Instagram, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// Logo vri.png
const LOGO_SRC = "/assets/vri.png"; 

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
      
      {/* HEADER - NAPRAWIONY (CZYSTY BIAŁY) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white border-gray-200 py-2 shadow-sm" // USUNIĘTO "backdrop-blur" i "/95"
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative flex items-center justify-between h-20"> 
            
            {/* LOGO */}
            <Link to="/Home" className="flex-shrink-0 flex items-center z-20">
              <img 
                src={LOGO_SRC} 
                alt="Logo VibeRush" 
                className="h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

            {/* MENU DESKTOP */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path === '/Home' && location.pathname === '/');
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium transition-colors relative group py-2 ${
                      isActive 
                        ? (link.color === 'purple' ? "text-purple-600" : "text-orange-600")
                        : (link.color === 'purple' ? "text-gray-800 hover:text-purple-600" : "text-gray-600 hover:text-orange-600")
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                       isActive ? "w-full" : "w-0 group-hover:w-full"
                    } ${link.color === 'purple' ? "bg-purple-600" : "bg-orange-600"}`}></span>
                  </Link>
                );
              })}
            </div>

            {/* KOSZYK + MOBILE TRIGGER */}
            <div className="flex items-center gap-4 z-20">
              <Link to="/Cart" className="relative p-2 group rounded-full hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-orange-600 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* MENU MOBILE */}
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
                      <div className="flex flex-col gap-3">
                        {navLinks.map((link) => {
                          const isActive = location.pathname === link.path || (link.path === '/Home' && location.pathname === '/');
                          
                          let activeClasses = "";
                          if (isActive) {
                             activeClasses = link.color === 'purple' 
                                ? "bg-purple-50 text-purple-700 font-bold border-l-4 border-purple-500" 
                                : "bg-orange-50 text-orange-700 font-bold border-l-4 border-orange-500";
                          } else {
                             activeClasses = "text-gray-700 font-medium hover:bg-gray-50 border-l-4 border-transparent";
                          }

                          return (
                            <SheetClose asChild key={link.name}>
                              <Link
                                to={link.path}
                                className={`text-lg py-3 px-4 rounded-r-lg transition-all duration-200 ${activeClasses}`}
                              >
                                {link.name}
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                      
                       <div className="mt-auto mb-8 space-y-4 text-sm text-gray-500">
                        <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-600" /> contact@printlab3d.eu</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* TREŚĆ */}
      <main className="flex-grow pt-28">
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

      {/* STOPKA */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-4">
              <img src={LOGO_SRC} alt="Logo" className="h-10 w-auto object-contain mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Twoje źródło unikalnych akcesoriów.
              </p>
              
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/skrab.exc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@skrab.exc?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>
                </a>
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
              <p className="text-gray-500 text-sm mb-2">Masz pytania?</p>
              <a href="mailto:contact@printlab3d.eu" className="text-orange-600 font-medium hover:underline">contact@printlab3d.eu</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p>&copy; 2025 VibeRush (Global Effect). Wszelkie prawa zastrzeżone.</p>
              <p className="text-[10px] text-gray-300">Kopiowanie projektów 3D, zdjęć oraz logo zabronione. Wzory chronione prawem autorskim.</p>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-gray-600 cursor-pointer">Bezpieczne płatności</span>
              <span className="hover:text-gray-600 cursor-pointer">Szybka dostawa</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}