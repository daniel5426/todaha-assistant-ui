"use client";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Testimonial from "./components/Testimonial";
import Topbar from "./components/Topbar";
import Package from "./components/Package";

//<Package />
//<FAQ />

export default function Page() {
  return (
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
  );
}
