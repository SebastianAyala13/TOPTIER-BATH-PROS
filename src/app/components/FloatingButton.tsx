'use client';

import { useState, useEffect } from 'react';

export default function FloatingButton() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(16); // 16px = bottom-4 por defecto

  useEffect(() => {
    // Verificar si el banner está visible y calcular su altura
    const checkBannerVisibility = () => {
      if (typeof window === 'undefined') return;
      
      // Buscar el banner de consentimiento
      const banner = document.querySelector('[data-banner-consent]') as HTMLElement;
      const isVisible = banner !== null && 
                       banner instanceof HTMLElement && 
                       banner.offsetParent !== null &&
                       window.getComputedStyle(banner).display !== 'none';
      
      setBannerVisible(isVisible);
      
      // Si el banner está visible, calcular su altura y añadir margen
      if (isVisible && banner) {
        const bannerHeight = banner.offsetHeight;
        // Altura del banner + altura del botón flotante (~50px) + margen adicional (20px)
        const newOffset = bannerHeight + 50 + 20;
        setBottomOffset(newOffset);
      } else {
        // Posición normal cuando no hay banner
        setBottomOffset(16); // bottom-4
      }
    };

    // Verificar inicialmente después de un pequeño delay para que el DOM esté listo
    const initialCheck = setTimeout(checkBannerVisibility, 100);

    // Observar cambios en el DOM para detectar cuando el banner aparece/desaparece
    const observer = new MutationObserver(() => {
      checkBannerVisibility();
    });

    // Observar el body y el main para cambios
    if (typeof window !== 'undefined') {
      const main = document.querySelector('main');
      if (main) {
        observer.observe(main, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class'],
        });
      }
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    // Escuchar eventos personalizados si el banner los emite
    const handleBannerChange = () => {
      setTimeout(checkBannerVisibility, 50);
    };
    
    window.addEventListener('banner-consent-change', handleBannerChange);
    
    // Escuchar cambios de tamaño de ventana para recalcular
    window.addEventListener('resize', checkBannerVisibility);
    
    // Verificar periódicamente (fallback)
    const interval = setInterval(checkBannerVisibility, 300);

    return () => {
      clearTimeout(initialCheck);
      observer.disconnect();
      window.removeEventListener('banner-consent-change', handleBannerChange);
      window.removeEventListener('resize', checkBannerVisibility);
      clearInterval(interval);
    };
  }, []);

  return (
    <a 
      href="tel:+18337241011" 
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-4 z-40 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-xs font-bold md:hidden animate-pulse"
    >
      📞 Call Now - Free Quote
    </a>
  );
}

