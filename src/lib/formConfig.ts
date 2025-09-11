/**
 * Configuración del formulario para sitio estático
 * Configurado para usar con Zapier Webhook
 */

// Usamos el relay PHP en el mismo dominio para evitar CORS.
// Si deseas forzar otro endpoint público, define NEXT_PUBLIC_FORM_ENDPOINT.
// Si prefieres un proxy externo (Cloudflare Worker), define NEXT_PUBLIC_ZAPIER_PROXY_URL.

const FALLBACK_LOCAL = '/zapier.php';

export function getFormEndpoint(): string {
  return (
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    process.env.NEXT_PUBLIC_ZAPIER_PROXY_URL ||
    FALLBACK_LOCAL
  );
}