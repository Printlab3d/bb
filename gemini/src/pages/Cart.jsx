import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// Importujemy świeżą bazę produktów, żeby naprawić zdjęcia
import { products } from "@/data/products";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  // Ładowanie koszyka
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  // Aktualizacja LocalStorage po zmianach
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Wysyłamy zdarzenie, żeby licznik w nagłówku się odświeżył
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    updateCart(newCart);
    toast({ description: "Produkt usunięty z koszyka" });
  };

  const updateQuantity = (productId, change) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Twój koszyk jest pusty</h2>
        <p className="text-gray-500 mb-8">Wygląda na to, że nie dodałeś jeszcze żadnych produktów.</p>
        <Link to="/Moto">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
            Wróć do sklepu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Twój Koszyk</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LISTA PRODUKTÓW */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => {
            // FIX ZDJĘĆ: Szukamy produktu w świeżej bazie danych po ID
            // Dzięki temu mamy pewność, że zdjęcie jest aktualne (np. migacz1.jpg), a nie stare z cache
            const liveProduct = products.find(p => p.id === item.id);
            // Bierzemy zdjęcie z liveProduct (jeśli istnieje), w przeciwnym razie ze starego itemu
            const imageSrc = liveProduct ? liveProduct.image : (item.image || (item.images && item.images[0]));

            return (
              <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {/* ZDJĘCIE */}
                <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                  {imageSrc ? (
                    <img src={imageSrc} alt={item.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Brak foto</div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-orange-600 line-clamp-2">
                      {item.name}
                    </Link>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors font-bold text-gray-600">-</button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors font-bold text-gray-600">+</button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{(item.price * item.quantity).toFixed(2)} zł</p>
                      {item.quantity > 1 && <p className="text-xs text-gray-500">{item.price.toFixed(2)} zł / szt.</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PODSUMOWANIE */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Podsumowanie</h3>
            <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between">
                <span>Wartość produktów</span>
                <span>{total.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between">
                <span>Dostawa</span>
                <span className="text-green-600 font-medium">Darmowa</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Do zapłaty</span>
              <span className="text-2xl font-bold text-orange-600">{total.toFixed(2)} zł</span>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-orange-600 text-white h-12 text-lg shadow-lg">
              Przejdź do płatności <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}