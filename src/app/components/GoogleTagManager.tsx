'use client';
import { gtmScript, gtmNoScript } from '@/lib/gtm';

export function GoogleTagManagerHead() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: gtmScript }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  // Debe renderizarse inmediatamente después de <body>
  return (
    <noscript dangerouslySetInnerHTML={{ __html: gtmNoScript }} />
  );
}
