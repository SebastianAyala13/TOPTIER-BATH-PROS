export async function sendToZapier(data: Record<string, unknown>): Promise<void> {
  const url = process.env.ZAPIER_HOOK_URL as string | undefined;
  const secret = process.env.ZAPIER_SECRET as string | undefined;
  if (!url || !secret) throw new Error('ZAPIER env vars missing');

  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-zapier-secret': secret,
    },
    body: JSON.stringify(data),
    // Do not cache at the edge
    next: { revalidate: 0 },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`Zapier ${r.status}: ${text}`);
}


