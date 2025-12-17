import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// USUNIĘTO IMPORT TOASTERA (przenosimy go do App.jsx)

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navLinks = [
    { name: "Strona Główna", path: "/Home" },
    { name: "Moto", path: "/Moto" },
    { name: "Breloki 3D", path: "/CustomKeychains" },
    { name: "Okazje", path: "/Okazje" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/Home" className="group relative z-50">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-purple-400 transition-all duration-300">
                MOTO-3D
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link to="/Cart" className="relative group">
                <div className="p-2 rounded-full hover:bg-white/5 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-300">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-black/95 border-l border-white/10 w-[300px] sm:w-[400px]">
                    <div className="flex flex-col gap-8 mt-12">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="text-xl font-light text-gray-300 hover:text-white hover:pl-4 transition-all duration-300 border-l-2 border-transparent hover:border-purple-500"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">MOTO-3D</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tworzymy unikalne akcesoria motocyklowe z pasją i precyzją druku 3D.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Sklep</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/Moto" className="hover:text-purple-400 transition-colors">Moto</Link></li>
                <li><Link to="/CustomKeychains" className="hover:text-purple-400 transition-colors">Breloki</Link></li>
                <li><Link to="/Okazje" className="hover:text-purple-400 transition-colors">Okazje</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Pomoc</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/Regulamin" className="hover:text-purple-400 transition-colors">Regulamin</Link></li>
                <li><Link to="/Zwroty" className="hover:text-purple-400 transition-colors">Zwroty i reklamacje</Link></li>
                <li><Link to="/PolitykaPrywatnosci" className="hover:text-purple-400 transition-colors">Polityka prywatności</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Social Media</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 MOTO-3D. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>

      {/* TU USUNIĘTO <Toaster /> - dzięki temu nie będzie się duplikował */}
    </div>
  );
}