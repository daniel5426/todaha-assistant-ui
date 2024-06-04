import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
import Loading from './ui/components/loading';
 

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
