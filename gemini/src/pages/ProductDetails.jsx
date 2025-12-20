import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";
// Upewnij się, że importujesz products z dobrego miejsca!
import { products } from "@/data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    // NAJWAŻNIEJSZE: Szukamy produktu zamieniając ID na liczbę (parseInt)
    // Dzięki temu naprawiamy błąd "pustej strony"
    const foundProduct = products.find((p) => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Ustawiamy główne zdjęcie: albo image, albo pierwsze z images
      setMainImage(foundProduct.image || (foundProduct.images && foundProduct.images[0]) || "");
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    
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

  // Jeśli nie znaleziono produktu (np. złe ID), pokaż komunikat
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono produktu</h2>
        <Link to="/Moto">
          <Button>Wróć do sklepu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Przycisk powrotu */}
        <Link to="/Moto" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Wróć do oferty
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* GALERIA ZDJĘĆ */}
          <div className="space-y-4">
            {/* Główne zdjęcie */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center relative">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <span className="text-gray-400">Brak zdjęcia</span>
              )}
            </div>
            
            {/* Miniaturki (jeśli są) */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-xl border-2 overflow-hidden bg-gray-50 p-2 transition-all ${
                      mainImage === img ? "border-orange-600 ring-2 ring-orange-100" : "border-transparent hover:border-orange-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* OPIS PRODUKTU */}
          <div>
            <div className="mb-2">
               <span className="text-sm font-bold text-orange-600 uppercase tracking-wide bg-orange-50 px-3 py-1 rounded-full">
                 {product.category === 'moto' ? 'Moto & Części' : 'Akcesoria'}
               </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                {product.price.toFixed(2)} zł
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toFixed(2)} zł
                </span>
              )}
            </div>

            <div className="prose prose-gray max-w-none mb-8 text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* CECHY PRODUKTU (Bullet points) */}
            {product.features && (
              <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600" /> Cechy produktu:
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PRZYCISK KUPNA */}
            <div className="flex gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={addToCart}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg shadow-lg hover:shadow-orange-500/25 transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Dodaj do koszyka
              </Button>
            </div>

            {/* DODATKOWE INFO */}
            <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Wysyłka w 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Gwarancja jakości</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}