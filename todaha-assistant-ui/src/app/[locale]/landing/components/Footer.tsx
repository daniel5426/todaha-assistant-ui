"use client"; // Add this line at the very top

import mobileHeroDarkLandingImg from "@/assets/images/landing/mobile-hero-dark.png";
import mobileHeroLandingImg from "@/assets/images/landing/mobile-hero.png";

import shoppingCartIcon from "@iconify/icons-lucide/shopping-cart";

import { Button, Link } from "@/components/daisyui";

import Icon from "@/components/Icon";
import routes from "@/services/routes";
import useTranslation from "next-translate/useTranslation";
import { useTranslations } from "next-intl";

const Footer = async  () => {
    const  t  = useTranslations('common');

    return (
        <div className="">
            <div className="container py-16">
                <div className="relative grid items-center overflow-hidden rounded-xl bg-primary/5 py-0 lg:grid-cols-3">
                    <div className="col-span-2 p-4 text-center md:p-8">
                        <p className="text-xl font-medium md:text-2xl"> {t("footer_h")}</p>
                        <p className="mt-4 text-base-content/70"> {t("footer_b1")}
                        <br/>  {t("footer_b2")} </p>

                        <div className="mt-6 inline-flex items-center gap-3">
                            <Link href={routes.externalLinks.purchase}>
                                <Button color={"primary"} startIcon={<Icon icon={shoppingCartIcon} fontSize={16} />}>
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="-mt-8 hidden h-96 rotate-[15deg] lg:inline">
                        <img src={mobileHeroLandingImg.src} alt="mobile-landing" className="inline dark:hidden" />
                        <img src={mobileHeroDarkLandingImg.src} alt="mobile-landing" className="hidden dark:inline" />
                    </div>
                </div>
                <div className="mt-12 text-center">
                </div>
            </div>
        </div>
    );
};

export default Footer;
