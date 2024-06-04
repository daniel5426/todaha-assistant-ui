import LandingLayout from '@/components/layout/landing/landing-layout';
 
export default async function Layout({ children }: { children: any }) {
  return (
    <div >
    <LandingLayout>
      {children}
      </LandingLayout>
      </div >
  );
}
