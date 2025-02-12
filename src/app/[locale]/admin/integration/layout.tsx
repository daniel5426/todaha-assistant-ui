"use client"
import { Loading } from '@/components/daisyui/Loading';
import { Suspense } from 'react';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
