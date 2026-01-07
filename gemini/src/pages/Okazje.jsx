import React, { useState, useEffect } from "react";
// POPRAWKA: Dodano "/data" do ścieżki
import { products } from "@/data/products"; 

import { motion, AnimatePresence } from "framer-motion";
import { Tag, Zap, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";

export default function Okazje() {
  const { toast } = useToast();
  
  // Filtrujemy tylko akcesoria
  const accessoryProducts = products.filter(product => 
    product.category === 'accessories'
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
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-purple-900/20 via-black to-black border-b border-white/10 pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">GADŻETY I DODATKI</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight elegant-text">
            Akcesoria <span className="text-purple-500 font-normal">VibeRush</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Zatyczki motocyklowe, breloki i wszystko, co ułatwia życie w trasie.
          </p>
        </div>
      </div>

      {/* Lista produktów */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {accessoryProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <ShoppingBag className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-light text-white mb-2 elegant-text">
              Brak produktów w tej kategorii
            </h3>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-xl elegant-text flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  {accessoryProducts.length} {accessoryProducts.length === 1 ? 'Produkt' : 'Produktów'}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
              >
                {accessoryProducts.map((product, index) => (
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
          </>
        )}
      </div>
    </div>
  );
}