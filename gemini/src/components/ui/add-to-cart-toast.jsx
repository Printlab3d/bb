import React from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";

export function AddToCartToast({ product }) {
  const handleGoToCart = () => {
    window.location.href = `/Cart`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 min-w-[280px] max-w-[400px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-semibold text-gray-900 text-base">
          Dodano do koszyka
        </p>
      </div>
      
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 mb-3">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-16 h-16 object-contain rounded-xl bg-white flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </p>
          <p className="text-base text-orange-600 font-bold">
            {product.price} zł
          </p>
        </div>
      </div>
      
      <button
        onClick={handleGoToCart}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-2xl py-3 px-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
      >
        <ShoppingCart className="w-4 h-4" />
        Przejdź do koszyka
      </button>
    </div>
  );
}