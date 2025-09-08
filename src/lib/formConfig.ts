/**
 * Configuración del formulario para sitio estático
 * Reemplaza con tu servicio de formularios preferido
 */

export const FORM_CONFIG = {
  // Opción 1: Formspree (recomendado)
  endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  
  // Opción 2: Netlify Forms (si usas Netlify)
  // endpoint: '/',
  // formName: 'contact',
  
  // Opción 3: EmailJS (para envío directo por email)
  // serviceId: 'YOUR_SERVICE_ID',
  // templateId: 'YOUR_TEMPLATE_ID',
  // publicKey: 'YOUR_PUBLIC_KEY',
  
  // Opción 4: Backend personalizado
  // endpoint: 'https://your-backend.com/api/contact',
};

export const getFormEndpoint = () => {
  return FORM_CONFIG.endpoint;
};
