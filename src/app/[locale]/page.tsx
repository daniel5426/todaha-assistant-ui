import { redirect } from 'next/navigation';

export default function Page() {
  // Perform the redirect on the server side
  redirect('/landing');

  // This component doesn't need to render anything
  return null;
}
