"use client";

import { useLocale, useTranslations } from "next-intl";
import Head from "next/head";
import Topbar from "../landing/components/Topbar";
import Footer from "../landing/components/Footer";

export default function LegalPage() {
    const t = useTranslations("legal");
    const locale = useLocale();
    const isRTL = locale === "he";

    return (
        <>
            <Head>
                <title>{t("pageTitle")} - Todaha</title>
                <meta name="description" content={t("pageDescription")} />
            </Head>

            <Topbar />
            
            <main className="min-h-screen pt-20" dir={isRTL ? "rtl" : "ltr"}>
                {/* Header Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {t("headerTitle")}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                {t("headerSubtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Privacy Policy Section */}
                <section id="privacy" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                {t("privacyTitle")}
                            </h2>
                            
                            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("privacySection1Title")}
                                    </h3>
                                    <p className="mb-4">{t("privacySection1Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("privacySection2Title")}
                                    </h3>
                                    <p className="mb-4">{t("privacySection2Content")}</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>{t("privacyDataType1")}</li>
                                        <li>{t("privacyDataType2")}</li>
                                        <li>{t("privacyDataType3")}</li>
                                        <li>{t("privacyDataType4")}</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("privacySection3Title")}
                                    </h3>
                                    <p className="mb-4">{t("privacySection3Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("privacySection4Title")}
                                    </h3>
                                    <p className="mb-4">{t("privacySection4Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("privacySection5Title")}
                                    </h3>
                                    <p className="mb-4">{t("privacySection5Content")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terms of Service Section */}
                <section id="terms" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                {t("termsTitle")}
                            </h2>
                            
                            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection1Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection1Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection2Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection2Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection3Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection3Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection4Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection4Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection5Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection5Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection6Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection6Content")}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t("termsSection7Title")}
                                    </h3>
                                    <p className="mb-4">{t("termsSection7Content")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t("contactTitle")}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {t("contactSubtitle")}
                            </p>
                            <a
                                href="mailto:todaha.ai@gmail.com"
                                className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-300 hover:opacity-90"
                                style={{ backgroundColor: '#216CAC' }}
                            >
                                {t("contactButton")}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
} 