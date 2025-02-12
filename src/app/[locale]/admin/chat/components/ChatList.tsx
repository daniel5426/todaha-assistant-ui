import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";

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
import { containsHebrew } from "@/helpers/utils/string";
import { LatestInvoicesSkeleton } from "../../components/loading";
import { useTranslations } from "next-intl";
import {useLocale} from 'next-intl';
import { useRouter } from "next/navigation";

const SingleChat = ({ chat, selected }: { chat: IChat; selected: boolean }) => {
  const { image, name, messages, unreads } = chat;
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;
  const isHebrew = containsHebrew(lastMessage ? lastMessage.message : "");
  const locale = useLocale();

  const isRTL = locale === "he";

  return (
    <div
      className={cn(
        "my-0.5 flex cursor-pointer items-center gap-3 rounded-box p-2 px-3 transition-all hover:bg-base-content/5 active:scale-[.98]",
        {
          "bg-base-content/10 hover:bg-base-content/15": selected,
        }
      )}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
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
          {lastMessage && (
            <span className="text-xs text-base-content/60">
              {DateUtil.formatted(lastMessage.send_at, { format: "ddd hh:mm A" })}
            </span>
          )}
        </div>
        <div className="flex justify-between gap-3">
          <p className="line-clamp-1 text-sm text-base-content/80">
            {lastMessage?.message ?? "Tap to message"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ChatList ()  {
  const {
    chats,
    setSelectedChat,
    selectedChat,
    loadMore,
    currentPage,
    isPending,
    setIsPending,
    totalChats
  } = useChat();
  const t = useTranslations("dashboard");
  const locale = useLocale();

  if (!chats) return <LatestInvoicesSkeleton numberOfInvoices={7} />;

  if (chats.length === 0) {
    return (
      <Card className="bg-base-100">
        <CardBody>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t("No chats found")}</h1>
          </div>
        </CardBody>
      </Card>
    );
  }


  const handleStart = () => {
    // Load the first page of chats
    loadMore(1);
  };

  const handleNext = () => {
    // Load the next page of chats
    loadMore(currentPage + 1);
    console.log(currentPage);
  };

  const handlePrevious = () => {
    // Load the previous page of chats
    if (currentPage > 1) {
      loadMore(currentPage - 1);
    }
  };

    return (
      <Card className="bg-base-100">
        <CardBody>

          <div className="mt-2 relative">
            {isPending && (
              <div className="absolute inset-0 bg-base-100/50 flex items-center justify-center z-10">
                <Loading size="lg" />
              </div>
            )}
            <div className={cn({ "opacity-50": isPending })}>
              {chats.map((chat, index) => (
                <div onClick={() => setSelectedChat(chat)} key={index}>
                  <SingleChat
                    chat={chat}
                    selected={selectedChat?.id == chat.id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="mt-4 flex justify-center items-center gap-1">
              <Button 
                onClick={handlePrevious} 
                disabled={currentPage === 1 || isPending} 
                className="btn-ghost btn-sm px-2"
              >
                <Icon icon={chevronLeftIcon} className="h-4 w-4" />
              </Button>

              {/* First page */}
              <Button 
                onClick={() => loadMore(1)}
                disabled={isPending}
                className={cn("btn-ghost btn-sm px-3", {
                  'btn-active': currentPage === 1
                })}
              >
                1
              </Button>

              {/* Show dots if there are pages between first and current */}
              {currentPage > 2 && <span className="px-2">...</span>}

              {/* Current page (if not first or last) */}
              {currentPage !== 1 && currentPage !== Math.ceil(totalChats / 7) && (
                <Button 
                  onClick={() => loadMore(currentPage)}
                  disabled={isPending}
                  className="btn-ghost btn-sm px-3 btn-active"
                >
                  {currentPage}
                </Button>
              )}

              {/* Show dots if there are pages between current and last */}
              {currentPage < Math.ceil(totalChats / 7) - 1 && <span className="px-2">...</span>}

              {/* Last page (if not first page) */}
              {Math.ceil(totalChats / 7) > 1 && (
                <Button 
                  onClick={() => loadMore(Math.ceil(totalChats / 7))}
                  disabled={isPending}
                  className={cn("btn-ghost btn-sm px-3", {
                    'btn-active': currentPage === Math.ceil(totalChats / 7)
                  })}
                >
                  {Math.ceil(totalChats / 7)}
                </Button>
              )}

              <Button 
                onClick={handleNext} 
                disabled={currentPage === Math.ceil(totalChats / 7) || isPending || totalChats === 0}
                className="btn-ghost btn-sm px-2"
              >
                <Icon icon={chevronRightIcon} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };
function useIntl() {
  throw new Error("Function not implemented.");
}

