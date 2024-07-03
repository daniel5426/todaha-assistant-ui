"use client";
import dynamic from 'next/dynamic';


import { Loading } from '@/components/daisyui/Loading';
import LandingLayout from '@/components/layout/landing/landing-layout';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import ChatModal from '@/components/chatbots/ChatModal';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useLocale } from 'next-intl';
 
export default function Layout({ children }: { children: any }) {
  const locale = useLocale();
  const isRTL = locale === "he";

  return (
    <div className="" >

      {children}
      <ChatModal />

      <div className="fixed bottom-5 end-5 z-10 " style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <ThemeToggleButton
          shape="circle"
          color="ghost"
          className={
            "border border-base-content/10 text-base-content/70 hover:bg-base-content/10"
          }
        />
      </div>
      </div>
  );
}
