import { Loading } from '@/components/daisyui/Loading';
import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
 

export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <AdminLayout>
    <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
    </AdminLayout>
    </div >
  );
}
