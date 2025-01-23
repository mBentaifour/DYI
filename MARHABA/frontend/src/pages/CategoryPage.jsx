import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../services/api';
import ProductGrid from '../components/ProductGrid';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoryData = await categoryService.getBySlug(slug);
        setCategory(categoryData);
        const productsData = await categoryService.getProducts(categoryData.id);
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Erreur lors du chargement de la catégorie');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug]);

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

  if (!category) {
    return (
      <div className="text-center text-gray-600 py-8">
        Catégorie non trouvée
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={category.image_url}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Produits dans cette catégorie</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
} 