"use client";

import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import logInIcon from "@iconify/icons-lucide/log-in";

import Link from "next/link";
import userIcon from "@iconify/icons-lucide/user";

import { Button, Checkbox } from "@/components/daisyui";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";

import ThemeToggle from "../components/ThemeToggle";
import useLogin from "./use-login";
import { useLocale, useTranslations } from "next-intl";


const LoginPage = () => {
    const { isLoading, control, onSubmit, showPassword, toggleShowPassword } = useLogin();
    const t = useTranslations("auth");
    const locale = useLocale();
    const isRTL = locale === "he";
    return (
        <>
            <PageMetaData title={"Login"} />
            <div className="flex flex-col items-stretch p-8 lg:p-16" style={{ direction: isRTL? "rtl": "ltr"}}>
                <div className="flex items-center justify-between">
                    <Logo />
                    <ThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">{t("Login")}</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    {t("login_b")}
                </h3>
                <div className="mt-10">
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t("Username or Email")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={userIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"username"}
                                placeholder={t("Username or Email")}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">{t("Password")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"password"}
                                placeholder={t("Password")}
                                type={showPassword ? "text" : "password"}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                endIcon={
                                    <Button
                                        onClick={toggleShowPassword}
                                        size={"xs"}
                                        shape={"circle"}
                                        color={"ghost"}
                                        className={"hover:bg-base-content/10"}>
                                        {showPassword ? (
                                            <Icon icon={eyeOffIcon} className="text-base-content/80" fontSize={18} />
                                        ) : (
                                            <Icon icon={eyeIcon} className="text-base-content/80" fontSize={16} />
                                        )}
                                    </Button>
                                }
                                borderOffset={false}></FormInput>

                            <label className="label">
                                <span className="label-text"></span>
                                <Link
                                    className="label-text text-xs text-base-content/80"
                                    href={routes.auth.register}>
                                    {t("Forgot Password?")}
                                </Link>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button
                            color="primary"
                            loading={isLoading}
                            onClick={onSubmit}
                            className="gap-3 text-base"
                            fullWidth
                            startIcon={<Icon icon={logInIcon} fontSize={16} />}>
                            {t("Login")}
                        </Button>
                    </div>
                    <p className="mt-6 text-center text-sm text-base-content/80">
                        {t("Haven't account")}{" "}
                        <Link className="text-primary  hover:underline" href={routes.auth.register}>
                            {t("Create One")}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
