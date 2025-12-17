import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";
// USUNIĘTO: import { useLanguage } from "./Layout.jsx";

// Przykładowe dane bestsellerów (zastąp swoimi jeśli masz inne źródło)
const bestsellers = [
  {
    id: 1,
    name: "Uchwyt na kask 'Skull'",
    price: 89.00,
    old_price: 119.00,
    image_url: "/assets/skull-holder.jpg",
    category: "Akcesoria",
    is_new: true
  },
  {
    id: 2,
    name: "Brelok Personalizowany",
    price: 29.00,
    image_url: "/assets/keychain-custom.jpg",
    category: "Breloki",
    is_new: false
  },
  {
    id: 3,
    name: "Podstawka pod stopkę",
    price: 45.00,
    image_url: "/assets/stand-pad.jpg",
    category: "Garaż",
    is_new: false
  },
  {
    id: 4,
    name: "Emblemat na bak",
    price: 35.00,
    image_url: "/assets/emblem.jpg",
    category: "Ozdoby",
    is_new: true
  }
];

export default function Home() {
  const { toast } = useToast();

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = currentCart.find(item => item.id === product.id);
    
    let newCart;
    if (existingItem) {
      newCart = currentCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));

    // Powiadomienie
    toast({
      description: <AddToCartToast product={product} />,
      duration: 3000,
      className: "bg-white border-l-4 border-purple-500 p-0 overflow-hidden shadow-xl", 
    });
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Banner */}
      <div className="bg-white/5 border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-medium">Szybka Wysyłka</h3>
              <p className="text-sm text-gray-400">Wysyłamy w 24-48h</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-white font-medium">Wysoka Jakość</h3>
              <p className="text-sm text-gray-400">Precyzyjny druk 3D</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-medium">Gwarancja Satysfakcji</h3>
              <p className="text-sm text-gray-400">30 dni na zwrot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bestsellers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Bestsellery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Najczęściej wybierane produkty przez naszych klientów
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              showHotBadge={true}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/Moto">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-full text-lg font-medium">
              Zobacz Wszystkie Produkty
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}