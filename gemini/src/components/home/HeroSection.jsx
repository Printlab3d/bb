import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// NAPRAWIONY IMPORT: Zamiast "../../layout" używamy ścieżki względnej do folderu pages
import { useLanguage } from "../../pages/Layout.jsx"; 

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.05),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-4 sm:mb-6 elegant-text px-4">
            Vibe<span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Rush</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10 elegant-text max-w-2xl mx-auto px-4">
            {t('home.discover')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to={createPageUrl("Moto")} className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white border-none font-semibold elegant-text px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base group w-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40"
              >
                {t('home.shopNow')}
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to={createPageUrl("CustomKeychains")} className="w-full sm:w-auto">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-orange-300 hover:border-orange-500 text-orange-700 hover:text-orange-800 hover:bg-orange-50 font-medium elegant-text px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base transition-all duration-300 w-full"
              >
                <Sparkles className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                Breloki 3D
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative bg-white/70 backdrop-blur-sm py-8 sm:py-12 md:py-16 border-t border-orange-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {[
              { label: t('home.freeShipping'), value: t('home.from150') },
              { label: t('home.shipping'), value: t('home.in48h') },
              { label: t('home.payments'), value: t('home.przelewy24') },
              { label: t('home.homologation'), value: t('home.road') }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-orange-200 hover:border-orange-400 shadow-sm hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 group">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-orange-600 group-hover:text-orange-700 mb-1 sm:mb-2 transition-colors duration-300">{item.value}</p>
                <p className="text-xs sm:text-sm text-gray-600 elegant-text">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}