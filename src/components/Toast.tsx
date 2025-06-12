'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-out">
      <div className={`rounded-lg shadow-lg p-4 ${
        type === 'error' 
          ? 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-100' 
          : 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-100'
      }`}>
        <div className="flex items-start gap-3">
          {type === 'error' ? (
            <svg 
              className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" 
                clipRule="evenodd" 
              />
            </svg>
          ) : (
            <svg 
              className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 inline-flex flex-shrink-0 ${
              type === 'error'
                ? 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300'
                : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300'
            }`}
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 