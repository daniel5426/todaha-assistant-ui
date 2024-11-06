"use client"
import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import mailIcon from "@iconify/icons-lucide/mail";
import userIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";
import buildingIcon from "@iconify/icons-lucide/building";
import phoneIcon from "@iconify/icons-lucide/phone";
import Image from "next/image";

import  Link  from "next/link";

import { Button, Checkbox } from "@/components/daisyui";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";

import ThemeToggle from "../components/ThemeToggle";
import useRegister from "@/app/[locale]/auth/register/use-register";
import { useTranslations } from "next-intl";

export default function RegisterPage () {
    const { isLoading, control, onSubmit, showPassword, toggleShowPassword } = useRegister();
    const t = useTranslations("auth");
    return (
        <>
            <PageMetaData title={"Register"} />
            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center  justify-between">
                    <Logo />
                    <ThemeToggle />
                </div>
                <h3 className="mt-2 text-center text-xl font-semibold lg:mt-10">{t("Register")}</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    {t("register_b")}
                </h3>
                <div className="mt-8">
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t("Username")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={userIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"username"}
                                placeholder={t("Username")}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">{t("Email Address")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={mailIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"email"}
                                placeholder={t("Email Address")}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">{t("Company Name")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={buildingIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"company_name"}
                                placeholder={t("Company Name")}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">{t("Phone Number")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={phoneIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"phone_number"}
                                placeholder={t("Phone Number")}
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
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t("Full Name")}</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={userIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name="full_name"
                                placeholder={t("Full Name")}
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button
                            color="primary"
                            loading={isLoading}
                            onClick={onSubmit}
                            className="gap-3 text-base"
                            fullWidth
                            startIcon={<Icon icon={userPlusIcon} fontSize={16} />}>
                            {t("Register")}
                        </Button>
                    </div>
                    <p className="mt-6 text-center text-sm text-base-content/80">
                        {t("I have already to")}{" "}
                        <Link className="text-primary  hover:underline" href={routes.auth.login}>
                            {t("Login")}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
