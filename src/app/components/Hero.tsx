import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  getVideoUrl, 
  isMobile, 
  configureVideoForMobile, 
  playVideoSafely, 
  VIDEO_CONFIG 
} from '@/lib/videoUtils';

export default function Hero() {
  const { language } = useLanguage();
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [mobile, setMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setMobile(isMobile());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const playVideo = async () => {
    if (!videoRef.current || !videoRef.current.paused) return;

    configureVideoForMobile(videoRef.current);
    await playVideoSafely(videoRef.current);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  const handleVideoLoadStart = () => {
    setVideoLoading(true);
  };

  const handleUserInteraction = () => {
    if (!videoError) {
      playVideo();
    }
  };

  useEffect(() => {
    const events = ['touchstart', 'touchend', 'click', 'scroll'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [videoError]);

  const content = {
    en: {
      title: 'Transform your bathroom with',
      highlight: 'premium remodeling experts',
      subtitle: 'Design, materials, and installation — on time and stress-free.',
      cta: 'Get Free Quote Now →',
    },
    es: {
      title: 'Transforma tu baño con',
      highlight: 'expertos en remodelación',
      subtitle: 'Diseño, materiales e instalación — a tiempo y sin estrés.',
      cta: 'Cotización Gratis Ahora →',
    },
  };

  const t = content[language];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center px-6"
    >
      {!videoError ? (
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            autoPlay={!mobile}
            muted
            loop
            playsInline
            preload={VIDEO_CONFIG.preload}
            poster="/bath-1.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            src={getVideoUrl(VIDEO_CONFIG.backgroundVideos.hero)}
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            onLoadStart={handleVideoLoadStart}
            onCanPlay={() => {
              if (!mobile) {
                playVideo();
              }
            }}
          />
          
          {/* Spinner de carga */}
          {videoLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Overlay de play para móviles */}
          {mobile && !videoLoading && !videoError && (
            <div 
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
              onClick={playVideo}
            >
              <div className="text-white text-6xl">▶️</div>
            </div>
          )}
        </div>
      ) : (
        // Fallback a imagen si el video falla
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/bath-1.jpg"
            alt="Bathroom background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
      )}

      {/* 🌓 Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          {t.title}{' '}
          <span className="text-teal-400">{t.highlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="#form-section"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
