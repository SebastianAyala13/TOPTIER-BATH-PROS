'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function VideoSection() {
  const { language } = useLanguage();

  const videos = ['bathroom1.mp4', 'bathroom2.mp4', 'bathroom3.mp4', 'bathroom4.mp4', 'bathroom5.mp4'];

  return (
    <section id="video" className="relative py-20 px-6 text-center text-white overflow-hidden">
      {/* Imagen de fondo difuminada */}
      <div className="absolute inset-0 -z-10">
          <img
          src="/background-video-blur.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-10 drop-shadow-md"
        >
          {language === 'en' ? 'See our bathroom remodels' : 'Mira nuestras remodelaciones de baños'}
        </motion.h2>

        {/* Carrusel horizontal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.5 }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2"
        >
          {videos.map((src, idx) => (
            <div
              key={idx}
              className="min-w-[300px] md:min-w-[450px] snap-center bg-white/10 p-2 rounded-xl shadow-xl border border-slate-600"
            >
              <video
                className="w-full h-full object-cover rounded-lg"
                src={`/${src}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                aria-label={
                  language === 'en'
                    ? `Bathroom remodel video ${idx + 1}`
                    : `Video de remodelación de baño ${idx + 1}`
                }
              >
                {language === 'en'
                  ? 'Your browser does not support the video tag.'
                  : 'Tu navegador no soporta la etiqueta de video.'}
              </video>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
