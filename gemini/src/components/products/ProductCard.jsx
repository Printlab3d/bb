import React, { useState, useEffect } from "react";
// USUŃ TEN IMPORT: import { base44 } from "@/api/base44Client"; 
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package } from "lucide-react"; 
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "../ui/add-to-cart-toast";
import { useLanguage } from "../../pages/Layout.jsx"; // Ścieżka do Layoutu (Wstecz do pages)

export default function ProductCard({ product, onAddToCart, showHotBadge = false }) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [translatedName, setTranslatedName] = useState(product.name);

  // CAŁY BLOK TŁUMACZENIA LLM ZOSTAJE USUNIĘTY
  useEffect(() => {
    // Ponieważ Base44 LLM został usunięty, używamy nazwy polskiej (lub tej z JSON).
    setTranslatedName(product.name);
  }, [product.name, language]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    onAddToCart(product);
    
    toast({
      description: <AddToCartToast product={product} />,
      duration: 5000,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`bg-white border ${product.name.includes('Zestaw') ? 'border-4 border-gradient-to-r from-orange-500 to-yellow-500 shadow-xl shadow-orange-500/30' : 'border-gray-200'} hover:border-orange-500 transition-all duration-300 overflow-hidden h-full shadow-sm hover:shadow-orange-200/50 flex flex-col group`}>
        <CardContent className="p-0 flex flex-col h-full">
          <Link to={`${createPageUrl("ProductDetails")}?id=${product.id}`}>
            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden cursor-pointer">
              <img 
                src={product.image_url} 
                alt={translatedName}
                className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300"
              />
              
              {product.name.includes('Zestaw') && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  BUNDLE
                </div>
              )}

              {product.featured && showHotBadge && !product.name.includes('Zestaw') && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                  HOT
                </div>
              )}

              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{t('product.outOfStock')}</span>
                </div>
              )}
            </div>
          </Link>
          
          <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
            <Link to={`${createPageUrl("ProductDetails")}?id=${product.id}`}>
              <h3 className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-orange-600 mb-3 elegant-text line-clamp-2 transition-colors duration-300 leading-snug">
                {translatedName}
              </h3>
            </Link>

            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl sm:text-3xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  {product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">PLN</span>
              </div>
              
              {product.stock > 0 && (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-orange-600 text-gray-800 hover:text-white border-2 border-orange-500/30 hover:border-orange-600 font-medium text-[10px] xs:text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-500/30 px-2 sm:px-4"
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-colors duration-300 flex-shrink-0" />
                  <span className="truncate leading-tight">{t('product.addToCart')}</span>
                </Button>
              )}
              
              {product.stock === 0 && (
                <Button
                  disabled
                  className="w-full bg-gray-100 text-gray-500 border border-gray-200 text-sm py-3"
                >
                  {t('product.unavailable')}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}