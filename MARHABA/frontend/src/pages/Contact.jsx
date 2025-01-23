import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Contactez-nous</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-center">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur nos produits et services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-card p-8">
              <h2 className="text-2xl font-semibold text-secondary mb-6">Nos coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <EnvelopeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Email</p>
                    <a 
                      href="mailto:tayfour.Zshop@gmail.com" 
                      className="text-text hover:text-primary transition-colors"
                    >
                      tayfour.Zshop@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Téléphone</p>
                    <a 
                      href="tel:+212537526106" 
                      className="text-text hover:text-primary transition-colors"
                    >
                      +212 537 526 106
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <LinkIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">LinkedIn</p>
                    <a 
                      href="https://linkedin.com/in/mohammed-bentaifour-4a3947142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text hover:text-primary transition-colors"
                    >
                      Mohammed Bentaifour
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card p-8">
              <h2 className="text-2xl font-semibold text-secondary mb-6">
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-6 w-6 text-primary" />
                  Horaires d'ouverture
                </span>
              </h2>
              <div className="space-y-3 text-text-muted">
                <p className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-medium text-text">9h00 - 18h00</span>
                </p>
                <p className="flex justify-between">
                  <span>Samedi:</span>
                  <span className="font-medium text-text">9h00 - 13h00</span>
                </p>
                <p className="flex justify-between">
                  <span>Dimanche:</span>
                  <span className="font-medium text-text">Fermé</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-card p-8">
            <h2 className="text-2xl font-semibold text-secondary mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Le sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-success mt-4"
                >
                  Message envoyé avec succès !
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 