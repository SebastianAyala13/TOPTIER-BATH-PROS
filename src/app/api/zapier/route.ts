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

    // Extract IP address from headers
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

    // Build complete payload according to checklist
    const payload = {
      // Campaign constants
      lp_campaign_id: (body as any).lp_campaign_id ?? process.env.NEXT_PUBLIC_LP_CAMPAIGN_ID ?? 'Provided',
      lp_campaign_key: (body as any).lp_campaign_key ?? process.env.NEXT_PUBLIC_LP_CAMPAIGN_KEY ?? 'Provided',
      lp_s1: (body as any).lp_s1 ?? process.env.NEXT_PUBLIC_LP_S1 ?? 'Provided',
      lp_s2: (body as any).lp_s2 ?? process.env.NEXT_PUBLIC_LP_S2 ?? 'toptierbathpros',
      lp_response: 'JSON',
      
      // Contact and address data
      city: (body as any).city ?? '',
      state: (body as any).state ?? '',
      zip_code: (body as any).zip_code ?? '',
      first_name: (body as any).first_name ?? '',
      last_name: (body as any).last_name ?? '',
      address: (body as any).address ?? '',
      phone_home: (body as any).phone_home ?? '',
      email_address: (body as any).email_address ?? '',
      
      // Metadata and tracking
      ip_address: ip,
      trusted_form_cert_id: (body as any).trusted_form_cert_id ?? 'NOT_PROVIDED',
      landing_page: (body as any).landing_page ?? '',
      
      // Service and consent
      repair_or_replace: (body as any).repair_or_replace ?? '',
      tcpaText: (body as any).tcpaText ?? '',
      tcpa_consent: !!(body as any).tcpa_consent,
      
      // Legacy fields for compatibility
      bathroomStyle: (body as any).bathroomStyle ?? '',
      urgency: (body as any).urgency ?? '',
      ownership: (body as any).ownership ?? '',
      timestamp: (body as any).timestamp ?? new Date().toISOString(),
      source: (body as any).source ?? 'TOPTIER BATH PROS Website',
      language: (body as any).language ?? 'en',
      website: (body as any).website ?? 'toptierbathpros.com',
    };

    await sendToZapier(payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: 'Server error', detail: message }, { status: 500 });
  }
}


