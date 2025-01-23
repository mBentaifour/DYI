// Configuration de l'API
const API_BASE_URL = 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

export const endpoints = {
    categories: `${API_URL}/categories`,
    products: `${API_URL}/products`,
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    profile: `${API_URL}/auth/profile`,
    orders: `${API_URL}/orders`,
}; 