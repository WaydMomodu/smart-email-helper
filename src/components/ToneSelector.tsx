import type { EmailTone } from '@/utils/emailTemplates';

interface ToneSelectorProps {
  tone: EmailTone;
  setTone: (tone: EmailTone) => void;
}

const toneOptions: EmailTone[] = ['Formal', 'Friendly', 'Direct', 'Professional'];

export default function ToneSelector({ tone, setTone }: ToneSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Email Tone
      </label>
      <div className="relative w-48">
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value as EmailTone)}
          className="w-full appearance-none px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
        >
          {toneOptions.map((option) => (
            <option key={option} value={option} className="text-base">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
        Select the tone that best matches your intended communication style
      </p>
    </div>
  );
} 