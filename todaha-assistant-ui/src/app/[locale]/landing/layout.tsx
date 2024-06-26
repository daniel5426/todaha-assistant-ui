"use client";
import { Loading } from '@/components/daisyui/Loading';
import LandingLayout from '@/components/layout/landing/landing-layout';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
 
export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <LandingLayout>

      {children}
      </LandingLayout>
      </div >
  );
}
