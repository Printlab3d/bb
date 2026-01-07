import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Dane klienta (dodane do tego samego pliku, żeby nie mieszać z routingiem)
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

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- LOGIKA PŁATNOŚCI (TA SAMA CO DZIAŁAŁA WCZEŚNIEJ + DANE) ---
  const handlePayment = async () => {
    if (cart.length === 0) return;

    // Prosta walidacja - czy klient wpisał cokolwiek
    if (!formData.email || !formData.address || !formData.city) {
      toast({
        variant: "destructive",
        title: "Brak danych",
        description: "Uzupełnij adres wysyłki poniżej.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cart,
          customer: formData // Dorzucamy dane, backend je odbierze
        }),
      });

      if (!response.ok) throw new Error('Błąd połączenia');

      const { id } = await response.json();
      
      // Klucz publiczny - upewnij się, że jest w Netlify Environment Variables
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

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-8 text-gray-900 elegant-text">Twój koszyk</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-6">Pusty koszyk</p>
            <Link to="/Moto">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Wróć do sklepu</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Lista produktów */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                       <img src={item.image || (item.images && item.images[0]) || ""} alt={item.name} className="w-full h-full object-contain p-1"/>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-orange-600 font-bold">{item.price.toFixed(2)} zł</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-100 rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-100 rounded">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FORMULARZ (Wstawiony tutaj na sztywno, żeby działał) */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Adres wysyłki
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Imię</Label>
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-white"/>
                    </div>
                    <div>
                      <Label>Nazwisko</Label>
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-white"/>
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} className="bg-white"/>
                  </div>
                  <div>
                    <Label>Adres (Ulica i numer)</Label>
                    <Input name="address" value={formData.address} onChange={handleInputChange} className="bg-white"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Kod pocztowy</Label>
                      <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="bg-white"/>
                    </div>
                    <div>
                      <Label>Miasto</Label>
                      <Input name="city" value={formData.city} onChange={handleInputChange} className="bg-white"/>
                    </div>
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} className="bg-white"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Podsumowanie */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 text-white p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold mb-4">Razem</h3>
                <div className="flex justify-between text-2xl font-bold text-orange-500 mb-6">
                  {total.toFixed(2)} zł
                </div>
                <Button 
                  onClick={handlePayment} 
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                >
                  {isLoading ? "Przetwarzanie..." : <><CreditCard className="mr-2 h-5 w-5"/> Zapłać teraz</>}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}