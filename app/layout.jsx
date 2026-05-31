import GlobalProvider from "@/components/Application/GlobalProvider";
import "./globals.css";
import { Assistant } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
const assistantFont = Assistant({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: "MetalVero - Metal Manufacturing Factory",
  description: "Premier manufacturer of high-quality Iron and Steel furniture and custom fabrication.",
};

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-client-id-for-build'}>
          <GlobalProvider>
            <ToastContainer />
            {children}
          </GlobalProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

