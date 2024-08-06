// components/CustomizableChatbot.tsx

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthContext } from "@/states/auth";
import AIcon from "../../../../../assets/images/avatars/fav.png";
import { useLocale } from "next-intl";
import { DeepChat } from "deep-chat-react";
import axios from "axios";

interface CustomizableChatbotProps {
  topName: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonText: string;
  topColor: string;
  nameTextColor: string;
  logo: string;
  bgColor: string;
  selectedLanguage: string;
}

const ChatbotCorner: React.FC<CustomizableChatbotProps> = ({
  topName,
  buttonColor,
  buttonTextColor,
  buttonText,
  topColor,
  bgColor,
  nameTextColor,
  selectedLanguage,
  logo,
}: CustomizableChatbotProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { state, currentChatbot, updateUserInfo } = useAuthContext();
  const isRTL = selectedLanguage === "he";
  const [reset, setReset] = useState(false);
  const [logo2, setLogo2] = useState(logo);
  const chatElementRef = useRef<any>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1;
  const placeholderText = "Type your message...";
  const initialMessages = [
    { role: "ai", text: state.user?.assistant?.welcome_message || "" },
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Fetch a new thread ID from the API when the component mounts or resets
  useEffect(() => {
    updateUserInfo().then(() => {
      axios
        .get(`${api_url}/chat/create-thread`, {
          params: { assistant_id: state.user?.assistant?.id || "" },
        })
        .then((response) => {
          setThreadId(response.data.thread_id);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [reset]);

  // Intercept and modify the request details before sending
  const handleRequestInterceptor = (requestDetails) => {
    requestDetails.body = {
      text: requestDetails.body.messages[0].text,
      role: "user",
      thread_id: threadId,
      assistant_id: state.user?.assistant?.id || "",
    };
    return requestDetails;
  };

  const handleResetClick = () => {
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  return (
    <div
      className=" mt-[638px] flex ml-60"
      style={{ zIndex: 9999, direction: "ltr" }}
    >
      <div className="relative inline-block text-left">
        <button
          onClick={toggleChatbot}
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          className="inline-flex justify-center items-center rounded-full hover:scale-110 transition-all duration-300 ease-in-out transform gap-1 text-xl"
        >
          {buttonText && (
            <span
              className="pl-4 mr-[-7px]"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              {buttonText}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14 py-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`join join-vertical -top-7 absolute right-0 -translate-y-full  rounded-xl shadow-xl ring-1 ring-gray-200 ring-opacity-20 transition-opacity duration-300 ease-in-out transform`}
          >
            <div
              className="p-2 join-item"
              style={{
                backgroundColor: topColor,
              }}
            >
              <div
                className="flex flex-col rounded-2xl"
                style={{ direction: "ltr" }}
              >
                <div className="flex flex-row items-center ml-3">
                  {logo !== "" && (
                    <div className="pr-5 p-1">
                      <div className="w-9 h-9 rounded-full ">
                        <img
                          src={logo}
                          alt="Logo"
                          className="w-full h-full object-cover "
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className="grow flex flex-row "
                    style={{ color: nameTextColor }}
                  >
                    <span className="text-[17px] font-bold">
                      {topName}
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-success"></div>
                        <p className="text-[12px]">Active</p>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row absolute right-2 top-2">
                  <button
                    style={{ color: nameTextColor }}
                    className="p-1 rounded-full bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-1"
                    onClick={handleResetClick}
                  >
                    <svg
                      fill={nameTextColor}
                      className="w-5 h-5"
                      viewBox="0 0 1920 1920"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke={nameTextColor}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                  </button>
                  <button
                    style={{ color: nameTextColor }}
                    className="p-1 rounded-full bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onClick={toggleChatbot}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <DeepChat
              id="deep-chat"
              className="join-item"
              stream={true}
              ref={chatElementRef}
              style={{
                height: "550px",
                fontSize: "0.95em",
                zIndex: 50,
                borderRadius: "0 0 12px 12px",
                width:
                  window.innerWidth > 400
                    ? "400px"
                    : `${window.innerWidth - 20}px`,
                border: "none",
                boxShadow: "none",
                outline: "none",
                backgroundColor: bgColor,
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
                    border: "none",
                    width: "78%",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.16)",
                  },
                  text: {
                    padding: "10px",
                    textAlign: isRTL ? "right" : "left",
                    direction: isRTL ? "rtl" : "ltr",
                    paddingLeft: "15px",
                    paddingRight: "34px",
                  },
                },
                placeholder: {
                  text: placeholderText,
                  style: {
                    color: "#606060",
                  },
                },
              }}
              messageStyles={{
                default: {
                  shared: {
                    bubble: {
                      direction: isRTL ? "rtl" : "ltr",
                      backgroundColor: "unset",
                      marginTop: "10px",
                      marginBottom: "10px",
                      boxShadow:
                        "0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16)",
                    },
                  },
                  user: {
                    bubble: {
                      direction: isRTL ? "rtl" : "ltr",
                      background: "rgba(255,255,255,0.7)",
                      color: "#000000",
                    },
                  },
                  ai: {
                    bubble: { background: "rgba(255,255,255,0.7)" },
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
                      backgroundColor: "#b0deff4f",
                    },
                    click: {
                      backgroundColor: "#b0deffb5",
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
                  container: {
                    hover: {
                      backgroundColor: "#ededed94",
                    },
                  },
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
                zIndex: 9999,
                backgroundColor: bgColor,
                position: "absolute",
                bottom: "-2px",
                height: "0px",
                left: 0,
                right: 0,
              }}
              className="join-item"
            >
              <a
                href="https://todaha-chat.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px", color: "#606060", zIndex: 9999}}
              >
                Powered by{" "}
                <span style={{ color: "#206BAB", fontWeight: "bold" }}>
                  Todaha
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotCorner;
