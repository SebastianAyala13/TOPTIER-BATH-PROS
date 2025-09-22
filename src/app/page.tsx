'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import WhyChooseUs from './components/WhyChooseUs';
import TrustSection from './components/TrustSection';
import Form from './Form';
import Promotions from './components/Promotions';
import ReviewSection from './components/ReviewSection';
import Testimonials from './components/Testimonials';
import ProjectGallery from './components/ProjectGallery';
import Footer from './components/Footer';
import MobileVideoHandler from './components/MobileVideoHandler';
import SectionDivider from './components/SectionDivider';
import BeforeAfter from './components/BeforeAfter';
import ProcessSteps from './components/ProcessSteps';
import Packages from './components/Packages';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);
    
    if (typeof window !== 'undefined' && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    
    const mq = window.matchMedia('(min-width: 1024px)');
    const setFromMQ = () => setIsDesktop(mq.matches);
    setFromMQ();
    mq.addEventListener('change', setFromMQ);
    return () => mq.removeEventListener('change', setFromMQ);
  }, []);

  const faqs = [
    {
      en: {
        q: 'How long does a bathroom remodel take?',
        a: 'Most bathroom remodels take 1–3 weeks depending on scope, material availability, and inspections. We share a clear timeline before starting.',
      },
    },
    {
      en: {
        q: 'Are you licensed and insured?',
        a: 'Yes. TOPTIER BATH PROS is fully licensed and insured. Our work follows local codes and we manage permits as needed.',
      },
    },
    {
      en: {
        q: 'Do you offer free estimates?',
        a: 'Yes, free and no-obligation estimates. We review your bathroom, discuss design and materials, and provide a transparent quote.',
      },
    },
    {
      en: {
        q: 'Can you do a tub-to-shower conversion?',
        a: 'Absolutely. We specialize in safe, modern conversions with low thresholds, glass, and slip-resistant tile.',
      },
    },
    {
      en: {
        q: 'What finishes and materials do you offer?',
        a: 'Porcelain and ceramic tiles, natural stone, quartz vanities, frameless glass, matte black or brushed gold fixtures, and more.',
      },
    },
    {
      en: {
        q: 'Is financing available?',
        a: 'Yes, we offer financing options with flexible plans subject to approval.',
      },
    },
    {
      en: {
        q: 'Do you handle permits and inspections?',
        a: 'Yes. We manage the permit process and coordinate inspections when required by your city or county.',
      },
    },
    {
      en: {
        q: 'Can I get a 3D design or layout proposal?',
        a: 'Yes. We can prepare design guidance and layout options to help you visualize the project and make decisions.',
      },
    },
  ];

  // No renderizar formularios hasta que estemos en el cliente
  if (!isClient) {
    return (
      <>
        <MobileVideoHandler />
        <Header />
        <div className="lg:mr-96">
          <Hero />
          <SectionDivider />
          <VideoSection />
          <SectionDivider />
          <WhyChooseUs />
          <SectionDivider />
          <TrustSection />
          <ProcessSteps />
          <Promotions />
          <SectionDivider />
          <ReviewSection />
          <BeforeAfter />
          <section className="py-16 px-4 bg-white text-slate-900" id="testimonials">
            <Testimonials />
          </section>
          <section id="faq" className="relative py-20 px-4 text-white bg-white/10 backdrop-blur-md">
            <div className="absolute inset-0 -z-10">
              <Image src="/background-video-blur.jpg" alt="" fill className="object-cover opacity-20" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">Bathroom Remodeling FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white/90 text-slate-900 p-4 rounded-xl shadow-md transition hover:shadow-lg group">
                  <summary className="flex items-center justify-between font-semibold cursor-pointer">
                    {faq.en.q}
                    <span className="ml-2 text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <motion.p className="mt-2 text-slate-700 text-sm" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {faq.en.a}
                  </motion.p>
                </details>
              ))}
            </div>
          </section>
          <SectionDivider />
          <ProjectGallery />
          <Packages />
          <Footer />
        </div>
        <p className="sr-only">
          TOPTIER BATH PROS is a trusted and licensed bathroom remodeling contractor offering full bathroom renovations, tub to shower conversions, and free estimates across the United States including Texas, Florida, and California.
        </p>
      </>
    );
  }

  return (
    <>
      <MobileVideoHandler />
      <Header />
      
      {isDesktop ? (
        <>
          {/* Desktop: contenido con barra lateral fija (una sola instancia de Form) */}
          <div className="lg:mr-96">
            <Hero />
            <SectionDivider />
            <VideoSection />
            <SectionDivider />
            <WhyChooseUs />
            <SectionDivider />
            <TrustSection />
            <ProcessSteps />

            {/* Nueva sección de promociones animadas */}
            <Promotions />
            <SectionDivider />

            <ReviewSection />
            <BeforeAfter />

            <section className="py-16 px-4 bg-white text-slate-900" id="testimonials">
              <Testimonials />
            </section>

            {/* FAQ */}
            <section id="faq" className="relative py-20 px-4 text-white bg-white/10 backdrop-blur-md">
              <div className="absolute inset-0 -z-10">
                <Image src="/background-video-blur.jpg" alt="" fill className="object-cover opacity-20" />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">Bathroom Remodeling FAQs</h2>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="bg-white/90 text-slate-900 p-4 rounded-xl shadow-md transition hover:shadow-lg group">
                    <summary className="flex items-center justify-between font-semibold cursor-pointer">
                      {faq.en.q}
                      <span className="ml-2 text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <motion.p className="mt-2 text-slate-700 text-sm" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                      {faq.en.a}
                    </motion.p>
                  </details>
                ))}
              </div>
            </section>

            <SectionDivider />
            <ProjectGallery />
            <Packages />
            <Footer />
          </div>

          <div id="form-section" className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-30 overflow-y-auto">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 text-center">🎯 Get Your Free Quote</h2>
                <p className="text-sm text-gray-600 text-center mt-1">Complete bathroom remodeling consultation</p>
              </div>
              <div id="lead-form-desktop" className="border-2 border-teal-200 rounded-2xl p-2">
                <Form />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mobile: formulario al inicio (una sola instancia de Form) */}
          <div id="form-section" className="bg-white border-b border-gray-200 shadow-sm">
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 text-center">🎯 Get Your Free Quote</h2>
                <p className="text-sm text-gray-600 text-center mt-1">Complete bathroom remodeling consultation</p>
              </div>
              <div id="lead-form-mobile" className="border-2 border-teal-200 rounded-2xl p-2">
                <Form />
              </div>
            </div>
          </div>

          <Hero />
          <SectionDivider />
          <VideoSection />
          <SectionDivider />
          <WhyChooseUs />
          <SectionDivider />
          <TrustSection />
          <ProcessSteps />

          {/* Nueva sección de promociones animadas */}
          <Promotions />
          <SectionDivider />

          <ReviewSection />
          <BeforeAfter />

          <section className="py-16 px-4 bg-white text-slate-900" id="testimonials">
            <Testimonials />
          </section>

          {/* FAQ */}
          <section id="faq" className="relative py-20 px-4 text-white bg-white/10 backdrop-blur-md">
            <div className="absolute inset-0 -z-10">
              <Image src="/background-video-blur.jpg" alt="" fill className="object-cover opacity-20" />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">Bathroom Remodeling FAQs</h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white/90 text-slate-900 p-4 rounded-xl shadow-md transition hover:shadow-lg group">
                  <summary className="flex items-center justify-between font-semibold cursor-pointer">
                    {faq.en.q}
                    <span className="ml-2 text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <motion.p className="mt-2 text-slate-700 text-sm" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {faq.en.a}
                  </motion.p>
                </details>
              ))}
            </div>
          </section>

          <SectionDivider />
          <ProjectGallery />
          <Packages />
          <Footer />
        </>
      )}

      <p className="sr-only">
        TOPTIER BATH PROS is a trusted and licensed bathroom remodeling contractor offering full bathroom renovations, tub to shower conversions, and free estimates across the United States including Texas, Florida, and California.
      </p>
    </>
  );
}