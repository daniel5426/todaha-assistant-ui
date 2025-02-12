"use client";
import avatar1 from "@/assets/images/avatars/1.png";
import { Key, forwardRef, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// SimpleBar import ChatList component
const SimpleBar = dynamic(() => import("simplebar-react"), { ssr: false });

import {
  Card,
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTime,
} from "@/components/daisyui";

import React from "react";
import { cn } from "@/helpers/utils/cn";
import DateUtil from "@/helpers/utils/date";
import { IChat, IChatMessage } from "@/types/apps/chat";
import { useChat } from "../use-chat";
import { containsHebrew } from "@/helpers/utils/string";
import { useLocale, useTranslations } from "next-intl";
import "simplebar/dist/simplebar.min.css";

const SingleMessage = ({
  chat,
  message,
}: {
  chat: IChat;
  message: IChatMessage;
}) => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const isHebrew = containsHebrew(message.message);
  const isRTL = locale === "he";
  const from_me = isRTL ? !message.from_me : message.from_me;

  if (!chat.messages) return null;
  const firstMessage = chat.messages[0];
  const date_started = firstMessage
    ? DateUtil.formatted(firstMessage.send_at, {
        format: "hh:mm A",
      })
    : "";

  return (
    <div>
      <ChatBubble end={from_me}>
        <ChatBubbleAvatar
          alt={t("User at ") + date_started}
          src={message.from_me ? avatar1.src : chat.image}
          innerClassName={"bg-base-content/10 rounded-box p-0.5"}
          shape={"square"}
        />
        <ChatBubbleMessage
          className={cn("min-h-fit py-3 text-base/none", {
            "bg-base-content/5 text-base-content ": !from_me,
            "bg-base-content/10 text-base-content": from_me,
          })}
          style={{
            direction: isHebrew ? "rtl" : "ltr",
            textAlign: isHebrew ? "right" : "left",
            whiteSpace: "pre-wrap",
            maxWidth: "900px",
          }}
        >
          {message.message}
        </ChatBubbleMessage>
        <ChatBubbleTime>
          {DateUtil.formatted(message.send_at, { format: "hh:mm A" })}
        </ChatBubbleTime>
      </ChatBubble>
    </div>
  );
};

const MessageList = () => {
  const { selectedChat } = useChat();
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const isRTL = locale === "he";

  if (!selectedChat) return null;

  const firstMessage = selectedChat.messages[0];
  const date_started = DateUtil.formatted(firstMessage.send_at, {
    format: "DD MMM hh:mm A",
  });
  const msg_number = selectedChat.messages.length;

  return (
    <Card className="bg-base-100">
      <div className="flex items-center gap-3 p-3">
        <img src={selectedChat.image} className="size-10" alt="" />
        <div className="grow">
          <p className="text-base/none font-medium">{date_started}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm/none text-base-content/70">
              {t("Conversation Size", { msg_number: msg_number })}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-base-content/10" />
      <SimpleBar className="p-5" style={{ height: "calc(100vh - 312px)" }}>
        {selectedChat.messages.map(
          (message: IChatMessage, index: Key | null | undefined) => (
            <SingleMessage chat={selectedChat} message={message} key={index} />
          )
        )}
      </SimpleBar>
    </Card>
  );
};
MessageList.displayName = "MessageList";

export default MessageList;
