"use client";
import caseSensitiveIcon from "@iconify/icons-lucide/case-sensitive";
import codeSquareIcon from "@iconify/icons-lucide/code";
import combineIcon from "@iconify/icons-lucide/combine";
import hexagonIcon from "@iconify/icons-lucide/hexagon";
import monitorSmartphoneIcon from "@iconify/icons-lucide/monitor-smartphone";
import pencilLineIcon from "@iconify/icons-lucide/pencil-line";
import pencilRulerIcon from "@iconify/icons-lucide/pencil-ruler";
import sunMoonIcon from "@iconify/icons-lucide/sun-moon";
import wand2Icon from "@iconify/icons-lucide/wand-2";
import useTranslation from "next-translate/useTranslation";
import Icon from "@/components/Icon";


const Feature = () => {
  const { t } = useTranslation("common");

  const features = [
    {
      icon: hexagonIcon,
      title: t("plat_h"),
      description:
      t("plat_b"),
    },
    {
      icon: combineIcon,
      title: t("learn_h"),
      description: t("learn_b"),
    },
    {
      icon: pencilRulerIcon,
      title: t("int_h"),
      description:
      t("int_b"),
    },
    {
      icon: monitorSmartphoneIcon,
      title: t("action_h"),
      description: t("action_b"),
    },
  ] as const;
  
  return (
    <div className="relative z-10">
      <div className="container py-12 2xl:py-24">
        <div className="text-center">
          <div className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5">
            <Icon icon={wand2Icon} fontSize={20} className="text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-semibold">{t("shoose")}</p>
          <p className="mt-3 inline-block max-w-md text-base-content/80">
            {t("beyoud")}{" "}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4 2xl:mt-24 2xl:gap-16">
          {features.map((feature, index) => {
            return (
              <div className="text-center" key={index}>
                <div className="inline-block">
                  <Icon icon={feature.icon} fontSize={28} />
                </div>
                <p className="mt-3 text-lg font-medium">{feature.title}</p>
                <p className="mt-1 text-sm text-base-content/80">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feature;
