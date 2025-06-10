"use client";
import testimonialPouyaLandingImg from "@/assets/images/landing/dan.png";
import todaha from "@/assets/images/landing/todaha2.png";
import worldMapLandingImg from "@/assets/images/landing/world-map.png";

import sparklesIcon from "@iconify/icons-lucide/sparkles";
import starIcon from "@iconify/icons-lucide/star";
import quoteIcon from "@iconify/icons-lucide/quote";

import Icon from "@/components/Icon";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Testimonial = () => {
    const t = useTranslations('common');
    const locale = useLocale();
    const isRTL = locale === "he";
    const [isVisible, setIsVisible] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('testimonial');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const testimonials = [
        {
            image: testimonialPouyaLandingImg.src,
            text: t("client_1"),
            name: "Dan Loggia",
            title: "CTO of SmoothGlide",
            rating: 5,
            gradient: "from-indigo-500 to-indigo-600"
        },
        {
            image: todaha.src,
            text: t("client_2"),
            name: "Daniel Ben Yeshoua", 
            title: "CTO of Todaha Corp",
            rating: 5,
            gradient: "from-indigo-600 to-indigo-700"
        }
    ];
  
    return (
        <section id="testimonial" className="relative py-24 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
            {/* Subtle Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
                    style={{ backgroundImage: `url(${worldMapLandingImg})` }}
                />
                <div className="absolute inset-0 bg-indigo-50/30" />
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-400/5 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-400/5 rounded-full blur-xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-400/5 rounded-full blur-xl animate-pulse delay-2000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-lg mb-6">
                        <Icon icon={sparklesIcon} fontSize={24} className="text-indigo-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t("What People Say")}
                    </h2>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
                </div>

                {/* Testimonials Grid */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`group relative transform transition-all duration-700 delay-${index * 200} ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                            }`}
                            onMouseEnter={() => setActiveTestimonial(index)}
                        >
                            {/* Card */}
                            <div className="relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-indigo-200/30 transition-all duration-500 group-hover:scale-[1.02] border border-gray-100">
                                {/* Quote Icon */}
                                <div className={`absolute -top-4 ${isRTL ? 'right-8' : 'left-8'}`}>
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center shadow-lg`}>
                                        <Icon icon={quoteIcon} fontSize={20} className="text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-8">
                                    {/* Stars */}
                                    <div className="flex items-center justify-center gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`transform transition-all duration-300 delay-${i * 100} ${
                                                    isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                                                }`}
                                            >
                                                <Icon 
                                                    icon={starIcon} 
                                                    className="text-yellow-400 svg-path:fill-yellow-400 drop-shadow-sm" 
                                                    fontSize={20} 
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <blockquote className="text-gray-700 text-lg leading-relaxed text-center mb-8 italic relative">
                                        <span className="relative z-10">{testimonial.text}</span>
                                        <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-500" />
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="relative">
                                            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} p-0.5 shadow-lg`}>
                                                <img 
                                                    src={testimonial.image} 
                                                    alt={testimonial.name}
                                                    className="w-full h-full rounded-full object-cover bg-white"
                                                />
                                            </div>
                                            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-500`} />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.title}</p>
                        </div>
                    </div>
                    </div>

                                {/* Subtle Hover Border */}
                                <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>

                            {/* Floating Decoration */}
                            <div className={`absolute -z-20 top-4 ${isRTL ? 'left-4' : 'right-4'} w-24 h-24 bg-indigo-400/5 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500 blur-2xl`} />
                        </div>
                    ))}
                </div>

                {/* Bottom Decoration */}
                <div className={`flex justify-center mt-16 gap-3 transform transition-all duration-1000 delay-500 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                activeTestimonial === index 
                                    ? 'bg-indigo-500 scale-125' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            onClick={() => setActiveTestimonial(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
