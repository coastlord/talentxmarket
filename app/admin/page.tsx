import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AdminClient from './AdminClient';

// ─── Admin access guard ────────────────────────────────────────────────────────
// Only the email(s) listed in ADMIN_EMAILS can reach this page.
// Everyone else — including other logged-in candidates — is bounced to /.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase() ?? '';

  if (!ADMIN_EMAILS.includes(userEmail)) {
    redirect('/');
  }

  return <AdminClient />;
}
