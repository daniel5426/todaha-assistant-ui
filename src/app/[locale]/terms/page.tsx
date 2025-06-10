"use client";

import { useLocale, useTranslations } from "next-intl";
import Head from "next/head";
import Icon from "@/components/Icon";

import fileTextIcon from "@iconify/icons-lucide/file-text";
import scaleIcon from "@iconify/icons-lucide/scale";
import userCheckIcon from "@iconify/icons-lucide/user-check";
import alertTriangleIcon from "@iconify/icons-lucide/alert-triangle";

export default function TermsPage() {
    const t = useTranslations("terms");
    const locale = useLocale();
    const isRTL = locale === "he";

    const sections = [
        {
            icon: userCheckIcon,
            title: t("acceptanceTitle"),
            content: t("acceptanceContent")
        },
        {
            icon: fileTextIcon,
            title: t("servicesTitle"),
            content: t("servicesContent")
        },
        {
            icon: scaleIcon,
            title: t("responsibilitiesTitle"),
            content: t("responsibilitiesContent")
        },
        {
            icon: alertTriangleIcon,
            title: t("limitationsTitle"),
            content: t("limitationsContent")
        }
    ];

    return (
        <>
            <Head>
                <title>{t("pageTitle")} - Todaha</title>
                <meta name="description" content={t("pageDescription")} />
            </Head>

            <main className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-slate-600 to-slate-800 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                                <Icon icon={scaleIcon} fontSize={32} />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                {t("heroTitle")}
                            </h1>
                            <p className="text-xl text-slate-100 leading-relaxed">
                                {t("heroSubtitle")}
                            </p>
                            <p className="text-sm text-slate-200 mt-4">
                                {t("lastUpdated")}: December 15, 2024
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Introduction */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    {t("introTitle")}
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {t("introContent")}
                                </p>
                            </div>

                            {/* Terms Sections */}
                            <div className="space-y-8">
                                {sections.map((section, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                                <Icon icon={section.icon} fontSize={24} className="text-slate-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {section.title}
                                            </h3>
                                        </div>
                                        <div className="text-gray-600 leading-relaxed space-y-4">
                                            {section.content.split('\n').map((paragraph, pIndex) => (
                                                <p key={pIndex}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl p-8 text-white mt-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    {t("contactTitle")}
                                </h3>
                                <p className="text-slate-100 mb-4">
                                    {t("contactContent")}
                                </p>
                                <div className="space-y-2">
                                    <p><strong>{t("email")}:</strong> legal@todaha.ai</p>
                                    <p><strong>{t("address")}:</strong> Jerusalem, Israel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 