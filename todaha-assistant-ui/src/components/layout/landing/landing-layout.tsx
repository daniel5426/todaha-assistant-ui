"use client";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useLocale } from "next-intl";
import { Toaster } from "sonner";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = locale === "he";
  return (
    <><div className="size-full" style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {children}
      <Toaster richColors />

      <div className="fixed bottom-5 end-5 z-10 ">
        <ThemeToggleButton
          shape="circle"
          color="ghost"
          className={
            "border border-base-content/10 text-base-content/70 hover:bg-base-content/10"
          }
        />
      </div>
      </div>
    </>
  );
}
