This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Zapier integration (client JSON or proxy)

This project sends the form as JSON to Zapier Catch Hook with clean keys (fullName, email, phone, zipCode, service, ownership, bathroomStyle, urgency, timestamp, source, language, website, summary).

By default, it posts directly to the hook. If you prefer a server-only relay (to add a secret header or hide the hook) without breaking the static build, deploy a small proxy and set `NEXT_PUBLIC_ZAPIER_PROXY_URL`.

### Cloudflare Worker (example)

```
export default {
  async fetch(req, env) {
    const { ZAPIER_HOOK_URL, ZAPIER_SECRET, ALLOWED_ORIGIN } = env;
    const origin = req.headers.get('origin') || '';
    const allow = origin === ALLOWED_ORIGIN ? origin : '';
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: {
        'Access-Control-Allow-Origin': allow,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
      }});
    }
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: { 'Access-Control-Allow-Origin': allow }});
    }
    let body; try { body = await req.json(); } catch {
      return new Response('Invalid JSON', { status: 400, headers: { 'Access-Control-Allow-Origin': allow }});
    }
    const res = await fetch(ZAPIER_HOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-zapier-secret': ZAPIER_SECRET }, body: JSON.stringify(body)
    });
    return new Response('OK', { status: 200, headers: { 'Access-Control-Allow-Origin': allow }});
  }
}
```

Worker variables:
- ZAPIER_HOOK_URL: your Catch Hook URL
- ZAPIER_SECRET: a unique long secret
- ALLOWED_ORIGIN: https://toptierbathpros.com

Project variable:
```
NEXT_PUBLIC_ZAPIER_PROXY_URL=https://your-worker-url.workers.dev
```