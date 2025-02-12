"use client";
import { IconifyIcon } from "@iconify/react";
import { StaticImageData } from "next/image";

export type IGraphStat = {
    total1: number;
    total2: number;
    change1: number;
    change2: number;
    percent1: number;
    percent2: number;
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

export type CounterCard = {
    icon: IconifyIcon;
    title: string;
    amount: number;
    changes: number;
    changesAmount: number;
    inMoney: boolean;
    subTitle: string;
};

export type IDashboardMessage = {
    image: StaticImageData;
    message: string;
    date: Date;
};
