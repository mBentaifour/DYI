import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService, productService } from '../services/api';

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                const categoryData = await categoryService.getBySlug(slug);
                if (!categoryData) {
                    setError('Catégorie non trouvée');
                    setLoading(false);
                    return;
                }
                
                setCategory(categoryData);
                const productsData = await productService.getAll({ category_id: categoryData.id });
                setProducts(productsData);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des données');
                setLoading(false);
            }
        };

        fetchCategoryAndProducts();
    }, [slug]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!category) return <div>Catégorie non trouvée</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
            <p className="text-gray-600 mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div 
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={product.image_url} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">{product.price} €</span>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage; 