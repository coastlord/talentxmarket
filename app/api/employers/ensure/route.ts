import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = ['soa.tidjani@gmail.com'];

// POST /api/employers/ensure
// Called by the employers page when admin is signed in but has no employer record.
// Creates the employer record (idempotent — safe to call multiple times).
export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    const clerkUser = await currentUser();
    const clerkEmail = clerkUser?.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim();

    if (!clerkEmail || !ADMIN_EMAILS.includes(clerkEmail)) {
      return NextResponse.json({ error: 'Not an admin account' }, { status: 403 });
    }

    // Upsert employer record for admin (safe to call multiple times)
    const { data: employer, error } = await supabaseAdmin
      .from('employers')
      .upsert(
        {
          email: clerkEmail,
          company_name: 'TalentX Market',
          contact_name: 'Admin',
          status: 'active',
          subscription_status: 'admin',
          unlock_credits: 999,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id, email, company_name, contact_name, unlock_credits, subscription_status')
      .single();

    if (error || !employer) {
      console.error('Ensure employer error:', error);
      return NextResponse.json({ error: 'Failed to ensure employer account' }, { status: 500 });
    }

    return NextResponse.json({
      employer: {
        id: employer.id,
        email: employer.email,
        companyName: employer.company_name || 'TalentX Market',
        contactName: employer.contact_name || 'Admin',
        creditsRemaining: 999,
        isAdmin: true,
      },
    });
  } catch (err) {
    console.error('Ensure employer error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
