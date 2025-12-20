import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, onAddToCart, showHotBadge = false }) {
  // LOGIKA WYBORU ZDJĘCIA:
  // 1. Sprawdź czy jest pole 'image' (pojedyncze)
  // 2. Jeśli nie, weź pierwsze z tablicy 'images'
  // 3. Jeśli nic nie ma, wstaw pusty ciąg (nie wywali błędu, pokaże placeholder)
  const imageSrc = product.image 
    ? product.image 
    : (product.images && product.images.length > 0 ? product.images[0] : "");

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* LINK DO STRONY PRODUKTU */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        
        {/* ODZNAKI (HOT / WYPRZEDAŻ) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {showHotBadge && product.featured && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-sm px-3 py-1">
              HOT
            </Badge>
          )}
          {product.oldPrice && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white border-none shadow-sm px-3 py-1">
              SALE
            </Badge>
          )}
        </div>

        {/* ZDJĘCIE PRODUKTU */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            // Zabezpieczenie: gdyby zdjęcie nie działało, ukrywa ikonkę błędu
            onError={(e) => {
              e.target.style.display = 'none'; 
              e.target.parentNode.classList.add('bg-gray-200'); // Dodaje szare tło zamiast zdjęcia
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
            Brak zdjęcia
          </div>
        )}

        {/* NAKŁADKA Z PRZYCISKIEM SZYBKIEGO PODGLĄDU */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-gray-900 shadow-md translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Eye className="w-4 h-4 mr-2" /> Szczegóły
            </Button>
        </div>
      </Link>

      {/* TREŚĆ KARTY */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                {product.category === 'moto' ? 'Moto' : product.category === 'keychains' ? 'Breloki' : 'Akcesoria'}
            </span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block group-hover:text-orange-600 transition-colors">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 h-12" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* CENA */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.oldPrice.toFixed(2)} PLN
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {product.price.toFixed(2)} <span className="text-xs font-normal text-gray-500">PLN</span>
            </span>
          </div>

          <Button 
            size="icon" 
            className="rounded-full bg-gray-900 hover:bg-orange-600 text-white shadow-none hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            onClick={() => onAddToCart(product)}
            title="Dodaj do koszyka"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}