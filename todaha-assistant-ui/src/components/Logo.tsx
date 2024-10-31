"use client";
import logoDark from "@/assets/images/logo/logo-dark.png";
import logoLight from "@/assets/images/logo/logo-light.png";
import Link from "next/link";
import routes from "@/services/routes";

type ILogoProp = {
    size?: number;
};

const Logo = ({ size = 50 }: ILogoProp) => {
    return (
        <Link href={routes.landing} className="inline cursor-pointer">
            <img src={logoDark.src} alt="logo-dark" className="hidden dark:inline" style={{ height: size }} />
            <img src={logoLight.src} alt="logo-light" className="inline dark:hidden" style={{ height: size }} />
        </Link>
    );
};

export default Logo;
