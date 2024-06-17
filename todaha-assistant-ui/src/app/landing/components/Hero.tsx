import heroDarkLandingImg from "@/assets/images/landing/dashboard-hero-dark.png";
import heroLandingImg from "@/assets/images/landing/dashboard-hero.png";
import heroGradientImg from "@/assets/images/landing/hero-gradient.png";
import whatsappImg from "@/assets/images/landing/whatsapp.png";
import facebookImg from "@/assets/images/landing/facebook.png";
import gmailImg from "@/assets/images/landing/gmail.png";
import shopifyImg from "@/assets/images/landing/shopping.png";
import wordpressImg from "@/assets/images/landing/wordpress.png";
import commentImg from "@/assets/images/landing/comment.png";
import airplayIcon from "@iconify/icons-lucide/airplay";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';
import { Button, Tooltip } from "@/components/daisyui";
import Icon from "@/components/Icon";
import routes from "@/services/routes";

const Hero = async () => {
    const { t } = useTranslation('common');

    return (
        <div>
            <div
                className=" absolute inset-0 rotate-180 bg-cover bg-center bg-no-repeat opacity-20 dark:hidden"
                style={{ backgroundImage: `url(${heroGradientImg.src})`, filter: "blur(4px)"}}></div>
            <div className="container relative z-10 py-20 xl:py-40">
                <div className="grid items-center  gap-8 xl:grid-cols-7 xl:gap-20">
                    <div className="order-2 xl:order-1 xl:col-span-3">
                        <p className="text-3xl font-semibold leading-normal">
                        {t('HOME_HERRO')}
                        </p>

                        <p className="mt-8 max-w-[500px]">
                        {t('herro_b')}

                        </p>
                        <div className={"mt-8 inline-flex items-center gap-3"}>
                            <Link href={routes.contact}>
                                <Button color={"primary"} startIcon={<Icon icon={airplayIcon} fontSize={18} />}>
                                {t('contact')}
                                </Button>
                            </Link>
                        </div>
                        <div className="mt-8">
                            <p className="font-medium text-base-content/70"> {t('integration')}</p>
                            <div className="mt-3 flex gap-5">
                                <Tooltip message={"daisyUI - Component Library"}>
                                    <img src={whatsappImg.src} className="size-7" width={28} height={28} alt="Next" />
                                </Tooltip>
                                <Tooltip message={"facebook"}>
                                    <img
                                        src={facebookImg.src}
                                        className="size-7"
                                        width={28}
                                        height={28}
                                        alt="Javascript"
                                    />
                                </Tooltip>
                                <Tooltip message={"maill"}>
                                    <img
                                        src={gmailImg.src}
                                        className="size-7"
                                        width={28}
                                        height={28}
                                        alt="Typescript"
                                    />
                                </Tooltip>
                                <Tooltip message={"shopify"}>
                                    <img src={shopifyImg.src} className="size-7" width={28} height={28} alt="React" />
                                </Tooltip>
                                <Tooltip message={"Wordpress"}>
                                    <img src={wordpressImg.src} className="size-7" width={28} height={28} alt="Vite" />
                                </Tooltip>
                                <Tooltip message={"messages"}>
                                    <img
                                        src={commentImg.src}
                                        className="size-7 dark:invert"
                                        width={28}
                                        height={28}
                                        alt="Next"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 xl:order-2 xl:col-span-4">
                        <img
                            src={heroLandingImg.src}
                            className="inline rounded-md shadow-xl dark:hidden"
                            width={1000}
                            alt="hero-landing"
                        />
                        <img
                            src={heroDarkLandingImg.src}
                            className="hidden rounded-md  shadow-xl dark:inline"
                            width={1000}
                            alt="hero-landing"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
