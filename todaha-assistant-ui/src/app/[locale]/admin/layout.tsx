"use client";
import { Loading } from '@/components/daisyui/Loading';
import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
import { StatsContextProvider } from './(stats)/use-stats';
 

export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <AdminLayout>
      {children}
    </AdminLayout>
    </div >
  );
}
