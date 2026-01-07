import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Stan formularza (dane klienta)
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
    if (savedCart.length === 0) {
      navigate('/Cart');
    }
    setCart(savedCart);
  }, [navigate]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Funkcja płatności (uruchamiana po wypełnieniu formularza)
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Walidacja - czy pola są wypełnione?
    if (!formData.firstName || !formData.email || !formData.address) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Wypełnij wszystkie wymagane pola!",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cart,
          customer: formData // Przekazujemy dane klienta do funkcji
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

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/Cart')}
          className="mb-8 hover:bg-transparent hover:text-orange-600 pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Powrót do koszyka
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEWA STRONA - FORMULARZ */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">Dane do wysyłki</h1>
              <p className="text-gray-500">Wypełnij formularz, aby zrealizować zamówienie.</p>
            </div>

            <form id="checkout-form" onSubmit={handlePayment} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Imię</Label>
                  <Input id="firstName" name="firstName" required placeholder="Jan" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nazwisko</Label>
                  <Input id="lastName" name="lastName" required placeholder="Kowalski" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="jan@example.com" value={formData.email} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="+48 123 456 789" value={formData.phone} onChange={handleInputChange} />
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <Label htmlFor="address">Ulica i numer domu</Label>
                <Input id="address" name="address" required placeholder="ul. Motocyklowa 15/2" value={formData.address} onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Kod pocztowy</Label>
                  <Input id="zipCode" name="zipCode" required placeholder="00-000" value={formData.zipCode} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Miasto</Label>
                  <Input id="city" name="city" required placeholder="Warszawa" value={formData.city} onChange={handleInputChange} />
                </div>
              </div>
            </form>
          </div>

          {/* PRAWA STRONA - PODSUMOWANIE */}
          <div className="lg:pl-8">
            <Card className="sticky top-24 border-none shadow-lg bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Twoje zamówienie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                          {item.quantity}x
                        </div>
                        <div>
                          <p className="font-medium text-gray-200">{item.name}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-orange-500">
                        {(item.price * item.quantity).toFixed(2)} zł
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Suma częściowa</span>
                    <span>{total.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Dostawa</span>
                    <span className="text-green-400 font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-700 mt-4">
                    <span>Do zapłaty</span>
                    <span className="text-orange-500">{total.toFixed(2)} zł</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-orange-900/20 transition-all"
                >
                  {isLoading ? "Przetwarzanie..." : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Zapłać teraz
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}