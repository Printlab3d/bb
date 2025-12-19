import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Check, ShieldAlert, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products"; // Upewnij się, że masz ten plik z produktami!
import { useToast } from "@/components/ui/use-toast";

export default function ProductDetails() {
  const { toast } = useToast();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = parseInt(searchParams.get('id'));
  
  // Znajdź produkt w bazie
  const product = products.find(p => p.id === productId);
  
  // Stan dla wybranego zdjęcia (galeria)
  const [selectedImage, setSelectedImage] = useState(0);

  // Scroll na górę po załadowaniu lub zmianie produktu
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImage(0);
    }
  }, [productId, product]);

  // Funkcja dodawania do koszyka (musi być tutaj, bo to oddzielna podstrona)
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item) => item.id === product.id);

    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Wysyłamy sygnał do Layoutu, żeby zaktualizował licznik w nagłówku
    window.dispatchEvent(new Event("cartUpdated"));

    toast({
      title: "Dodano do koszyka",
      description: `${product.name} znajduje się w Twoim koszyku.`,
      duration: 3000,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Nie znaleziono produktu</h2>
        <Link to="/Home">
            <Button variant="outline">Wróć do sklepu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      {/* Przycisk powrotu */}
      <Link to="/Home" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Wróć do przeglądania
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* LEWA KOLUMNA - ZDJĘCIA */}
        <div className="space-y-4">
          {/* Główne zdjęcie */}
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group">
             {/* Jeśli są warianty (kolory), dodajemy etykietę */}
             {product.color && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                    Kolor: {product.color}
                </div>
             )}
            <img 
              src={product.images[selectedImage] || product.images[0]} 
              alt={product.name}
              className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Miniaturki (jeśli jest więcej niż 1 zdjęcie) */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden bg-gray-50 transition-all ${
                    selectedImage === index ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <img src={img} alt={`Widok ${index}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRAWA KOLUMNA - INFO */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category === 'moto' ? 'Moto' : product.category === 'accessories' ? 'Akcesoria' : 'Gadżety'}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">{product.price.toFixed(2)} zł</span>
            {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">{product.oldPrice.toFixed(2)} zł</span>
            )}
          </div>

          <div className="prose text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </div>

          {/* --- TU JEST ZMIANA: OBSŁUGA WARIANTÓW (KOLORY) --- */}
          {product.variants && (
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Wybierz kolor:</h3>
                <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                    <Link 
                    key={variant.id} 
                    to={`/ProductDetails?id=${variant.id}`} 
                    className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm flex items-center justify-center relative ${
                        product.id === variant.id 
                        ? "border-orange-600 ring-2 ring-orange-200 scale-110" 
                        : "border-gray-300 hover:scale-110 hover:border-orange-400"
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    title={variant.color}
                    >
                        {/* Ptaszek dla aktywnego koloru */}
                        {product.id === variant.id && (
                             <Check className={`w-5 h-5 ${variant.color === 'Biały' || variant.color === 'Srebrny' ? 'text-black' : 'text-white'}`} />
                        )}
                    </Link>
                ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Wybrany wariant: <span className="font-bold text-gray-900">{product.color}</span></p>
            </div>
          )}

          {/* Lista cech */}
          {product.features && (
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Cechy produktu:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
          )}

          {/* Przycisk akcji */}
          <div className="flex gap-4 mb-8">
            <Button 
                onClick={addToCart}
                className="flex-1 bg-gray-900 hover:bg-orange-600 text-white h-14 text-lg transition-all shadow-lg hover:shadow-orange-500/30"
            >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Dodaj do koszyka
            </Button>
          </div>

          {/* Informacje dodatkowe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
             <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm">Szybka wysyłka</h4>
                    <p className="text-xs text-gray-500">Wysyłamy w 24-48h</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                    <h4 className="font-bold text-sm">Gwarancja jakości</h4>
                    <p className="text-xs text-gray-500">Sprawdzony druk 3D / LED</p>
                </div>
             </div>
          </div>
          
          {/* Ostrzeżenie dla druku 3D (jeśli dotyczy) */}
          {product.category === 'keychains' || product.name.includes('3D') ? (
               <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100">
                  <p><strong>Info:</strong> Produkty z druku 3D mogą posiadać widoczne warstwy charakterystyczne dla technologii FDM. Nie wpływa to na ich wytrzymałość.</p>
               </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}