"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const features = [
  {
    id: "customization",
    titleKey: "advancedFeatures.customization.title",
    descriptionKey: "advancedFeatures.customization.description", 
    icon: "🎨",
    visual: "customization",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "analytics",
    titleKey: "advancedFeatures.analytics.title",
    descriptionKey: "advancedFeatures.analytics.description",
    icon: "📊", 
    visual: "analytics",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "conversations",
    titleKey: "advancedFeatures.conversations.title",
    descriptionKey: "advancedFeatures.conversations.description",
    icon: "💬",
    visual: "conversations",
    color: "from-orange-500 to-red-500"
  }
];

const FeatureVisual = ({ type, isActive }: { type: string; isActive: boolean }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const t = useTranslations("advancedFeatures.visuals");

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const renderVisual = () => {
    switch (type) {
      case "customization":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">{t("customization.chatbotStyle")}</span>
                <div className="flex gap-2">
                  <div className={`w-4 h-4 rounded ${animationStep === 0 ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-gray-300'} transition-all duration-500`}></div>
                  <div className={`w-4 h-4 rounded ${animationStep === 1 ? 'bg-green-500 ring-2 ring-green-200' : 'bg-gray-300'} transition-all duration-500`}></div>
                  <div className={`w-4 h-4 rounded ${animationStep === 2 ? 'bg-purple-500 ring-2 ring-purple-200' : 'bg-gray-300'} transition-all duration-500`}></div>
                </div>
              </div>
              <div className={`h-8 rounded mb-3 transition-all duration-500 ${
                animationStep === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                animationStep === 1 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                animationStep === 2 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}></div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium mb-1">{t("customization.colorThemes")}</div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-medium mb-1">{t("customization.brandingOptions")}</div>
                  <div className="text-gray-600">Logo, Fonts, Position</div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">{t("customization.realTimeCustomization")}</div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4 border">
              <div className="mb-4">
                <div className="flex justify-between items-end h-24 mb-2 bg-gray-50 rounded p-2">
                  {[45, 65, 82, 58, 78, 95, 73].map((height, index) => (
                    <div key={index} className="flex flex-col items-center justify-end h-full">
                      <div
                        className={`bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-1000 ease-out w-6`}
                        style={{
                          height: `${isActive ? height : 20}%`,
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{t("analytics.days.mon")}</span>
                  <span>{t("analytics.days.tue")}</span>
                  <span>{t("analytics.days.wed")}</span>
                  <span>{t("analytics.days.thu")}</span>
                  <span>{t("analytics.days.fri")}</span>
                  <span>{t("analytics.days.sat")}</span>
                  <span>{t("analytics.days.sun")}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="font-bold text-blue-600">187</div>
                  <div className="text-gray-600">{t("analytics.conversations")}</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="font-bold text-green-600">2.4k</div>
                  <div className="text-gray-600">{t("analytics.messages")}</div>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center">
                  <div className="font-bold text-purple-600">89</div>
                  <div className="text-gray-600">{t("analytics.clientsHelped")}</div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">{t("analytics.weeklyStats")}</div>
          </div>
        );
      case "conversations":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4 border space-y-3">
              {[
                { 
                  user: t("conversations.customer"), 
                  message: t("conversations.customerMessage1"), 
                  time: t("conversations.timeAgo.2min"),
                  isBot: false 
                },
                { 
                  user: t("conversations.aiBot"), 
                  message: t("conversations.botResponse1"), 
                  time: t("conversations.timeAgo.2min"),
                  isBot: true 
                },
                { 
                  user: t("conversations.customer"), 
                  message: t("conversations.customerMessage2"), 
                  time: t("conversations.timeAgo.1min"),
                  isBot: false 
                },
                { 
                  user: t("conversations.aiBot"), 
                  message: t("conversations.botResponse2"), 
                  time: t("conversations.timeAgo.1min"),
                  isBot: true 
                },
                { 
                  user: t("conversations.customer"), 
                  message: t("conversations.customerMessage3"), 
                  time: t("conversations.timeAgo.30sec"),
                  isBot: false 
                }
              ].map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 transition-all duration-500 transform ${
                    isActive && animationStep >= Math.floor(index / 2) ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 400}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    chat.isBot ? 'bg-primary text-white' : 'bg-gray-300'
                  }`}>
                    {chat.isBot ? '🤖' : '👤'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`rounded-lg p-2 text-xs max-w-[200px] ${
                      chat.isBot ? 'bg-primary/10 text-primary-700' : 'bg-gray-100'
                    }`}>
                      <p className="break-words">{chat.message}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-medium">{chat.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-3">
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{t("conversations.liveMonitoring")}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      {renderVisual()}
    </div>
  );
};

export default function AdvancedFeatures() {
  const t = useTranslations();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isManuallyChanged, setIsManuallyChanged] = useState(false);
  const currentLocale = useLocale();
  const isRightToLeft = currentLocale === "he";

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isManuallyChanged) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isManuallyChanged]);

  useEffect(() => {
    if (isManuallyChanged) {
      const resetTimer = setTimeout(() => {
        setIsManuallyChanged(false);
      }, 10000);

      return () => clearTimeout(resetTimer);
    }
  }, [isManuallyChanged]);

  const handleFeatureClick = (index: number) => {
    console.log('Feature clicked:', index); // Debug log
    setActiveFeature(index);
    setIsManuallyChanged(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" dir={isRightToLeft ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("advancedFeatures.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("advancedFeatures.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(index);
                  }}
                  className={`
                    cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98] relative z-10 pointer-events-auto
                    ${activeFeature === index 
                      ? 'border-primary bg-primary/5 shadow-lg transform scale-[1.02]' 
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-start gap-4 pointer-events-none">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300
                      ${activeFeature === index 
                        ? `bg-gradient-to-r ${feature.color} text-white shadow-lg` 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                      }
                    `}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {t(feature.descriptionKey)}
                      </p>
                      {activeFeature === index && (
                        <div className={`mt-3 h-1 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center gap-2 mt-6 relative z-10">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeatureClick(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 pointer-events-auto ${
                      activeFeature === index 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Switch to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 relative z-0">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border overflow-hidden">
                <FeatureVisual 
                  type={features[activeFeature].visual} 
                  isActive={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 pt-48">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-2xl mx-auto mb-4">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("advancedFeatures.benefits.performance.title")}</h3>
            <p className="text-gray-600">{t("advancedFeatures.benefits.performance.description")}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-2xl mx-auto mb-4">
              🔒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("advancedFeatures.benefits.security.title")}</h3>
            <p className="text-gray-600">{t("advancedFeatures.benefits.security.description")}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-2xl mx-auto mb-4">
              📈
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("advancedFeatures.benefits.scalability.title")}</h3>
            <p className="text-gray-600">{t("advancedFeatures.benefits.scalability.description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
} 