"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import { useAuthContext } from "@/states/auth";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutContext } from "@/states/layout";
import UserImg from "@/assets/images/avatars/user1.png";
import ResetIcon from "./icons/ResetIcon";
import useToast from "@/hooks/use-toast";
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
  const locale = useLocale();
  const isRTL = lg === "he";
  const { state: layoutState } = useLayoutContext();
  const assistantId = state.user?.assistant.id!;
  const initialMessages = [
    { role: "ai", text: state.user?.assistant?.welcome_message || "" },
    ...(state.user?.assistant?.initial_questions
      ? (() => {
        const questions = state.user?.assistant?.initial_questions
        .split("\n")
        .filter((q) => q.trim())
        .map((q) => ({
          text: q,
          width: calculateTwoRowWidth(q),
        }));

      const totalWidth = questions.reduce(
        (acc, q) => acc + q.width + 8,
        0
      );


          return questions.length > 0
            ? [
                {
                  html: `
                  <div class="deep-chat-temporary-message" style="position: absolute; bottom: 65px; width: calc(100% - 45px); left:">
                    <div style="position: relative;">
                      <div style="width: calc(100% - 52px);overflow-x: auto; white-space: nowrap; padding: 10px 18px; scrollbar-width: none; -ms-overflow-style: none;">
                        <div style="display: inline-flex; gap: 8px; margin-bottom: 5px;">
                          ${questions
                            .map(
                              ({text, width}) => `
                          <button 
                            class="deep-chat-button deep-chat-suggestion-button" 
                            style="border: none; 
                              background: white; 
                              justify-content: space-around;
                              direction: ${isRTL ? "rtl" : "ltr"};
                              box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16); 
                              width: ${width}px;
                              white-space: normal; 
                              height: 45px; 
                              display: flex; 
                              align-items: center; 
                              text-align: center; 
                              padding: 8px 12px; 
                              line-height: 1.2;"
                          >${text}</button>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                      ${
                        totalWidth > 525 && window.innerWidth > 768 ? `
                      <button onclick="this.parentElement.querySelector('div').scrollBy({left: -130, behavior: 'smooth'})" 
                        style="position: absolute; 
                          left: -10px; 
                          top: 47%; 
                          transform: translateY(-50%); 
                          background: rgba(255,255,255,0.9); 
                          border-radius: 8px;
                          width: 24px; 
                          height: 45px; 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          border: 0px solid #eee; 
                          cursor: pointer; 
                          z-index: 1;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button onclick="this.parentElement.querySelector('div').scrollBy({left: 130, behavior: 'smooth'})" 
                        style="position: absolute; 
                          right: 0px; 
                          top: 47%; 
                          transform: translateY(-50%); 
                          background: rgba(255,255,255,0.9); 
                          border-radius: 8px;
                          width: 24px; 
                          height: 45px; 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          border: 0px solid #eee; 
                          cursor: pointer; 
                          z-index: 1;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>`
                          : ""
                      }
                    </div>
                  </div>`,
                  role: "html",
                    },
              ]
            : [];
        })()
      : []),
  ];
  const { toaster } = useToast();
  const [threadId, setThreadId] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!;
  const isWhite = layoutState.theme === "light";
  const [reset, setReset] = useState(false);
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
  }, [state, reset, assistantId]);

  const handleRequestInterceptor = (requestDetails: any) => ({
    ...requestDetails,
    body: {
      text: requestDetails.body.messages[0].text,
      role: "user",
      thread_id: threadId,
      assistant_id: assistantId,
    },
  });

  function calculateTwoRowWidth(text: string) {
    const words = text.split(" ");
    
    if (words.length <= 1) {
      // Single word
      return Math.max(text.length * 8, 40);
    }
    
    if (words.length === 2) {
      // For two words, use the length of the longer word
      const longestWordLength = Math.max(words[0].length, words[1].length);
      return Math.max(longestWordLength * 10, 40); // Slightly wider per char for two words
    }

    // For longer texts, split into two roughly equal rows
    const totalLength = text.length;
    const approximateCharsPerRow = Math.ceil(totalLength / 2);
    return Math.max(approximateCharsPerRow * 8, 40);
  }


  const handleReset = () => {
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
    setReset((prevReset) => !prevReset);
  };

  const marginRight = isRTL ? "0px" : "auto";
  const marginLeft = isRTL ? "auto" : "0px";
  const t = useTranslations("chatbot");

  return (
    <div
      className="flex flex-col items-center"
      style={{ direction: "ltr", zIndex: 9999 }}
    >
      <div className="shadow-xl h-[595px] w-[595px] rounded-[25px] join join-vertical relative">
      <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '10px',
            [isRTL ? 'left' : 'right']: '10px',
            zIndex: 1,
            background: 'transparent',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="p-1 rounded-full bg-transparent hover:rotate-180 transition-transform duration-300 mr-1"
        >
          <ResetIcon color={isWhite ? "black" : "white"} />
        </button>
        <DeepChat
          id="deep-chat"
          className="join-item"
          stream={true}
          ref={chatElementRef}
          style={{
            height: "600px",
            width: "595px",
            fontSize: "0.93em",
            border: isWhite
              ? "1px solid rgba(230,233,236)"
              : "1px solid rgba(0,0,0,0.7)",
            borderRadius: "15px",
            backgroundColor: bgColor,
          }}
          avatars={{
            html: {
              //TODO
              styles: {
                avatar: {
                  width: "0px",
                  height: "0px",
                },
              },
            },
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
          responseInterceptor={(responseDetails) => {
            console.log(responseDetails);

            if (responseDetails.text == "MAX_TOKEN_REACHED") {
              toaster.error(
                "All your tokens of this month are used. Please Upgrade your plan."
              );
              responseDetails.text =
                "All your tokens of this month are used. Please Upgrade your plan.";
            }
            return responseDetails;
          }}
          textInput={{
            styles: {
              container: {
                borderRadius: "20px",
                marginBottom: "30px",
                width: "88%",
                backgroundColor: "#ffffff",
                border: "0.3px solid rgb(229,229,229)",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.16)",
      },
              text: {
                padding: "10px",
                direction: isRTL ? "rtl" : "ltr",
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
            html: {
              shared: {
                //TODO
                bubble: {
                  backgroundColor: "unset",
                  padding: "0px",
                  boxShadow: "none",
                  borderBottom: "hidden",
                  borderTop: "hidden",
                  border: "unset",
                },
                outerContainer: {
                  borderBottom: "hidden",
                  borderTop: "hidden",
                  border: "unset",
                },
              },
            },
            default: {
              shared: {
                bubble: {
                  textAlign: isRTL ? "right" : "left",
                  direction: isRTL ? "rtl" : "ltr",
                  backgroundColor: "unset",
                  marginTop: "10px",
                  marginBottom: "10px",
                  maxWidth: "calc(100% - 80px)", //TODO
                  marginRight: marginRight,
                  marginLeft: marginLeft,
                  fontSize: "1em", //TODO
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
              html: {
                bubble: {
                  direction: "ltr",
                  marginLeft:  "0",
                  marginRight: "auto",  
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
                    transform: isRTL ? "scaleX(-1)" : "none",
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
