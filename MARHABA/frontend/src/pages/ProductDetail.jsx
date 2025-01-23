import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({ ...product, quantity });
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-error">
          {error || "Produit non trouvé"}
        </div>
        <Link to="/products" className="btn btn-primary mt-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="btn btn-ghost mb-8 inline-flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour aux produits
        </Link>

        <div className="card bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {product.additional_images && (
                <div className="grid grid-cols-4 gap-2">
                  {product.additional_images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Vue ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">{product.name}</h1>
                <p className="text-text-light">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toFixed(2)} €
                  </span>
                  {product.stock > 0 ? (
                    <span className="badge badge-success">
                      En stock ({product.stock} disponibles)
                    </span>
                  ) : (
                    <span className="badge badge-error">
                      Rupture de stock
                    </span>
                  )}
                </div>

                {product.stock > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label htmlFor="quantity" className="text-text font-medium">
                        Quantité :
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="input"
                      >
                        {[...Array(Math.min(10, product.stock))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="btn btn-primary w-full flex items-center justify-center"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      Ajouter au panier
                    </button>

                    {showAddedToCart && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center text-success"
                      >
                        Produit ajouté au panier !
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h2 className="text-xl font-semibold text-text">Caractéristiques</h2>
                <ul className="space-y-2 text-text-light">
                  <li>Marque : {product.brand || 'Non spécifiée'}</li>
                  <li>Catégorie : {product.category || 'Non spécifiée'}</li>
                  <li>Référence : {product.reference || product.id}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 