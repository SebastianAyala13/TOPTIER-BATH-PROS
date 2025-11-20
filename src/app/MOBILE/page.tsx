'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { isMobile as checkIsMobile } from '@/lib/videoUtils';

import Header from '../components/Header';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustSection from '../components/TrustSection';
import Promotions from '../components/Promotions';
import ReviewSection from '../components/ReviewSection';
import Testimonials from '../components/Testimonials';
import ProjectGallery from '../components/ProjectGallery';
import Footer from '../components/Footer';
import MobileVideoHandler from '../components/MobileVideoHandler';
import SectionDivider from '../components/SectionDivider';
import BeforeAfter from '../components/BeforeAfter';
import ProcessSteps from '../components/ProcessSteps';
import Packages from '../components/Packages';
import TrackingScripts from './components/TrackingScripts';

// Número de teléfono
const PHONE_NUMBER = '+18337241011';
const PHONE_DISPLAY = '(833) 724-1011';

// Componente de botón de llamada para reemplazar el formulario
// GARANTIZA que usa tel: directamente - NUNCA WhatsApp
function CallButton({ variant = 'primary', onClick }: { variant?: 'primary' | 'secondary'; onClick?: () => void }) {
  const isPrimary = variant === 'primary';
  const isMobileDevice = typeof window !== 'undefined' && checkIsMobile();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // En desktop, mostrar modal en lugar de abrir tel:
    if (!isMobileDevice && typeof window !== 'undefined' && window.innerWidth >= 768) {
      e.preventDefault();
      if (onClick) onClick();
    }
    // En mobile, dejar que tel: funcione directamente para llamar
    // NO permitir que redirija a WhatsApp
  };
  
  // Asegurar que el href SIEMPRE sea tel: - nunca WhatsApp
  const callHref = `tel:${PHONE_NUMBER}`;
  
  return (
    <a
      href={callHref}
      onClick={handleClick}
      data-call="direct"
      className={`
        w-full block text-center font-bold py-4 px-6 rounded-xl shadow-lg
        transition-all duration-300 transform hover:scale-105 active:scale-95
        ${isPrimary 
          ? 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white text-lg' 
          : 'bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-base'
        }
      `}
      // Atributo adicional para asegurar que es llamada directa
      data-phone={PHONE_NUMBER}
    >
      📞 {isPrimary ? 'Call Now - Get Free Quote' : 'Call Us Now'}
    </a>
  );
}

export default function MobilePage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);
    
    // Detectar si es dispositivo móvil
    const mobile = checkIsMobile();
    setIsMobileDevice(mobile);
    
    if (typeof window !== 'undefined' && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    
    const mq = window.matchMedia('(min-width: 1024px)');
    const setFromMQ = () => setIsDesktop(mq.matches);
    setFromMQ();
    mq.addEventListener('change', setFromMQ);
    
    // Función para manejar clicks en botones de llamada (solo en desktop)
    const handleCallClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement;
      
      if (anchor && !mobile && window.innerWidth >= 768) {
        // Si es desktop, mostrar modal en lugar de abrir tel:
        e.preventDefault();
        e.stopPropagation();
        setShowPhoneModal(true);
      }
      // Si es mobile, dejar que tel: funcione normalmente
    };
    
    // Convertir todos los enlaces de formularios a llamadas directas Y asegurar que NO usen WhatsApp
    const convertFormLinksToCall = () => {
      // Convertir enlaces de formularios
      const formLinks = document.querySelectorAll('a[href="#form-section"], a[href="#lead-form"], a[href*="form-section"], a[href*="lead-form"]');
      formLinks.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        // Solo convertir si no es el botón flotante del layout
        if (!anchor.href.includes('form-section') || anchor.closest('body > a')) {
          // SIEMPRE usar tel: - nunca WhatsApp
          anchor.href = `tel:${PHONE_NUMBER}`;
          anchor.removeEventListener('click', handleCallClick as EventListener);
          if (!mobile && window.innerWidth >= 768) {
            anchor.addEventListener('click', handleCallClick as EventListener);
          }
          // Agregar estilo visual para indicar que es llamada
          if (!anchor.classList.contains('call-button')) {
            anchor.classList.add('call-button');
            // Agregar ícono de teléfono si no tiene emoji
            if (!anchor.textContent?.includes('📞') && !anchor.textContent?.includes('Call')) {
              anchor.innerHTML = `📞 ${anchor.textContent || 'Call Now'}`;
            }
          }
        }
      });
      
      // IMPORTANTE: Asegurar que NO haya enlaces de WhatsApp en botones de acción
      // Solo permitir WhatsApp en el footer del desarrollador (fuera de los CTAs principales)
      const allCallButtons = document.querySelectorAll('a.call-button, a[href^="tel:"], button[data-call]');
      allCallButtons.forEach((btn) => {
        const anchor = btn as HTMLAnchorElement;
        // Si encuentra un enlace a WhatsApp en un botón de acción, cambiarlo a tel:
        if (anchor.href && (anchor.href.includes('wa.me') || anchor.href.includes('whatsapp://'))) {
          // Solo cambiar si NO está en el footer del desarrollador
          const footer = anchor.closest('footer');
          const isDeveloperCredit = footer && anchor.textContent?.includes('WhatsApp');
          
          if (!isDeveloperCredit) {
            anchor.href = `tel:${PHONE_NUMBER}`;
            console.log('✅ Convertido enlace WhatsApp a llamada directa:', anchor.textContent);
          }
        }
      });
    };
    
    // Ejecutar inmediatamente y después de que se carguen los componentes
    convertFormLinksToCall();
    const timeout = setTimeout(convertFormLinksToCall, 100);
    const interval = setInterval(convertFormLinksToCall, 500);
    
    // Usar MutationObserver para detectar nuevos elementos agregados
    const observer = new MutationObserver(convertFormLinksToCall);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Agregar listener global para clicks en tel: (solo en desktop)
    if (!mobile && window.innerWidth >= 768) {
      document.addEventListener('click', handleCallClick, true);
    }
    
    return () => {
      mq.removeEventListener('change', setFromMQ);
      clearTimeout(timeout);
      clearInterval(interval);
      observer.disconnect();
      if (!mobile && window.innerWidth >= 768) {
        document.removeEventListener('click', handleCallClick, true);
      }
    };
  }, []);
  
  // Función para copiar número al portapapeles
  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      // Mostrar feedback visual
      const button = document.getElementById('copy-phone-btn');
      if (button) {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
          if (button) button.textContent = originalText || 'Copy Number';
        }, 2000);
      }
    } catch (err) {
      console.error('Error copying phone number:', err);
    }
  };

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

  // No renderizar hasta que estemos en el cliente
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
      <TrackingScripts />
      <MobileVideoHandler />
      <Header />
      
      {isDesktop ? (
        <>
          {/* Desktop: contenido con barra lateral de llamada directa */}
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

          {/* Barra lateral fija con botón de llamada (reemplaza el formulario) */}
          <div id="form-section" className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl z-30 overflow-y-auto">
            <div className="p-6 flex flex-col justify-center min-h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">🎯 Call Now for Free Quote</h2>
                <p className="text-sm text-gray-600 text-center mb-4">Speak directly with our bathroom remodeling experts</p>
                  <div className="space-y-4">
                    <CallButton variant="primary" onClick={() => setShowPhoneModal(true)} />
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Available 7 days a week</p>
                      <button
                        onClick={() => setShowPhoneModal(true)}
                        className="text-teal-600 hover:text-teal-700 font-semibold text-lg cursor-pointer"
                      >
                        {PHONE_DISPLAY}
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mobile: botón de llamada al inicio (reemplaza el formulario) */}
          <div id="form-section" className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg pt-8 pb-6">
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white text-center mb-2">🎯 Call Now for Free Quote</h2>
                <p className="text-sm text-white/90 text-center mb-4">Speak directly with our bathroom remodeling experts</p>
              </div>
              <div className="space-y-3">
                <CallButton variant="primary" onClick={() => setShowPhoneModal(true)} />
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/90 mb-1">Available 7 days a week</p>
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-white font-bold text-lg hover:underline"
                  >
                    {isMobileDevice ? PHONE_DISPLAY : PHONE_NUMBER}
                  </a>
                </div>
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
      
      {/* Modal para mostrar número en desktop */}
      {showPhoneModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowPhoneModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              📞 Call Us Now
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Speak directly with our bathroom remodeling experts
            </p>
            <div className="space-y-4">
              <div className="text-center">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="text-center">
                <button
                  id="copy-phone-btn"
                  onClick={copyPhoneNumber}
                  className="text-teal-600 hover:text-teal-700 font-semibold text-sm underline"
                >
                  Copy Number
                </button>
              </div>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
