'use client';

import { useState, useEffect } from 'react';

export default function FloatingButton() {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // Verificar si el banner está visible al cargar
    const checkBannerVisibility = () => {
      if (typeof window === 'undefined') return;
      
      // Buscar el banner de consentimiento
      const banner = document.querySelector('[data-banner-consent]');
      const isVisible = banner !== null && 
                       banner instanceof HTMLElement && 
                       banner.offsetParent !== null &&
                       window.getComputedStyle(banner).display !== 'none';
      setBannerVisible(isVisible);
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
    
    // Verificar periódicamente (fallback)
    const interval = setInterval(checkBannerVisibility, 300);

    return () => {
      clearTimeout(initialCheck);
      observer.disconnect();
      window.removeEventListener('banner-consent-change', handleBannerChange);
      clearInterval(interval);
    };
  }, []);

  // Posición dinámica: más arriba cuando el banner está visible
  // bottom-20 cuando el banner está visible (más espacio)
  // bottom-4 cuando el banner no está visible (posición normal)
  const bottomPosition = bannerVisible ? 'bottom-20' : 'bottom-4';

  return (
    <a 
      href="tel:+18337241011" 
      className={`fixed ${bottomPosition} right-4 z-40 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-xs font-bold md:hidden animate-pulse`}
    >
      📞 Call Now - Free Quote
    </a>
  );
}

