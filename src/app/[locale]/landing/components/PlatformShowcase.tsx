"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

const platforms = [
  {
    id: "shopify",
    name: "Shopify",
    logo: "/images/shopify-logo.png",
    color: "bg-green-500",
    users: "2M+",
    descriptionKey: "platforms.shopify.description"
  },
  {
    id: "wordpress", 
    name: "WordPress",
    logo: "/images/wordpress-logo.png",
    color: "bg-blue-600",
    users: "60M+",
    descriptionKey: "platforms.wordpress.description"
  },
  {
    id: "wix",
    name: "Wix", 
    logo: "/images/wix-logo.png",
    color: "bg-purple-600",
    users: "220M+",
    descriptionKey: "platforms.wix.description"
  },
  {
    id: "react",
    name: "React",
    logo: "/images/react-logo.png", 
    color: "bg-cyan-500",
    users: "20M+",
    descriptionKey: "platforms.react.description"
  },
  {
    id: "squarespace",
    name: "Squarespace",
    logo: "/images/squarespace-logo.png",
    color: "bg-black",
    users: "4M+", 
    descriptionKey: "platforms.squarespace.description"
  }
];

const IntegrationPreview = ({ platform }: { platform: typeof platforms[0] }) => {

  return (
    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">{platform.name.toLowerCase()}.com</span>
      </div>
      <div className="space-y-1">
        <div className="typing-animation">
          <span>&lt;chatbot-component</span>
        </div>
        <div className="typing-animation" style={{ animationDelay: '0.5s' }}>
          <span className="ml-4">assistantid=&quot;your-id&quot;</span>
        </div>
        <div className="typing-animation" style={{ animationDelay: '1s' }}>
          <span>&gt;&lt;/chatbot-component&gt;</span>
        </div>
        <div className="typing-animation" style={{ animationDelay: '1.5s' }}>
          <span>&lt;script src=&quot;base-lib.js&quot;&gt;</span>
        </div>
        <div className="typing-animation" style={{ animationDelay: '2s' }}>
          <span>&lt;/script&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default function PlatformShowcase() {
  const t = useTranslations();
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const currentLocale = useLocale();
  const isRightToLeft = currentLocale === "he";

  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setSelectedPlatform((prev) => (prev + 1) % platforms.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handlePlatformClick = (index: number) => {
    setSelectedPlatform(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  return (
    <section id="integration" className="py-24 bg-white" dir={isRightToLeft ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("platforms.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("platforms.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {platforms.map((platform, index) => (
              <div
                key={platform.id}
                onClick={() => handlePlatformClick(index)}
                className={`
                  cursor-pointer group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl
                  ${selectedPlatform === index 
                    ? 'border-primary shadow-lg scale-105 bg-primary/5' 
                    : 'border-gray-100 hover:border-gray-200'
                  }
                `}
              >
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={platform.logo}
                      alt={platform.name}
                      fill
                      className="object-contain"
                    />
                    {selectedPlatform === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.users} users</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-50 rounded-2xl p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {platforms[selectedPlatform].name} {t("platforms.integration")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t(platforms[selectedPlatform].descriptionKey)}
                </p>
                <IntegrationPreview platform={platforms[selectedPlatform]} />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("platforms.features.quick.title")}</h4>
                    <p className="text-gray-600">{t("platforms.features.quick.description")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🔧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("platforms.features.noCode.title")}</h4>
                    <p className="text-gray-600">{t("platforms.features.noCode.description")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("platforms.features.universal.title")}</h4>
                    <p className="text-gray-600">{t("platforms.features.universal.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .typing-animation {
          opacity: 0;
          animation: typeIn 0.5s ease-in-out forwards;
        }

        @keyframes typeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
} 