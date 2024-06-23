"use client";
import avatar1 from "@/assets/images/avatars/1.png";

import archiveIcon from "@iconify/icons-lucide/archive";
import bellDotIcon from "@iconify/icons-lucide/bell-dot";
import moreVerticalIcon from "@iconify/icons-lucide/more-vertical";
import paperclipIcon from "@iconify/icons-lucide/paperclip";
import phoneIcon from "@iconify/icons-lucide/phone";
import pinIcon from "@iconify/icons-lucide/pin";
import sendHorizonalIcon from "@iconify/icons-lucide/send-horizonal";
import trashIcon from "@iconify/icons-lucide/trash";
import squareUserIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";
import videoIcon from "@iconify/icons-lucide/video";

import { Key, useEffect, useRef } from "react";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";

import {
    Button,
    Card,
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleTime,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Tooltip,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import { cn } from "@/helpers/utils/cn";
import DateUtil from "@/helpers/utils/date";
import { IChat, IChatMessage } from "@/types/apps/chat";
import Image from "next/image";
import { useChat } from "../use-chat";
import { containsHebrew } from "@/helpers/utils/string";

const SingleMessage = ({ chat, message }: { chat: IChat; message: IChatMessage }) => {
    const isHebrew = containsHebrew(message.message);

    return (
        <div>
            <ChatBubble end={message.from_me}>
                <ChatBubbleAvatar
                    alt={chat.name}
                    src={message.from_me ? avatar1.src : chat.image}
                    innerClassName={"bg-base-content/10 rounded-box p-0.5"}
                    shape={"square"}
                />
                <ChatBubbleMessage
                    className={cn("min-h-fit py-3 text-base/none", {
                        "bg-base-content/5 text-base-content ": message.from_me,
                        "bg-base-content/10 text-base-content": !message.from_me,
                    })}      style={{ direction: isHebrew ? 'rtl' : 'ltr' , whiteSpace: 'pre-wrap', maxWidth: '900px',}} 
>

                    {message.message}
                </ChatBubbleMessage>
                <ChatBubbleTime>{DateUtil.formatted(message.send_at, { format: "hh:mm A" })}</ChatBubbleTime>
            </ChatBubble>
        </div>
    );
};


export const MessageList = () => {
    const ref = useRef<SimpleBarCore | null>(null);

    const { selectedChat: chat } = useChat();

    useEffect(() => {
        const scrollE = ref.current?.getScrollElement();
        if (scrollE) scrollE.scrollTo({ top: scrollE.scrollHeight, behavior: "smooth" });
    }, [chat, ref]);

    if (!chat) {
        return <></>;
    }
    return (
        <Card className="bg-base-100">
            <div className="flex items-center gap-3 p-3">
                <img src={chat.image} className="size-10" alt="" />
                <div className="grow">
                    <p className="text-base/none font-medium">{chat.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                        <div className="size-2 rounded-full bg-success"></div>
                        <p className="text-sm/none text-base-content/70">Active</p>
                    </div>
                </div>
            </div>
            <hr className="border-base-content/10" />
            <SimpleBar className="p-5" style={{ height: "calc(100vh - 312px)" }} ref={ref}>
                {chat.messages.map((message: IChatMessage, index: Key | null | undefined) => (
                    <SingleMessage chat={chat} message={message} key={index} />
                ))}
            </SimpleBar>
        </Card>
    );
};
