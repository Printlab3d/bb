import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag, Truck, MapPin, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // --- NOWE: Stan formularza i wysyłki ---
  const [shippingMethod, setShippingMethod] = useState("inpost"); // inpost, dpd, orlen
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paczkomatCode: "", // Kod automatu
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

  // --- OBLICZENIA (LOGIKA 150 zł i 13.50 zł) ---
  const productsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeShipping = productsTotal >= 150;
  const SHIPPING_COST = 13.50;
  const currentShippingCost = isFreeShipping ? 0 : SHIPPING_COST;
  const finalTotal = productsTotal + currentShippingCost;

  // --- PŁATNOŚĆ ---
  const handleCheckout = async () => {
    // Walidacja podstawowa
    if (!formData.email || !formData.phone || !formData.firstName || !formData.lastName) {
      toast({ variant: "destructive", title: "Uzupełnij dane", description: "Wypełnij formularz dostawy." });
      document.getElementById('shipping-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Walidacja kodu paczkomatu (jeśli wybrano InPost/Orlen)
    if ((shippingMethod === 'inpost' || shippingMethod === 'orlen') && !formData.paczkomatCode) {
      toast({ variant: "destructive", title: "Brak kodu automatu", description: "Wpisz kod Paczkomatu/Automatu (np. WAW20A)." });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cart,
          customer: formData,
          shipping: {
            method: shippingMethod,
            cost: currentShippingCost
          }
        }),
      });

      if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Brak URL płatności");
      }
      
    } catch (error) {
      console.error("Checkout Error:", error);
      toast({
        variant: "destructive",
        title: "Błąd płatności",
        description: "Spróbuj ponownie za chwilę.",
      });
      setIsLoading(false);
    }
  };

  // Pusty koszyk
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Twój koszyk jest pusty</h2>
        <Link to="/Moto">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">Wróć do sklepu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
      <h1 className="text-3xl font-light text-gray-900 mb-8 elegant-text">Twój Koszyk</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEWA KOLUMNA: PRODUKTY + FORMULARZ */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 1. Lista Produktów */}
          <div className="space-y-6">
            {cart.map((item) => {
              const liveProduct = products.find(p => p.id === item.id);
              const imageSrc = liveProduct ? liveProduct.image : (item.image || (item.images && item.images[0]));

              return (
                <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    {imageSrc ? <img src={imageSrc} alt={item.name} className="w-full h-full object-contain" /> : <div className="p-2 text-xs">Brak foto</div>}
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                       <div className="flex items-center gap-2 bg-gray-50 rounded-md p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 hover:bg-white rounded">-</button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 hover:bg-white rounded">+</button>
                       </div>
                       <p className="font-bold">{(item.price * item.quantity).toFixed(2)} zł</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Formularz Dostawy */}
          <div id="shipping-form" className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-600" /> Metoda wysyłki i Dane
            </h2>

            {/* Wybór kuriera */}
            <div className="mb-8">
              <Label className="mb-3 block text-gray-600">Wybierz przewoźnika:</Label>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* InPost */}
                <div className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === 'inpost' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 bg-white hover:border-orange-200'}`}>
                  <RadioGroupItem value="inpost" id="inpost" className="absolute right-3 top-3" />
                  <Box className="w-8 h-8 mb-2 text-gray-700" />
                  <span className="font-bold text-sm">InPost</span>
                  <span className="text-xs text-gray-500">Paczkomat</span>
                </div>

                {/* DPD */}
                <div className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === 'dpd' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 bg-white hover:border-orange-200'}`}>
                  <RadioGroupItem value="dpd" id="dpd" className="absolute right-3 top-3" />
                  <Truck className="w-8 h-8 mb-2 text-gray-700" />
                  <span className="font-bold text-sm">DPD</span>
                  <span className="text-xs text-gray-500">Kurier</span>
                </div>

                {/* Orlen */}
                <div className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === 'orlen' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 bg-white hover:border-orange-200'}`}>
                  <RadioGroupItem value="orlen" id="orlen" className="absolute right-3 top-3" />
                  <MapPin className="w-8 h-8 mb-2 text-gray-700" />
                  <span className="font-bold text-sm">Orlen</span>
                  <span className="text-xs text-gray-500">Paczka</span>
                </div>
              </RadioGroup>
            </div>

            {/* Dane adresowe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Imię</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-white" placeholder="Jan" />
              </div>
              <div className="space-y-2">
                <Label>Nazwisko</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-white" placeholder="Kowalski" />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Email</Label>
                <Input name="email" value={formData.email} onChange={handleInputChange} className="bg-white" placeholder="jan@example.com" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Telefon</Label>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} className="bg-white" placeholder="+48 123 456 789" />
              </div>

              {/* POLE NA KOD PACZKOMATU (Tylko dla InPost i Orlen) */}
              {(shippingMethod === 'inpost' || shippingMethod === 'orlen') && (
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-orange-600 font-bold">Kod Automatu / Paczkomatu</Label>
                  <Input 
                    name="paczkomatCode" 
                    value={formData.paczkomatCode} 
                    onChange={handleInputChange} 
                    className="bg-white border-orange-200 focus:border-orange-500" 
                    placeholder={shippingMethod === 'inpost' ? "np. WAW20A" : "np. Automat Orlen lub kod punktu"} 
                  />
                  <p className="text-xs text-gray-500">Znajdź kod na mapie przewoźnika i wklej go tutaj.</p>
                </div>
              )}

              {/* Adres tradycyjny (Zawsze warto mieć do faktury lub jako zapas) */}
              <div className="space-y-2 md:col-span-2">
                <Label>Twój Adres (Ulica i numer)</Label>
                <Input name="address" value={formData.address} onChange={handleInputChange} className="bg-white" placeholder="ul. Długa 5/15" />
              </div>
              <div className="space-y-2">
                <Label>Kod pocztowy</Label>
                <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="bg-white" placeholder="00-000" />
              </div>
              <div className="space-y-2">
                <Label>Miasto</Label>
                <Input name="city" value={formData.city} onChange={handleInputChange} className="bg-white" placeholder="Warszawa" />
              </div>
            </div>
          </div>
        </div>

        {/* PRAWA KOLUMNA: PODSUMOWANIE */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-6 rounded-2xl sticky top-24 shadow-xl">
            <h3 className="text-lg font-bold mb-6">Podsumowanie</h3>
            
            <div className="space-y-3 text-sm text-gray-400 mb-6 border-b border-gray-700 pb-6">
              <div className="flex justify-between">
                <span>Wartość produktów</span>
                <span>{productsTotal.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Dostawa ({shippingMethod.toUpperCase()})</span>
                {isFreeShipping ? (
                  <span className="text-green-400 font-medium">Gratis</span>
                ) : (
                  <span className="text-gray-200">{SHIPPING_COST.toFixed(2)} zł</span>
                )}
              </div>
              {!isFreeShipping && (
                <div className="text-xs text-orange-400 text-right mt-1">
                  Brakuje {(150 - productsTotal).toFixed(2)} zł do darmowej dostawy
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Do zapłaty</span>
              <span className="text-3xl font-bold text-orange-500">{finalTotal.toFixed(2)} zł</span>
            </div>
            
            <Button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-bold shadow-lg"
            >
              {isLoading ? "Przetwarzanie..." : "Zapłać teraz"}
            </Button>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              Bezpieczne płatności obsługuje Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}