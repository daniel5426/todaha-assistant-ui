"use client";
import bgVector1Img from "@/assets/images/landing/section-bg-gradient.png";
import chatbot1 from "@/assets/images/landing/chat-bot1.png";
import chatbot2 from "@/assets/images/landing/chat-bot2.png";

import boxIcon from "@iconify/icons-lucide/box";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/daisyui";
import useTranslation from "next-translate/useTranslation";

import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { useTranslations } from "next-intl";

const Showcase = () => {
  const [rating, setRating] = useState(4);

  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const  t  = useTranslations('common');

  return (
    <div className="" id="features">
      <div className="container relative py-24">
        <div
          className="absolute -start-8 -top-8 size-[350px] bg-cover bg-center bg-no-repeat opacity-20 dark:hidden sm:size-[600px]"
          style={{ backgroundImage: `url(${bgVector1Img})` }}
        ></div>
        <div className="relative z-10 grid gap-12 lg:grid-cols-7 lg:gap-24">
          <div className="lg:col-span-4">
            <div className="inline-block rounded border border-teal-500/5 bg-teal-500/5 p-2.5">
              <Icon icon={boxIcon} fontSize={20} className="text-teal-600" />
            </div>
            <p className="mt-3 text-3xl font-semibold">{t("web_int_h")}</p>
            <p className="mt-4 text-base-content/70">{t("web_int_b")} </p>
            <div className="mt-6">
              <Link href={routes.contact}>
                <Button
                  endIcon={<Icon icon={chevronRightIcon} fontSize={18} />}
                  variant={"outline"}
                  size={"sm"}
                >
                  {t("Contact")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
              <div className="diff aspect-[23/18]">
                <div className="h-auto carousel carousel-vertical rounded-box">
                  <div className="carousel-item h-full justify-center">
                    <img
                      src={chatbot1.src}
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item h-full justify-center">
                    <img
                      src={chatbot2.src}
                      alt="Burger"
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
