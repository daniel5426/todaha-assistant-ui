"use client";
import AuthLayout from "@/components/layout/auth";
import { useLocale } from "next-intl";

export default async function Layout({ children }: { children: any }) {
  const locale = useLocale();
  const isRTL = locale === "he";
  return (
      <div >
        <AuthLayout><div style={{direction: isRTL? "rtl": "ltr"}}>{children}</div></AuthLayout>
      </div>
  );
};