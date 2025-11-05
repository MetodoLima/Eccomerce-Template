import React from 'react';

const phoneFromEnv = (import.meta as any).env?.VITE_WHATSAPP_NUMBER as string | undefined;
const defaultPhone = '5599999999999'; // ajuste para o seu número com DDI/DD

// Mensagem inicial opcional
const defaultMessage = 'Olá! Vim pelo site e gostaria de tirar uma dúvida.';

const buildWhatsappLink = (phone: string, message?: string) => {
  const p = phone.replace(/\D/g, '');
  const q = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${p}${q}`;
};

const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="wappGradient" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop stopColor="#25D366" offset="0%" />
        <stop stopColor="#20BD5C" offset="100%" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#wappGradient)" />
    <path
      fill="#fff"
      d="M23.6 18.9c-.3-.2-1.9-1-2.1-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-1.9-.8-3.1-1.4-4.3-3.3-.3-.5.3-.5.9-1.8.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.3 3.6c.2.2 2.3 3.6 5.6 5 2.1.9 2.9 1 3.9.9.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5 0-.1-.2-.1-.3-.2zM16 8.3c-4.3 0-7.7 3.4-7.7 7.7 0 1.4.4 2.8 1.1 4L8 24l4.2-1.1c1.2.7 2.5 1.1 3.8 1.1 4.3 0 7.7-3.4 7.7-7.7 0-2.1-.8-4-2.3-5.5-1.5-1.4-3.5-2.5-5.4-2.5z"
    />
  </svg>
);

const FloatingWhatsapp: React.FC<{ message?: string; phone?: string }>= ({ message = defaultMessage, phone }) => {
  const targetPhone = (phone || phoneFromEnv || defaultPhone).replace(/\D/g, '');
  const href = buildWhatsappLink(targetPhone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-20 right-6 z-[70] h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:brightness-95 active:brightness-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] flex items-center justify-center"
    >
      <WhatsappIcon className="h-8 w-8" />
    </a>
  );
};

export default FloatingWhatsapp;
