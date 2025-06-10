"use client";

import { useLocale, useTranslations } from "next-intl";
import Head from "next/head";
import Icon from "@/components/Icon";

import shieldIcon from "@iconify/icons-lucide/shield-check";
import lockIcon from "@iconify/icons-lucide/lock";
import eyeIcon from "@iconify/icons-lucide/eye";
import clockIcon from "@iconify/icons-lucide/clock";

export default function PrivacyPage() {
    const t = useTranslations("privacy");
    const locale = useLocale();
    const isRTL = locale === "he";

    const sections = [
        {
            icon: eyeIcon,
            title: t("dataCollectionTitle"),
            content: t("dataCollectionContent")
        },
        {
            icon: lockIcon,
            title: t("dataProtectionTitle"),
            content: t("dataProtectionContent")
        },
        {
            icon: shieldIcon,
            title: t("dataUsageTitle"),
            content: t("dataUsageContent")
        },
        {
            icon: clockIcon,
            title: t("dataRetentionTitle"),
            content: t("dataRetentionContent")
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
                <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                                <Icon icon={shieldIcon} fontSize={32} />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                {t("heroTitle")}
                            </h1>
                            <p className="text-xl text-indigo-100 leading-relaxed">
                                {t("heroSubtitle")}
                            </p>
                            <p className="text-sm text-indigo-200 mt-4">
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

                            {/* Privacy Sections */}
                            <div className="space-y-8">
                                {sections.map((section, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <Icon icon={section.icon} fontSize={24} className="text-indigo-600" />
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
                            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white mt-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    {t("contactTitle")}
                                </h3>
                                <p className="text-indigo-100 mb-4">
                                    {t("contactContent")}
                                </p>
                                <div className="space-y-2">
                                    <p><strong>{t("email")}:</strong> privacy@todaha.ai</p>
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