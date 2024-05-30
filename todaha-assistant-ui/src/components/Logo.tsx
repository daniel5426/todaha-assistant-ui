"use client";
import logoDark from "@/assets/images/logo/logo-dark.png";
import logoLight from "@/assets/images/logo/logo-light.png";

type ILogoProp = {
    size?: number;
};

const Logo = ({ size = 30 }: ILogoProp) => {
    return (
        <div className="inline">
            <img src={logoDark.src} alt="logo-dark" className="hidden dark:inline" style={{ height: size }} />
            <img src={logoLight.src} alt="logo-light" className="inline dark:hidden" style={{ height: size }} />
        </div>
    );
};

export default Logo;
