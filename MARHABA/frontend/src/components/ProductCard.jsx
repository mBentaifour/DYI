import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart } = useApp();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              {product.price.toFixed(2)} €
            </span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
            </span>
          </div>
        </div>
      </Link>
      {product.stock > 0 && (
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
        >
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
} 