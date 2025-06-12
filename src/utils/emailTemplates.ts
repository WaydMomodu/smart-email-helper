type EmailTone = 'Formal' | 'Friendly' | 'Direct' | 'Professional';

interface EmailTemplate {
  greeting: string;
  opening: string;
  closing: string;
  signature: string;
}

const emailTemplates: Record<EmailTone, EmailTemplate> = {
  Formal: {
    greeting: 'Dear [Recipient],',
    opening: 'I hope this message finds you well,',
    closing: 'Thank you for your time and consideration.',
    signature: 'Best regards,\n[Your Name]'
  },
  Friendly: {
    greeting: 'Hi [Recipient]!',
    opening: 'I hope you are having a great day!',
    closing: 'Thanks so much for your help with this!',
    signature: 'Best wishes,\n[Your Name]'
  },
  Direct: {
    greeting: 'Hi [Recipient],',
    opening: 'I am writing regarding',
    closing: 'Looking forward to your response.',
    signature: 'Thanks,\n[Your Name]'
  },
  Professional: {
    greeting: 'Dear [Recipient],',
    opening: 'I trust this email finds you well.',
    closing: 'I appreciate your attention to this matter.',
    signature: 'Kind regards,\n[Your Name]'
  }
};

export type { EmailTone };
export { emailTemplates }; 