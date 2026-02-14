export interface SendToZapierOptions {
  /** Override webhook URL (e.g. for /formulario dedicated hook) */
  url?: string;
  /** Override secret (Zapier Catch Hooks often don't need one) */
  secret?: string;
}

export async function sendToZapier(
  data: Record<string, unknown>,
  options?: SendToZapierOptions
): Promise<{ ok: boolean; skipped?: boolean; status?: number; body?: string }> {
  const url = options?.url ?? (process.env.ZAPIER_HOOK_URL as string | undefined);
  const secret = options?.secret ?? (process.env.ZAPIER_SECRET as string | undefined);
  if (!url) {
    console.log('ZAPIER webhook URL missing, skipping');
    return { ok: false, skipped: true };
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (secret) headers['x-zapier-secret'] = secret;

  const r = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`Zapier ${r.status}: ${text}`);
  console.log('Zapier webhook OK', r.status, text);
  return { ok: true, status: r.status, body: text };
}


