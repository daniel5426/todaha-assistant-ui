"use client";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import  { DashboardCounterWidget } from "../../components/CounterWidget";
import QuickChat from "../../components/QuickChat";
import RevenueChart from "../../components/RevenueChart";
import { Suspense } from "react";
import {LatestInvoicesSkeleton, RevenueChartAndCardSkeleton} from "../../components/loading";
import { useTranslations } from "next-intl";


// Create a context to hold your data
export default function EcommerceDashboardPage () {
  const t = useTranslations("dashboard");

  return (
    <div>
      <PageMetaData title={"Dashboard"} />
      <PageTitle title={t("Overview")} subMenu={t("Dashboard")} />
      <div className="mt-6">
        <div className="mt-6 grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
        <Suspense fallback={<RevenueChartAndCardSkeleton />}>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2">
            <DashboardCounterWidget />
          </div>
          <div className="mt-6 grid gap-6 ">
            <div className="xl:col-span-6 lg:order-2">
                <RevenueChart />
            </div>
          </div>
          </Suspense>
          </div>

          <div className="xl:col-span-6 h-full">
          <Suspense fallback={<LatestInvoicesSkeleton numberOfInvoices={7} />}>
            <QuickChat />
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
