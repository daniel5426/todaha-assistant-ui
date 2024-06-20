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
        key: "auth",
        icon: shieldCheckIcon,
        label: "Auth",
        children: [
            {
                key: "auth-login",
                label: "Login",
                url: routes.auth.login,
            },
            {
                key: "auth-register",
                label: "Register",
                url: routes.auth.register,
            },
            {
                key: "auth-forgot-password",
                label: "Forgot Password",
                url: routes.auth.forgotPassword,
            },
            {
                key: "auth-reset-password",
                label: "Reset Password",
                url: routes.auth.resetPassword,
            },
        ],
    },
    {
        key: "docs",
        icon: bookOpenTextIcon,
        label: "Documentation",
        url: routes.docs,
    },
];
