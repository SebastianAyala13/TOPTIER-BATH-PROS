'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function VideoSection() {
  const videos = ['bathroom1.mp4', 'bathroom2.mp4', 'bathroom3.mp4', 'bathroom4.mp4', 'bathroom5.mp4'];
  const fallbackImages = ['/bath-1.jpg', '/bath-2.jpg', '/bath-3.jpg', '/bath-4.jpg', '/bath-5.jpg'];
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());

  const handleVideoError = (index: number) => {
    setVideoErrors(prev => new Set(prev).add(index));
  };

  return (
    <section id="video" className="relative py-20 px-6 text-center text-white overflow-hidden">
      {/* Imagen de fondo difuminada */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background-video-blur.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
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
          See our bathroom remodels
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
              {!videoErrors.has(idx) ? (
                <video
                  className="w-full h-full object-cover rounded-lg"
                  src={`/${src}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={fallbackImages[idx]}
                  aria-label={`Bathroom remodel video ${idx + 1}`}
                  onError={() => handleVideoError(idx)}
                  onLoadStart={() => {
                    console.log(`Video ${src} started loading`);
                  }}
                  onCanPlay={() => {
                    console.log(`Video ${src} can play`);
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full bg-cover bg-center rounded-lg"
                  style={{ 
                    backgroundImage: `url(${fallbackImages[idx]})`,
                    minHeight: '200px'
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
