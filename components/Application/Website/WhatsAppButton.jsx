import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/8252338182" // Replace with actual number
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </Link>
  );
};

export default WhatsAppButton;
