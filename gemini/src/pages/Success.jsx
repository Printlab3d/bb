import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Success() {
  useEffect(() => {
    // Wyczyść koszyk po udanej płatności
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-white border border-gray-200 text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-light text-black mb-4 elegant-text">
            Płatność zakończona sukcesem!
          </h2>
          <p className="text-gray-600 mb-6 elegant-text text-lg">
            Dziękujemy za zakupy! Wysłaliśmy potwierdzenie na Twój email.
          </p>
          <div className="bg-orange-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-medium text-black mb-3">Co dalej?</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Otrzymasz email z potwierdzeniem zamówienia</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Wyślemy paczkę w ciągu 48 godzin</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Dostaniesz numer śledzenia przesyłki</span>
              </li>
            </ul>
          </div>
          <Link to={createPageUrl("Home")}>
            <Button className="bg-black hover:bg-orange-600 text-white">
              Powrót do strony głównej
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}