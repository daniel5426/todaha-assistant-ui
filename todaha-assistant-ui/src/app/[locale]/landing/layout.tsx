"use client";
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useLocale } from 'next-intl';
import Chatbot from '@/components/chatbots/ChatBot';

export default function Layout({ children }: { children: any }) {
  const locale = useLocale();
  const isRTL = locale === "he";

  return (
    <div className="" >

      {children}

      <div className="fixed bottom-5 start-5 z-10 " >
        <ThemeToggleButton
          shape="circle"
          color="ghost"
          className={
            "border border-base-content/10 text-base-content/70 hover:bg-base-content/10 bg-slate-300"
          }
        />
      </div>
      <Chatbot />
    </div>
  );
}
