import { NextRequest, NextResponse } from 'next/server';
import { sendToZapier } from '@/lib/sendToZapier';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: unknown = null;
    try { body = await req.json(); } catch {}
    if (!body) {
      try {
        const fd = await req.formData();
        body = Object.fromEntries(fd.entries());
      } catch {}
    }
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    // DEBUG: Log del body recibido
    console.log('🔍 API recibió body:', JSON.stringify(body, null, 2))

    // Extract IP address from headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

    // Type the body for better type safety
    const formBody = body as Record<string, unknown>;

    // Build complete payload according to checklist
    const payload = {
      // Campaign constants
      lp_campaign_id: formBody.lp_campaign_id ?? process.env.NEXT_PUBLIC_LP_CAMPAIGN_ID ?? 'Provided',
      lp_campaign_key: formBody.lp_campaign_key ?? process.env.NEXT_PUBLIC_LP_CAMPAIGN_KEY ?? 'Provided',
      lp_s1: formBody.lp_s1 ?? process.env.NEXT_PUBLIC_LP_S1 ?? 'Provided',
      lp_s2: formBody.lp_s2 ?? process.env.NEXT_PUBLIC_LP_S2 ?? 'toptierbathpros',
      lp_response: 'JSON',
      
      // Contact and address data
      city: formBody.city ?? '',
      state: formBody.state ?? '',
      zip_code: formBody.zip_code ?? '',
      first_name: formBody.first_name ?? '',
      last_name: formBody.last_name ?? '',
      address: formBody.address ?? '',
      phone_home: formBody.phone_home ?? '',
      email_address: formBody.email_address ?? '',
      
      // Metadata and tracking
      ip_address: ip,
      trusted_form_cert_id: formBody.trusted_form_cert_id ?? 'NOT_PROVIDED',
      landing_page: formBody.landing_page ?? '',
      jornaya_lead_id: formBody.jornaya_lead_id ?? formBody.leadid_token ?? formBody.universal_leadid ?? '',
      
      // Service and consent
      repair_or_replace: formBody.repair_or_replace ?? '',
      tcpaText: formBody.tcpaText ?? '',
      "consent-language": !!formBody["consent-language"],
      
      // Legacy fields for compatibility
      bathroomStyle: formBody.bathroomStyle ?? '',
      urgency: formBody.urgency ?? '',
      ownership: formBody.ownership ?? '',
      timestamp: formBody.timestamp ?? new Date().toISOString(),
      source: formBody.source ?? 'TOPTIER BATH PROS Website',
      language: formBody.language ?? 'en',
      website: formBody.website ?? 'toptierbathpros.com',
    };
    
    // DEBUG: Log del payload final
    console.log('🔍 Payload final para Zapier:', JSON.stringify(payload, null, 2))

    const result = await sendToZapier(payload);
    
    // DEBUG: Log de respuesta de Zapier
    if (result.ok) {
      console.log('🔍 Zapier response OK')
    } else {
      console.log('🔍 Error de Zapier:', result.body || 'Unknown error')
    }
    
    return NextResponse.json({ ok: !!result.ok, forwarded: !result.skipped, status: result.status ?? 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: 'Server error', detail: message }, { status: 500 });
  }
}


