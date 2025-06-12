import CopyButton from './CopyButton';

interface EmailPreviewProps {
  generatedEmail: string;
}

export default function EmailPreview({ generatedEmail }: EmailPreviewProps) {
  if (!generatedEmail) return null;

  const wordCount = generatedEmail.trim().split(/\s+/).length;
  const charCount = generatedEmail.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Email</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {wordCount} words · {charCount} characters
          </p>
        </div>
        <CopyButton textToCopy={generatedEmail} />
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-100 dark:border-gray-600">
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 font-sans text-base leading-relaxed overflow-x-hidden break-words" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {generatedEmail}
        </pre>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        <span>
          Tip: You can edit the text directly in your email client after copying
        </span>
      </div>
    </div>
  );
}
