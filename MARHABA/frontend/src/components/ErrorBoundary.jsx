import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

export default function ErrorBoundary({ children }) {
  const { error } = useApp();

  if (!error) return children;

  return (
    <div className="rounded-md bg-red-50 p-4 my-4 mx-auto max-w-7xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Une erreur est survenue</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
} 