"use client";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import  { DashboardCounterWidget } from "../components/CounterWidget";
import QuickChat from "../components/QuickChat";
import RevenueChart from "../components/RevenueChart";
import { StatsContextProvider } from "../use-stats";
import { Suspense } from "react";
import {LatestInvoicesSkeleton, RevenueChartAndCardSkeleton} from "../components/loading";
import { fetchChatsWithSuspense, fetchStatisticsWithSuspense } from "@/app/lib/data";
import { useAuthContext } from "@/states/auth";


// Create a context to hold your data
export default function EcommerceDashboardPage () {
  const { state } = useAuthContext();
  const resource = fetchChatsWithSuspense(1, 7);
  const resource2 = fetchStatisticsWithSuspense();

  return (
    <div>
      <PageMetaData title={"Dashboard - Ecommerce"} />
      <PageTitle title={"Overview"} subMenu={"Dashboard"} />
      <div className="mt-6">
        <div className="mt-6 grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
        <Suspense fallback={<RevenueChartAndCardSkeleton />}>
        <StatsContextProvider resource={resource2}>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2">
            <DashboardCounterWidget />
          </div>
          <div className="mt-6 grid gap-6 ">
            <div className="xl:col-span-6 lg:order-2">
                <RevenueChart />
            </div>
          </div>
          </StatsContextProvider>
          </Suspense>
          </div>

          <div className="xl:col-span-6 h-full">
          <Suspense fallback={<LatestInvoicesSkeleton numberOfInvoices={6} />}>
            <QuickChat resource={resource} />
          </Suspense>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-5 2xl:grid-cols-12">
          {/*TODO: Hide recent order in small screen due to responsive issue*/}
        </div>
      </div>
    </div>
  );
};
