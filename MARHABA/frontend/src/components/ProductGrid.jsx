import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  const { loading, error, fetchProducts, addToCart } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sort: 'name'
  });

  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleQuickAddToCart = (e, product) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error py-8">
        Une erreur est survenue lors du chargement des produits.
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        Aucun produit disponible
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="w-full max-w-3xl mx-auto px-4">
        <form className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Rechercher un produit..."
                className="input w-full pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-text-light absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="btn p-2 border border-gray-300 hover:border-primary hover:text-primary"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Prix minimum
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="0"
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Prix maximum
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="1000"
                    className="input w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary/50"
                  />
                  <label className="ml-2 text-sm text-text">
                    En stock uniquement
                  </label>
                </div>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="input"
                >
                  <option value="name">Nom</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                </select>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 