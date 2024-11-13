"use client";
import heroGradientImg from "@/assets/images/landing/hero-gradient.png";
import airplayIcon from "@iconify/icons-lucide/airplay";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button, Loading, Tooltip } from "@/components/daisyui";
import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./chatbot"), { ssr: false });


const Hero = () => {
  const t = useTranslations("common");
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Delay showing the chatbot to ensure other content has loaded
    const timer = setTimeout(() => {
      setShowChatbot(true);
    }, 200); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  const locale = useLocale();
  const isRTL = locale === "he";


  return (
    <div>
      <div
        className=" absolute inset-0 rotate-180 bg-cover bg-center bg-no-repeat opacity-20 dark:hidden"
        style={{
          backgroundImage: `url(${heroGradientImg.src})`,
          filter: "blur(4px)",
        }}
      ></div>
      <div className="container relative z-10 py-20 xl:py-40">
        <div 
          className={`grid items-center gap-8 xl:grid-cols-7 xl:gap-20 transition-all duration-700 ${
            showChatbot ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="order-2 xl:order-1 xl:col-span-3">
            <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
              <p className="text-5xl font-semibold leading-normal">
                {t("HOME_HERRO")}
              </p>
              <p className="mt-8 max-w-[500px]">{t("herro_b")}</p>
              <div className={"mt-8 inline-flex items-center gap-3"}>
                <Link href={routes.contact}>
                  <Button
                    color={"primary"}
                    startIcon={<Icon icon={airplayIcon} fontSize={18} />}
                  >
                    {t("Contact")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-2 xl:col-span-4 self-center justify-center" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
