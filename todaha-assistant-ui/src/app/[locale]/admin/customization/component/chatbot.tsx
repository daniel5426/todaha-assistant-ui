"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import { useAuthContext } from "@/states/auth";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutContext } from "@/states/layout";

interface ChatbotModalConfigProps {
  logo: string;
  buttonColor: string;
  buttonText: string;
}

const ChatbotModalConfig = ({ logo, buttonColor, buttonText }: ChatbotModalConfigProps) => {
  const chatElementRef = useRef<any>(null);
  const { state } = useAuthContext();
  const { state: layoutState } = useLayoutContext();
  const assistantId = state.user?.assistant.id!;
  const initialMessages = [{ role: "ai", text: state.user?.assistant.welcome_message }];

  const [threadId, setThreadId] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!;
  const isWhite = layoutState.theme === "light";

  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      if (event.data.type === "resize") {
        document.getElementById("deep-chat")!.style.width = `${event.data.width}px`;
      }
    };
    window.addEventListener("message", handleResize);
    return () => window.removeEventListener("message", handleResize);
  }, []);

  useEffect(() => {
    axios.get<{ thread_id: string }>(`${api_url}/chat/create-thread`, { params: { assistant_id: assistantId } })
      .then(response => setThreadId(response.data.thread_id))
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

  const locale = useLocale();
  const isRTL = locale === "he";
  const t = useTranslations("chatbot");

  return (
    <div className="App">
      <DeepChat
        id="deep-chat"
        className="join-item"
        stream={true}
        ref={chatElementRef}
        style={{
          height: "640px",
          width: "630px",
          border: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
          boxShadow: isWhite ? "0px 0px 12px 12px rgba(230,233,236)" : "0px 0px 12px 12px rgb(11,13,17)",
          borderRadius: "15px",
          backgroundColor: isWhite ? "#ffffff" : "#191E23",
        }}
        avatars={{
          ai: { src: logo, styles: { position: "left", avatar: { width: "25px", height: "25px" } } },
          user: { src: logo, styles: { position: "left", avatar: { width: "25px", height: "25px" } } },
        }}
        initialMessages={initialMessages}
        request={{ url: `${api_url}/chat/start-chat`, method: "POST" }}
        requestInterceptor={handleRequestInterceptor}
        textInput={{
          styles: {
            container: {
              borderRadius: "20px",
              border: "unset",
              width: "78%",
              backgroundColor: isWhite ? "rgba(255,255,255)" : "rgb(20,24,28)",
              boxShadow: isWhite ? "3px 3px 3px 2px rgba(230,233,236)" : "3px 3px 3px 2px rgba(0,0,0,0.7)",
            },
            text: {
              padding: "10px",
              textAlign: isRTL ? "right" : "left",
              paddingLeft: "15px",
              paddingRight: "34px",
              fontSize: "1.1em",
              color: isWhite ? "#000000" : "#ffffff",
            },
          },
          placeholder: {
            text: t("type a message"),
            style: { color: isWhite ? "#606060" : "#b0b0b0" },
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
                marginRight: isRTL ? "0px" : "auto",
                marginLeft: isRTL ? "auto" : "0px",
                fontSize: "1.1em",
                color: isWhite ? "#000000" : "#ffffff",
              },
            },
            user: { bubble: { color: isWhite ? "black" : "white" } },
            ai: {
              outerContainer: {
                backgroundColor: isWhite ? "rgba(255,255,255)" : "rgb(25,30,35)",
                borderTop: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
                borderBottom: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
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
                bottom: "0.8em",
                borderRadius: "25px",
                padding: "6px 5px 4px",
              },
            },
            svg: {
              content: '<?xml version="1.0" encoding="utf-8"?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"/></svg>',
              styles: {
                default: {
                  width: "1.5em",
                  filter: "brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)"
                },
              },
            },
          },
          loading: {
            text: { styles: {} },
            svg: {
              styles: {
                default: {
                  filter: "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)"
                },
              },
            },
          },
          stop: {
            svg: {
              styles: {
                default: {
                  filter: "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)"
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChatbotModalConfig;