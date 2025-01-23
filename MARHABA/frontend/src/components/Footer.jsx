import React from 'react';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text">À propos de Z-Shop</h3>
            <p className="text-text-light">
              Votre partenaire de confiance pour tous vos besoins en outillage et bricolage.
              Nous proposons une large gamme de produits de qualité pour les professionnels et les particuliers.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-light hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-text-light hover:text-primary transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-light hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-light hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-text-light">
                <EnvelopeIcon className="h-5 w-5" />
                <a href="mailto:tayfour.Zshop@gmail.com" className="hover:text-primary transition-colors">
                  tayfour.Zshop@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-text-light">
                <PhoneIcon className="h-5 w-5" />
                <a href="tel:+212537526106" className="hover:text-primary transition-colors">
                  +212 537 526 106
                </a>
              </li>
              <li className="flex items-center space-x-2 text-text-light">
                <LinkIcon className="h-5 w-5" />
                <a 
                  href="https://linkedin.com/in/mohammed-bentaifour-4a3947142" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text">Newsletter</h3>
            <p className="text-text-light">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="input w-full"
              />
              <button type="submit" className="btn btn-primary w-full">
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-text-light">
            © {new Date().getFullYear()} Z-Shop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 