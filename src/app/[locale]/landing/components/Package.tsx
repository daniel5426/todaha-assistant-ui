"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Cookies from "js-cookie";
import { createCheckoutSession } from '@/app/lib/data';
import useToast from '@/hooks/use-toast';
import routes from "@/services/routes";

const Package = () => {
    const t = useTranslations("package");
    const locale = useLocale();
    const isRTL = locale === "he";
    const [isLoading, setIsLoading] = useState(false);
    const { toaster } = useToast();

    const handleCheckout = async (priceId: string) => {
        setIsLoading(true);
        const loggedIn = Cookies.get("loggedIn") === "true";
        if (!loggedIn) {
            window.location.href = routes.auth.login;
            return;
        }
        try {
            const { url } = await createCheckoutSession(priceId);
            window.location.href = url;
        } catch (error) {
            console.error('Error:', error);
            toaster.error(t('errorCheckout'));
        } finally {
            setIsLoading(false);
        }
    };

    const tiers = [
        {
            title: t("Starter"),
            price: t("Free"),
            subheader: t("Base"),
            description: [
                t("60k tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
            ],
            excludedFeatures: [
                t("support"),
                t("Custom development by our team")
            ],
            buttonText: t("Start Now"),
            href: routes.dashboard,
            popular: false
        },
        {
            title: t("Standard"),
            price: t("100$"),
            subheader: t("Most Popular"),
            description: [
                t("2M tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
                t("support"),
                t("Custom development by our team")
            ],
            excludedFeatures: [],
            buttonText: t("Buy Now"),
            priceId: 'price_1QOvrSB16lQffSxJhy8KNPs7',
            popular: true
        },
        {
            title: t("Pro"),
            price: t("$700"),
            subheader: t("Enhanced Version"),
            description: [
                t("Unlimited tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
                t("support"),
                t("Custom development by our team")
            ],
            excludedFeatures: [],
            buttonText: t("Buy Now"),
            priceId: 'price_1QOvs3B16lQffSxJ5Hqibeb7',
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t("Packages")}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t("Packages_b")}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={tier.title}
                            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                                tier.popular ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-105'
                            }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center py-2 px-4">
                                    <span className="text-sm font-medium flex items-center justify-center gap-2">
                                        ⭐ {tier.subheader}
                                    </span>
                                </div>
                            )}

                            <div className={`p-8 ${tier.popular ? 'pt-16' : ''}`}>
                                {/* Plan Header */}
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {tier.title}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {tier.price === t("Free") ? tier.price : tier.price}
                                        </span>
                                        {tier.price !== t("Free") && (
                                            <span className="text-gray-500 text-lg">
                                                /{t("per month")}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 mb-8">
                                    {tier.description.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                    
                                    {tier.excludedFeatures.map((feature, featureIndex) => (
                                        <div key={`excluded-${featureIndex}`} className="flex items-center gap-3 opacity-50">
                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-400 line-through">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="mt-auto">
                                    {tier.href ? (
                                        <a
                                            href={tier.href}
                                            className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                                                tier.popular
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                        >
                                            {tier.buttonText}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => tier.priceId && handleCheckout(tier.priceId)}
                                            disabled={isLoading}
                                            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                                tier.popular
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                        >
                                            {isLoading ? t("Processing") : tier.buttonText}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className={`absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20 ${
                                tier.popular ? 'bg-indigo-500' : 'bg-gray-400'
                            }`} />
                            <div className={`absolute -top-2 -left-2 w-16 h-16 rounded-full opacity-5 transition-opacity duration-300 group-hover:opacity-15 ${
                                tier.popular ? 'bg-indigo-500' : 'bg-gray-400'
                            }`} />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div dir={isRTL ? "rtl" : "ltr"} className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
                    <div dir={isRTL ? "rtl" : "ltr"} className={`grid md:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div dir={isRTL ? "rtl" : "ltr"}>
                                <h4 className="font-semibold text-gray-900 mb-1">{t("Easy Setup")}</h4>
                                <p className="text-gray-600 text-sm">{t("easySetupDesc")}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <div dir={isRTL ? "rtl" : "ltr"}>
                                <h4 className="font-semibold text-gray-900 mb-1">{t("24/7 Support")}</h4>
                                <p className="text-gray-600 text-sm">{t("supportDesc")}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <div dir={isRTL ? "rtl" : "ltr"}>
                                <h4 className="font-semibold text-gray-900 mb-1">{t("Custom Dashboard")}</h4>
                                <p className="text-gray-600 text-sm">{t("dashboardDesc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Package;
