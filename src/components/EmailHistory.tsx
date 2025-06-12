import { useEffect, useState } from 'react';
import { supabase, type EmailHistory } from '@/lib/supabase';

export default function EmailHistory() {
  const [history, setHistory] = useState<EmailHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('email_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setHistory(data || []);
    } catch (err) {
      console.error('Error fetching email history:', err);
      setError('Failed to load email history');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg shadow">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={fetchHistory}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          Try again
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No email history found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Email History
      </h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded">
                {item.tone}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.created_at!).toLocaleString()}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {item.purpose}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {item.email_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 