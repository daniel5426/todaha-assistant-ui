"use client";
import PageMetaData from "@/components/PageMetaData";
import { DeepChat } from "deep-chat-react";

import dynamic from 'next/dynamic';

// Dynamically import ChatList component
import ChatList from './components/ChatList';
import MessageList from './components/MessageList';

import { ChatContextProvider } from "./use-chat";

import { Suspense } from "react";
import { LatestInvoicesSkeleton } from "../components/loading";
import { fetchChatsWithSuspense } from "@/app/lib/data";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";

const getOption = (
  ): ApexOptions => {
    return {
      theme: {
        mode: "light",},
      chart: {
        height: 380,
        type: "bar",
        stacked: true,
        // parentHeightOffset: 0,
        background: "transparent",
  
        toolbar: {
          show: false,
        },
      },
  
      plotOptions: {
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3e60d5", "#3ed5b9"],
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 6,
      },
      series: [
        {
          name: "Messages",
          data: [],
        },
      ],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
      },
    },
  
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
      },
      grid: {
        show: false,
      },
    };
  };
  
export default function ChatApp () {
    const resource = fetchChatsWithSuspense(1, 7);
    const options = getOption();
    const t = useTranslations("dashboard");
    return (
        <>
          <ReactApexChart
            options={options}
            height={0}
            type={"bar"}
            series={options.series}
          ></ReactApexChart>

            <PageMetaData title={"Chat"} />

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-9">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{t("Conversation your AI had")}</h3>
                    </div>
                </div>
            </div>
            <div className="mt-6">
            <Suspense fallback={<LatestInvoicesSkeleton numberOfInvoices={7}/>}>
                <ChatContextProvider resource={resource} >
                    <div className="grid gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-3">
                            <ChatList />
                        </div>
                        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-9">
                            <MessageList />
                        </div>
                    </div>
                </ChatContextProvider>
                </Suspense>
            </div>
        </>
    );
};