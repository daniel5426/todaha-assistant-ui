import checkIcon from "@iconify/icons-lucide/check";
import dollarSignIcon from "@iconify/icons-lucide/dollar-sign";
import xCircleIcon from "@iconify/icons-lucide/x-circle";

import Link from "next/link";

import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import axios from "axios";
import { createCheckoutSession } from '@/app/lib/data';
import useToast from '@/hooks/use-toast';

const Package = () => {
    const t = useTranslations("package");
    const locale = useLocale();
    const isRTL = locale === "he";
    const [isLoading, setIsLoading] = useState(false);
    const { toaster } = useToast();

    const handleCheckout = async (priceId: string) => {
        setIsLoading(true);
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

    return (
        <div className="" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <div className="container py-24">
                <div className="text-center">
                    <div className="inline-block rounded border border-green-500/5 bg-green-500/5 p-2.5">
                        <Icon icon={dollarSignIcon} fontSize={20} className="text-green-600" />
                    </div>
                    <p className="mt-1 text-3xl font-semibold">{t("Packages")}</p>
                    <p className="mt-3 inline-block max-w-sm text-base-content/70">
                        {t("Packages_b")}
                    </p>
                </div>
                <div className="mt-8 grid gap-6 lg:grid-cols-3 xl:gap-12">
                    <div className="rounded border border-base-content/10 p-6">
                        <div className="inline rounded bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                            {t("Base")}
                        </div>
                        <p className="mt-8 text-sm text-base-content/70">{t("Perfect for small bussisness")}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-xl font-medium">{t("Starter")}</p>
                            <p className="text-2xl font-semibold text-blue-600">{t("Free")}</p>
                            <p className="mt-2 text-sm text-base-content/70">{t("The first month")}</p>
                        </div>
                        <p className="mt-8 text-sm text-base-content/70">{t("What's Included:")}</p>
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("5000 Messages")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("1 AI Assistant")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Our Platform")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Customization Service")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={xCircleIcon} fontSize={16} className="" />
                                <p>{t("support")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={xCircleIcon} fontSize={16} className="" />
                                <p>{t("Custom development by our team")}</p>
                            </div>
                        </div>
                        <button
                            className="btn btn-ghost btn-block mt-10 border-base-content/10"
                            onClick={() => handleCheckout('price_1QHRGuB16lQffSxJZsYPRlHW')}
                            disabled={isLoading}
                        >
                            {isLoading ? t("Processing...") : t("Buy Now")}
                        </button>
                    </div>
                    <div className="rounded border border-base-content/10 p-6">
                        <div className="inline rounded bg-primary px-3 py-1 text-sm font-medium text-primary-content">
                            {t("Most Popular")}
                        </div>
                        <p className="mt-8 text-sm text-base-content/70">{t("Perfect for medium bussisness")}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-xl font-medium">{t("Standard")}</p>
                            <p className="text-2xl font-semibold text-blue-600">{t("Free")}</p>
                            <p className="mt-2 text-sm text-base-content/70">{t("The first month")}</p>
                        </div>
                        <p className="mt-8 text-sm text-base-content/70">{t("What's Included:")}</p>
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("7000 Messages")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("2 AI Assistant")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Our Platform")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Customization Service")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("support")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Custom development by our team")}</p>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-block mt-10 border-base-content/10"
                            onClick={() => handleCheckout('price_1QH4cjB16lQffSxJZTGQLYvi')}
                            disabled={isLoading}
                        >
                            {isLoading ? t("Processing...") : t("Buy Now")}
                        </button>
                    </div>
                    <div className="rounded border border-base-content/10 p-6">
                        <div className="inline rounded bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600">
                            {t("Enhanced Version")}
                        </div>

                        <p className="mt-8 text-sm text-base-content/70">{t("Perfect for big bussisness")}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-xl font-medium">{t("Pro")}</p>
                            <p className="text-2xl font-semibold">{t("$700")}</p>
                        </div>
                        <p className="mt-8 text-sm text-base-content/70">{t("What's Included:")}</p>
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("10000 Messages")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("3 AI Assistant")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Our Platform")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Customization Service")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("support")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon icon={checkIcon} fontSize={16} className="text-green-500" />
                                <p>{t("Custom development by our team")}</p>
                            </div>
                        </div>

                        <button
                            className="btn btn-ghost btn-outline btn-block mt-10 border-base-content/10"
                            onClick={() => handleCheckout('price_1QH4cjB16lQffSxJZTGQLYvi')}
                            disabled={isLoading}
                        >
                            {isLoading ? t("Processing...") : t("Buy Now")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;
