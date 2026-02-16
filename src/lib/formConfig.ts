/**
 * Configuración del formulario para sitio estático
 * Configurado para usar con Zapier Webhook
 */

// Formulario principal del sitio
export function getFormEndpoint(): string {
  return '/api/zapier';
}

// Landing /formulario - API y webhook dedicados, independiente del principal
export function getFormularioEndpoint(): string {
  return '/api/zapier/formulario';
}