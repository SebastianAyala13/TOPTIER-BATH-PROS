/**
 * Layout for /formulario only.
 * TrustedForm with field=xxTrustedFormCertUrl - Meta Pixel in page.tsx
 */
import Script from 'next/script';

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TrustedForm - field xxTrustedFormCertUrl para detectar el certificado en /formulario */}
      <Script
        id="trustedform-formulario"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var tf = document.createElement('script');
              tf.type = 'text/javascript';
              tf.async = true;
              tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
                '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
                (new Date().getTime() + Math.random());
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(tf, s);
            })();
          `,
        }}
      />
      <noscript>
        <img src="https://api.trustedform.com/ns.gif" alt="" />
      </noscript>
      {children}
    </>
  );
}
