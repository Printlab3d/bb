import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Bike, KeyRound, Tag, ShoppingCart, Globe } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";

// Translations
const translations = {
  pl: {
    nav: {
      home: "Strona Główna",
      moto: "Moto",
      keychains: "Breloki 3D",
      deals: "Okazje",
      cart: "Koszyk"
    },
    home: {
      premiumParts: "VibeRush",
      highQuality: "Najwyższej jakości akcesoria dla Twojego motocykla",
      stylePerformance: "Styl spotyka",
      performance: "wydajność",
      discover: "Odkryj naszą kolekcję profesjonalnych akcesoriów zaprojektowanych specjalnie dla motocykli enduro i dirtbike",
      shopNow: "Przejdź do sklepu",
      learnMore: "Dowiedz się więcej",
      bestsellers: "BESTSELLERY",
      bestLighting: "Nasze Produkty",
      popularProducts: "Nasze najpopularniejsze produkty wybrane przez tysiące motocyklistów",
      viewAll: "Zobacz wszystkie produkty",
      freeShipping: "Darmowa Dostawa",
      from150: "od 150 zł",
      shipping: "Wysyłka",
      in48h: "w 48h",
      payments: "Płatności",
      przelewy24: "Stripe", // POPRAWIONE
      homologation: "Homologacja",
      road: "Drogowa",
      highestQuality: "Najwyższa Jakość",
      premiumLED: "Premium komponenty LED z certyfikatami",
      fastShipping: "Szybka Dostawa",
      order48h: "Realizacja zamówień w 24-48 godzin",
      certified: "Certyfikowane produkty do użytku drogowego"
    },
    product: {
      addToCart: "Dodaj do koszyka",
      available: "Dostępne",
      unavailable: "Niedostępny",
      outOfStock: "Brak w magazynie",
      inStock: "Dostępne",
      description: "Opis produktu",
      backToShop: "Powrót do sklepu",
      notFound: "Produkt nie znaleziony"
    },
    cart: {
      title: "Koszyk",
      empty: "Twój koszyk jest pusty",
      emptyDesc: "Dodaj produkty do koszyka, aby kontynuować zakupy",
      summary: "Podsumowanie",
      subtotal: "Produkty",
      shipping: "Dostawa",
      free: "Darmowa",
      total: "Razem",
      checkout: "Przejdź do płatności"
    },
    toast: {
      addedToCart: "Dodano do koszyka",
      goToCart: "Przejdź do koszyka"
    },
    footer: {
      terms: "Regulamin",
      privacy: "Polityka Prywatności",
      returns: "Zwroty i Reklamacje",
      copyright: "© 2024 VibeRush.pl",
      premiumParts: "VibeRush Final Fix" // ZMIENIONY TEKST DLA ZŁAMANIA CACHE
    }
  },
  en: {
    nav: {
      home: "Home",
      moto: "Moto",
      keychains: "3D Keychains",
      deals: "Deals",
      cart: "Cart"
    },
    home: {
      premiumParts: "VibeRush",
      highQuality: "Highest quality accessories for your motorcycle",
      stylePerformance: "Style meets",
      performance: "performance",
      discover: "Discover our collection of professional accessories designed specifically for enduro and dirtbike motorcycles",
      shopNow: "Shop Now",
      learnMore: "Learn More",
      bestsellers: "BESTSELLERS",
      bestLighting: "Our Products",
      popularProducts: "Our most popular products chosen by thousands of motorcyclists",
      viewAll: "View all products",
      freeShipping: "Free Shipping",
      from150: "from 150 PLN",
      shipping: "Shipping",
      in48h: "in 48h",
      payments: "Payments",
      przelewy24: "Stripe", // POPRAWIONE
      homologation: "Homologation",
      road: "Road",
      highestQuality: "Highest Quality",
      premiumLED: "Premium LED components with certificates",
      fastShipping: "Fast Shipping",
      order48h: "Order fulfillment within 24-48 hours",
      certified: "Certified products for road use"
    },
    product: {
      addToCart: "Add to Cart",
      available: "Available",
      unavailable: "Unavailable",
      outOfStock: "Out of Stock",
      inStock: "In Stock",
      description: "Product Description",
      backToShop: "Back to Shop",
      notFound: "Product not found"
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty",
      emptyDesc: "Add products to cart to continue shopping",
      summary: "Summary",
      subtotal: "Products",
      shipping: "Shipping",
      free: "Free",
      total: "Total",
      checkout: "Proceed to Payment"
    },
    toast: {
      addedToCart: "Added to Cart",
      goToCart: "Go to Cart"
    },
    footer: {
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      returns: "Returns & Complaints",
      copyright: "© 2024 VibeRush.pl",
      premiumParts: "VibeRush Final Fix" // ZMIENIONY TEKST DLA ZŁAMANIA CACHE
    }
  }
};

const LanguageContext = React.createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = React.useState('pl');

  React.useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'pl';
    setLanguage(savedLang);
    
    // Set page title
    document.title = 'VibeRush';
    
    // Set favicon - ZMIENIONY LINK NA LOKALNY ZASÓB
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/assets/logo.png'; // POPRAWIONE
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new Event('languageChanged'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

function LayoutContent({ children, currentPageName }) {
  const [cartCount, setCartCount] = React.useState(0);
  const { language, changeLanguage, t } = useLanguage();

  const navigationItems = [
    {
      title: t('nav.home'),
      url: createPageUrl("Home"),
      icon: Home,
    },
    {
      title: t('nav.moto'),
      url: createPageUrl("Moto"),
      icon: Bike,
    },
    {
      title: t('nav.keychains'),
      url: createPageUrl("CustomKeychains"),
      icon: KeyRound,
    },
    {
      title: t('nav.deals'),
      url: createPageUrl("Okazje"),
      icon: Tag,
    },
    {
      title: t('nav.cart'),
      url: createPageUrl("Cart"),
      icon: ShoppingCart,
    },
  ];

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const isActivePage = (pageName) => {
    return currentPageName === pageName;
  };

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --background: 0 0% 100%;
            --foreground: 0 0% 3.9%;
            --primary: #f97316;
            --primary-foreground: #ffffff;
            --secondary: #fb923c;
            --accent: #fdba74;
            --muted: #1a1a1a;
            --border: rgba(255, 255, 255, 0.08);
            --sidebar-bg: #ffffff;
          }
          
          body {
            background: #f5f5f5;
            color: #1a1a1a;
          }

          .elegant-text {
            letter-spacing: 0.02em;
            font-weight: 400;
          }

          .glow-effect {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
          }

          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
            }
            50% {
              box-shadow: 0 0 25px rgba(249, 115, 22, 0.6);
            }
          }

          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }

          [data-sonner-toaster] {
            --normal-bg: transparent !important;
            --normal-border: transparent !important;
            background: transparent !important;
          }

          [data-sonner-toast] {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            backdrop-filter: none !important;
            outline: none !important;
          }
          
          [data-sonner-toast] * {
            border: none !important;
            outline: none !important;
          }

          [data-sonner-toast] > div,
          [data-sonner-toast] > div > div {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            outline: none !important;
          }

          ol[data-sonner-toaster] {
            background: transparent !important;
            border: none !important;
            outline: none !important;
          }

          ol[data-sonner-toaster] li {
            background: transparent !important;
            border: none !important;
            outline: none !important;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white">
          <SidebarHeader className="border-b border-gray-800 p-3 bg-black">
            <div className="relative flex items-center justify-center">
              <img 
                src="/assets/logo.png"
                alt="VibeRush"
                className="h-12 w-auto"
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3 bg-white">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const pageName = item.url.split('/').pop() || 'Home';
                    const isActive = isActivePage(pageName);
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`transition-all duration-300 rounded-xl mb-2 ${
                            isActive ? 'bg-gradient-to-r from-orange-600 to-orange-500' : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3.5 group">
                            <item.icon className={`w-5 h-5 transition-all duration-300 ${
                              isActive ? 'text-white' : 'text-gray-700 group-hover:text-orange-600'
                            }`} />
                            <span className={`font-medium elegant-text text-sm ${
                              isActive ? 'text-white' : 'text-gray-900 group-hover:text-orange-600'
                            }`}>
                              {item.title}
                            </span>
                            {item.title.includes(t('nav.cart')) && cartCount > 0 && (
                              <Badge className="ml-auto bg-orange-600 text-white border-none pulse-glow">
                                {cartCount}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="px-3 py-4 border-t border-gray-200 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Language</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => changeLanguage('pl')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    language === 'pl'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    language === 'en'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-6 bg-white">
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-xs text-gray-700 elegant-text">
                  {t('footer.copyright')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('footer.premiumParts')}
                </p>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <Link to={createPageUrl("Regulamin")} className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  {t('footer.terms')}
                </Link>
                <Link to={createPageUrl("PolitykaPrywatnosci")} className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link to={createPageUrl("Zwroty")} className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  {t('footer.returns')}
                </Link>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 px-6 py-4 md:hidden sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 text-white" />
              <img 
                src="/assets/logo.png"
                alt="VibeRush"
                className="h-8 w-auto"
              />
              {cartCount > 0 && (
                <Badge className="bg-orange-600 text-white border-none pulse-glow">
                  {cartCount}
                </Badge>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gray-50">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </LanguageProvider>
  );
}