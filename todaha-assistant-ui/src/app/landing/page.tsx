import PageMetaData from "@/components/PageMetaData";
import ThemeToggleButton from "@/components/ThemeToggleButton";

import { Metadata } from "next";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Package from "./components/Package";
import Showcase from "./components/Showcase";
import Testimonial from "./components/Testimonial";
import Topbar from "./components/Topbar";

//<Package />
//<FAQ />

export const metadata: Metadata = {
    title: "ChatMen SignUp Page",
    description: "This is ChatMen SignUp Page",
    // other metadata
  };
  

export default async function Page() {
    return (
        <>
        <Topbar />
            <Hero />
            <Feature />
            <Showcase />
            <Testimonial />
            <Footer />

        </>
    );
};