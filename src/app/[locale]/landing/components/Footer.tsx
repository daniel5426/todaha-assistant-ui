"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import routes from "@/services/routes";
import Icon from "@/components/Icon";

import facebookIcon from "@iconify/icons-lucide/facebook";
import twitterIcon from "@iconify/icons-lucide/twitter";
import linkedinIcon from "@iconify/icons-lucide/linkedin";
import instagramIcon from "@iconify/icons-lucide/instagram";
import mailIcon from "@iconify/icons-lucide/mail";
import phoneIcon from "@iconify/icons-lucide/phone";
import mapPinIcon from "@iconify/icons-lucide/map-pin";

const Footer = () => {
    const t = useTranslations('footer');
    const locale = useLocale();
    const isRTL = locale === "he";

    const currentYear = new Date().getFullYear();

    const productLinks = [
        { name: t("dashboard"), href: routes.dashboard },
        { name: t("features"), href: routes.landing + "#features" },
        { name: t("pricing"), href: routes.landing + "#pricing" },
        { name: t("integration"), href: routes.landing + "#integration" }
    ];

    const companyLinks = [
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: routes.contact }
    ];

    const legalLinks = [
        { name: t("privacy"), href: "/legal#privacy" },
        { name: t("terms"), href: "/legal#terms" },
    ];

    const socialLinks = [
        { icon: facebookIcon, href: "https://facebook.com", label: "Facebook" },
        { icon: twitterIcon, href: "https://twitter.com", label: "Twitter" },
        { icon: linkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: instagramIcon, href: "https://instagram.com", label: "Instagram" }
    ];

    return (
        <footer className="bg-gray-900 text-white relative z-50" dir={isRTL ? "rtl" : "ltr"}>
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-indigo-400 mb-4">
                                Todaha
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                                {t("companyDescription")}
                            </p>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Icon icon={mailIcon} className="text-indigo-400" fontSize={16} />
                                <span>todaha.ai@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Icon icon={phoneIcon} className="text-indigo-400" fontSize={16} />
                                <span>+972-58-433-5665</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <Icon icon={mapPinIcon} className="text-indigo-400" fontSize={16} />
                                <span>Jerusalem, Israel</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-200 mb-3">{t("followUs")}</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                                        aria-label={social.label}
                                    >
                                        <Icon icon={social.icon} fontSize={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{t("product")}</h4>
                        <ul className="space-y-3">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company & Legal Links Combined */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{t("company")}</h4>
                        <ul className="space-y-3 mb-6">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-lg font-semibold text-white mb-4">{t("legal")}</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-400">
                            © {currentYear} Todaha. {t("allRightsReserved")}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>{t("madeWith")} ❤️ {t("inJerusalem")}</span>
                            <div className="flex items-center gap-1">
                                <span>{t("poweredBy")}</span>
                                <span className="text-indigo-400 font-medium">AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
