import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import { productService } from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 py-8">
        Produit non trouvé
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Retour
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-96 w-full object-cover md:h-full"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
              {product.category?.name}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price.toFixed(2)} €
                </span>
                <div className="flex items-center space-x-2">
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                  </span>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="quantity" className="text-gray-700">
                      Quantité :
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                    Ajouter au panier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 