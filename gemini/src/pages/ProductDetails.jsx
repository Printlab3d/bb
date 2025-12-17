import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Package, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "../components/ui/add-to-cart-toast";

// BAZA PRODUKTÓW (zgodna z Home.jsx)
const PRODUCTS = [
  {
    id: 1,
    name: "Uchwyt na kask 'Skull'",
    price: 89.00,
    image_url: "/assets/skull-holder.jpg",
    description: "Solidny uchwyt na kask. Idealny do garażu.",
    stock: 10
  },
  {
    id: 2,
    name: "Brelok Personalizowany",
    price: 29.00,
    image_url: "/assets/keychain-custom.jpg",
    description: "Personalizowany brelok z Twoim napisem.",
    stock: 50
  },
  {
    id: 3,
    name: "Podstawka pod stopkę",
    price: 45.00,
    image_url: "/assets/stand-pad.jpg",
    description: "Podstawka zapobiegająca zapadaniu się stopki.",
    stock: 20
  },
  {
    id: 4,
    name: "Zestaw Startowy Moto",
    price: 135.00,
    image_url: "/assets/emblem.jpg",
    description: "Kompletny zestaw akcesoriów na start.",
    stock: 5
  }
];

export default function ProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')); // Parsowanie na int
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === productId);
    setProduct(found);
  }, [productId]);

  const addToCart = () => {
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-black mb-4">Produkt nie znaleziony</h2>
          <Link to={createPageUrl("Moto")}>
            <Button>Wróć do sklepu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.gallery || [])];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link to={createPageUrl("Moto")}>
            <Button variant="ghost" size="sm" className="text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do sklepu
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200">
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-lg sm:rounded-xl overflow-hidden">
                <img 
                  src={allImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain p-2 sm:p-4"
                />
                {product.featured && (
                  <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white border-none text-xs sm:text-sm">
                    HOT
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-3 sm:mb-4 elegant-text leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {product.price}
                </span>
                <span className="text-xl sm:text-2xl text-gray-500 font-medium">zł</span>
              </div>

              <div className="flex items-center gap-2 mb-4 sm:mb-6 bg-white rounded-lg p-3 border border-gray-200">
                {product.stock > 0 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-600 font-medium text-sm sm:text-base">
                      Dostępny ({product.stock} szt.)
                    </span>
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-orange-600 font-medium text-sm sm:text-base">Brak w magazynie</span>
                  </>
                )}
              </div>
            </div>

            {product.description && (
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-medium text-black mb-3 sm:mb-4 elegant-text">
                  Opis
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <div className="bg-orange-50 rounded-xl p-4 sm:p-6 border border-orange-200">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <Truck className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-orange-900 mb-1 text-sm sm:text-base">
                    Darmowa dostawa od 150 zł
                  </p>
                  <p className="text-xs sm:text-sm text-orange-700">
                    Wysyłka w ciągu 48 godzin
                  </p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-gray-50 p-4 -mx-4 border-t border-gray-200 lg:static lg:bg-transparent lg:border-0 lg:p-0 lg:mx-0">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                size="lg"
                className={`w-full h-12 sm:h-14 text-base sm:text-lg ${
                  product.stock === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30"
                } border-none font-medium elegant-text`}
              >
                {product.stock === 0 ? (
                  <>
                    <Package className="w-5 h-5 mr-2" />
                    Niedostępny
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Do koszyka
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}