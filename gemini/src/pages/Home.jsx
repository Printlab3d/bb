import React from "react";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
// POPRAWIONY IMPORT:
import { products } from "@/data/products";

export default function Home({ onAddToCart }) {
  // Pobieramy produkty wyróżnione (featured) z pliku .js
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
        {/* Tło hero - upewnij się, że masz jakiś obrazek lub zostaw sam kolor */}
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            VIBERUSH
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
            Unikalne akcesoria motocyklowe i druk 3D. Wyróżnij się na drodze.
          </p>
          <div className="flex gap-4">
            <Link to="/Moto">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full border-none">
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
          <Link to="/Moto" className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
            Więcej <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              showHotBadge={true}
            />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Szybka Realizacja</h3>
            <p className="text-gray-600">Większość zamówień wysyłamy w 24h.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Wytrzymałe Materiały</h3>
            <p className="text-gray-600">Druk 3D z materiałów odpornych na warunki UV.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Bezpieczna Dostawa</h3>
            <p className="text-gray-600">Solidnie zapakowane przesyłki.</p>
          </div>
        </div>
      </section>
    </div>
  );
}