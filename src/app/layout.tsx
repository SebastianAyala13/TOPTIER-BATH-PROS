import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import BannerConsent from './components/BannerConsent';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TOPTIER BATH PROS | Bathroom Remodeling Experts',
  description:
    'Transform your bathroom with premium design, materials, and installation. Free estimates and fast turnaround.',
  keywords: [
    'bathroom remodeling',
    'bath remodel',
    'tub to shower conversion',
    'vanity upgrade',
    'tile replacement',
    'bath remodel near me',
    'bathroom design',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'TOPTIER BATH PROS | Bathroom Remodeling Experts',
    description:
      'Premium bathroom remodeling with expert design, material selection, and professional installation.',
    url: 'https://bathroom.homedesignandco.com',
    siteName: 'TOPTIER BATH PROS',
    images: [
      {
        url: 'https://bathroom.homedesignandco.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TOPTIER BATH PROS - Free Estimate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOPTIER BATH PROS | Premium Bathroom Remodeling',
    description: 'Get your free bathroom quote. Design, materials, and installation — on time and stress-free.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#14b8a6" />
        <meta name="author" content="TOPTIER BATH PROS Team" />
        <link rel="canonical" href="https://bathroom.homedesignandco.com/" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* TrustedForm Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript';
                tf.async = true;
                tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
                  '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
                  new Date().getTime() + Math.random();
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
              })();
            `
          }}
        />
        <noscript>
          <img src='https://api.trustedform.com/ns.gif' />
        </noscript>
      </head>

      <body className="relative bg-gradient-to-b from-teal-50 to-white text-gray-900">
        {/* 🔁 Background Video Global */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="fixed top-0 left-0 w-full h-full object-cover opacity-20 z-[-10]"
          src="/bathroom-ambient.mp4"
        />

        {/* 🌓 Overlay oscuro para mejorar legibilidad */}
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 z-[-5]" />

        <LanguageProvider>
          <main className="relative z-10">
            {children}
            {/* ✅ Banner de consentimiento legal TCPA + cookies */}
            <BannerConsent />
          </main>
          <a href="#form-section" className="fixed bottom-4 right-4 z-50 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold md:hidden">
            Get Quote
          </a>
        </LanguageProvider>
      </body>
    </html>
  );
}
