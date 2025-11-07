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

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1149265126710788');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* TrustedForm Lead Tracking - Professional Implementation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // TrustedForm Lead Tracking
                var tf = document.createElement('script');
                tf.type = 'text/javascript';
                tf.async = true;
                tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
                  '://api.trustedform.com/trustedform.js?field=trusted_form_cert_id&use_tagged_consent=true&l=' +
                  (new Date().getTime() + Math.random());
                var s = document.getElementsByTagName('script')[0]; 
                s.parentNode.insertBefore(tf, s);
                
                // Enhanced tracking for form interactions
                document.addEventListener('DOMContentLoaded', function() {
                  // Track form focus events
                  var forms = document.querySelectorAll('form');
                  forms.forEach(function(form) {
                    var inputs = form.querySelectorAll('input, select, textarea');
                    inputs.forEach(function(input) {
                      input.addEventListener('focus', function() {
                        if (window.TrustedForm) {
                          window.TrustedForm.tag();
                        }
                      });
                    });
                  });
                  
                  // Track form submission attempts
                  document.addEventListener('submit', function(e) {
                    if (window.TrustedForm) {
                      window.TrustedForm.tag();
                    }
                  });
                });
              })();
            `
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img src="https://api.trustedform.com/ns.gif" alt="" />`,
          }}
        />
      </head>

      <body className="relative bg-gradient-to-b from-teal-50 to-white text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <GoogleTagManagerNoScript />

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1149265126710788&ev=PageView&noscript=1" alt="" />`,
          }}
        />
        
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
        
        {/* Jornaya Lead ID Script - DEBE estar exactamente así */}
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
                s.onload = function(){
                  try { console.log('✅ Jornaya (LeadiD) script cargado'); } catch(e) {}
                };
                s.onerror = function(){
                  try { console.log('❌ Error cargando Jornaya (LeadiD) script'); } catch(e) {}
                };
                LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
              })();
            `
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img src="//create.leadid.com/noscript.gif?lac=1A0362DA-90B6-2BCA-983C-BC60069F93FC&lck=e65966e8-6ae1-2bff-6dd1-97b99a2c15cf&snippet_version=2" alt="" />`,
          }}
        />
      </body>
    </html>
  );
}
