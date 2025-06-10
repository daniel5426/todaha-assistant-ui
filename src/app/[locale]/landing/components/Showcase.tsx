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

  const isEven = index % 2 === 0;
  
  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      rotateX: isEven ? -45 : 45,
      rotateY: isEven ? 25 : -25,
      z: -200
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };

  const blobPath = isEven 
    ? "M60.5,102.5C96.3,102.5,129,82.6,145.9,50.4C162.8,18.2,160.2,-20.8,137.3,-39.2C114.3,-57.5,71.1,-55.3,34.9,-35.8C-1.3,-16.3,-30.5,20.5,-47.2,52.8C-63.9,85.1,-68.1,112.9,-51.6,123.7C-35.1,134.5,-17.3,128.3,5.8,127.5C28.9,126.7,57.8,130.8,60.5,102.5Z"
    : "M37.1,72.3C55.4,72.3,73.6,59.1,84.8,36.2C96,13.3,100.2,-18.3,88.6,-38.2C77,-58.1,49.6,-66.3,22.4,-57.8C-4.8,-49.3,-31.8,-24.1,-44.3,8.9C-56.8,41.9,-54.8,82.7,-40.2,98.2C-25.6,113.7,-8.4,103.9,12.1,97.4C32.6,90.9,56.4,87.7,37.1,72.3Z";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`relative ${isEven ? 'lg:ml-20' : 'lg:mr-20 lg:mt-32'}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className={`grid gap-12 lg:grid-cols-2 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
        <motion.div 
          className={`relative z-20 space-y-8 ${isEven ? '' : 'lg:col-start-2'}`}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          variants={{
            hidden: { opacity: 0, x: isEven ? -100 : 100 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/20 blur-xl rounded-full animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl">
              <Icon icon={boxIcon} fontSize={28} className="text-teal-400" />
            </div>
          </div>
          
          <h3 className="text-4xl font-black bg-gradient-to-br from-gray-900 via-purple-800 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent leading-tight">
            {title}
          </h3>
          
          <p className="text-xl text-base-content/80 leading-relaxed font-medium">
            {description}
          </p>
          
          <Link href={routes.auth.register}>
            <Button
              endIcon={<Icon icon={chevronRightIcon} fontSize={20} />}
              variant="outline"
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-teal-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-teal-400/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">{t("Start Now")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          className={`relative ${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}
          variants={{
            hidden: { opacity: 0, scale: 0.5, rotateY: isEven ? 90 : -90 },
            visible: { opacity: 1, scale: 1, rotateY: 0 }
          }}
          whileHover={{ 
            scale: 1.05,
            rotateY: isEven ? 5 : -5,
            rotateX: 5,
            transition: { duration: 0.4 }
          }}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-br from-purple-400/30 via-pink-400/20 to-cyan-400/30 blur-3xl rounded-full animate-pulse" />
            
            <div 
              className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl"
              style={{
                clipPath: `path('${blobPath}')`,
                transform: 'scale(2.5) translate(20%, 15%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 mix-blend-overlay" />
              
              <motion.div
                className="relative"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
              >
                <Image
                  src={image}
                  className="dark:hidden w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  width={800}
                  alt={`feature-${index + 1}`}
                  style={{
                    filter: "contrast(1.2) saturate(1.1) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))"
                  }}
                />
                <Image
                  src={darkImage}
                  className="hidden dark:inline w-full h-auto object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  width={800}
                  alt={`feature-${index + 1}-dark`}
                  style={{
                    filter: "contrast(1.2) saturate(1.1) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))"
                  }}
                />
              </motion.div>
            </div>
            
            <div className="absolute top-1/4 -right-8 w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-bounce delay-300" />
            <div className="absolute bottom-1/3 -left-6 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-500" />
            <div className="absolute top-2/3 right-12 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce delay-700" />
          </div>
        </motion.div>
      </div>
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
    <section className="relative py-40 overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
      
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/10 to-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="absolute top-20 left-[10%] w-px h-40 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent animate-pulse" />
      <div className="absolute bottom-32 right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse delay-500" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="container relative z-10"
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="text-center mb-32"
          initial={{ 
            opacity: 0, 
            y: 100,
            rotateX: -45
          }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            rotateX: 0
          } : { 
            opacity: 0,
            y: 100,
            rotateX: -45
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 blur-xl rounded-full animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 shadow-2xl">
              <Icon icon={wand2Icon} fontSize={32} className="text-purple-400" />
            </div>
          </div>
          
          <h2 className="text-7xl font-black bg-gradient-to-br from-gray-900 via-purple-600 via-pink-500 to-cyan-600 dark:from-white dark:via-purple-200 dark:via-pink-200 dark:to-cyan-200 bg-clip-text text-transparent leading-none mb-6">
            {t("Our Platform")}
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full" />
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-32 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-48">
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
