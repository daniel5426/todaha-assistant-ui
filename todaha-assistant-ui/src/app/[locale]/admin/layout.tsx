import { Loading } from '@/components/daisyui/Loading';
import AdminLayout from '@/components/layout/admin/index';
import { Suspense } from 'react';
import { StatsContextProvider } from './use-stats';
 

export default function Layout({ children }: { children: any }) {
  return (
    <div >
    <AdminLayout>
    <Suspense fallback={
        <div>
            <h1>Loading...</h1>
            {/* Add any additional loading indicators or messages here */}
        </div>
    }>
    <StatsContextProvider>
      {children}
      </StatsContextProvider>
      </Suspense>
    </AdminLayout>
    </div >
  );
}
