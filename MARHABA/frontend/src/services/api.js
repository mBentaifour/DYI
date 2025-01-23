import axios from 'axios';
import { endpoints } from '../config';

const baseURL = 'http://localhost:5000/api';

// Créer une instance axios avec la configuration de base
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Ajouter l'intercepteur pour le token JWT
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ajouter l'intercepteur pour gérer les réponses
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const categoryService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get('/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },
    getBySlug: async (slug) => {
        try {
            const response = await axiosInstance.get(`/categories/${slug}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category:', error);
            return null;
        }
    },
    getProducts: (categoryId) => axiosInstance.get(`${endpoints.categories}/${categoryId}/products`)
};

export const productService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    },
    getFeatured: async () => {
        try {
            const response = await axiosInstance.get('/products?featured=true');
            return response.data;
        } catch (error) {
            console.error('Error fetching featured products:', error);
            return [];
        }
    },
    addReview: (productId, data) => axiosInstance.post(`${endpoints.products}/${productId}/reviews`, data)
};

export const authService = {
    login: (credentials) => axiosInstance.post(endpoints.login, credentials),
    register: (userData) => axiosInstance.post(endpoints.register, userData),
    getProfile: () => axiosInstance.get(endpoints.profile)
};

export const orderService = {
    create: (orderData) => axiosInstance.post(endpoints.orders, orderData),
    getAll: () => axiosInstance.get(endpoints.orders),
    getById: (id) => axiosInstance.get(`${endpoints.orders}/${id}`)
}; 