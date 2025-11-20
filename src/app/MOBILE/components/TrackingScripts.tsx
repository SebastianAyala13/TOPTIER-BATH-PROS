'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { gtmScript, gtmNoScript } from '@/lib/gtm';
import { GoogleTagManagerNoScript } from '../../components/GoogleTagManager';

export default function TrackingScripts() {
  useEffect(() => {
    // Meta Pixel - ya se carga con el Script component, pero asegurémonos de trackear PageView
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: gtmScript }}
      />

      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
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
      
      {/* TrustedForm Lead Tracking */}
      <Script
        id="trustedform"
        strategy="afterInteractive"
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

      {/* Google Tag Manager (noscript) */}
      <GoogleTagManagerNoScript />

      {/* Meta Pixel (noscript) */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1149265126710788&ev=PageView&noscript=1" alt="" />`,
        }}
      />

      {/* Jornaya Lead ID Script */}
      <Script
        id="LeadiDscript"
        strategy="afterInteractive"
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
              if (LeadiDscript && LeadiDscript.parentNode) {
                LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
              }
            })();
          `
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img src="//create.leadid.com/noscript.gif?lac=1A0362DA-90B6-2BCA-983C-BC60069F93FC&lck=e65966e8-6ae1-2bff-6dd1-97b99a2c15cf&snippet_version=2" alt="" />`,
        }}
      />
    </>
  );
}

