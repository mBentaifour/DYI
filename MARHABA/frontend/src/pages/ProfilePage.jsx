import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { UserIcon, ShoppingBagIcon, CogIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfilePage() {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78'
  });

  const [orders] = useState([
    {
      id: '1',
      date: '2024-02-20',
      status: 'Livré',
      total: 156.99,
      items: [
        { name: 'Perceuse sans fil', quantity: 1, price: 129.99 },
        { name: 'Jeu de vis', quantity: 2, price: 13.50 }
      ]
    },
    // Ajoutez d'autres commandes ici
  ]);

  const tabs = [
    {
      name: 'Informations',
      icon: UserIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Informations personnelles</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      )
    },
    {
      name: 'Commandes',
      icon: ShoppingBagIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Historique des commandes</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Commande #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{item.price.toFixed(2)} €</p>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between">
                      <p className="font-medium">Total</p>
                      <p className="font-medium">{order.total.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      name: 'Paramètres',
      icon: CogIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Paramètres du compte</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Recevoir les newsletters</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Notifications de commande par SMS</span>
              </label>
            </div>
            <div className="pt-4">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Mon Compte</h2>
          <Tab.Group>
            <Tab.List className="flex space-x-4 border-b">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2',
                      selected
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )
                  }
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-6">
              {tabs.map((tab, idx) => (
                <Tab.Panel key={idx}>{tab.content}</Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
} 