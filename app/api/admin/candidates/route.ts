import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// GET /api/admin/candidates — fetch all candidates for admin panel
export async function GET() {
  try {
    const user = await currentUser();
    if (!user || !isAdmin(user.emailAddresses[0]?.emailAddress ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PATCH /api/admin/candidates — approve, reject, or suspend a candidate
export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !isAdmin(user.emailAddresses[0]?.emailAddress ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { candidateId, action } = await req.json();
    // action: 'approve' | 'reject' | 'suspend' | 'restore'

    const statusMap: Record<string, string> = {
      approve:  'approved',
      reject:   'rejected',
      suspend:  'suspended',
      restore:  'approved',
    };

    const newStatus = statusMap[action];
    if (!newStatus) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { status: newStatus };
    if (action === 'approve' || action === 'restore') {
      updateData.approved_at = new Date().toISOString();
      updateData.approved_by = user.id;
    }

    const { data, error } = await supabaseAdmin
      .from('candidates')
      .update(updateData)
      .eq('id', candidateId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, candidate: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
