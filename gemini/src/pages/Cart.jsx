import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Package, ArrowLeft, TruckIcon, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    delivery_city: "",
    delivery_postal: "",
    notes: ""
  });

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    };
    
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta));
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 150;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 15;
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {
    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || 
        !formData.delivery_address || !formData.delivery_city || !formData.delivery_postal) {
      alert("Wypełnij wszystkie wymagane pola!");
      return;
    }

    setIsProcessing(true);

    try {
      // Endpoint wywołujący Serverless Function Netlify
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerInfo: {
            name: formData.customer_name,
            email: formData.customer_email,
            phone: formData.customer_phone,
            address: formData.delivery_address,
            city: formData.delivery_city,
            postal: formData.delivery_postal,
            notes: formData.notes,
          },
          shipping: shippingCost,
        }),
      });

      if (!response.ok) {
        throw new Error('Nie udało się utworzyć sesji płatności');
      }

      const { url } = await response.json();
      window.location.href = url; // Przekierowanie do Stripe Checkout

    } catch (error) {
      console.error("Błąd podczas tworzenia płatności:", error);
      alert("Wystąpił błąd podczas przechodzenia do płatności. Spróbuj ponownie.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-2 elegant-text">
              Koszyk
            </h1>
            <p className="text-sm sm:text-base text-gray-600 elegant-text">
              {cart.length === 0 ? "Twój koszyk jest pusty" : `${cart.length} ${cart.length === 1 ? 'produkt' : 'produktów'} w koszyku`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 sm:py-20"
          >
            <Package className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-light text-black mb-3 sm:mb-4 elegant-text">
              Twój koszyk jest pusty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 elegant-text">
              Dodaj produkty do koszyka, aby kontynuować zakupy
            </p>
            <Link to={createPageUrl("Moto")}>
              <Button className="bg-black hover:bg-red-600 text-white border-none font-medium elegant-text transition-colors duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do sklepu
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                    <CardContent className="p-3 sm:p-4 lg:p-6">
                      <div className="flex gap-3 sm:gap-4 lg:gap-6">
                        {/* Product Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                          <img 
                            src={item.image_url} 
                            alt={item.name}
                            className="w-full h-full object-contain p-1 sm:p-2"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-2">
                            <h3 className="text-sm sm:text-base lg:text-xl font-medium text-black elegant-text line-clamp-2">
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0 h-8 w-8"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                          </div>
                          
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                              {item.description.substring(0, 100)}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-7 w-7 sm:h-8 sm:w-8 border-gray-300 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                              <span className="text-black font-medium w-6 sm:w-8 text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-7 w-7 sm:h-8 sm:w-8 border-gray-300 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <p className="text-lg sm:text-xl lg:text-2xl font-light text-black">
                                {(item.price * item.quantity).toFixed(2)} <span className="text-sm sm:text-base text-gray-500">zł</span>
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.price} zł / szt.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-gray-200 sticky top-4">
                <CardHeader className="border-b border-gray-200 p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-black font-medium elegant-text">
                    {showCheckoutForm ? "Dane do wysyłki" : "Podsumowanie"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {!showCheckoutForm ? (
                    <>
                      {/* Free Shipping Progress */}
                      {remainingForFreeShipping > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-orange-900 mb-1">
                                Dodaj jeszcze {remainingForFreeShipping.toFixed(2)} zł
                              </p>
                              <p className="text-xs text-orange-700">
                                aby otrzymać darmową dostawę
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-3 bg-orange-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-orange-600 h-full transition-all duration-500"
                              style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Price Breakdown */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between text-sm sm:text-base text-gray-600">
                          <span className="elegant-text">Produkty ({cart.length})</span>
                          <span>{subtotal.toFixed(2)} zł</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base text-gray-600">
                          <span className="elegant-text">Dostawa</span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600 font-medium">Darmowa</span>
                          ) : (
                            <span>{shippingCost.toFixed(2)} zł</span>
                          )}
                        </div>
                        <div className="border-t border-gray-200 pt-2 sm:pt-3">
                          <div className="flex justify-between text-xl sm:text-2xl font-light text-black">
                            <span className="elegant-text">Razem</span>
                            <span>{total.toFixed(2)} <span className="text-sm sm:text-base text-gray-500">zł</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full h-11 sm:h-12 bg-black hover:bg-orange-600 text-white border-none font-medium elegant-text text-sm sm:text-base transition-colors duration-300"
                      >
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Przejdź do płatności
                      </Button>

                      {/* Security Info */}
                      <div className="text-center space-y-2 pt-3 sm:pt-4 border-t border-gray-200">
                        {/* ZMIENIONE Z PRZELEWY24 NA STRIPE */}
                        <p className="text-xs sm:text-sm text-gray-600 elegant-text flex items-center justify-center gap-2">
                          🔒 Bezpieczne płatności przez Stripe
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 elegant-text">
                          📦 Wysyłka w ciągu 48h
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Checkout Form */}
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                            Imię i nazwisko *
                          </label>
                          <Input
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleInputChange}
                            placeholder="Jan Kowalski"
                            required
                            className="h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                            Email *
                          </label>
                          <Input
                            name="customer_email"
                            type="email"
                            value={formData.customer_email}
                            onChange={handleInputChange}
                            placeholder="jan@example.com"
                            required
                            className="h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                            Telefon *
                          </label>
                          <Input
                            name="customer_phone"
                            type="tel"
                            value={formData.customer_phone}
                            onChange={handleInputChange}
                            placeholder="+48 123 456 789"
                            required
                            className="h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                            Adres dostawy *
                          </label>
                          <Input
                            name="delivery_address"
                            value={formData.delivery_address}
                            onChange={handleInputChange}
                            placeholder="ul. Przykładowa 123/45"
                            required
                            className="h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                              Kod pocztowy *
                            </label>
                            <Input
                              name="delivery_postal"
                              value={formData.delivery_postal}
                              onChange={handleInputChange}
                              placeholder="00-000"
                              required
                              className="h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                          <div>
                            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                              Miasto *
                            </label>
                            <Input
                              name="delivery_city"
                              value={formData.delivery_city}
                              onChange={handleInputChange}
                              placeholder="Warszawa"
                              required
                              className="h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                            Uwagi do zamówienia (opcjonalnie)
                          </label>
                          <Textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Dodatkowe informacje..."
                            rows={3}
                            className="text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Submit Form */}
                      <div className="border-t border-gray-200 pt-3 sm:pt-4">
                        <div className="flex justify-between text-lg sm:text-xl font-medium text-black mb-3 sm:mb-4">
                          <span>Do zapłaty:</span>
                          <span>{total.toFixed(2)} zł</span>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <Button 
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full h-11 sm:h-12 bg-black hover:bg-orange-600 text-white border-none font-medium elegant-text text-sm sm:text-base transition-colors duration-300"
                          >
                            {isProcessing ? (
                              "Przekierowanie do płatności..."
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Zapłać kartą / BLIK
                              </>
                            )}
                          </Button>

                          <Button 
                            onClick={() => setShowCheckoutForm(false)}
                            variant="outline"
                            className="w-full h-10 sm:h-11 text-sm sm:text-base"
                          >
                            Powrót do koszyka
                          </Button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 text-center">
                        Klikając "Zapłać" zostaniesz przekierowany do bezpiecznej strony płatności Stripe
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}