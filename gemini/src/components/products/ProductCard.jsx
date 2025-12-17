import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  Check, 
  Star,
  Flame 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "../ui/add-to-cart-toast";
// USUNIĘTO: import { useLanguage } from "../../pages/Layout.jsx";

export default function ProductCard({ product, onAddToCart, showHotBadge = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    // Symulacja opóźnienia dla lepszego efektu UX
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
      
      // Wyświetlenie powiadomienia
      toast({
        description: <AddToCartToast product={product} />,
        duration: 3000,
        className: "bg-white border-l-4 border-purple-500 p-0 overflow-hidden shadow-xl", 
      });
    }, 600);
  };

  // Obliczanie ceny i rabatu
  const hasDiscount = product.old_price && product.old_price > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100) 
    : 0;

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="h-full"
      >
        <Card 
          className="group relative bg-white border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {showHotBadge && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-sm flex items-center gap-1 px-2.5 py-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                HOT
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white border-none shadow-sm font-bold">
                -{discountPercentage}%
              </Badge>
            )}
            {product.is_new && (
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-sm">
                NOWOŚĆ
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 shadow-sm">
            <Heart className="w-5 h-5" />
          </button>

          {/* Image Container */}
          <Link to={`/ProductDetails?id=${product.id}`} className="relative block pt-[100%] overflow-hidden bg-gray-50 cursor-pointer">
            <motion.img 
              src={product.image_url} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 ease-out"
              animate={{ scale: isHovered ? 1.1 : 1 }}
            />
            
            {/* Quick View Overlay */}
            <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/90 text-black hover:bg-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-full px-6 font-medium"
              >
                <Eye className="w-4 h-4 mr-2" />
                Szczegóły
              </Button>
            </div>
          </Link>

          {/* Content */}
          <CardContent className="p-5 flex-grow flex flex-col relative z-10 bg-white">
            {/* Category (Optional) */}
            <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
               MOTO-3D
            </div>

            <Link to={`/ProductDetails?id=${product.id}`} className="block group-hover:text-purple-600 transition-colors">
              <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-purple-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} 
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">(4.8)</span>
            </div>

            {/* Price */}
            <div className="mt-auto flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                {product.price} zł
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through decoration-gray-300">
                  {product.old_price} zł
                </span>
              )}
            </div>
          </CardContent>

          {/* Footer / Actions */}
          <CardFooter className="p-5 pt-0 bg-white border-t border-gray-50">
            <Button 
              className={`w-full relative overflow-hidden transition-all duration-300 font-medium h-11 ${
                isAdding 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "bg-black hover:bg-purple-600 text-white"
              }`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4" />
                    Dodano!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Do koszyka
                  </>
                )}
              </div>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}