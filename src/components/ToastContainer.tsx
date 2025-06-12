'use client';

import Toast from './Toast';

interface ToastContainerProps {
  error: string | null;
  onClose: () => void;
}

export default function ToastContainer({ error, onClose }: ToastContainerProps) {
  if (!error) return null;

  return (
    <Toast
      message={error}
      type="error"
      onClose={onClose}
    />
  );
} 