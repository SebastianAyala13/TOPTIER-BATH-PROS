export async function sendToZapier(
  data: Record<string, unknown>
): Promise<{ ok: boolean; skipped?: boolean; status?: number; body?: string }> {
  const url = process.env.ZAPIER_HOOK_URL as string | undefined;
  const secret = process.env.ZAPIER_SECRET as string | undefined;
  if (!url || !secret) {
    console.log('ZAPIER env vars missing, skipping webhook');
    return { ok: false, skipped: true };
  }

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
  console.log('Zapier webhook OK', r.status, text);
  return { ok: true, status: r.status, body: text };
}


