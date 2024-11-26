"use client";
import bgVector1Img from "@/assets/images/landing/section-bg-gradient.png";

import boxIcon from "@iconify/icons-lucide/box";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/daisyui";
import wand2Icon from "@iconify/icons-lucide/wand-2";

import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { useLocale, useTranslations } from "next-intl";
import heroLandingImg from "@/assets/images/landing/landing1.png";
import confImg from "@/assets/images/landing/conf1.png";
import confDarkImg from "@/assets/images/landing/conf2.png";
import Image from "next/image";
import heroDarkLandingImg from "@/assets/images/landing/landing2.png";

const Showcase = () => {
  const [rating, setRating] = useState(4);

  const [toast, setToast] = useState(false);
  const locale = useLocale();
  const isRTL = locale === "he";

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const t = useTranslations("common");

  return (
    <div className=" mt-56" id="features">
      <div className="text-center">
        <div className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5">
          <Icon icon={wand2Icon} fontSize={20} className="text-indigo-600" />
        </div>
        <p className="mt-2 text-4xl font-semibold" >{t("Our Platform")}</p>
      </div>
      <div className="container relative py-24">
        <div
          className="absolute -start-8 -top-8 size-[350px] bg-cover bg-center bg-no-repeat opacity-20 dark:hidden sm:size-[600px]"
          style={{ backgroundImage: `url(${bgVector1Img})` }}
        ></div>
        <div className="relative z-10 grid gap-12 lg:grid-cols-6 lg:gap-24 mb-36">
          <div className="lg:col-span-3" style={{ direction: isRTL? "rtl": "ltr"}}>
            <div className="inline-block rounded border border-teal-500/5 bg-teal-500/5 p-2.5">
              <Icon icon={boxIcon} fontSize={20} className="text-teal-600" />
            </div>
            <p className="mt-3 text-3xl font-semibold">{t("metrics_show_h")}</p>
            <p className="mt-4 text-base-content/70">{t("metrics_show_b")} </p>
            <div className="mt-6">
              <Link href={routes.contact}>
                <Button
                  endIcon={<Icon icon={chevronRightIcon} fontSize={18} />}
                  variant={"outline"}
                  size={"sm"}
                >
                  {t("Start Now")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="">
              <Image
                src={heroLandingImg}
                className="inline rounded-md shadow-xl dark:hidden"
                width={1000}
                alt="third-image"
              />
              <Image
                src={heroDarkLandingImg}
                className="hidden rounded-md shadow-xl dark:inline"
                width={1000}
                alt="third-image"
              />
            </div>
          </div>
        </div>
        <div className="relative z-10 grid gap-12 lg:grid-cols-6 lg:gap-24">
          <div className="lg:col-span-3" style={{ direction: isRTL? "rtl": "ltr"}}>
            <div className="inline-block rounded border border-teal-500/5 bg-teal-500/5 p-2.5">
              <Icon icon={boxIcon} fontSize={20} className="text-teal-600" />
            </div>
            <p className="mt-3 text-3xl font-semibold">{t("conf_show_h")}</p>
            <p className="mt-4 text-base-content/70">{t("conf_show_b")} </p>
            <div className="mt-6">
              <Link href={routes.contact}>
                <Button
                  endIcon={<Icon icon={chevronRightIcon} fontSize={18} />}
                  variant={"outline"}
                  size={"sm"}
                >
                  {t("Start Now")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="">
              <Image
                src={confImg}
                className="inline rounded-md shadow-xl dark:hidden"
                width={1000}
                alt="third-image"
              />
              <Image
                src={confDarkImg}
                className="hidden rounded-md shadow-xl dark:inline"
                width={1000}
                alt="third-image"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Showcase;
