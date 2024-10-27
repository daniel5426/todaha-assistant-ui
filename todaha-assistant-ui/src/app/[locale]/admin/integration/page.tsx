"use client"
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { useAuthContext } from "@/states/auth";
import Image from 'next/image';
import PageTitle from '@/components/PageTitle';
import { useTranslations } from 'next-intl';

export default function Customization() {
    const { state } = useAuthContext();
    const [chatbotCode, setChatbotCode] = useState('');
    const t = useTranslations("integration");

    useEffect(() => {
        if (state.user?.assistant.id) {
            setChatbotCode(`<chatbot-component assistantid="${state.user.assistant.id}"></chatbot-component>
<script src="https://todaha-chatbots-q9x.vercel.app/base-lib.js"
data-id="${state.user.assistant.id}"></script>`);
        }
    }, [state.user?.assistant.id]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(chatbotCode);
    };

    return (
        <div className="container mx-auto px-4" >
            <div className="grid grid-cols-4 gap-8">
                {/* Tabs Column */}
                <div className="col-span-3">
                    <Tabs defaultValue="shopify" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-8 ">
                            <TabsTrigger value="shopify" className="flex items-center gap-2">
                                <Image
                                    src="/images/shopify-logo.png"
                                    alt="Shopify"
                                    width={20}
                                    height={20}
                                />
                                Shopify
                            </TabsTrigger>
                            <TabsTrigger value="wordpress" className="flex items-center gap-2">
                                <Image
                                    src="/images/wordpress-logo.png"
                                    alt="WordPress"
                                    width={20}
                                    height={20}
                                />
                                WordPress
                            </TabsTrigger>
                            <TabsTrigger value="wix" className="flex items-center gap-2">
                                <Image
                                    src="/images/wix-logo.png"
                                    alt="Wix"
                                    width={20}
                                    height={20}
                                />
                                Wix
                            </TabsTrigger>
                            <TabsTrigger value="react" className="flex items-center gap-2">
                                <Image
                                    src="/images/react-logo.png"
                                    alt="React"
                                    width={20}
                                    height={20}
                                />
                                React
                            </TabsTrigger>
                            <TabsTrigger value="squarespace" className="flex items-center gap-2">
                                <Image
                                    src="/images/squarespace-logo.png"
                                    alt="Squarespace"
                                    width={20}
                                    height={20}
                                />
                                Squarespace
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="shopify">
                            <h2 className="text-xl font-semibold mb-4">{t("shopify.title")}</h2>
                            <ol className="list-decimal list-inside space-y-4 text-sm">
                                <li>{t("shopify.steps.login")}</li>
                                <li>{t("shopify.steps.store")}</li>
                                <li>{t("shopify.steps.theme")}</li>
                                <li>{t("shopify.steps.file")}</li>
                                <li>{t("shopify.steps.tag").replace('body', '</body>')}</li>
                                <li>{t("shopify.steps.paste").replace('body', '</body>')}</li>
                                <div className="relative">
                                    <pre className="text-sm font-light p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                                        <code>{chatbotCode}</code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {t("copy")}
                                    </button>
                                </div>
                                <li>{t("shopify.steps.save")}</li>
                            </ol>
                        </TabsContent>

                        <TabsContent value="wordpress">
                            <h2 className="text-xl font-semibold mb-4">{t("wordpress.title")}</h2>
                            <ol className="list-decimal list-inside space-y-4 text-sm" >
                                <li>{t("wordpress.steps.login")}</li>
                                <li>{t("wordpress.steps.editor")}</li>
                                <li>{t("wordpress.steps.file")}</li>
                                <li>{t("wordpress.steps.tag").replace('body', '</body>')}</li>
                                <li>{t("wordpress.steps.paste").replace('body', '</body>')}</li>
                                <div className="relative">
                                    <pre className="text-sm font-light p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                                        <code>{chatbotCode}</code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {t("copy")}
                                    </button>
                                </div>
                                <li>{t("wordpress.steps.save")}</li>
                            </ol>
                        </TabsContent>

                        <TabsContent value="wix">
                            <h2 className="text-xl font-semibold mb-4">{t("wix.title")}</h2>
                            <ol className="list-decimal list-inside space-y-4 text-sm">
                                <li>{t("wix.steps.login")}</li>
                                <li>{t("wix.steps.settings")}</li>
                                <li>{t("wix.steps.custom")}</li>
                                <li>{t("wix.steps.add")}</li>
                                <li>{t("wix.steps.name")}</li>
                                <li>{t("wix.steps.paste")}</li>
                                <div className="relative">
                                    <pre className="text-sm font-light p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                                        <code>{chatbotCode}</code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {t("copy")}
                                    </button>
                                </div>
                                <li>{t("wix.steps.body")}</li>
                                <li>{t("wix.steps.pages")}</li>
                                <li>{t("wix.steps.save")}</li>
                            </ol>
                        </TabsContent>

                        <TabsContent value="react">
                            <h2 className="text-xl font-semibold mb-4">{t("react.title")}</h2>
                            <ol className="list-decimal list-inside space-y-4 text-sm">
                                <li>{t("react.steps.open")}</li>
                                <li>{t("react.steps.tag").replace('body', '</body>')}</li>
                                <li>{t("react.steps.paste").replace('body', '</body>')}</li>
                                <div className="relative">
                                    <pre className="text-sm font-light p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                                        <code>{chatbotCode}</code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {t("copy")}
                                    </button>
                                </div>
                                <li>{t("react.steps.save")}</li>
                                <li>{t("react.steps.done")}</li>
                            </ol>
                        </TabsContent>

                        <TabsContent value="squarespace">
                            <h2 className="text-xl font-semibold mb-4">{t("squarespace.title")}</h2>
                            <ol className="list-decimal list-inside space-y-4 text-sm">
                                <li>{t("squarespace.steps.login")}</li>
                                <li>{t("squarespace.steps.settings")}</li>
                                <li>{t("squarespace.steps.scroll")}</li>
                                <li>{t("squarespace.steps.paste")}</li>
                                <div className="relative">
                                    <pre className="text-sm font-light p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                                        <code>{chatbotCode}</code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {t("copy")}
                                    </button>
                                </div>
                                <li>{t("squarespace.steps.save")}</li>
                            </ol>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Description Column */}
                <div className="col-span-1">
                    <div className="bg-gray-800 text-white rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
                        <p className="text-sm">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
