import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "../app";
import "../ui/globals.css";
import ChatModal from "@/components/chatbots/ChatModal";
import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("@/components/chatbots/ChatBot"), {ssr: false});


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
      <></>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
        <ChatModal />
        <ChatBot />
      </body>
    </html>
  );
}
