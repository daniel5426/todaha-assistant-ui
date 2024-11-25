import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "../app";
import "../ui/globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Chatbot from "@/components/chatbots/ChatBot";
export const metadata: Metadata = {
  title: {
    template: '%s | Todaha',
    default: 'Todaha',
  },
  description: 'Todaha AI customer support assistant dashboard',
  metadataBase: new URL('https://todaha-chat.com/he/'),
};


export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>

      <head>
      <meta name="facebook-domain-verification" content="je21x2p0aiqdhq8tztmvk0brmrq974" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}
        <Chatbot />

          </ClientProviders>
        </NextIntlClientProvider>

        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}
