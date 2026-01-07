import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, CreditCard, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Stan formularza
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- LOGIKA PŁATNOŚCI ---
  const handlePayment = async () => {
    // 1. Walidacja: Czy koszyk nie jest pusty?
    if (cart.length === 0) return;

    // 2. Walidacja: Czy dane są wpisane?
    if (!formData.firstName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      toast({
        variant: "destructive",
        title: "Brak danych",
        description: "Proszę wypełnić dane do wysyłki przed płatnością.",
      });
      // Scroll do formularza
      document.getElementById('shipping-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cart,
          customer: formData // Wysyłamy dane klienta razem z koszykiem
        }),
      });

      if (!response.ok) throw new Error('Błąd połączenia z płatnościami');

      const { id } = await response.json();
      const stripe = await window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      
      if (error) throw error;

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Błąd płatności",
        description: "Spróbuj ponownie później.",
      });
    } finally {
      setIsLoading(false);
    }
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
            
            {/* LEWA KOLUMNA: PRODUKTY + FORMULARZ */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Lista produktów */}
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                       <img 
                        src={item.image || (item.images && item.images[0]) || ""} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-orange-600 font-bold">{item.price.toFixed(2)} zł</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 hover:bg-white rounded-md transition-colors">-</button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 hover:bg-white rounded-md transition-colors">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FORMULARZ DANYCH (Teraz tutaj, żeby nie zmieniać stron) */}
              <div id="shipping-form" className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h2 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-orange-600" /> Dane do wysyłki
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Imię</Label>
                    <Input id="firstName" name="firstName" placeholder="Jan" value={formData.firstName} onChange={handleInputChange} className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nazwisko</Label>
                    <Input id="lastName" name="lastName" placeholder="Kowalski" value={formData.lastName} onChange={handleInputChange} className="bg-white" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jan@example.com" value={formData.email} onChange={handleInputChange} className="bg-white" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Ulica i numer</Label>
                    <Input id="address" name="address" placeholder="ul. Długa 5/10" value={formData.address} onChange={handleInputChange} className="bg-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Kod pocztowy</Label>
                    <Input id="zipCode" name="zipCode" placeholder="00-000" value={formData.zipCode} onChange={handleInputChange} className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Miasto</Label>
                    <Input id="city" name="city" placeholder="Warszawa" value={formData.city} onChange={handleInputChange} className="bg-white" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" placeholder="+48 123 456 789" value={formData.phone} onChange={handleInputChange} className="bg-white" />
                  </div>
                </div>
              </div>

            </div>

            {/* PRAWA KOLUMNA: PODSUMOWANIE */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 text-white p-6 rounded-2xl sticky top-24 shadow-xl">
                <h3 className="text-xl font-bold mb-6">Podsumowanie</h3>
                
                <div className="space-y-3 text-sm text-gray-400 mb-6 border-b border-gray-700 pb-6">
                  <div className="flex justify-between">
                    <span>Wartość produktów</span>
                    <span>{total.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dostawa</span>
                    <span className="text-green-400 font-medium">Gratis</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold">Do zapłaty</span>
                  <span className="text-3xl font-bold text-orange-500">{total.toFixed(2)} zł</span>
                </div>
                
                <Button 
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg shadow-lg hover:shadow-orange-900/20 transition-all mb-4"
                >
                  {isLoading ? "Przetwarzanie..." : (
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" /> Zapłać teraz
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4" /> Bezpieczna płatność przez Stripe
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}