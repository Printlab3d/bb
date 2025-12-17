import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Tło - jasne z delikatnym gradientem */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-gray-100 z-0"></div>
      
      {/* Dekoracyjne elementy */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
            <span className="block">Twój Motocykl.</span>
            <span className="block mt-2 text-orange-600">Twój Styl.</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unikalne akcesoria motocyklowe i personalizowane breloki 3D. 
            Wyróżnij się na drodze dzięki najwyższej jakości produktom.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/Moto">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-orange-200">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Sklep Moto
              </Button>
            </Link>
            
            <Link to="/CustomKeychains">
              <Button size="lg" variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-50 text-lg px-8 py-6 rounded-full font-medium transition-all hover:scale-105">
                Breloki 3D
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}