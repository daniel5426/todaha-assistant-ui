"use client";
import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import mailIcon from "@iconify/icons-lucide/mail";
import userIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";

import Link from "next/link";
import { Button, Checkbox } from "@/components/daisyui";
import { Card, CardBody, Mask } from "@/components/daisyui";
import starIcon from "@iconify/icons-lucide/star";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";
import authImage from "@/assets/images/auth/auth-hero.png";
import avatar1Image from "@/assets/images/avatars/1.png";

import ThemeToggle from "../components/ThemeToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import httpRequest from "@/services/api/request";

const RegisterPage = () => {
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  type RegisterSchemaType = z.infer<typeof registerSchema>;

  const { control, handleSubmit, setError } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const transformErrorToForm = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      await httpRequest.post("/api/any/success/", data);
      navigate.push(routes.auth.login);
    } catch (e: any) {
      transformErrorToForm(e.response.data);
    }
    setIsLoading(false);
  });

  return (
    <>
      <PageMetaData title={"Register"} />
      <div className="grid h-screen grid-cols-12">
        <div className="relative hidden bg-[#FFE9D1] dark:bg-[#14181c] lg:col-span-7 lg:block xl:col-span-8 2xl:col-span-9">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={authImage.src}
              className="object-cover"
              alt="Auth Image"
            />
          </div>
          <div className="animate-bounce-2 absolute bottom-[15%] right-[20%]">
            <Card className="w-64 bg-base-100/80  backdrop-blur-lg">
              <CardBody className="p-6">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={avatar1Image.src}
                    className={`size-11 bg-base-content/10 p-0.5 ${Mask.className(
                      { variant: "squircle" }
                    )}`}
                    alt=""
                  />
                  <div className="mt-2 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Icon
                        icon={starIcon}
                        key={index}
                        className="size-3 text-orange-400 svg-path:fill-orange-400"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium">Paul A. Williams</p>
                  <p className="text-xs text-base-content/70">
                    Graphic Designer
                  </p>
                </div>
                <p className="text-sm text-base-content/90">
                  It is powerful admin tools have streamlined our operations for
                  business.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="col-span-12  lg:col-span-5 xl:col-span-4 2xl:col-span-3">
          <div className="flex flex-col items-stretch p-8 lg:p-16">
            <div className="flex items-center  justify-between">
              <Logo />
              <ThemeToggle />
            </div>
            <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">
              Register
            </h3>
            <h3 className="mt-2 text-center text-sm text-base-content/70">
              Seamless Access, Secure Connection: Your Gateway to a Personalized
              Experience.
            </h3>
            <div className="mt-10">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <FormInput
                    size="sm"
                    startIcon={
                      <Icon
                        icon={userIcon}
                        className="text-base-content/80"
                        fontSize={18}
                      />
                    }
                    control={control}
                    name={"username"}
                    placeholder="Username"
                    className="w-full focus:border-transparent focus:outline-0"
                    bordered={false}
                    borderOffset={false}
                  ></FormInput>
                </div>
                <div className="form-control mt-3">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <FormInput
                    size="sm"
                    startIcon={
                      <Icon
                        icon={mailIcon}
                        className="text-base-content/80"
                        fontSize={18}
                      />
                    }
                    control={control}
                    name={"email"}
                    placeholder="Email Address"
                    className="w-full focus:border-transparent focus:outline-0"
                    bordered={false}
                    borderOffset={false}
                  ></FormInput>
                </div>
                <div className="form-control mt-3">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <FormInput
                    size="sm"
                    startIcon={
                      <Icon
                        icon={keyRoundIcon}
                        className="text-base-content/80"
                        fontSize={18}
                      />
                    }
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
                        className={"hover:bg-base-content/10"}
                      >
                        {showPassword ? (
                          <Icon
                            icon={eyeOffIcon}
                            className="text-base-content/80"
                            fontSize={18}
                          />
                        ) : (
                          <Icon
                            icon={eyeIcon}
                            className="text-base-content/80"
                            fontSize={16}
                          />
                        )}
                      </Button>
                    }
                    borderOffset={false}
                  ></FormInput>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Checkbox
                    name="agreement"
                    id="agreement"
                    size="xs"
                    color="primary"
                  />
                  <label htmlFor="agreement">
                    I agree with{" "}
                    <span className="cursor-pointer text-primary underline">
                      terms and conditions
                    </span>
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
                  startIcon={<Icon icon={userPlusIcon} fontSize={16} />}
                >
                  Register
                </Button>
              </div>
              <div className="mt-4">
                <Button
                  size={"md"}
                  fullWidth
                  className="flex items-center gap-3 border-base-content/10  !text-base-content hover:border-transparent hover:bg-base-content/10"
                  variant={"outline"}
                >
                  <img src={googleMiniImage.src} className="size-6" alt="" />
                  <span className="text-base">Register with Google</span>
                </Button>
              </div>
              <p className="mt-6 text-center text-sm text-base-content/80">
                I have already to{" "}
                <Link
                  className="text-primary  hover:underline"
                  href={routes.auth.login}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
