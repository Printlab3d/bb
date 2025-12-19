import React from "react";
// POPRAWIONY IMPORT DANYCH (z pliku .js, a nie .json)
import { products as productsData } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Zap } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";
// Zakładam, że Layout jest w folderze wyżej (src/Layout.jsx) - jeśli jest inaczej, popraw ścieżkę
import { useLanguage } from "../Layout"; 

export default function Okazje() {
  const { toast } = useToast();
  const isLoading = false;
  
  // Zgodnie z Twoją prośbą: "na razie żadnego produktu do okazji nie pakuj".
  // Ustawiam pustą tablicę, żeby wyświetlił się Twój ekran "Brak okazji w tym momencie".
  const products = []; 

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
      <div className="relative bg-gradient-to-br from-purple-600/10 via-black to-black border-b border-white/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Tag className="w-4 h-4 text-purple-500" />
              <span className="text-xs md:text-sm font-medium text-purple-400 elegant-text">OKAZJE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 elegant-text">
              Lifestyle & Akcesoria
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto elegant-text">
              Wyjątkowe produkty w promocyjnych cenach
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/20">
              <Tag className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-4 elegant-text">
              Brak okazji w tym momencie
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto elegant-text">
              Aktualnie nie mamy aktywnych promocji, ale wkrótce pojawią się nowe okazje!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-xl elegant-text flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  {products.length} {products.length === 1 ? 'Produkt' : 'Produktów'} w promocji
                </p>
                <p className="text-gray-500 text-sm elegant-text">Oferta ograniczona czasowo</p>
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
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={addToCart}
                      showHotBadge={true}
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