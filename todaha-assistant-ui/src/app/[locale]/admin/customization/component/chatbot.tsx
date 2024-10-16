"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import { useAuthContext } from "@/states/auth";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutContext } from "@/states/layout";
import UserImg from "@/assets/images/avatars/user1.png";
import ResetIcon from "./icons/ResetIcon";
interface ChatbotModalConfigProps {
  logo: string;
  buttonColor: string;
  buttonText: string;
  buttonTextColor: string;
  bgColor: string;
  lg: string;
}

const ChatbotModalConfig = ({
  logo,
  buttonColor,
  buttonText,
  buttonTextColor,
  bgColor,
  lg,
}: ChatbotModalConfigProps) => {
  const chatElementRef = useRef<any>(null);
  const { state } = useAuthContext();
  const { state: layoutState } = useLayoutContext();
  const assistantId = state.user?.assistant.id!;
  const initialMessages = [
    { role: "ai", text: state.user?.assistant.welcome_message },
  ];
  const [isResetHovered, setIsResetHovered] = useState(false);

  const [threadId, setThreadId] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!;
  const isWhite = layoutState.theme === "light";

  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      if (event.data.type === "resize") {
        document.getElementById(
          "deep-chat"
        )!.style.width = `${event.data.width}px`;
      }
    };
    window.addEventListener("message", handleResize);
    return () => window.removeEventListener("message", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get<{ thread_id: string }>(`${api_url}/chat/create-thread`, {
        params: { assistant_id: assistantId },
      })
      .then((response) => setThreadId(response.data.thread_id))
      .catch(console.error);
  }, [state, api_url, assistantId]);

  const handleRequestInterceptor = (requestDetails: any) => ({
    ...requestDetails,
    body: {
      text: requestDetails.body.messages[0].text,
      role: "user",
      thread_id: threadId,
      assistant_id: assistantId,
    },
  });

  const handleReset = () => {
    axios
    .get<{ thread_id: string }>(`${api_url}/chat/create-thread`, {
      params: { assistant_id: assistantId },
    })
    .then((response) => setThreadId(response.data.thread_id))
    .catch(console.error);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  const locale = useLocale();
  const isRTL = lg === "he";
  const marginRight = isRTL ? "0px" : "auto";
  const marginLeft = isRTL ? "auto" : "0px";
  const t = useTranslations("chatbot");

  return (
    <div className="flex flex-col items-center" style={{ direction: "ltr" }}>
      <div className="shadow-xl h-[600px] w-[595px] rounded-xl join join-vertical relative">
      <button
              onClick={handleReset}
              onMouseEnter={() => setIsResetHovered(true)}
              onMouseLeave={() => setIsResetHovered(false)}
              style={{
                position: 'absolute',
                top: '10px',
                [isRTL ? 'left' : 'right']: '10px',
                zIndex: 1,
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease-in-out',
                transform: isResetHovered ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ResetIcon />
            </button>
        <DeepChat
          id="deep-chat"
          className="join-item"
          stream={true}
          ref={chatElementRef}
          style={{
            height: "600px",
            width: "595px",
            border: isWhite
              ? "1px solid rgba(230,233,236)"
              : "1px solid rgba(0,0,0,0.7)",
            borderRadius: "15px",
            backgroundColor: bgColor,
          }}
          avatars={{
            ai: {
              src: logo,
              styles: {
                position: "left",
                avatar: { width: "25px", height: "25px" },
              },
            },
            user: {
              src: UserImg.src,
              styles: {
                position: "left",
                avatar: { width: "25px", height: "25px" },
              },
            },
          }}
          initialMessages={initialMessages}
          request={{ url: `${api_url}/chat/start-chat`, method: "POST" }}
          requestInterceptor={handleRequestInterceptor}
          textInput={{
            styles: {
              container: {
                borderRadius: "20px",
                border: "unset",
                marginBottom: "30px",
                width: "78%",
                backgroundColor: "#ffffff",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.16)",
              },
              text: {
                padding: "10px",
                textAlign: isRTL ? "right" : "left",
                paddingLeft: "15px",
                paddingRight: "34px",
                fontSize: "1.1em",
                color: "#000000",
              },
            },
            placeholder: {
              text: t("type a message"),
              style: { color: "#606060" },
            },
          }}
          messageStyles={{
            default: {
              shared: {
                bubble: {
                  textAlign: isRTL ? "right" : "left",
                  direction: isRTL ? "rtl" : "ltr",
                  backgroundColor: "unset",
                  marginTop: "10px",
                  marginBottom: "10px",
                  maxWidth: "100%",
                  marginRight: marginRight,
                  marginLeft: marginLeft,
                  fontSize: "1.1em",
                  color: "#000000",
                },
                outerContainer: {
                  direction: isRTL ? "rtl" : "ltr",
                },
              },
              ai: {
                outerContainer: {
                  backgroundColor: "unset",
                  borderBottom: "1px solid rgba(230,233,236)",
                },
              },
              user: {
                outerContainer: {
                  backgroundColor: "unset",
                  borderBottom: "1px solid rgba(230,233,236)",
                },
              },
            },
            loading: { bubble: { padding: "0.6em 1.78em 0.6em 1.3em" } },
          }}
          submitButtonStyles={{
            position: isRTL ? "inside-left" : "inside-right",
            submit: {
              container: {
                default: {
                  marginBottom: "20px",
                  bottom: "0.8em",
                  borderRadius: "25px",
                  padding: "6px 5px 4px",
                },
              },
              svg: {
                content:
                  '<?xml version="1.0" encoding="utf-8"?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"/></svg>',
                styles: {
                  default: {
                    width: "1.5em",
                    filter:
                      "brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)",
                  },
                },
              },
            },
            loading: {
              text: { styles: {} },
              svg: {
                styles: {
                  default: {
                    filter:
                      "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)",
                  },
                },
              },
            },
            stop: {
              svg: {
                styles: {
                  default: {
                    filter:
                      "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)",
                  },
                },
              },
            },
          }}
        />
        <div
          style={{
            textAlign: "center",
            backgroundColor: "transparent",
            position: "absolute",
            bottom: "3px",
            left: 0,
            right: 0,
          }}
          className="join-item"
        >
          <a
            href="https://todaha-chat.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "12px", color: "#606060" }}
          >
            Powered by{" "}
            <span style={{ color: "#206BAB", fontWeight: "bold" }}>Todaha</span>
          </a>
        </div>
      </div>
      <button
        className="inline-flex justify-center items-center mt-4 rounded-full text-lg font-semibold"
        style={{
          backgroundColor: buttonColor,
          color: buttonTextColor,
        }}
      >
        {buttonText && (
          <span className="pl-4 " style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {buttonText}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 py-2 px-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatbotModalConfig;