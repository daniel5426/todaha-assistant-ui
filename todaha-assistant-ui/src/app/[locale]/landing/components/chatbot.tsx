"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import AIcon from "../../../../assets/images/avatars/logo.png";
import { useLocale } from "next-intl";
import UserIcon from "../../../../assets/images/avatars/user1.png";
import { useLayoutContext } from "@/states/layout";

// Helper function to retrieve query parameters from the URL

const Chatbot = () => {
  const chatElementRef = useRef<any>(null); // Adjust type as per actual DeepChat component
  const assistantId = "asst_gE6RWQvul8PGsCRMJeSc2Elo"; // Adjust based on your assistant ID
  const locale = useLocale();
  const isRTL = locale == "he";
  const initialMessagesen = [
    {
      role: "ai",
      text: "Hi there! How can I help you today?",
    },
    {
      role: "user",
      text: "Are you a human?",
    },
    {
      role: "ai",
      text: "I'm an AI, I'm here to answer any question you have!",
    },
  ];
  const initialMessageshe = [
    {
      role: "ai",
      text: "שלום! איך אני יכול לעזור לך היום?",
    },
    {
      role: "user",
      text: "אתה בן אדם?",
    },
    {
      role: "ai",
      text: "אני עוזר AI, אני כאן כדי לענות על כל שאלה שיש לך!",
    },
  ];

  const initialMessages =
    locale === "he" ? initialMessageshe : initialMessagesen;

  const [reset, setReset] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!; // Adjust based on Next.js environment variable usage
  const { state: layoutState } = useLayoutContext();

  const isWhite = layoutState.theme === "light"; // Change this to dynamically set the theme

  useEffect(() => {
    const fetchThreadId = async () => {
      try {
        const response = await axios.get<{ thread_id: string }>(
          `${api_url}/chat/create-thread`,
          {
            params: { assistant_id: assistantId },
          }
        );
        setThreadId(response.data.thread_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreadId();
  }, []);

  // Toggle chat visibility and notify the parent window

  const handleRequestInterceptor = (requestDetails: any) => {
    requestDetails.body = {
      text: requestDetails.body.messages[0].text,
      role: "user",
      thread_id: threadId,
      assistant_id: assistantId,
    };
    return requestDetails;
  };

  useEffect(() => {
    const handleResize = () => {
      if (chatElementRef.current) {
        const width = window.innerWidth < 750 ? window.innerWidth - 50 : 630; 
        const height = window.innerWidth < 500 ? 400 : 630; 
        chatElementRef.current.style.width = `${width}px`;
        chatElementRef.current.style.height = `${height}px`; // Adjust height as needed
      }
    };

    // Initial adjustment
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset the chat messages
  const handleResetClick = () => {
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  const marginRight = isRTL ? "0px" : "auto";
  const marginLeft = isRTL ? "auto" : "0px";

  return (
      <DeepChat
        id="deep-chat"
        className="join-item"
        stream={true}
        ref={chatElementRef}
        style={{
          border: isWhite
            ? "1px solid rgba(230,233,236)"
            : "1px solid rgba(0,0,0,0.7)",
          boxShadow: isWhite
            ? "0px 0px 12px 12px rgba(230,233,236)"
            : "0px 0px 12px 12px rgb(11,13,17)",
          borderRadius: "15px",
          backgroundColor: isWhite ? "#ffffff" : "#191E23",
        }}
        avatars={{
          ai: {
            src: AIcon.src,
            styles: {
              position: "left",
              avatar: {
                width: "25px",
                height: "25px",
              },
            },
          },
          user: {
            src: UserIcon.src,
            styles: {
              position: "left",
              avatar: {
                width: "25px",
                height: "25px",
              },
            },
          },
        }}
        initialMessages={initialMessages}
        request={{
          url: api_url + "/chat/start-chat",
          method: "POST",
        }}
        requestInterceptor={handleRequestInterceptor}
        responseInterceptor={(responseDetails) => {
          console.log(responseDetails);
          return responseDetails;
        }}
        textInput={{
          styles: {
            container: {
              borderRadius: "20px",
              border: "unset",
              width: "78%",
              backgroundColor: isWhite ? "rgba(255,255,255)" : "rgb(20,24,28)",
              boxShadow: isWhite
                ? "3px 3px 3px 2px rgba(230,233,236)"
                : "3px 3px 3px 2px rgba(0,0,0,0.7)",
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
            text: isRTL ? "הקלד הודעה..." : "Type a message...",
            style: {
              color: isWhite ? "#606060" : "#b0b0b0",
            },
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
                color: isWhite ? "#000000" : "#ffffff",
              },
            },
            user: {
              bubble: {
                color: isWhite ? "black" : "white",
              },
            },
            ai: {
              outerContainer: {
                backgroundColor: isWhite
                  ? "rgba(255,255,255)"
                  : "rgb(25,30,35)",
                borderTop: isWhite
                  ? "1px solid rgba(230,233,236)"
                  : "1px solid rgba(0,0,0,0.7)",
                borderBottom: isWhite
                  ? "1px solid rgba(230,233,236)"
                  : "1px solid rgba(0,0,0,0.7)",
              },
            },
          },
          loading: {
            bubble: { padding: "0.6em 1.78em 0.6em 1.3em" },
          },
        }}
        submitButtonStyles={{
          position: isRTL ? "inside-left" : "inside-right",
          submit: {
            container: {
              default: {
                bottom: "0.8em",
                borderRadius: "25px",
                padding: "6px 5px 4px",
                backgroundColor: "unset",
              },
              hover: {
                backgroundColor: isWhite ? "#b0deff4f" : "#333333",
              },
              click: {
                backgroundColor: isWhite ? "#b0deffb5" : "#4c4c4c",
              },
            },
            svg: {
              content:
                '<?xml version="1.0" encoding="utf-8"?> <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"/></svg>',
              styles: {
                default: {
                  width: "1.5em",
                  filter: isWhite
                    ? "brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)"
                    : "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(170deg) brightness(0%) contrast(0%)",
                },
              },
            },
          },
          loading: {
            text: {
              styles: {},
            },
            svg: {
              styles: {
                default: {
                  filter: isWhite
                    ? "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)"
                    : "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1000%) hue-rotate(90deg) brightness(0%) contrast(0%)",
                },
              },
            },
          },
          stop: {
            container: {
              hover: {
                backgroundColor: isWhite ? "#ededed94" : "#555555",
              },
            },
            svg: {
              styles: {
                default: {
                  filter: isWhite
                    ? "brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)"
                    : "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1000%) hue-rotate(90deg) brightness(0%) contrast(0%)",
                },
              },
            },
          },
        }}
        attachmentContainerStyle={{
          backgroundColor: "unset",
          top: "-2.6em",
          height: "4em",
        }}
      />
  );
};

export default Chatbot;
