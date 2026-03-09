import type { Metadata } from 'next';
import Script from 'next/script';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fresh Bath Renovations',
  description: 'Professional bathroom renovation and remodeling services. Tub-to-shower conversions, vanity upgrades, tile replacement. Free estimates.',
  url: 'https://www.toptierbathpros.com/freshbathremodel',
  sameAs: [],
};

export const metadata: Metadata = {
  title: 'Fresh Bath Renovations | Professional Bathroom Remodeling & Renovation',
  description: 'Transform your bathroom with Fresh Bath Renovations. Expert bathroom remodeling, tub-to-shower conversions, vanity upgrades & tile replacement. Free estimates & fast turnaround.',
  keywords: [
    'bathroom renovation',
    'bathroom remodeling',
    'bath remodel',
    'tub to shower conversion',
    'vanity upgrade',
    'bathroom tile',
    'fresh bath',
  ],
  openGraph: {
    title: 'Fresh Bath Renovations | Bathroom Remodeling Experts',
    description: 'Professional bathroom renovations. Free estimates. Transform your bathroom with quality workmanship.',
  },
};

export default function FreshBathRemodelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="trustedform-freshbath"
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
