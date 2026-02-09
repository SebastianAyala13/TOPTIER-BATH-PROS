/**
 * Layout for /formulario only.
 * Wraps content; Meta Pixel is loaded in page.tsx via next/script so it only runs on this route.
 */
export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
