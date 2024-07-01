"use client";
import { Metadata } from "next";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Testimonial from "./components/Testimonial";
import Topbar from "./components/Topbar";
import Package from "./components/Package";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
const ChatBot = dynamic(() => import('@/components/chatbots/ChatBot'), {
    ssr: false,
  });
  
//<Package />
//<FAQ />

  

export default function Page() {
    const locale = useLocale();
    const isRTL = locale === "he";
  
    return (
<div >
    <ChatBot />
        <Topbar />
            <Hero />
            <Feature />
            <Showcase />
            <Testimonial />
            <Package />
            <Footer />
      </div>
    );
};