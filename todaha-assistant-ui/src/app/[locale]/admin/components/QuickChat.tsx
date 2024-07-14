"use client";
import messagesSquareIcon from "@iconify/icons-lucide/messages-square";

import { use, useEffect, useState } from "react";
import  Link  from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, Mask } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { getEcommerceDashboardMessageData } from "@/data/dashboards/ecommerce";
import { cn } from "@/helpers/utils/cn";
import DateUtil from "@/helpers/utils/date";
import routes from "@/services/routes";
import { fetchChats, fetchChatsWithSuspense } from "@/app/lib/data";
import { chatsToQuickChat } from "@/app/lib/serialize/serialize";
import { useTranslations } from "next-intl";


const QuickChat = () => {
    const resource = fetchChatsWithSuspense(1, 7);

    const fetchdata = resource.read();

    const data = chatsToQuickChat(fetchdata);
    const [chats, setChats] = useState(data);

    useEffect(() => {
        const fetchChatsData = async () => {
            const chats = await fetchChats(1, 7);
            setChats(chatsToQuickChat(chats));
        };
        const interval = setInterval(() => {
            fetchChatsData();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const t = useTranslations("dashboard");

    return (
        <Card className="bg-base-100">
            <CardBody>
                <div className="flex items-center gap-3">
                    <Icon icon={messagesSquareIcon} className="text-base-content/80" fontSize={19} />
                    <span className="font-medium">{t("Latest client question answered")}</span>
                </div>
                <div className="mt-2">
                    {chats.slice(0, 7).map((chat, index) => (
                        <div
                            key={index}
                            className="flex cursor-pointer gap-4 rounded-box bg-transparent p-2.5 transition-all hover:bg-base-content/10 active:scale-[.98] active:bg-base-content/15">
                            <Image
                                src={chat.image}
                                alt={"chat image"}
                                height={40}
                                width={40}
                                className={cn(
                                    "size-10 bg-base-content/10 p-0.5",
                                    Mask.className({ variant: "squircle" }),
                                )}
                            />

                            <div className="grow">
                                <div className="flex">
                                    <span className="text-xs text-base-content/60">
                                        {" "}
                                        {DateUtil.formatted(chat.date, { format: "hh:mm A" })}
                                    </span>
                                </div>
                                <p className="line-clamp-1 text-ellipsis text-base/normal text-base-content/80">
                                    {chat.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-center">
                    <Link href={routes.admin.chat}>
                        <Button variant={"outline"} color={"ghost"} size={"sm"}>
                            {t("Go To Chat")}
                        </Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export default QuickChat;
