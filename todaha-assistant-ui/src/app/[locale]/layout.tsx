import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "../app";
import "../ui/globals.css";
import { Metadata } from "next";
import Head from 'next/head';
import FacebookPixel from "../facebook/FacebookPixel";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
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
            <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '348946278245470');
fbq('track', 'PageView');

          `,
        }}
      />

      <head>
      <meta name="facebook-domain-verification" content="je21x2p0aiqdhq8tztmvk0brmrq974" />
      
        </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}
          </ClientProviders>
        </NextIntlClientProvider>
        <Analytics />

      </body>
    </html>
  );
}
