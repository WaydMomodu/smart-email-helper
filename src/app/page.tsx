'use client';

import { useState } from 'react';
import EmailInput from '@/components/EmailInput';
import EmailPreview from '@/components/EmailPreview';
import EmailHistory from '@/components/EmailHistory';
import Header from '@/components/Header';
import ToastContainer from '@/components/ToastContainer';
import type { EmailTone } from '@/utils/emailTemplates';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [emailPurpose, setEmailPurpose] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [tone, setTone] = useState<EmailTone>('Formal');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const saveToHistory = async (purpose: string, tone: string, emailText: string) => {
    try {
      const { error: insertError } = await supabase
        .from('email_history')
        .insert([
          {
            purpose,
            tone,
            email_text: emailText,
          },
        ]);

      if (insertError) {
        console.error('Error saving to history:', insertError);
        throw new Error('Failed to save email to history');
      }

      console.log('Successfully saved email to history');
    } catch (err) {
      console.error('Error in saveToHistory:', err);
      // We don't throw here to avoid disrupting the main flow
      // The error is logged but won't affect the user experience
    }
  };

  const handleGenerate = async () => {
    if (!emailPurpose.trim()) {
      setError('Please enter your email purpose before generating');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log('Sending request to generate email:', {
        purpose: emailPurpose.trim(),
        tone
      });

      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose: emailPurpose.trim(),
          tone,
        }),
      });

      const data = await response.json();
      console.log('Received response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate email');
      }

      if (!data.message) {
        throw new Error('Invalid response format from server');
      }

      const generatedMessage = data.message;
      setGeneratedEmail(generatedMessage);

      // Save to history after successful generation
      await saveToHistory(emailPurpose.trim(), tone, generatedMessage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate email';
      setError(errorMessage);
      console.error('Error generating email:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <EmailInput
          emailPurpose={emailPurpose}
          setEmailPurpose={setEmailPurpose}
          handleGenerate={handleGenerate}
          tone={tone}
          setTone={setTone}
          isGenerating={isGenerating}
        />
        <EmailPreview generatedEmail={generatedEmail} />
        <ToastContainer
          error={error}
          onClose={() => setError(null)}
        />
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md"
          >
            {showHistory ? 'Hide History' : 'View History'}
          </button>
        </div>

        {showHistory && <EmailHistory />}
      </div>
    </main>
  );
}
