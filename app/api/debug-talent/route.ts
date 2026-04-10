import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Temporary debug endpoint — remove before launch
// Visits: /api/debug-talent  →  shows filter diagnostics
export async function GET() {
  try {
    // 1. Count ALL candidates (no filters)
    const { data: all } = await supabaseAdmin
      .from('candidates')
      .select('id, status, is_visible, approved_at');

    // 2. Status = approved only
    const { data: approved } = await supabaseAdmin
      .from('candidates')
      .select('id, status, is_visible, approved_at')
      .eq('status', 'approved');

    // 3. status = approved AND is_visible = true
    const { data: visible } = await supabaseAdmin
      .from('candidates')
      .select('id, status, is_visible, approved_at')
      .eq('status', 'approved')
      .eq('is_visible', true);

    // 4. status = approved, is_visible NOT false (catches nulls)
    const { data: notHidden } = await supabaseAdmin
      .from('candidates')
      .select('id, status, is_visible, approved_at')
      .eq('status', 'approved')
      .neq('is_visible', false);

    return NextResponse.json({
      all_count:       (all  || []).length,
      approved_count:  (approved  || []).length,
      visible_count:   (visible  || []).length,
      not_hidden_count:(notHidden || []).length,
      all_rows:        all,
      approved_rows:   approved,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
