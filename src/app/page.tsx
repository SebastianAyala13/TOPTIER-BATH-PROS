'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <>
      <MobileVideoHandler />
      <Header />
      
      {/* Layout de dos columnas: contenido principal + formulario fijo */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Columna principal - Contenido */}
        <div className="flex-1 lg:mr-96">
          <Hero />
          <SectionDivider />
          <VideoSection />
          <SectionDivider />
          <WhyChooseUs />
          <SectionDivider />
          <TrustSection />
          <ProcessSteps />

          {/* Sección de formulario en móvil */}
          <section id="form-section" className="py-20 px-4 bg-transparent lg:hidden">
            <div className="max-w-2xl mx-auto">
              <Form />
            </div>
          </section>

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
              <Image
                src="/background-video-blur.jpg"
                alt=""
                fill
                className="object-cover opacity-20"
              />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">
              Bathroom Remodeling FAQs
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white/90 text-slate-900 p-4 rounded-xl shadow-md transition hover:shadow-lg group"
                >
                  <summary className="flex items-center justify-between font-semibold cursor-pointer">
                    {faq.en.q}
                    <span className="ml-2 text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <motion.p
                    className="mt-2 text-slate-700 text-sm"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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

        {/* Columna lateral - Formulario fijo (solo desktop) */}
        <div className="hidden lg:block fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl z-40 overflow-y-auto">
          <div className="p-6">
            <div id="lead-form">
              <Form />
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">
        TOPTIER BATH PROS is a trusted and licensed bathroom remodeling contractor offering full bathroom renovations, tub to shower conversions, and free estimates across the United States including Texas, Florida, and California.
      </p>
    </>
  );
}
