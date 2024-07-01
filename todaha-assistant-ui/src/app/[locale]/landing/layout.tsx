"use client";
import dynamic from 'next/dynamic';


import { Loading } from '@/components/daisyui/Loading';
import LandingLayout from '@/components/layout/landing/landing-layout';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import ChatModal from '@/components/chatbots/ChatModal';
 
export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <LandingLayout>

      {children}
      <ChatModal />

      </LandingLayout>
      </div >
  );
}
