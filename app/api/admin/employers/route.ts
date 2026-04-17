import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
function isAdmin(email: string) { return ADMIN_EMAILS.includes(email.toLowerCase()); }

// ─── GET /api/admin/employers ─────────────────────────────────────────────────
// Returns all employers with their unlock history (which candidates they viewed)
export async function GET() {
  try {
    const user = await currentUser();
    if (!user || !isAdmin(user.emailAddresses[0]?.emailAddress ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all employers
    const { data: employers, error: empErr } = await supabaseAdmin
      .from('employers')
      .select('*')
      .order('created_at', { ascending: false });

    if (empErr) return NextResponse.json({ error: empErr.message }, { status: 500 });

    // Fetch all unlocks with candidate info joined
    const { data: unlocks, error: unlockErr } = await supabaseAdmin
      .from('employer_unlocks')
      .select(`
        id,
        employer_id,
        created_at,
        candidates (
          id,
          job_title,
          location,
          years_experience,
          specialisms,
          certifications
        )
      `)
      .order('created_at', { ascending: false });

    if (unlockErr) {
      console.error('Unlock fetch error:', unlockErr);
    }

    // Fetch job requests per employer
    const { data: jobRequests } = await supabaseAdmin
      .from('job_requests')
      .select('employer_id, role_title, urgency, status, created_at')
      .order('created_at', { ascending: false });

    // Attach unlocks and job requests to each employer
    const enriched = (employers || []).map(emp => ({
      ...emp,
      unlocks: (unlocks || []).filter(u => u.employer_id === emp.id),
      job_requests: (jobRequests || []).filter(j => j.employer_id === emp.id),
    }));

    return NextResponse.json(enriched);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── PATCH /api/admin/employers ───────────────────────────────────────────────
// Actions: approve | suspend | restore | add_credits
export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !isAdmin(user.emailAddresses[0]?.emailAddress ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { employerId, action, credits } = await req.json();
    if (!employerId || !action) {
      return NextResponse.json({ error: 'Missing employerId or action' }, { status: 400 });
    }

    let update: Record<string, unknown> = {};

    switch (action) {
      case 'approve':
        update = { status: 'active' };
        break;
      case 'suspend':
        update = { status: 'suspended' };
        break;
      case 'restore':
        update = { status: 'active' };
        break;
      case 'add_credits': {
        const { data: emp } = await supabaseAdmin
          .from('employers')
          .select('unlock_credits')
          .eq('id', employerId)
          .single();
        const current = emp?.unlock_credits ?? 0;
        update = { unlock_credits: current + (credits ?? 1) };
        break;
      }
      case 'remove_credits': {
        const { data: emp } = await supabaseAdmin
          .from('employers')
          .select('unlock_credits')
          .eq('id', employerId)
          .single();
        const current = emp?.unlock_credits ?? 0;
        update = { unlock_credits: Math.max(0, current - (credits ?? 1)) };
        break;
      }
      case 'set_credits': {
        update = { unlock_credits: Math.max(0, credits ?? 0) };
        break;
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('employers')
      .update(update)
      .eq('id', employerId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
