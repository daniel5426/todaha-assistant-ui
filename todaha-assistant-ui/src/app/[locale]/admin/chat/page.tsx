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

  
export default function ChatApp () {
    const t = useTranslations("dashboard");
    return (
        <>

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
                <ChatContextProvider >
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