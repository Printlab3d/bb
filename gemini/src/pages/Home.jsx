import React, { useState, useEffect } from "react";
import productsData from "@/data/products.json";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react"; 
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import HeroSection from "../components/home/HeroSection";
import ProductCard from "../components/products/ProductCard";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "../components/ui/add-to-cart-toast";

export default function Home() {
  const { toast } = useToast();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(productsData);
  }, []);
  
  const products = allProducts
    .filter(product => product.featured === true)
    .sort((a, b) => {
      if (a.name.includes('Zestaw')) return -1;
      if (b.name.includes('Zestaw')) return 1;
      return 0;
    });

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
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      {products.length > 0 && (
        <div className="bg-gradient-to-b from-orange-50 via-white to-white py-8 sm:py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-8 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8">
                <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-orange-600" />
                <span className="text-xs sm:text-sm font-medium text-orange-700 elegant-text">Bestsellery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3 sm:mb-4 elegant-text px-4">
                Najlepsze oświetlenie i akcesoria
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg elegant-text max-w-2xl mx-auto px-4">
                Odkryj produkty, które podbiły serca naszych klientów.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart}
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center px-4">
              <Link to={createPageUrl("Moto")} className="inline-block w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white border-none font-semibold elegant-text px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base group transition-all duration-300 w-full sm:w-auto shadow-md"
                >
                  Zobacz wszystko
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}