import React, { useState, useEffect } from "react";
// Upewnij się, że ścieżka do products jest dobra. 
// Jeśli masz plik w src/products.js, to zostaw "@/products".
// Jeśli w src/data/products.js, zmień na "@/data/products".
import { products } from "@/products"; 
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Package, Bike } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";

export default function Moto() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    setAllProducts(products);
  }, []);

  // --- ZMIANA: TYLKO KATEGORIA MOTO ---
  const motoProducts = allProducts.filter(product => 
      product.category === 'moto'
  );

  const filteredProducts = motoProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast({
      description: <AddToCartToast product={product} />,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-orange-900/20 via-black to-black border-b border-white/10 pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6"
          >
            <Bike className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">STREFA MOTOCYKLISTY</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight elegant-text">
            Części <span className="text-orange-600 font-normal">Moto</span>
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
              <Input 
                type="text" 
                placeholder="Szukaj części..." 
                className="w-full pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-full focus:bg-white/10 focus:border-orange-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Produkty */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Package className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-light text-white mb-2 elegant-text">
              Nie znaleziono produktów
            </h3>
            <p className="text-gray-500 elegant-text">
              {searchTerm ? "Spróbuj zmienić wyszukiwanie" : "Wkrótce dodamy nowe produkty"}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}