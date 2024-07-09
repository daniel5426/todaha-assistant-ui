
"use client"; // Add this line at the very top
import testimonialPouyaLandingImg from "@/assets/images/landing/dan.png";
import todaha from "@/assets/images/landing/todaha2.png";
import worldMapLandingImg from "@/assets/images/landing/world-map.png";

import sparklesIcon from "@iconify/icons-lucide/sparkles";
import starIcon from "@iconify/icons-lucide/star";
import useTranslation from "next-translate/useTranslation";

import Icon from "@/components/Icon";
import { useLocale, useTranslations } from "next-intl";

const Testimonial = () => {
    const  t  = useTranslations('common');
    const locale = useLocale();
    const isRTL = locale === "he";
  
    return (
        <section id="testimonial" className="container relative py-8 lg:py-24 mt-40">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-50"
                style={{ backgroundImage: `url(${worldMapLandingImg})` }}></div>
            <div className="relative"  style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <div className="text-center">
                    <div className="inline-block rounded border border-orange-500/5 bg-orange-500/5 p-2.5">
                        <Icon icon={sparklesIcon} fontSize={20} className="text-orange-600" />
                    </div>
                    <h2 className="mt-1 text-3xl font-semibold">{t("What People Say")}</h2>
                </div>
                <div className="grid gap-12 mt-12 lg:grid-cols-2">
                <div className="mt-16 text-center col-span-1">
                    <div className="avatar">
                        <div className="mask mask-squircle w-14 bg-base-content/10">
                            <img src={testimonialPouyaLandingImg.src} alt="testimonial" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-1">
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                    </div>
                    <p className="mt-4 inline-block max-w-[600px] text-center">
                        {t("client_1")}
                    </p>
                    <p className="mt-8 text-lg font-medium">Dan Loggia</p>
                    <p className="text-sm text-base-content/70">CTO of SmoothGlide</p>
                </div>
                <div className="mt-16 text-center col-span-1">
                    <div className="avatar">
                        <div className="mask mask-circle w-14 bg-base-content/10">
                            <img src={todaha.src} alt="testimonial" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-1">
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                        <Icon icon={starIcon} className="text-orange-400 svg-path:fill-orange-400" fontSize={20} />
                    </div>
                    <p className="mt-4 inline-block max-w-[600px] text-center">
                        {t("client_1")}
                    </p>
                    <p className="mt-8 text-lg font-medium">Daniel Ben Yeshoua</p>
                    <p className="text-sm text-base-content/70">CTO of Todaha Corp</p>
                </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonial;
