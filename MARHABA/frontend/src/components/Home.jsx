import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/api';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des catégories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Bienvenue sur notre boutique</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link 
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={category.image_url} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                            <p className="text-gray-600">{category.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home; 