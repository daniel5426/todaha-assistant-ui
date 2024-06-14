"use client";
import product1Img from "@/assets/images/apps/ecommerce/products/1.jpg";
import product2Img from "@/assets/images/apps/ecommerce/products/2.jpg";
import product3Img from "@/assets/images/apps/ecommerce/products/3.jpg";
import product4Img from "@/assets/images/apps/ecommerce/products/4.jpg";
import avatar1 from "@/assets/images/avatars/1.png";
import avatar2 from "@/assets/images/avatars/2.png";
import avatar3 from "@/assets/images/avatars/3.png";
import avatar4 from "@/assets/images/avatars/4.png";

import circleDollarSignIcon from "@iconify/icons-lucide/circle-dollar-sign";
import eraserIcon from "@iconify/icons-lucide/eraser";
import packageIcon from "@iconify/icons-lucide/package";
import usersIcon from "@iconify/icons-lucide/users";

import DateUtil from "@/helpers/utils/date";
import {
    IEcommerceDashboardCounter,
    IEcommerceDashboardMessage,
    IEcommerceDashboardOrder,
    IEcommerceDashboardRevenueDuration,
    IEcommerceDashboardRevenueStat,
    IEcommerceDashboardUserInteraction,
} from "@/types/dashboards/ecommerce";
import { IGraphDuration } from "@/types/dashboards/chat_statistics";

const dailyOrders = [10, 12, 14, 16, 18, 20, 14, 16, 18, 12];
const dailyRevenues = [15, 24, 21, 28, 30, 40, 22, 32, 34, 20];

export const getEcommerceDashboardCounterData: IEcommerceDashboardCounter[] = [
    {
        icon: circleDollarSignIcon,
        amount: 587.54,
        title: "Revenue",
        changes: 10.8,
        changesAmount: 112.58,
        inMoney: true,
    },
    {
        icon: packageIcon,
        amount: 4500,
        title: "Sales",
        changes: 21.2,
        changesAmount: 25,
        inMoney: false,
    },
];

export const getEcommerceDashboardRevenueStatData: Record<
IGraphDuration,
    IEcommerceDashboardRevenueStat
> = {
    day: {
        amount: 541,
        percent: 2.14,
        series: dailyOrders.map((orders, index) => {
            return {
                date: DateUtil.minusDays(10 - index),
                orders: orders,
                revenues: dailyRevenues[index] * (Math.random() + 0.5),
            };
        }),
    },
    month: {
        amount: 1241,
        percent: 4.59,
        series: dailyOrders.map((orders, index) => {
            return {
                date: DateUtil.minusMonths(10 - index),
                orders: orders * 30,
                revenues: dailyRevenues[index] * (Math.random() * 10 + 10),
            };
        }),
    },
    hour: {
        amount: 12547,
        percent: 3.24,
        series: dailyOrders.map((orders, index) => {
            return {
                date: DateUtil.minusYears(10 - index),
                orders: orders * 365,
                revenues: dailyRevenues[index] * (Math.random() * 100 + 60),
            };
        }),
    },
};

export const getEcommerceDashboardMessageData: IEcommerceDashboardMessage[] = [
    {
        image: avatar1,
        name: "MiJohnson",
        date: DateUtil.minusMinutes(0),
        message: "It's called 'Dreamscape.' A must-watch!",
    },
    {
        image: avatar2,
        name: "Ethan Patel",
        date: DateUtil.minusMinutes(100),
        message: "Just got a new book. Excited to start reading.",
    },
    {
        image: avatar3,
        name: "Sophia Nguyen",
        date: DateUtil.minusMinutes(200),
        message: "How's your day going?",
    },
    {
        image: avatar4,
        name: "Emily Chen",
        date: DateUtil.minusMinutes(300),
        message: "Did you see that amazing sunset yesterday?",
    },
    {
        image: avatar4,
        name: "Eily Chen",
        date: DateUtil.minusMinutes(400),
        message: "Did you see that amazing sunset yesterday?",
    },
    {
        image: avatar4,
        name: "Emi Chen",
        date: DateUtil.minusMinutes(500),
        message: "Did you see that amazing sunset yesterday?",
    },
    {
        image: avatar4,
        name: " Chen",
        date: DateUtil.minusMinutes(600),
        message: "Did you see that amazing sunset yesterday?",
    },
    {
        image: avatar4,
        name: "Emily ",
        date: DateUtil.minusMinutes(700),
        message: "Did you see that amazing sunset yesterday?",
    },
];

export const getEcommerceDashboardOrderData: IEcommerceDashboardOrder[] = [
    {
        id: 1,
        amount: 99,
        status: "delivered",
        name: "Men's tracking shoes",
        image: product1Img,
        date: DateUtil.minusDays(1),
        category: "Fashion",
    },
    {
        id: 2,
        amount: 99,
        status: "on_going",

        name: "Cocooil body oil",
        image: product2Img,
        date: DateUtil.minusDays(4),
        category: "Daily Need",
    },
    {
        id: 3,
        amount: 99,
        status: "delivered",
        name: "Freeze air ",
        image: product3Img,
        date: DateUtil.minusDays(9),
        category: "Cosmetic",
    },
    {
        id: 4,
        amount: 99,
        status: "cancelled",

        name: "Ladies's shoes",
        image: product4Img,
        date: DateUtil.minusDays(3),
        category: "Fashion",
    },
];

export const getEcommerceDashboardUserInteractionData: IEcommerceDashboardUserInteraction[] = [
    {
        title: "Users",
        amount: "427",
        percent: 3.15,
    },
    {
        title: "Sessions",
        amount: "34",
        percent: -2.78,
    },
    {
        title: "Bounce Rate",
        amount: "40.5%",
        percent: 5.14,
    },
];
