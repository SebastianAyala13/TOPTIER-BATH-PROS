'use client';

import { useState, useEffect } from 'react';

export default function FloatingButton() {
  // Inicializar con un valor alto por defecto para evitar solapamiento inicial
  const [bottomOffset, setBottomOffset] = useState(300); // Valor alto inicial para evitar solapamiento

  useEffect(() => {
    // Verificar si el banner está visible
    const checkBannerVisibility = () => {
      if (typeof window === 'undefined') return;
      
      // Verificar primero si el consentimiento ya fue aceptado
      const consentAccepted = localStorage.getItem('cookieConsent') === 'true';
      
      // Si el consentimiento fue aceptado, bajar el botón inmediatamente
      if (consentAccepted) {
        setBottomOffset(16); // bottom-4
        return;
      }
      
      // Si el consentimiento NO fue aceptado, el banner debería estar visible
      // Buscar el banner de consentimiento
      const banner = document.querySelector('[data-banner-consent]') as HTMLElement;
      
      // Si encontramos el banner en el DOM, mantener el botón arriba
      if (banner !== null && 
          banner instanceof HTMLElement && 
          banner.offsetParent !== null) {
        const computedStyle = window.getComputedStyle(banner);
        const isDisplayed = computedStyle.display !== 'none' && 
                           computedStyle.visibility !== 'hidden' &&
                           computedStyle.opacity !== '0';
        
        if (isDisplayed) {
          // Banner visible - mantener botón arriba
          setBottomOffset(300);
          return;
        }
      }
      
      // Si no encontramos el banner pero el consentimiento no fue aceptado,
      // mantener el botón arriba por precaución (el banner puede estar renderizándose)
      if (!consentAccepted) {
        setBottomOffset(300);
      } else {
        // Solo bajar si el consentimiento fue aceptado
        setBottomOffset(16);
      }
    };

    // Verificar después de delays para asegurar que el DOM esté listo
    // El banner se renderiza después de verificar localStorage, así que necesitamos esperar
    const initialCheck = setTimeout(checkBannerVisibility, 50);
    const loadCheck = setTimeout(checkBannerVisibility, 200);
    const finalCheck = setTimeout(checkBannerVisibility, 500);
    const extraCheck = setTimeout(checkBannerVisibility, 1000);

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
      clearTimeout(loadCheck);
      clearTimeout(finalCheck);
      clearTimeout(extraCheck);
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

