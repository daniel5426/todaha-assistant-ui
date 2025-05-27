"use client";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Testimonial from "./components/Testimonial";
import Topbar from "./components/Topbar";
import Package from "./components/Package";
import Head from "next/head";
import { useTranslations } from "next-intl";

//<Package />
//<FAQ />

export default function Page() {
  const t = useTranslations("head");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta
          name="description"
          content={t("description")}
        />
        <meta property="og:title" content={t("ogTitle")} />
        <meta
          property="og:description"
          content={t("ogDescription")}
        />
      </Head>

      <main className="relative">
        <div className="z-0">
          <Topbar />
          <Hero />
          <Feature />
          <Showcase />
          <Testimonial />
          <Package />
          <Footer />
        </div>
      </main>
    </>
  );
}
