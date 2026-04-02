import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <DashboardClient
      firstName={user.firstName ?? ''}
      lastName={user.lastName ?? ''}
      email={user.emailAddresses[0]?.emailAddress ?? ''}
      imageUrl={user.imageUrl ?? ''}
    />
  );
}
