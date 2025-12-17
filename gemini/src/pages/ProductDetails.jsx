import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check, Star, Truck, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Uchwyt na kask 'Skull'",
    price: 89.00,
    old_price: 119.00,
    description: "Solidny uchwyt na kask w kształcie czaszki. Idealny do garażu lub man cave'a. Wykonany z wytrzymałego materiału PLA+.",
    image_url: "/assets/skull-holder.jpg",
    images: ["/assets/skull-holder.jpg"],
    category: "Akcesoria",
    specs: { "Materiał": "PLA+", "Montaż": "Ścienny", "Kolor": "Czarny/Biały" }
  },
  {
    id: 2,
    name: "Brelok Personalizowany",
    price: 29.00,
    description: "Twój własny tekst lub numer rejestracyjny na breloku. Dostępne różne kolory.",
    image_url: "/assets/keychain-custom.jpg",
    images: ["/assets/keychain-custom.jpg"],
    category: "Breloki",
    specs: { "Materiał": "PET-G", "Rozmiar": "Standard" }
  },
  {
    id: 3,
    name: "Podstawka pod stopkę",
    price: 45.00,
    description: "Zapobiega zapadaniu się stopki motocyklowej w miękkim podłożu (trawa, piasek).",
    image_url: "/assets/stand-pad.jpg",
    images: ["/assets/stand-pad.jpg"],
    category: "Garaż",
    specs: { "Wymiary": "10x10cm", "Wzmocnienie": "Tak" }
  },
  {
    id: 4,
    name: "Emblemat na bak",
    price: 35.00,
    description: "Stylowy emblemat 3D na zbiornik paliwa. Montaż na taśmę 3M (w zestawie).",
    image_url: "/assets/emblem.jpg",
    images: ["/assets/emblem.jpg"],
    category: "Ozdoby",
    specs: { "Mocowanie": "Taśma 3M", "Wodoodporność": "Tak" }
  }
];

export default function ProductDetails() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const id = parseInt(params.get("id"));
    const foundProduct = ALL_PRODUCTS.find(p => p.id === id);
    if (foundProduct) setProduct(foundProduct);
  }, [search, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    
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

    setTimeout(() => {
      setIsAdding(false);
      toast({
        description: <AddToCartToast product={product} />,
        duration: 3000,
        className: "bg-white border-l-4 border-orange-500 p-0 overflow-hidden shadow-xl", 
      });
    }, 500);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">
        Ładowanie produktu...
      </div>
    );
  }

  const hasDiscount = product.old_price && product.old_price > product.price;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sekcja Zdjęć */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 relative shadow-sm"
            >
              <img 
                src={product.images ? product.images[activeImage] : product.image_url} 
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-lg px-3 py-1">
                  PROMOCJA
                </Badge>
              )}
            </motion.div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 bg-white rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
                      activeImage === idx ? "border-orange-500 ring-2 ring-orange-500/20" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info o produkcie */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <span className="text-orange-600 font-medium text-sm tracking-wider uppercase">
                {product.category || "Moto 3D"}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-gray-500 ml-2 font-medium">(4.9/5)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <Check className="w-4 h-4" /> Dostępny
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                {product.price} zł
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {product.old_price} zł
                </span>
              )}
            </div>

            <div className="prose prose-gray mb-8 text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {product.specs && (
              <div className="grid grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-xl border border-gray-200">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <span className="block text-xs text-gray-400 uppercase font-bold">{key}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-auto">
              <Button 
                size="lg" 
                className={`flex-1 text-lg h-14 transition-all ${
                  isAdding ? "bg-green-600 hover:bg-green-700" : "bg-gray-900 hover:bg-orange-600"
                }`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Dodano do koszyka
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Dodaj do koszyka
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <p className="text-xs font-bold text-gray-900">Wysyłka 48h</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <p className="text-xs font-bold text-gray-900">Gwarancja jakości</p>
              </div>
              <div className="text-center">
                <HelpCircle className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <p className="text-xs font-bold text-gray-900">Wsparcie</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}