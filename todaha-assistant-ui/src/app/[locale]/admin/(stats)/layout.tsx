import { Loading } from '@/components/daisyui/Loading';
import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
import { StatsContextProvider } from './use-stats';
 

export default function Layout({ children }: { children: any }) {
  return (
    <div >
      {children}
    </div >
  );
}
