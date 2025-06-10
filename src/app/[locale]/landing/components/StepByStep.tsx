"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: 1,
    icon: "⚙️",
    titleKey: "stepByStep.step1.title",
    descriptionKey: "stepByStep.step1.description",
    visual: "config"
  },
  {
    id: 2,
    icon: "📄",
    titleKey: "stepByStep.step2.title", 
    descriptionKey: "stepByStep.step2.description",
    visual: "upload"
  },
  {
    id: 3,
    icon: "🎨",
    titleKey: "stepByStep.step3.title",
    descriptionKey: "stepByStep.step3.description", 
    visual: "customize"
  },
  {
    id: 4,
    icon: "🔗",
    titleKey: "stepByStep.step4.title",
    descriptionKey: "stepByStep.step4.description",
    visual: "integrate"
  }
];

const StepVisual = ({ type, isActive, isRightToLeft }: { type: string; isActive: boolean; isRightToLeft: boolean }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const t = useTranslations("stepByStep.visuals");
  const baseClasses = "w-full h-full rounded-2xl border-2 transition-all duration-500 flex items-center justify-center p-6";
  const activeClasses = isActive ? "border-primary bg-gradient-to-br from-primary/5 to-blue-50 scale-105" : "border-gray-200 bg-gray-50";
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const renderVisual = () => {
    switch (type) {
      case "config":
        return (
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t("configuration.title")}</h3>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">{t("configuration.welcomeMessage")}</div>
                  <div className={`h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">{t("configuration.initialQuestions")}</div>
                  <div className={`h-3 bg-gradient-to-r from-green-200 to-green-300 rounded transition-all duration-1000 delay-300 ${isActive ? 'w-4/5' : 'w-0'}`}></div>
                  <div className={`h-3 bg-gradient-to-r from-green-200 to-green-300 rounded transition-all duration-1000 delay-500 ${isActive ? 'w-3/4' : 'w-0'}`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">{t("configuration.aiInstructions")}</div>
                  <div className={`h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded transition-all duration-1000 delay-700 ${isActive ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <div className={`px-4 py-2 bg-primary text-white text-xs rounded-lg transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  {t("configuration.saveSettings")}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-md">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                <span>{t("configuration.configuringAI")}</span>
              </div>
            </div>
          </div>
        );
        
      case "upload":
        return (
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t("upload.title")}</h3>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${animationStep >= i ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌐</div>
                    <div className="text-sm font-medium text-blue-800">{t("upload.websiteContent")}</div>
                    <div className={`mt-2 h-2 bg-blue-200 rounded overflow-hidden ${isActive ? 'w-full' : 'w-0'} transition-all duration-2000`}>
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {['📄 FAQ.pdf', '📊 Products.xlsx', '📝 Guide.docx', '🎯 Policies.pdf'].map((file, index) => (
                    <div key={file} className={`p-3 bg-gray-50 rounded-lg border transition-all duration-500 ${animationStep >= index ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                      <div className="text-xs font-mono">{file}</div>
                      <div className={`mt-1 h-1 bg-gray-200 rounded overflow-hidden ${animationStep >= index ? 'w-full' : 'w-0'} transition-all duration-1000`}>
                        <div className="h-full bg-green-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span>{t("upload.trainingAI")}</span>
              </div>
            </div>
          </div>
        );
        
      case "customize":
        return (
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t("customization.title")}</h3>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎨</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t("customization.colors")}</span>
                  <div className="flex gap-2">
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'].map((color, index) => (
                      <div key={color} className={`w-6 h-6 rounded-full ${color} transition-all duration-300 ${animationStep === index ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-gray-600">{t("customization.logoBranding")}</span>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center transition-all duration-500 ${isActive ? 'rotate-0' : 'rotate-45'}`}>
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-300 rounded mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-gray-600">{t("customization.positionStyle")}</span>
                  <div className="bg-gray-100 rounded-lg p-3 relative h-16">
                    <div className={`absolute transition-all duration-1000 ${
                      animationStep === 0 ? 'bottom-2 right-2' :
                      animationStep === 1 ? 'bottom-2 left-2' :
                      animationStep === 2 ? 'top-2 right-2' : 'top-2 left-2'
                    }`}>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">💬</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-md">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                <span>{t("customization.applyingStyle")}</span>
              </div>
            </div>
          </div>
        );
        
      case "integrate":
        return (
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t("integration.title")}</h3>
                <div className="flex gap-2">
                  {['🛍️', '📝', '🎨', '⚛️', '📱'].map((emoji, index) => (
                    <div key={index} className={`w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs transition-all duration-300 ${animationStep === index ? 'bg-green-100 scale-110' : ''}`}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 relative overflow-hidden">
                  <div className="space-y-1">
                    {[
                      '<chatbot-component',
                      '  assistantid="your-id"',
                      '></chatbot-component>',
                      '<script src="base-lib.js">',
                      '</script>'
                    ].map((line, index) => (
                      <div key={index} className={`transition-all duration-500 transform ${isActive && animationStep >= index ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                        {line}
                      </div>
                    ))}
                  </div>
                  
                  <div className={`absolute top-2 ${isRightToLeft ? 'right-2' : 'left-2'}`}>
                    <div className={`px-2 py-1 bg-blue-500 text-white text-xs rounded transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      {t("integration.copy")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t("integration.deployStatus")}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                    <span className={`transition-all duration-500 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {isActive ? t("integration.live") : t("integration.pending")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span>{t("integration.chatbotGoingLive")}</span>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`${baseClasses} ${activeClasses}`}>
      {renderVisual()}
    </div>
  );
};

export default function StepByStep() {
  const t = useTranslations();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentLocale = useLocale();
  const isRightToLeft = currentLocale === "he";
    
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.current.findIndex(ref => ref === entry.target);
          if (stepIndex !== -1) {
            setActiveStep(stepIndex);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" dir={isRightToLeft ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("stepByStep.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("stepByStep.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sticky Visual Panel - Follows scroll */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border overflow-hidden transition-all duration-700 ease-out">
                <StepVisual type={steps[activeStep]?.visual || "config"} isActive={true} isRightToLeft={isRightToLeft} />
              </div>
              
              {/* Step Progress Indicator */}
              <div className="mt-6 flex justify-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === activeStep 
                        ? 'w-8 bg-gray-700' 
                        : index < activeStep 
                          ? 'w-6 bg-gray-500' 
                          : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Current Step Indicator */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <span className="text-2xl">{steps[activeStep]?.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Steps Content */}
            <div className="lg:space-y-40">
              {/* Add some top padding to align with sticky visual */}
              <div className=""></div>
              
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`transition-all duration-700 ease-out transform ${
                    activeStep === index 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-70 translate-y-4 scale-95'
                  }`}
                >
                  <div className="flex items-start" dir={isRightToLeft ? "rtl" : "ltr"}>
                    <div className={`
                      flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 transform
                      ${activeStep === index 
                        ? 'bg-gray-700 text-white shadow-lg scale-110 ring-4 ring-gray-700/20' 
                        : activeStep > index
                          ? 'bg-green-500 text-white shadow-md scale-100'
                          : 'bg-gray-100 text-gray-600 scale-95'
                      }
                    `}>
                      {activeStep > index ? '✓' : step.icon}
                    </div>
                    <div className="flex-1 px-7">
                      <div className={`transition-all duration-500 ${
                        activeStep === index ? 'transform translate-x-0' : 'transform translate-x-2'
                      }`}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {t(step.titleKey)}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {t(step.descriptionKey)}
                        </p>
                        {activeStep === index && (
                          <div className="mt-6 space-y-3">
                            <div className="h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-pulse"></div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <div className="w-2 h-2 bg-gray-700 rounded-full animate-ping"></div>
                              <span>{t("stepByStep.visuals.status.currentlyActive")}</span>
                            </div>
                          </div>
                        )}
                        {activeStep > index && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 font-medium">
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            <span>{t("stepByStep.visuals.status.completed")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add some bottom padding */}
              <div className="lg:h-32"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 