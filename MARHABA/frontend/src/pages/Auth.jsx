import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Ici, ajoutez la logique d'authentification
      console.log('Form submitted:', formData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Ici, ajoutez la logique de connexion avec Google
      console.log('Google sign-in clicked');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background py-12 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-text-light mt-2">
            {isLogin
              ? 'Connectez-vous pour accéder à votre compte'
              : 'Inscrivez-vous pour commencer vos achats'}
          </p>
        </div>

        <div className="card p-6">
          {/* Bouton Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
          >
            <img
              src="/google-icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-text">
              {isLogin ? 'Se connecter avec Google' : "S'inscrire avec Google"}
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-light">ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="input w-full pl-10"
                    placeholder="John Doe"
                  />
                  <UserIcon className="h-5 w-5 text-text-light absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input w-full pl-10"
                  placeholder="vous@exemple.com"
                />
                <EnvelopeIcon className="h-5 w-5 text-text-light absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input w-full pl-10"
                  placeholder="••••••••"
                />
                <LockClosedIcon className="h-5 w-5 text-text-light absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="input w-full pl-10"
                    placeholder="••••••••"
                  />
                  <LockClosedIcon className="h-5 w-5 text-text-light absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            )}

            {error && (
              <p className="text-error text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Chargement...
                </span>
              ) : (
                isLogin ? 'Se connecter' : "S'inscrire"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-text-light">
            {isLogin ? (
              <>
                Pas encore de compte ?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:text-primary-dark"
                >
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:text-primary-dark"
                >
                  Se connecter
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 