import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

export default function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 pt-20">
            <AppRoutes />
          </main>
        </div>
      </AppProvider>
    </Router>
  );
}
