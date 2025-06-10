"use client";

import { useLocale, useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Head from "next/head";

import calendarIcon from "@iconify/icons-lucide/calendar";
import clockIcon from "@iconify/icons-lucide/clock";
import userIcon from "@iconify/icons-lucide/user";
import arrowRightIcon from "@iconify/icons-lucide/arrow-right";
import brainIcon from "@iconify/icons-lucide/brain";
import robotIcon from "@iconify/icons-lucide/bot";
import trendingUpIcon from "@iconify/icons-lucide/trending-up";

export default function BlogPage() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const isRTL = locale === "he";

    const blogPosts = [
        {
            id: 1,
            title: t("post1Title"),
            excerpt: t("post1Excerpt"),
            author: "Daniel Ben Yeshoua",
            date: "December 15, 2024",
            readTime: t("readTime5"),
            category: t("categoryAI"),
            icon: brainIcon,
            gradient: "from-purple-500 to-indigo-600",
            href: "/blog/future-of-ai-customer-service"
        },
        {
            id: 2,
            title: t("post2Title"),
            excerpt: t("post2Excerpt"),
            author: "Dan Loggia",
            date: "December 10, 2024",
            readTime: t("readTime7"),
            category: t("categoryBusiness"),
            icon: robotIcon,
            gradient: "from-blue-500 to-cyan-600",
            href: "/blog/implementing-ai-chatbots"
        },
        {
            id: 3,
            title: t("post3Title"),
            excerpt: t("post3Excerpt"),
            author: "Daniel Ben Yeshoua",
            date: "December 5, 2024",
            readTime: t("readTime6"),
            category: t("categoryTrends"),
            icon: trendingUpIcon,
            gradient: "from-green-500 to-emerald-600",
            href: "/blog/ai-automation-trends-2025"
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
                <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                {t("heroTitle")}
                            </h1>
                            <p className="text-xl text-indigo-100 leading-relaxed">
                                {t("heroSubtitle")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    {t("latestPosts")}
                                </h2>
                                <p className="text-xl text-gray-600">
                                    {t("latestPostsSubtitle")}
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {blogPosts.map((post, index) => (
                                    <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                        {/* Visual Header */}
                                        <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                                            <Icon icon={post.icon} fontSize={80} className="text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            {/* Category */}
                                            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                                                {post.category}
                                            </span>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-gray-600 mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Icon icon={userIcon} fontSize={14} />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Icon icon={calendarIcon} fontSize={14} />
                                                        <span>{post.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Icon icon={clockIcon} fontSize={14} />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Read More Button */}
                                            <a
                                                href={post.href}
                                                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-300"
                                            >
                                                {t("readMore")}
                                                <Icon icon={arrowRightIcon} fontSize={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                {t("newsletterTitle")}
                            </h2>
                            <p className="text-xl text-indigo-100 mb-8">
                                {t("newsletterSubtitle")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                    {t("subscribeButton")}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 