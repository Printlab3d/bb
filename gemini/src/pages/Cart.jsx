import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Dodano useNavigate
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products"; 

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate(); // Hook do nawigacji

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-8 text-gray-900 elegant-text">Twój koszyk</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-6">Twój koszyk jest pusty</p>
            <Link to="/Moto">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Przeglądaj produkty
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  {/* Zdjęcie */}
                  <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                     <img 
                      src={item.image || (item.images && item.images[0]) || ""} 
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-orange-600 font-bold">{item.price.toFixed(2)} zł</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                
                {/* TUTAJ PRZYCISK KIERUJE DO CHECKOUT */}
                <Button 
                  onClick={() => navigate('/Checkout')}
                  className="w-full bg-gray-900 hover:bg-orange-600 text-white h-12 text-lg shadow-lg"
                >
                  Przejdź do dostawy <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}