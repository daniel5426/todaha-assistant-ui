"use client";

import { useLocale, useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Head from "next/head";
import Topbar from "../landing/components/Topbar";
import Footer from "../landing/components/Footer";

import targetsIcon from "@iconify/icons-lucide/target";
import heartIcon from "@iconify/icons-lucide/heart";
import usersIcon from "@iconify/icons-lucide/users";
import rocketIcon from "@iconify/icons-lucide/rocket";
import brainIcon from "@iconify/icons-lucide/brain";
import globeIcon from "@iconify/icons-lucide/globe";

export default function AboutPage() {
    const t = useTranslations("about");
    const locale = useLocale();
    const isRTL = locale === "he";

    const values = [
        {
            icon: brainIcon,
            title: t("innovationTitle"),
            description: t("innovationDesc")
        },
        {
            icon: heartIcon,
            title: t("customerFirstTitle"),
            description: t("customerFirstDesc")
        },
        {
            icon: globeIcon,
            title: t("accessibilityTitle"),
            description: t("accessibilityDesc")
        },
        {
            icon: rocketIcon,
            title: t("excellenceTitle"),
            description: t("excellenceDesc")
        }
    ];

    const team = [
        {
            name: "Daniel Benassayag",
            role: t("ceoRole"),
            description: t("ceoDesc"),
            image: "/team/daniel.jpg"
        },
        {
            name: "Avraham Labouze",
            role: t("ctoRole"),
            description: t("ctoDesc"),
            image: "/team/avraham.jpg"
        }
    ];

    return (
        <>
            <Head>
                <title>{t("pageTitle")} - Todaha</title>
                <meta name="description" content={t("pageDescription")} />
            </Head>

            <Topbar />
            
            <main className="min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
                {/* Hero Section with Mission */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {t("heroTitle")}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
                                {t("heroSubtitle")}
                            </p>
                            
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                                <Icon icon={targetsIcon} fontSize={32} className="text-gray-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                {t("missionTitle")}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                {t("missionDescription")}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t("missionExtended")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t("valuesTitle")}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {t("valuesSubtitle")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {values.map((value, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                                        <Icon icon={value.icon} fontSize={24} className="text-gray-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t("teamTitle")}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {t("teamSubtitle")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {team.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center shadow-lg" style={{ backgroundColor: '#216CAC' }}>
                                        <Icon icon={usersIcon} fontSize={60} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="font-medium mb-3" style={{ color: '#216CAC' }}>
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                                        {member.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t("ctaTitle")}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {t("ctaSubtitle")}
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-300 hover:opacity-90"
                                style={{ backgroundColor: '#216CAC' }}
                            >
                                {t("ctaButton")}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
} 