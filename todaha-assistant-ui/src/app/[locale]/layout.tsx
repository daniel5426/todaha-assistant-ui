import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "../app";
import "../ui/globals.css";
import { Metadata } from "next";

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
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
