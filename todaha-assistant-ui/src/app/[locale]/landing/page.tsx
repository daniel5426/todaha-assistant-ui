"use client";
import { Metadata } from "next";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Testimonial from "./components/Testimonial";
import Topbar from "./components/Topbar";
import Package from "./components/Package";

//<Package />
//<FAQ />

  

export default async function Page() {

    return (
        <>
        <Topbar />
            <Hero />
            <Feature />
            <Showcase />
            <Testimonial />
            <Footer />
            <Package />
        </>
    );
};