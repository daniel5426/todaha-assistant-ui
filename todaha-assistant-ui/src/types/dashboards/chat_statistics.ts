"use client";
import { IconifyIcon } from "@iconify/react";
import { StaticImageData } from "next/image";

export type IGraphStat = {
    total: number;
    percent: number;
    series: IGraphStatSeries[];
};

export type IGraphStatSeries = {
    date: Date;
    value1: number;
    value2: number;
};

export type ICardStat = {
    title: string;
    amount: string;
    percent: number;
};

export type IGraphDuration = "day" | "month" | "hour";

export type IEcommerceDashboardCounter = {
    icon: IconifyIcon;
    title: string;
    amount: number;
    changes: number;
    changesAmount: number;
    inMoney: boolean;
};

export type IDashboardMessage = {
    image: StaticImageData;
    name: string;
    message: string;
    date: Date;
};
