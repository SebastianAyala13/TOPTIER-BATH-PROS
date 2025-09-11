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

    await sendToZapier(body as Record<string, unknown>);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: 'Server error', detail: message }, { status: 500 });
  }
}


