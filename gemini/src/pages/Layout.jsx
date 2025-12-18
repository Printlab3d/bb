import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// Eksportujemy useLanguage stąd, bo tego szuka ProductCard (@/layout)
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      
      {/* HEADER VIBERUSH */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-gray-200 py-3 shadow-sm" 
            : "bg-white border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/Home" className="group flex items-center gap-1 z-50">
              <span className="text-2xl font-light tracking-widest text-gray-900">
                Vibe<span className="text-orange-600 font-medium group-hover:text-orange-500 transition-colors">Rush</span>
              </span>
            </Link>

            {/* MENU */}
            <div className="hidden md:flex items-center gap-8">
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

            {/* PRAWA STRONA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/Cart" className="relative p-2 group rounded-full hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* MOBILE */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                      <Menu className="w-6 h-6 text-gray-600" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-orange-500/20">
                    <div className="flex flex-col h-full">
                      <div className="mt-8 mb-8">
                         <span className="text-2xl font-light tracking-widest text-gray-900">
                          Vibe<span className="text-orange-600 font-medium">Rush</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.name}>
                            <Link
                              to={link.path}
                              className={`text-lg font-light flex items-center justify-between border-b border-gray-100 pb-2 ${
                                link.color === 'purple' 
                                  ? "text-purple-900 hover:text-purple-600" 
                                  : "text-gray-800 hover:text-orange-600"
                              }`}
                            >
                              {link.name}
                              {link.color === 'purple' && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
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

      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-light tracking-widest text-gray-900">
                Vibe<span className="text-orange-600 font-medium">Rush</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Twoje źródło unikalnych akcesoriów motocyklowych.
              </p>
              <div className="flex gap-4 pt-2">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-600 cursor-pointer" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Sklep</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/Moto" className="hover:text-orange-600 transition-colors">Akcesoria Moto</Link></li>
                <li><Link to="/CustomKeychains" className="hover:text-purple-600 transition-colors">Breloki 3D</Link></li>
                <li><Link to="/Okazje" className="hover:text-orange-600 transition-colors">Wyprzedaż</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Pomoc</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/Regulamin" className="hover:text-orange-600 transition-colors">Regulamin</Link></li>
                <li><Link to="/Zwroty" className="hover:text-orange-600 transition-colors">Zwroty</Link></li>
                <li><Link to="/PolitykaPrywatnosci" className="hover:text-orange-600 transition-colors">Prywatność</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-6 uppercase tracking-wider text-sm">Kontakt</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-orange-600" /> kontakt@viberush.pl</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-orange-600" /> +48 123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-xs">
            <p>&copy; 2025 VibeRush. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}