/**
 * Configuración del formulario para sitio estático
 * Configurado para usar con Zapier Webhook
 */

export const FORM_CONFIG = {
  // Webhook de Zapier configurado para TOPTIER BATH PROS
  endpoint: 'https://hooks.zapier.com/hooks/catch/22208931/udjiyrz/',
  
  // Opción alternativa: Formspree + Zapier
  // endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  
  // Opción alternativa: Netlify Forms + Zapier
  // endpoint: '/',
  // formName: 'contact',
};

export const getFormEndpoint = () => {
  return FORM_CONFIG.endpoint;
};