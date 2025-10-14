import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import BannerConsent from './components/BannerConsent';
import BackgroundVideo from './components/BackgroundVideo';
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from './components/GoogleTagManager';

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
        
        {/* Google Tag Manager */}
        <GoogleTagManagerHead />
        
        {/* TrustedForm Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript';
                tf.async = true;
                tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
                  '://api.trustedform.com/trustedform.js?field=trusted_form_cert_id&use_tagged_consent=true&l=' +
                  new Date().getTime() + Math.random();
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
              })();
            `
          }}
        />
        <noscript>
          <img src='https://api.trustedform.com/ns.gif' alt="" />
        </noscript>
      </head>

      <body className="relative bg-gradient-to-b from-teal-50 to-white text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />
        
        {/* 🔁 Background Video Global */}
        <BackgroundVideo />

        {/* 🌓 Overlay oscuro para mejorar legibilidad */}
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 z-[-5]" />

        <LanguageProvider>
          <main className="relative z-10">
            {children}
            {/* ✅ Banner de consentimiento legal TCPA + cookies */}
            <BannerConsent />
          </main>
          <a href="#form-section" className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-bold md:hidden animate-pulse">
            📝 Get Free Quote
          </a>
        </LanguageProvider>
        
        {/* Jornaya Lead ID Script */}
        <script
          id="LeadiDscript"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.id = 'LeadiDscript_campaign';
                s.type = 'text/javascript';
                s.async = true;
                s.src = '//create.lidstatic.com/campaign/e65966e8-6ae1-2bff-6dd1-97b99a2c15cf.js?snippet_version=2';
                var LeadiDscript = document.getElementById('LeadiDscript');
                LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
                
                // Enhanced monitoring for Jornaya token population
                var tokenCheckCount = 0;
                var tokenCheckInterval = setInterval(function() {
                  tokenCheckCount++;
                  
                  // Check the specific field
                  var tokenField = document.getElementById('leadid_token');
                  if (tokenField && tokenField.value && tokenField.value.trim() !== '') {
                    console.log('✅ Jornaya Lead ID detected in field:', tokenField.value);
                    clearInterval(tokenCheckInterval);
                    return;
                  }
                  
                  // Check for any global variables
                  if (window.jornaya_lead_id || window.leadid_token || window.jornayaLeadId) {
                    var token = window.jornaya_lead_id || window.leadid_token || window.jornayaLeadId;
                    if (token && token.trim() !== '') {
                      console.log('✅ Jornaya Lead ID detected in global variable:', token);
                      if (tokenField) {
                        tokenField.value = token;
                      }
                      clearInterval(tokenCheckInterval);
                      return;
                    }
                  }
                  
                  // Check for any elements with Jornaya-related content
                  var allInputs = document.querySelectorAll('input[type="hidden"]');
                  for (var i = 0; i < allInputs.length; i++) {
                    var input = allInputs[i];
                    if (input.value && input.value.length > 10 && /^[A-F0-9-]+$/i.test(input.value)) {
                      console.log('✅ Possible Jornaya Lead ID detected in hidden field:', input.value);
                      if (tokenField) {
                        tokenField.value = input.value;
                      }
                      clearInterval(tokenCheckInterval);
                      return;
                    }
                  }
                  
                  // Log progress
                  if (tokenCheckCount % 10 === 0) {
                    console.log('🔍 Checking for Jornaya Lead ID... attempt ' + tokenCheckCount);
                  }
                  
                  // Check if script loaded
                  if (tokenCheckCount === 20) {
                    var script = document.querySelector('script[src*="lidstatic.com"]');
                    if (script) {
                      console.log('✅ Jornaya script loaded successfully');
                    } else {
                      console.log('⚠️ Jornaya script not found');
                    }
                  }
                }, 500);
                
                // Clear interval after 30 seconds
                setTimeout(function() {
                  clearInterval(tokenCheckInterval);
                  console.log('⚠️ Jornaya Lead ID monitoring stopped after 30 seconds');
                }, 30000);
              })();
            `
          }}
        />
        <noscript>
          <img src='//create.leadid.com/noscript.gif?lac=1A0362DA-90B6-2BCA-983C-BC60069F93FC&lck=e65966e8-6ae1-2bff-6dd1-97b99a2c15cf&snippet_version=2' alt="" />
        </noscript>
      </body>
    </html>
  );
}
