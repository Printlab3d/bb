import React from "react";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
// DODANO IMPORTY DO OBSŁUGI KOSZYKA:
import { useToast } from "@/components/ui/use-toast";
import { AddToCartToast } from "@/components/ui/add-to-cart-toast";

export default function Home() {
  const { toast } = useToast();
  
  // Pobieramy produkty wyróżnione
  const featuredProducts = products.filter(product => product.featured);

  // LOGIKA DODAWANIA DO KOSZYKA (skopiowana z Moto/Okazje)
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    // Wysyłamy sygnał do odświeżenia licznika w nagłówku
    window.dispatchEvent(new Event('cartUpdated'));

    toast({
      description: <AddToCartToast product={product} />,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-orange-50 text-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
            VIBERUSH
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10">
            Unikalne akcesoria motocyklowe i druk 3D. Wyróżnij się na drodze.
          </p>
          <div className="flex gap-4">
            <Link to="/Moto">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-orange-500/30 transition-all">
                Zobacz Ofertę
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Polecane Produkty</h2>
          <Link to="/Moto" className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors">
            Więcej <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} // Przekazujemy funkcję
              showHotBadge={true}
            />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Szybka Realizacja</h3>
            <p className="text-gray-600">Większość zamówień wysyłamy w 24h.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Wytrzymałe Materiały</h3>
            <p className="text-gray-600">Druk 3D z materiałów odpornych na warunki UV.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Bezpieczna Dostawa</h3>
            <p className="text-gray-600">Solidnie zapakowane przesyłki.</p>
          </div>
        </div>
      </section>
    </div>
  );
}