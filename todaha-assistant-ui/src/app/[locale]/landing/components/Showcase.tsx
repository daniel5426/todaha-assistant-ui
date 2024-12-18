"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import bgVector1Img from "@/assets/images/landing/section-bg-gradient.png";
import wand2Icon from "@iconify/icons-lucide/wand-2";
import boxIcon from "@iconify/icons-lucide/box";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import Link from "next/link";
import { Button } from "@/components/daisyui";
import Icon from "@/components/Icon";
import routes from "@/services/routes";
import { useLocale, useTranslations } from "next-intl";
import heroLandingImg from "@/assets/images/landing/landing1.png";
import confImg from "@/assets/images/landing/conf1.png";
import confDarkImg from "@/assets/images/landing/conf2.png";
import Image from "next/image";
import heroDarkLandingImg from "@/assets/images/landing/landing2.png";

const FeatureCard = ({ 
  title, 
  description, 
  image, 
  darkImage, 
  isRTL,
  index 
}: { 
  title: string; 
  description: string; 
  image: any;
  darkImage: any;
  isRTL: boolean;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const t = useTranslations("common");

  const variants = {
    hidden: { 
      opacity: 0, 
      x: 0,
      '@media (min-width: 768px)': {
        x: isRTL ? (index % 2 === 0 ? 50 : -50) : (index % 2 === 0 ? -50 : 50)
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="grid gap-8 lg:grid-cols-2 items-center"
    >
      <div 
        className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:order-2'}`}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <div className="inline-block rounded border border-teal-500/5 bg-teal-500/5 p-2.5">
          <Icon icon={boxIcon} fontSize={20} className="text-teal-600" />
        </div>
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="text-base-content/70 leading-relaxed">{description}</p>
        <Link href={routes.contact}>
          <Button
            endIcon={<Icon icon={chevronRightIcon} fontSize={18} />}
            variant="outline"
            size="sm"
            className="hover:scale-105 transition-transform duration-300"
          >
            {t("Start Now")}
          </Button>
        </Link>
      </div>
      
      <motion.div
        className={`relative ${index % 2 === 0 ? 'lg:order-2' : ''}`}
        whileHover={window?.innerWidth >= 768 ? { scale: 1.05 } : {}}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="relative group">
          <Image
            src={image}
            className="rounded-lg shadow-xl dark:hidden"
            width={1000}
            alt={`feature-${index + 1}`}
          />
          <Image
            src={darkImage}
            className="hidden rounded-lg shadow-xl dark:inline"
            width={1000}
            alt={`feature-${index + 1}-dark`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Showcase = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "he";
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: t("metrics_show_h"),
      description: t("metrics_show_b"),
      image: heroLandingImg,
      darkImage: heroDarkLandingImg,
    },
    {
      title: t("conf_show_h"),
      description: t("conf_show_b"),
      image: confImg,
      darkImage: confDarkImg,
    },
  ];

  return (
    <section className="relative py-32" id="features">
      <div
        className="absolute -start-8 -top-8 size-[350px] bg-cover bg-center bg-no-repeat opacity-20 dark:hidden sm:size-[600px]"
        style={{ backgroundImage: `url(${bgVector1Img.src})` }}
      />
      
      <motion.div
        ref={ref}
        initial={{ 
          opacity: 0, 
          y: window?.innerWidth >= 768 ? 20 : 0
        }}
        animate={inView ? { 
          opacity: 1, 
          y: 0 
        } : { 
          opacity: 0,
          y: window?.innerWidth >= 768 ? 20 : 0
        }}
        transition={{ duration: 0.6 }}
        className="container relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ 
              scale: window?.innerWidth >= 768 ? 0 : 1
            }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5"
          >
            <Icon icon={wand2Icon} fontSize={20} className="text-indigo-600" />
          </motion.div>
          <motion.h2
            initial={{ 
              opacity: 0, 
              y: window?.innerWidth >= 768 ? 20 : 0
            }}
            animate={{ 
              opacity: 1, 
              y: 0
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-4xl font-semibold"
          >
            {t("Our Platform")}
          </motion.h2>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isRTL={isRTL}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Showcase;
