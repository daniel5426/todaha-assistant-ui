"use client";
import authImage from "@/assets/images/auth/auth-hero.png";
import avatar1Image from "@/assets/images/avatars/1.png";

import starIcon from "@iconify/icons-lucide/star";

import { type ReactNode, Suspense } from "react";

import { Card, CardBody, Mask } from "@/components/daisyui";

import Icon from "@/components/Icon";

export default function AuthLayout ({ children }: { children: ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-12">
            <div className="relative hidden bg-[#FFE9D1] dark:bg-[#14181c] lg:col-span-6 lg:block xl:col-span-7 2xl:col-span-8">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={authImage.src} className="object-cover" alt="Auth Image" />
                </div>
                <div className="animate-bounce-2 absolute bottom-[15%] right-[20%]">
                    <Card className="w-64 bg-base-100/80  backdrop-blur-lg">
                        <CardBody className="p-6">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src={avatar1Image.src}
                                    className={`size-11 bg-base-content/10 p-0.5 ${Mask.className({ variant: "squircle" })}`}
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
                                <p className="text-xs text-base-content/70">Graphic Designer</p>
                            </div>
                            <p className="text-sm text-base-content/90">
                                It is powerful admin tools have streamlined our operations for business.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6 xl:col-span-5 2xl:col-span-4">
                <Suspense>{children}</Suspense>
            </div>
        </div>
    );
};