import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, ExternalLink, Box, Zap, CheckCircle, Palette } from "lucide-react";

export default function CustomKeychains() {
  const features = [
    {
      icon: Palette,
      title: "Projekty na zamówienie",
      description: "Realizujemy każdy pomysł według Twoich potrzeb"
    },
    {
      icon: Box,
      title: "Najwyższa jakość",
      description: "Profesjonalny druk 3D z precyzją"
    },
    {
      icon: Zap,
      title: "Szybka realizacja",
      description: "Twój projekt gotowy w 3-5 dni"
    },
    {
      icon: CheckCircle,
      title: "Konkurencyjne ceny",
      description: "Najlepszy stosunek jakości do ceny"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/assets/keychains-bg.jpg"
            alt="Breloki 3D"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <KeyRound className="w-4 h-4 text-purple-400" />
              <span className="text-xs md:text-sm font-medium text-purple-300 elegant-text">BRELOKI 3D</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 elegant-text drop-shadow-2xl">
              Breloki 3D na Zamówienie
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto elegant-text drop-shadow-lg">
              Personalizowane breloki z druku 3D według Twojego projektu
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 elegant-text">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-600/10 to-transparent border border-white/10 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 elegant-text">
            Zamów swój unikalny brelok 3D
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto elegant-text">
            Skontaktuj się z naszym partnerem PrintLab3D, aby zamówić personalizowane breloki 
            z druku 3D według Twojego projektu
          </p>
          
          <a 
            href="https://printlab3d.eu" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none font-medium elegant-text px-8 py-6 text-lg group shadow-lg shadow-purple-500/20"
            >
              Odwiedź PrintLab3D
              <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-white/5 border border-white/10 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 elegant-text">
                  Jak to działa?
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Wyślij swój projekt", desc: "Skontaktuj się z PrintLab3D z pomysłem" },
                    { step: "2", title: "Otrzymaj wycenę", desc: "Bezpłatna wycena w 24 godziny" },
                    { step: "3", title: "Odbierz gotowy brelok", desc: "Realizacja w 3-5 dni roboczych" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Card className="bg-white/5 border border-white/10 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light text-white mb-4 elegant-text">
                  Możliwości
                </h3>
                <ul className="space-y-3">
                  {[
                    "Breloki z logo firmy",
                    "Personalizowane imiona",
                    "Numery rejestracyjne motocykli",
                    "Symbole i emblematy",
                    "Dowolne kształty i kolory",
                    "Figurki i maskotki",
                    "Dedykowane projekty",
                    "Unikalne wzory"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}