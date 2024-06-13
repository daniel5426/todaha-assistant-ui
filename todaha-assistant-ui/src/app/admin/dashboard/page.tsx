"use client";
import PageMetaData from "@/components/PageMetaData";
import PageTitle from "@/components/PageTitle";

import CounterWidget from "./components/CounterWidget";
import QuickChat from "./components/QuickChat";
import RecentOrder from "./components/RecentOrder";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const RevenueChart = dynamic(() => import("./components/RevenueChart"), {
  ssr: false,
});

const EcommerceDashboardPage = () => {
  return (
    <div>
      <PageMetaData title={"Dashboard - Ecommerce"} />
      <PageTitle title={"Overview"} subMenu={"Dashboard"} />
      <div className="mt-6">
        <div className="mt-6 grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2">
            <CounterWidget />
          </div>
          <div className="mt-6 grid gap-6 ">
            <div className="xl:col-span-6 lg:order-2">
                <RevenueChart />
            </div>
          </div>
          </div>

          <div className="xl:col-span-6 h-full">
            <QuickChat />
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-5 2xl:grid-cols-12">
          {/*TODO: Hide recent order in small screen due to responsive issue*/}
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboardPage;
