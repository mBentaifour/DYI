import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';

export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useApp();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Une erreur est survenue lors du chargement des produits.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Tous nos produits</h1>
      <ProductGrid products={products} />
    </div>
  );
} 