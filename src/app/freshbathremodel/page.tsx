'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, Pencil, Ruler, ShowerHead } from 'lucide-react';
import FreshBathWizardForm from './FreshBathWizardForm';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const BRAND = '#5BA3D0';

const FAQS = [
  { q: 'Is the bathroom renovation quote free?', a: 'Yes. We offer free, no-obligation estimates. See what\'s possible for your space before you commit.' },
  { q: 'What bathroom renovation services do you offer?', a: 'Full bathroom remodels, tub-to-shower conversions, vanity upgrades, tile replacement, and more.' },
  { q: 'How long does a bathroom renovation take?', a: 'Most projects take 1–3 weeks depending on scope. We\'ll give you a clear timeline during your free estimate.' },
  { q: 'Do you handle permits and inspections?', a: 'Yes. We manage permits and coordinate inspections when required by your local codes.' },
  { q: 'Am I obligated if I submit this form?', a: 'No. This form only requests a free estimate. You decide next steps after we send your quote.' },
];

export default function FreshBathRemodelPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mq = window.matchMedia('(min-width: 1024px)');
    const setFromMQ = () => setIsDesktop(mq.matches);
    setFromMQ();
    mq.addEventListener('change', setFromMQ);
    return () => mq.removeEventListener('change', setFromMQ);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="meta-pixel-freshbath"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1149265126710788'); fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1149265126710788&ev=PageView&noscript=1" alt="" />
      </noscript>

      <div className="min-h-screen relative">
        {/* Blurred background */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/freshbath/bg-blur.png)',
            filter: 'blur(12px)',
            transform: 'scale(1.05)',
          }}
        />
        <div className="fixed inset-0 -z-10 bg-white/60" aria-hidden />

        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/freshbathremodel" className="flex items-center gap-3">
              <Image src="/freshbath/logo.png" alt="Fresh Bath Renovations" width={48} height={48} className="object-contain" />
              <div>
                <p className="text-base font-bold text-slate-900 leading-tight">FRESH BATH</p>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: BRAND }}>RENOVATIONS</p>
              </div>
            </Link>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-700">
              <a href="#benefits">Why Us</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#faq">FAQ</a>
              <a href="#form-section" className="px-4 py-2 rounded-full text-white font-bold text-sm" style={{ backgroundColor: BRAND }}>Get Free Quote</a>
            </nav>
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">← Main Site</Link>
          </div>
        </header>

        {isDesktop ? (
          <>
            <div className="lg:mr-96">
              <Hero />
              <WhyChooseUs />
              <Services />
              <Process />
              <Testimonials />
              <BeforeAfter />
              <FAQ />
              <Footer />
            </div>
            <aside id="form-section" className="fixed right-0 top-0 h-full w-96 bg-white border-l border-slate-200 shadow-xl z-30 overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Get Your Free Quote</h2>
                <p className="text-sm text-slate-600 mb-6">Tell us about your bathroom renovation project.</p>
                <div className="border-2 rounded-2xl p-4" style={{ borderColor: `${BRAND}40` }}>
                  <FreshBathWizardForm compact />
                </div>
              </div>
            </aside>
          </>
        ) : (
          <>
            <div id="form-section" className="bg-white border-b border-slate-200 shadow-sm py-6 px-4">
              <div className="max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">Get Your Free Quote</h2>
                <p className="text-sm text-slate-600 mb-4 text-center">Tell us about your bathroom renovation.</p>
                <div className="border-2 rounded-2xl p-4" style={{ borderColor: `${BRAND}40` }}>
                  <FreshBathWizardForm />
                </div>
              </div>
            </div>
            <Hero />
            <WhyChooseUs />
            <Services />
            <Process />
            <Testimonials />
            <BeforeAfter />
            <FAQ />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-sky-50" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
        >
          Bathroom Renovation <span style={{ color: BRAND }}>Done Right</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto mb-8"
        >
          Transform your bathroom with expert design, quality materials, and professional installation. Free estimates, no obligation.
        </motion.p>
        <motion.a
          href="#form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-8 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition"
          style={{ backgroundColor: BRAND }}
        >
          Get Free Estimate →
        </motion.a>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    { icon: <ShieldCheck className="w-8 h-8" style={{ color: BRAND }} />, title: 'Licensed & Insured', desc: 'Bathroom renovation specialists with years of experience.' },
    { icon: <Zap className="w-8 h-8" style={{ color: BRAND }} />, title: 'Fast Turnaround', desc: 'Efficient design, sourcing, and installation without delays.' },
    { icon: <CheckCircle className="w-8 h-8" style={{ color: BRAND }} />, title: 'Quality Warranty', desc: 'Warranties on materials and workmanship.' },
  ];
  return (
    <section id="benefits" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Why Homeowners Choose Fresh Bath Renovations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    'Full bathroom remodels',
    'Tub-to-shower conversions',
    'Vanity & sink upgrades',
    'Tile replacement',
    'Fixtures & lighting',
  ];
  return (
    <section id="services" className="py-16 px-4" style={{ backgroundColor: `${BRAND}10` }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Bathroom Renovation Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: BRAND }} />
              <span className="font-medium text-slate-800">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: <Pencil className="w-8 h-8" style={{ color: BRAND }} />, title: 'Consultation', desc: 'We align style, layout, and budget with your goals.' },
    { icon: <Ruler className="w-8 h-8" style={{ color: BRAND }} />, title: 'Materials & Permits', desc: 'Choose finishes and we handle permits.' },
    { icon: <ShowerHead className="w-8 h-8" style={{ color: BRAND }} />, title: 'Installation', desc: 'Certified installers complete the work on time.' },
    { icon: <CheckCircle className="w-8 h-8" style={{ color: BRAND }} />, title: 'Walkthrough', desc: 'We verify every detail and deliver.' },
  ];
  return (
    <section id="process" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Our 4-Step Process</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-3">{s.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
              <a href="#form-section" className="inline-block mt-4 px-4 py-2 rounded-full text-white text-sm font-bold" style={{ backgroundColor: BRAND }}>Get Quote</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: 'Carlos M.', text: 'Excellent guidance and flawless finishes in my primary bathroom.', img: '/clients/carlos.jpg' },
    { name: 'Lindsey W.', text: 'They converted my tub to a shower. Clean and fast work.', img: '/clients/lindsey.jpg' },
    { name: 'Laura P.', text: 'They handled permits and delivered on time.', img: '/clients/laura.jpg' },
  ];
  return (
    <section className="py-16 px-4" style={{ backgroundColor: `${BRAND}08` }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-700 mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Image src={r.img} alt={r.name} width={40} height={40} className="rounded-full object-cover" />
                <span className="font-semibold text-slate-900">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Fresh Bath Signature Bathrooms</h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-10 text-center">
          Two different ways to elevate your bathroom – from bright spa-like retreats to moody luxury suites.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <Image src="/freshbath/style-bright.png" alt="Bright spa-style bathroom with freestanding tub and large vanity" width={600} height={400} className="w-full h-64 object-cover" />
            <div className="p-3 bg-slate-50 text-sm font-medium text-slate-700 flex items-center justify-between">
              <span>Bright Spa · Freestanding tub, natural light & warm wood vanity</span>
              <span className="text-xs uppercase tracking-wide text-sky-600">SPA STYLE</span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <Image src="/freshbath/style-dark.png" alt="Dark luxury bathroom with stone tile, double vanity and soaking tub" width={600} height={400} className="w-full h-64 object-cover" />
            <div className="p-3 bg-slate-50 text-sm font-medium text-slate-700 flex items-center justify-between">
              <span>Moody Luxury · Stone finishes, double vanity & soaking tub</span>
              <span className="text-xs uppercase tracking-wide text-amber-600">LUXURY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-slate-800">
                {faq.q}
                <span className="ml-2 transition-transform group-open:rotate-180" style={{ color: BRAND }}>▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/freshbath/logo.png" alt="Fresh Bath" width={40} height={40} className="object-contain" />
          <div className="text-left">
            <p className="text-sm font-bold text-white">FRESH BATH</p>
            <p className="text-xs font-bold" style={{ color: '#7ec8e3' }}>RENOVATIONS</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-6">Professional bathroom renovation & remodeling. Free estimates.</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="text-slate-400 hover:text-white">TopTier Bath Pros</Link>
          <Link href="/privacy-policy" className="text-slate-400 hover:text-white">Privacy</Link>
          <Link href="/terms" className="text-slate-400 hover:text-white">Terms</Link>
          <Link href="/partners" className="text-slate-400 hover:text-white">Partners</Link>
        </div>
        <p className="mt-6 text-slate-500 text-xs">© {new Date().getFullYear()} Fresh Bath Renovations</p>
      </div>
    </footer>
  );
}
