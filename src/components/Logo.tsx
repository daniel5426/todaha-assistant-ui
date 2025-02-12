"use client";
import logoDark from "@/assets/images/logo/logo-dark.png";
import logoLight from "@/assets/images/logo/logo-light.png";
import logo2 from "@/assets/images/logo/logo2.png";
import Link from "next/link";
import routes from "@/services/routes";

type ILogoProp = {
    size?: number;
};

const Logo = ({ size = 40 }: ILogoProp) => {
    return (
        <Link href={routes.landing} className="inline cursor-pointer">
            <img src={logo2.src} alt="logo-mobile" className="md:hidden inline" style={{ height: size }} />
            <img src={logoDark.src} alt="logo-dark" className="hidden md:dark:inline" style={{ height: size }} />
            <img src={logoLight.src} alt="logo-light" className="hidden md:inline md:dark:hidden" style={{ height: size }} />
        </Link>
    );
};

export default Logo;
