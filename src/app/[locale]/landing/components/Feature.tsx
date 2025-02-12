import { motion } from "framer-motion";
import combineIcon from "@iconify/icons-lucide/combine";
import hexagonIcon from "@iconify/icons-lucide/hexagon";
import monitorSmartphoneIcon from "@iconify/icons-lucide/monitor-smartphone";
import pencilRulerIcon from "@iconify/icons-lucide/pencil-ruler";
import wand2Icon from "@iconify/icons-lucide/wand-2";
import Icon from "@/components/Icon";
import { useLocale, useTranslations } from "next-intl";


const Feature = () => {
  const  t  = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale == "he";


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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="relative z-10 mt-20"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container py-12 2xl:py-24 px-10">
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block rounded border border-indigo-500/5 bg-indigo-500/5 p-2.5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon={wand2Icon} fontSize={20} className="text-indigo-600" />
          </motion.div>
          <p className="mt-2 text-3xl font-semibold">{t("shoose")}</p>
          <p className="mt-3 inline-block max-w-md text-base-content/80">
            {t("beyoud")}{" "}
          </p>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:mt-24 2xl:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              className="text-center"
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="inline-block"
                variants={iconVariants}
                whileHover="hover"
              >
                <Icon icon={feature.icon} fontSize={28} />
              </motion.div>
              <motion.p
                className="mt-3 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                {feature.title}
              </motion.p>
              <motion.p
                className="mt-1 text-sm text-base-content/80"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Feature;
