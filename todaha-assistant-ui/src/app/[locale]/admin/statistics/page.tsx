"use client";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import QuickChat from "../components/QuickChat";
import RevenueChart from "../components/RevenueChart";
import { Suspense } from "react";
import {
  LatestInvoicesSkeleton,
  RevenueChartAndCardSkeleton,
} from "../components/loading";
import {
  fetchChatsWithSuspense,
  fetchStatisticsWithSuspense,
} from "@/app/lib/data";
import { StatsContextProvider } from "../use-stats";
import { MessagesChart, ThreadChart } from "../components/StatisticsCharts";
import { StatsCounterWidget } from "../components/CounterWidget";
import { useAuthContext } from "@/states/auth";

// Create a context to hold your data
export default function EcommerceDashboardPage() {
  const { state } = useAuthContext();

  const resource2 = fetchStatisticsWithSuspense(
  );

  return (
    <div>
      <PageMetaData title={"Dashboard - Ecommerce"} />
      <PageTitle title={"Overview"} subMenu={"Dashboard"} />
      <div className="mt-6">
        <Suspense fallback={<RevenueChartAndCardSkeleton />}>
          <StatsContextProvider resource={resource2}>
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              <StatsCounterWidget />
            </div>
            <div className="mt-6 grid gap-6 xl:grid-cols-12">
              <div className="xl:col-span-6">
                <MessagesChart />
              </div>
              <div className="xl:col-span-6">
                <ThreadChart />
              </div>
            </div>
          </StatsContextProvider>
        </Suspense>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-5 2xl:grid-cols-12">
        {/*TODO: Hide recent order in small screen due to responsive issue*/}
      </div>
    </div>
  );
}
