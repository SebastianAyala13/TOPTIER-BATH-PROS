/**
 * Configuración del formulario para sitio estático
 * Configurado para usar con Zapier Webhook
 */

// Usamos la ruta API local (Vercel) para evitar CORS: /api/zapier
export function getFormEndpoint(): string {
  return '/api/zapier';
}