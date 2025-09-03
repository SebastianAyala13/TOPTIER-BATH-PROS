/**
 * Utilidades para manejo de videos en TOPTIER BATH PROS
 * Optimizadas para funcionar tanto en desarrollo como en producción
 */

export const getVideoUrl = (videoPath: string): string => {
  // Remover slash inicial si existe
  const cleanPath = videoPath.startsWith('/') ? videoPath.slice(1) : videoPath;
  
  // En producción, usar URL absoluta
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return `https://bathroom.homedesignandco.com/${cleanPath}`;
  }
  
  // En desarrollo, usar ruta relativa
  return `/${cleanPath}`;
};

export const getImageUrl = (imagePath: string): string => {
  // Remover slash inicial si existe
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // En producción, usar URL absoluta
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return `https://bathroom.homedesignandco.com/${cleanPath}`;
  }
  
  // En desarrollo, usar ruta relativa
  return `/${cleanPath}`;
};

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

export const configureVideoForMobile = (video: HTMLVideoElement): void => {
  try {
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.muted = true;
    video.volume = 0;
  } catch (error) {
    console.warn('Error configuring video for mobile:', error);
  }
};

export const playVideoSafely = async (video: HTMLVideoElement): Promise<void> => {
  try {
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    }
  } catch (error) {
    // Silenciar errores de autoplay específicos
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
        console.log('Autoplay prevented for:', video.src);
      } else {
        console.warn('Video play error:', error);
      }
    }
  }
};

export const getVideoFallbackImage = (videoIndex: number): string => {
  const fallbackImages = ['/bath-1.jpg', '/bath-2.jpg', '/bath-3.jpg', '/bath-4.jpg', '/bath-5.jpg'];
  return fallbackImages[videoIndex] || '/bath-1.jpg';
};

export const VIDEO_CONFIG = {
  // Configuración para videos de baños
  bathroomVideos: [
    'bathroom1.mp4',
    'bathroom2.mp4', 
    'bathroom3.mp4',
    'bathroom4.mp4',
    'bathroom5.mp4'
  ],
  
  // Videos de fondo
  backgroundVideos: {
    ambient: 'bathroom-ambient.mp4',
    hero: 'bathroom-hero.mp4'
  },
  
  // Configuración de preload
  preload: 'metadata' as const,
  
  // Configuración de autoplay
  autoplay: {
    desktop: true,
    mobile: false
  }
};
