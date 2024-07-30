import { Loading } from '@/components/daisyui/Loading';
import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
import { CustomContextProvider } from './use-custom';
 

export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <CustomContextProvider>
      {children}
    </CustomContextProvider>
    </div >
  );
}
