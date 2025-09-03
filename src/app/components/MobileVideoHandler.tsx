'use client';

import { useEffect, useRef } from 'react';
import { 
  isMobile, 
  isIOS, 
  isSafari, 
  getVideoUrl, 
  configureVideoForMobile, 
  playVideoSafely 
} from '@/lib/videoUtils';

export default function MobileVideoHandler() {
  const hasInteracted = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const playAllVideos = async () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      const videos = document.querySelectorAll('video');
      for (const video of videos) {
        try {
          // Configurar atributos para móvil
          configureVideoForMobile(video);

          // Asegurar que la URL sea correcta para producción
          const currentSrc = video.getAttribute('src');
          if (currentSrc && currentSrc.startsWith('/')) {
            const absoluteUrl = getVideoUrl(currentSrc);
            if (absoluteUrl !== currentSrc) {
              video.src = absoluteUrl;
            }
          }

          // Intentar reproducir el video
          await playVideoSafely(video);
        } catch (error) {
          console.warn('Error handling video:', error);
        }
      }
    };

    const handleUserInteraction = () => {
      playAllVideos();
    };

    // Configuración específica para iOS/Safari
    if (isIOS() || isSafari()) {
      // En iOS/Safari, necesitamos esperar a que el usuario interactúe
      const events = ['touchstart', 'touchend', 'click', 'scroll'];
      
      events.forEach(event => {
        document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
      });
    } else if (isMobile()) {
      // En otros móviles, intentar reproducir después de un delay
      setTimeout(() => {
        playAllVideos();
      }, 1000);
    } else {
      // En desktop, intentar reproducir inmediatamente
      setTimeout(() => {
        playAllVideos();
      }, 500);
    }

    // Intentar reproducir después de que la página esté completamente cargada
    const handleLoad = () => {
      setTimeout(() => {
        if (!hasInteracted.current) {
          playAllVideos();
        }
      }, 2000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      const events = ['touchstart', 'touchend', 'click', 'scroll'];
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return null; // Este componente no renderiza nada
} 