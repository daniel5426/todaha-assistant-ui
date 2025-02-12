"use client";
import heroGradientImg from "@/assets/images/landing/hero-gradient.png";
import airplayIcon from "@iconify/icons-lucide/airplay";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button, Loading, Tooltip } from "@/components/daisyui";
import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { Suspense, useEffect, useRef, useState } from "react";
import AIcon from "../../../../assets/images/avatars/logo.png";
import UserIcon from "../../../../assets/images/avatars/user1.png";
import { motion } from "framer-motion";
import { useLayoutContext } from "@/states/layout";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import Chatbot from "./chatbot";

const Hero = () => {
  const t = useTranslations("common");
  const [showChatbot, setShowChatbot] = useState(false);
  const chatElementRef = useRef<any>(null); // Adjust type as per actual DeepChat component
  const assistantId = "asst_RTpyDTujpSkjYe7rhoVc66ut"; // Adjust based on your assistant ID
  const currentLocale = useLocale();
  const isRightToLeft = currentLocale === "he";

  useEffect(() => {
    // Delay showing the chatbot to ensure other content has loaded
    const timer = setTimeout(() => {
      setShowChatbot(true);
    }, 200); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 rotate-180 bg-cover bg-center bg-no-repeat dark:hidden"
        style={{
          backgroundImage: `url(${heroGradientImg.src})`,
          filter: "blur(4px)",
        }}
      />
      <div className="container relative z-10 py-20 xl:py-40">
        <div className="grid items-center gap-6 xl:gap-20 xl:grid-cols-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 px-4 xl:px-0 xl:order-1 xl:col-span-3 ml-5"
          >
            <div style={{ direction: isRightToLeft ? "rtl" : "ltr" }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl xl:text-5xl font-semibold leading-normal"
              >
                {t("HOME_HERRO")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 max-w-[500px]"
              >
                {t("herro_b")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-8 inline-flex items-center gap-3"
              >
                <Link href={routes.contact}>
                  <Button
                    color={"primary"}
                    startIcon={<Icon icon={airplayIcon} fontSize={18} />}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    {t("Contact")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          {window.innerWidth > 1100 ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 w-full px-4 xl:px-0 xl:order-2 xl:col-span-3 relative flex justify-center items-center"
            >
                <Chatbot />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute bottom-[-3px] right-[85%] hidden lg:block"
              >
                <svg
                  width="160"
                  height="120"
                  viewBox="0 0 160 140"
                  className="transform rotate-[160deg]"
                >
                  <path
                    d="M10,10 Q60,60 90,40 T160,110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="dark:stroke-white stroke-black"
                    style={{
                      strokeDasharray: "5,5",
                      filter: "url(#roughness)",
                    }}
                  />
                  <defs>
                    <filter id="roughness">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.03"
                        numOctaves="2"
                      />
                      <feDisplacementMap in="SourceGraphic" scale="1" />
                    </filter>
                  </defs>
                </svg>
                <span
                  className="absolute -left-24 bottom-[70px] -rotate-12 text-xl"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
                  }}
                >
                  {t("Ask a question!")}
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-2xl">
                <Chatbot />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
