import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { cart, updateCartItemQuantity, removeFromCart } = useApp();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits et commencez vos achats
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-500 mt-1">{item.price.toFixed(2)} €</p>
                      
                      <div className="flex items-center mt-4">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <MinusIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <span className="mx-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <PlusIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Résumé de la commande
              </h2>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Sous-total</p>
                  <p>{calculateTotal().toFixed(2)} €</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Livraison et taxes calculées à la commande
                </p>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Commander
                </button>
                <div className="mt-6 text-center">
                  <Link
                    to="/products"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Continuer vos achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 