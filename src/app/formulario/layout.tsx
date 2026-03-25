/**
 * Layout para /formulario únicamente.
 * TrustedForm se carga una sola vez en el layout raíz (field=trusted_form_cert_id).
 * No cargar trustedform.js aquí: duplicaba el script y usaba field=xxTrustedFormCertUrl,
 * mientras el wizard usa name="trusted_form_cert_id", dejando el cert vacío en Zapier.
 * Meta Pixel: ver formulario/page.tsx
 */
export default function FormularioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
