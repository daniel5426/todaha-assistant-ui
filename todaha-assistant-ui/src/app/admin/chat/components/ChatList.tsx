"use client";
import plusIcon from "@iconify/icons-lucide/plus";
import searchIcon from "@iconify/icons-lucide/search";
import usersIcon from "@iconify/icons-lucide/users";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Input,
  Loading,
  Mask,
  Tooltip,
  WindowMockupProps,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import { cn } from "@/helpers/utils/cn";
import DateUtil from "@/helpers/utils/date";
import { IChat } from "@/types/apps/chat";

import { useChat } from "../use-chat";

const SingleChat = ({ chat, selected }: { chat: IChat; selected: boolean }) => {
  const { image, name, messages, unreads } = chat;
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div
      className={cn(
        "my-0.5 flex cursor-pointer items-center gap-3 rounded-box p-2 px-3 transition-all hover:bg-base-content/5 active:scale-[.98]",
        {
          "bg-base-content/10 hover:bg-base-content/15": selected,
        }
      )}
    >
      <img
        src={image}
        className={`size-11 bg-base-content/10 p-0.5 ${Mask.className({
          variant: "squircle",
        })}`}
        alt="avatar"
      />
      <div className="grow">
        <div className="flex justify-between">
          <p className="text-sm font-medium">{name}</p>
          {lastMessage && (
            <span className="text-xs text-base-content/60">
              {DateUtil.formatted(lastMessage.send_at, { format: "hh:mm A" })}
            </span>
          )}
        </div>
        <div className="flex justify-between gap-3">
          <p className="line-clamp-1 text-sm  text-base-content/80">
            {lastMessage?.message ?? "Tap to message"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ChatList = () => {
  const {
    chats,
    setSelectedChat,
    selectedChat,
    loadChats,
    currentPage,
    isLoading,
  } = useChat();

  const handleStart = () => {
    // Load the first page of chats
    loadChats(1);
  };

  const handleNext = () => {
    // Load the next page of chats
    loadChats(currentPage + 1);
    console.log(currentPage);
  };

  const handlePrevious = () => {
    // Load the previous page of chats
    if (currentPage > 1) {
      loadChats(currentPage - 1);
    }
  };

  return (
    <Card className="bg-base-100">
      <CardBody>
        <div className="flex items-center gap-3">
          <div className="form-control flex grow flex-row items-center rounded-box border border-base-content/20 px-2">
            <Icon
              icon={searchIcon}
              className="text-base-content/60"
              fontSize={15}
            />
            <Input
              size="sm"
              placeholder="Search along files"
              className="w-full focus:border-transparent focus:outline-0"
              bordered={false}
              borderOffset={false}
            ></Input>
          </div>
          <Tooltip message="New Contact">
            <Button
              color={"ghost"}
              aria-label="New contact"
              size={"sm"}
              className="border border-base-content/20 p-2"
              startIcon={<Icon icon={plusIcon} fontSize={14} />}
            ></Button>
          </Tooltip>
        </div>

        <div className="mt-2">
          {isLoading ? (
            <div className="mt-2 flex justify-center items-center h-64">
              <Loading className="loading-lg " /> 
            </div>
          ) : (
            chats.map((chat, index) => (
              <div onClick={() => setSelectedChat(chat)} key={index}>
                <SingleChat
                  chat={chat}
                  selected={selectedChat?.id == chat.id}
                />
              </div>
            ))
          )}
        </div>
        <div className="mt-2 text-center">
          <div className="mt-4 flex justify-center space-x-4">
            <Button onClick={handleStart}disabled={currentPage === 1 || isLoading === true}>Start</Button>
            <Button onClick={handlePrevious} disabled={isLoading === true}>
              Previous
            </Button>
            <Button onClick={handleNext}disabled={isLoading === true}>Next</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
