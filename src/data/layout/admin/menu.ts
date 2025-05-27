"use client";
import airplayIcon from "@iconify/icons-lucide/airplay";
import bookOpenTextIcon from "@iconify/icons-lucide/book-open-text";
import fileIcon from "@iconify/icons-lucide/file";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import messagesSquareIcon from "@iconify/icons-lucide/messages-square";
import packageIcon from "@iconify/icons-lucide/package";
import serverIcon from "@iconify/icons-lucide/server";
import shieldCheckIcon from "@iconify/icons-lucide/shield-check";
import graphIcon from "@iconify/icons-lucide/area-chart";
import starIcon from "@iconify/icons-lucide/star";
import userIcon from "@iconify/icons-lucide/user";
import routes from "@/services/routes";
import { IMenuItem } from "@/types/layout/admin";

export const adminMenuItems: IMenuItem[] = [
    {
        key: "dashboard",
        icon: airplayIcon,
        label: "Dashboard",
        url: routes.dashboard,
    },
    {
        key: "label-pages",
        isTitle: true,
        label: "Metrics",
    },

    {
        key: "data-chat",
        icon: messagesSquareIcon,
        label: "Chat",
        url: routes.admin.chat,
    },
    {
        key: "data-statistics",
        icon: graphIcon,
        label: "Statistics",
        url: routes.admin.statistics,
    },
    {
        key: "label-pages",
        isTitle: true,
        label: "Configuration",
    },
    {
        key: "config-ai",
        icon: starIcon,
        label: "AI assistant",
        url: routes.admin.configuration,
    },
    {
        key: "config-chatbot",
        icon: messagesSquareIcon,
        label: "Chatbot",
        url: routes.admin.customization,
    },
    {
        key: "config-integration",
        icon: serverIcon,
        label: "Integration",
        url: routes.admin.integration,
    },
    {
        key: "settig-pages",
        isTitle: true,
        label: "Settings",
    },
    {
        key: "account",
        icon: userIcon,
        label: "Account",
        url: routes.admin.account,
    },
    {
        key: "plan-and-billing",
        icon: fileIcon,
        label: "plan and billing",
        url: routes.admin.account + '?billing=true',
    },






    {
        key: "label-pages",
        isTitle: true,
        label: "Pages",
    },
    {
        key: "landing",
        icon: fileIcon,
        label: "Landing",
        url: routes.landing,
    },
    {
        key: "contact",
        icon: fileIcon,
        label: "Contact",
        url: routes.contact,
    },

];
