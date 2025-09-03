'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  getVideoUrl, 
  isMobile, 
  configureVideoForMobile, 
  playVideoSafely, 
  VIDEO_CONFIG 
} from '@/lib/videoUtils';

export default function BackgroundVideo() {
  const [videoError, setVideoError] = useState(false);
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

  if (videoError) {
    return (
      <div 
        className="fixed top-0 left-0 w-full h-full object-cover opacity-20 z-[-10]"
        style={{ 
          backgroundImage: 'url(/bath-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay={!mobile}
      muted
      loop
      playsInline
      preload={VIDEO_CONFIG.preload}
      className="fixed top-0 left-0 w-full h-full object-cover opacity-20 z-[-10]"
      src={getVideoUrl(VIDEO_CONFIG.backgroundVideos.ambient)}
      onError={handleVideoError}
      onCanPlay={() => {
        if (!mobile) {
          playVideo();
        }
      }}
    />
  );
}
