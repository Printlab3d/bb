import React, { useState, useEffect } from "react";
import productsData from "@/data/products.json";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Package, Bike } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "../components/ui/add-to-cart-toast";
import { useLanguage } from "./Layout.jsx"; // POPRAWIONY IMPORT: w tym samym folderze!

export default function Moto() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const isLoading = false;
  const { toast } = useToast();

  useEffect(() => {
    setAllProducts(productsData);
  }, []);

  // Filtruj tylko produkty z kategorii "moto"
  const motoProducts = allProducts.filter(product => product.category === 'moto');

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
      {/* Hero Header with Motorcycle Background */}
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/assets/moto-bg.jpg"
            alt="Motocykl"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
              <Bike className="w-4 h-4 text-orange-400" />
              <span className="text-xs md:text-sm font-medium text-orange-300 elegant-text">MOTO PARTS</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 elegant-text" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.6)' }}>
              Akcesoria do Moto
            </h1>
            <p className="text-sm md:text-lg text-white font-medium elegant-text max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              Premium akcesoria dla motocykli enduro i dirtbike
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 md:mb-8">
          <p className="text-white font-medium text-lg md:text-xl elegant-text">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Produkt' : 'Produktów'}
          </p>
          <p className="text-gray-500 text-sm elegant-text">Akcesoria dla motocykli</p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 animate-pulse">
                <Skeleton className="w-full h-48 rounded-xl bg-white/10 mb-4" />
                <Skeleton className="h-6 w-3/4 bg-white/10 mb-2" />
                <Skeleton className="h-10 w-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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