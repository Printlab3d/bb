import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black z-0"></div>
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Twój Motocykl.
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Twój Styl.
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Unikalne akcesoria motocyklowe i personalizowane breloki 3D. 
            Wyróżnij się na drodze dzięki najwyższej jakości produktom.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/Moto">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-full font-medium transition-all hover:scale-105">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Sklep Moto
              </Button>
            </Link>
            
            <Link to="/CustomKeychains">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-medium backdrop-blur-sm transition-all hover:scale-105">
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