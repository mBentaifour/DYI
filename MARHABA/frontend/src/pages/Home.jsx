import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ChevronRightIcon, TruckIcon, ShieldCheckIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  const { categories, products, loading, error, fetchCategories, fetchProducts } = useApp();

  useEffect(() => {
    fetchCategories();
    fetchProducts({ featured: true });
  }, [fetchCategories, fetchProducts]);

  const features = [
    {
      icon: TruckIcon,
      title: "Livraison Gratuite",
      description: "Livraison gratuite pour toute commande supérieure à 50€"
    },
    {
      icon: ShieldCheckIcon,
      title: "Garantie Qualité",
      description: "Tous nos produits sont garantis 2 ans minimum"
    },
    {
      icon: CurrencyEuroIcon,
      title: "Prix Compétitifs",
      description: "Les meilleurs prix du marché garantis"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] -mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581783898377-1c85bf937427"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              Tout pour vos projets DIY
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8"
            >
              Découvrez notre sélection d'outils et de matériaux de qualité professionnelle
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Découvrir nos produits
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <feature.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Catégories</h2>
          <p className="text-gray-600">Explorez notre large gamme de produits par catégorie</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group block relative h-64 rounded-xl overflow-hidden"
                >
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Produits en Vedette</h2>
          <p className="text-gray-600">Découvrez notre sélection de produits populaires</p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
} 