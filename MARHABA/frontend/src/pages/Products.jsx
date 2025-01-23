import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import ErrorBoundary, { LoadingSpinner } from '../components/ErrorBoundary';
import { motion } from 'framer-motion';

export default function Products() {
  const { products, loading, error, fetchProducts } = useApp();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Produits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection d'outils et de matériaux de qualité pour tous vos projets
          </p>
        </div>

        <SearchBar />

        <ErrorBoundary>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-4 aspect-h-3 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {product.price.toFixed(2)} €
                      </span>
                      {product.stock > 0 ? (
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          En stock
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          Rupture
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
} 