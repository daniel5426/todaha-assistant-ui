"use client";
import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import logInIcon from "@iconify/icons-lucide/log-in";
import mailIcon from "@iconify/icons-lucide/mail";

import Link from "next/link";

import { Button, Checkbox } from "@/components/daisyui";
import Image from "next/image";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";

import ThemeToggle from "../components/ThemeToggle";
import useLogin from "./use-login";


const LoginPage = () => {
    const { isLoading, control, onSubmit, showPassword, toggleShowPassword } = useLogin();

    return (
        <>
            <PageMetaData title={"Login"} />
            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Logo />
                    <ThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Login</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
                </h3>
                <div className="mt-10">
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={mailIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"email"}
                                placeholder="Email Address"
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"password"}
                                placeholder="Password"
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
                                    href={routes.auth.forgotPassword}>
                                    Forgot Password?
                                </Link>
                            </label>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <Checkbox name="agreement" id="agreement" size="xs" color="primary" />
                            <label htmlFor="agreement">
                                I agree with{" "}
                                <span className="cursor-pointer text-primary underline">terms and conditions</span>
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
                            Login
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Button
                            size={"md"}
                            fullWidth
                            className="flex items-center gap-3 border-base-content/10  !text-base-content hover:border-transparent hover:bg-base-content/10"
                            variant={"outline"}>
                            <Image src={googleMiniImage} className="size-6" alt="" />
                            <span className="text-base">Login with Google</span>
                        </Button>
                    </div>
                    <p className="mt-6 text-center text-sm text-base-content/80">
                        Haven&apos;t account{" "}
                        <Link className="text-primary  hover:underline" href={routes.auth.register}>
                            Create One
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
