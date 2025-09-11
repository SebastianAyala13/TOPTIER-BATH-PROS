/**
 * Configuración del formulario para sitio estático
 * Configurado para usar con Zapier Webhook
 */

export const FORM_CONFIG = {
  // Si existe un proxy (Cloudflare Worker / Pipedream), úsalo; si no, usa el hook directo
  proxy: process.env.NEXT_PUBLIC_ZAPIER_PROXY_URL,
  direct: 'https://hooks.zapier.com/hooks/catch/24574105/udv6m97/',
};

export const getFormEndpoint = (): string => {
  return FORM_CONFIG.proxy && FORM_CONFIG.proxy.length > 0
    ? FORM_CONFIG.proxy
    : FORM_CONFIG.direct;
};