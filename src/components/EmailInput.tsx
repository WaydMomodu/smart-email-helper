import { ChangeEvent, useEffect, useRef } from 'react';
import type { EmailTone } from '@/utils/emailTemplates';
import ToneSelector from './ToneSelector';

interface EmailInputProps {
  emailPurpose: string;
  setEmailPurpose: (value: string) => void;
  handleGenerate: () => void;
  tone: EmailTone;
  setTone: (tone: EmailTone) => void;
  isGenerating: boolean;
}

export default function EmailInput({ 
  emailPurpose, 
  setEmailPurpose, 
  handleGenerate,
  tone,
  setTone,
  isGenerating
}: EmailInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmailPurpose(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [emailPurpose]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <div className="max-w-2xl mx-auto">
        <ToneSelector tone={tone} setTone={setTone} />
        <label htmlFor="emailPurpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Instructions
        </label>
        <div className="relative">
          <textarea
            ref={textareaRef}
            id="emailPurpose"
            value={emailPurpose}
            onChange={handleTextareaChange}
            placeholder="Describe your email's purpose... (e.g., 'Schedule a meeting to discuss the Q3 marketing strategy with the team next week')"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 min-h-[100px] resize-none overflow-x-hidden break-words"
            rows={1}
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
            disabled={isGenerating}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400 dark:text-gray-500">
            {emailPurpose.length} characters
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 ${
            isGenerating
              ? 'bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-[1.02]'
          } text-white`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate Email'
          )}
        </button>
      </div>
    </div>
  );
}
