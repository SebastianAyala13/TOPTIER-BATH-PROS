'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { 
  getVideoUrl, 
  isMobile, 
  configureVideoForMobile, 
  playVideoSafely, 
  getVideoFallbackImage,
  VIDEO_CONFIG 
} from '@/lib/videoUtils';

export default function VideoSection() {
  const videos = VIDEO_CONFIG.bathroomVideos;
  
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>({});
  const [videoLoading, setVideoLoading] = useState<{ [key: string]: boolean }>({});
  const [mobile, setMobile] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setMobile(isMobile());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoError = (videoSrc: string) => {
    setVideoErrors(prev => ({ ...prev, [videoSrc]: true }));
    setVideoLoading(prev => ({ ...prev, [videoSrc]: false }));
  };

  const handleVideoLoad = (videoSrc: string) => {
    setVideoLoading(prev => ({ ...prev, [videoSrc]: false }));
  };

  const handleVideoLoadStart = (videoSrc: string) => {
    setVideoLoading(prev => ({ ...prev, [videoSrc]: true }));
  };

  const playVideo = async (videoSrc: string) => {
    const video = videoRefs.current[videoSrc];
    if (!video || !video.paused) return;

    configureVideoForMobile(video);
    await playVideoSafely(video);
  };

  const handleUserInteraction = () => {
    videos.forEach(videoSrc => {
      if (!videoErrors[videoSrc]) {
        playVideo(videoSrc);
      }
    });
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
  }, [videoErrors]);

  return (
    <section id="video" className="relative py-20 px-6 text-center text-white overflow-hidden">
      {/* Imagen de fondo difuminada */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background-video-blur.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
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
              className="min-w-[300px] md:min-w-[450px] snap-center bg-white/10 p-2 rounded-xl shadow-xl border border-slate-600 relative"
            >
              {videoErrors[src] ? (
                // Fallback a imagen si el video falla
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={getVideoFallbackImage(idx)}
                    alt={`Bathroom remodel ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx < 2}
                  />
                </div>
              ) : (
                // Video con fallback
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <video
                    ref={(el) => { videoRefs.current[src] = el; }}
                    className="w-full h-full object-cover rounded-lg"
                    src={getVideoUrl(src)}
                    autoPlay={!mobile}
                    muted
                    loop
                    playsInline
                    preload={VIDEO_CONFIG.preload}
                    poster={getVideoFallbackImage(idx)}
                    aria-label={`Bathroom remodel video ${idx + 1}`}
                    onError={() => handleVideoError(src)}
                    onLoadedData={() => handleVideoLoad(src)}
                    onLoadStart={() => handleVideoLoadStart(src)}
                    onCanPlay={() => {
                      if (!mobile) {
                        playVideo(src);
                      }
                    }}
                  />
                  
                  {/* Spinner de carga */}
                  {videoLoading[src] && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  
                  {/* Overlay de play para móviles */}
                  {mobile && !videoLoading[src] && !videoErrors[src] && (
                    <div 
                      className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
                      onClick={() => playVideo(src)}
                    >
                      <div className="text-white text-4xl">▶️</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
