/**
 * API dedicada para /formulario - envía SOLO al webhook de Zapier de formulario.
 * Independiente del formulario principal (/api/zapier).
 */
import { NextRequest, NextResponse } from 'next/server';

const FORMULARIO_ZAPIER_URL =
  process.env.ZAPIER_FORMULARIO_HOOK_URL ||
  'https://hooks.zapier.com/hooks/catch/22208931/ue86ck2/';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: unknown = null;
    try {
      body = await req.json();
    } catch {}
    if (!body) {
      try {
        const fd = await req.formData();
        body = Object.fromEntries(fd.entries());
      } catch {}
    }
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const formBody = body as Record<string, unknown>;
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

    const payload = {
      lp_campaign_id: formBody.lp_campaign_id ?? 'Provided',
      lp_campaign_key: formBody.lp_campaign_key ?? 'Provided',
      lp_s1: formBody.lp_s1 ?? 'Provided',
      lp_s2: formBody.lp_s2 ?? 'toptierbathpros',
      lp_response: 'JSON',
      city: formBody.city ?? '',
      state: formBody.state ?? '',
      zip_code: formBody.zip_code ?? '',
      first_name: formBody.first_name ?? '',
      last_name: formBody.last_name ?? '',
      address: formBody.address ?? '',
      phone_home: formBody.phone_home ?? '',
      email_address: formBody.email_address ?? '',
      ip_address: ip,
      trusted_form_cert_id: formBody.trusted_form_cert_id ?? formBody.xxTrustedFormCertUrl ?? 'NOT_PROVIDED',
      landing_page: formBody.landing_page ?? '',
      jornaya_lead_id: formBody.jornaya_lead_id ?? formBody.leadid_token ?? formBody.universal_leadid ?? '',
      repair_or_replace: formBody.repair_or_replace ?? '',
      tcpaText: formBody.tcpaText ?? '',
      'consent-language': !!formBody['consent-language'],
      bathroomStyle: formBody.bathroomStyle ?? '',
      urgency: formBody.urgency ?? '',
      ownership: formBody.ownership ?? 'yes',
      timestamp: formBody.timestamp ?? new Date().toISOString(),
      source: 'TOPTIER BATH PROS Formulario',
      form_type: 'formulario_landing',
      language: formBody.language ?? 'en',
      website: 'toptierbathpros.com',
    };

    console.log('[formulario] Enviando a Zapier:', FORMULARIO_ZAPIER_URL);
    console.log('[formulario] Payload:', JSON.stringify(payload, null, 2));

    const r = await fetch(FORMULARIO_ZAPIER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    });

    const text = await r.text();
    console.log('[formulario] Zapier response:', r.status, text);

    if (!r.ok) {
      throw new Error(`Zapier ${r.status}: ${text}`);
    }

    return NextResponse.json({ ok: true, status: r.status });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown error';
    console.error('[formulario] Error:', message);
    return NextResponse.json({ error: 'Server error', detail: message }, { status: 500 });
  }
}
