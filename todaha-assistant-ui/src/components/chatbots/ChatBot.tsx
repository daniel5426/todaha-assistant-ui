"use client";
import { DeepChat } from "deep-chat-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LogoImg from "./images/1.png";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export const App = () => {
  const he = "520px";
  const we = "385px";
  console.log(he, we);
  const locale = useLocale();
  const isRTL = locale === "he";

  const chatElementRef = useRef<any>(null);

  const assistantId = "asst_RTpyDTujpSkjYe7rhoVc66ut";

  const welcomeMessages = {
    en: "Hi There! I'm Dan, and my role is to answer any questions about developing an AI assistant for your website.",
    he: "היי, מה נשמע? מדברת שרה, תפקידי לענות על כל שאלה לגבי פיתוח עוזר AI לאתר שלך.",
    fr: "Bonjour ! Je suis Dan, et mon rôle est de répondre à toutes vos questions concernant le développement d'un assistant IA pour votre site web.",
    // Add more languages as needed
  } as any;

  const placeholderTexts = {
    en: "Type a message...",
    he: "הקלד הודעה...",
    fr: "Tapez un message...",
    // Add more languages as needed
  } as any;

  const welcomeMsg = welcomeMessages[locale] || welcomeMessages.en;
  const placeholderText = placeholderTexts[locale] || placeholderTexts.en;

  const initialMessages = [
    {
      role: "ai",
      text: welcomeMsg,
    },
  ];

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [reset, setReset] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [isAnimating, setAnimating] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1;

  useEffect(() => {
    axios
      .get(`${api_url}/chat/create-thread`, {
        params: { assistant_id: assistantId },
      })
      .then((response) => {
        setThreadId(response.data.thread_id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reset, api_url, assistantId]);

  const handleRequestInterceptor = (requestDetails: {
    body: {
      messages?: any;
      text?: any;
      role?: string;
      thread_id?: null;
      assistant_id?: string;
    };
  }) => {
    requestDetails.body = {
      text: requestDetails.body.messages[0].text,
      role: "user",
      thread_id: threadId,
      assistant_id: assistantId,
    };
    return requestDetails;
  };

  const toggleChatVisibility = () => {
    if (isChatVisible) {
      setAnimating(false);
      setTimeout(() => setIsChatVisible(false), 300); // match this duration with the CSS transition duration
    } else {
      setIsChatVisible(true);
      setTimeout(() => setAnimating(true), 10); // allow the state to update before starting the animation
    }
    setReset((prevReset) => !prevReset);
  };

  const closeChatVisibility = () => {
    setIsChatVisible(false);
  };

  const handleResetClick = () => {
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.link/daywlr", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/yourfacebookpage", "_blank");
  };

  return (
    <div className="fixed bottom-3 right-3 flex" style={{ zIndex: 9999 }}>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleChatVisibility}
          className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-900 text-white hover:bg-slate-900 transition-all duration-300 ease-in-out transform hover:scale-110 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "44px", height: "44px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>

        {isChatVisible && (
          <div
            className={`join join-vertical -top-4 absolute right-0 -translate-y-full bg-slate-900 rounded-2xl shadow-xl ring-1 ring-black ring-opacity-0 transition-opacity duration-300 ease-in-out transform ${
              isAnimating ? "scale-100 opacity-100" : "scale-85 opacity-0"
            }`}
          >
            <div className="p-2">
              <div className="flex flex-col rounded-2xl">
                <div className="flex flex-row items-center ml-3">
                  <div className=" pr-5 p-1">
                    <div className="w-9 h-9 rounded-full">
                      <Image
                        src={LogoImg}
                        alt="Logo"
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                  <div className="grow">
                    <span className="text-white  text-[17px]  text-center self-center ">
                      Todaha
                    </span>
                    <div className="flex items-center gap-2 mt-[-2px]">
                      <div className="size-2 rounded-full bg-success"></div>
                      <p className="text-[12px] text-white">Active</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row absolute right-2 top-2">
                  <button
                    className="p-1 rounded-full text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-1"
                    onClick={handleResetClick}
                  >
                    <svg
                      fill="#ffffff"
                      className="w-5 h-5"
                      viewBox="0 0 1920 1920"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                          fill-rule="evenodd"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                  <button
                    className="p-1 rounded-full text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    onClick={toggleChatVisibility}
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
            <div>
              <DeepChat
                id="deep-chat"
                className="join-item"
                stream={true}
                ref={chatElementRef}
                style={{
                  height: he,
                  fontSize: "0.95em",
                  width:
                    window.innerWidth > 400
                      ? we
                      : `${window.innerWidth - 20}px`,
                  borderRadius: "0 0 15px 15px",
                  border: "unset",
                  borderColor: "#dcdcdc",
                  backgroundColor: "#f3f6fc",
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
                      marginLeft: "-px",
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
                        background:
                          "linear-gradient(130deg, #2DC3EF 20%, #2DC3EF 77.5%)",
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
                  position: "outside-right",
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
                dropupStyles={{
                  button: {
                    styles: {
                      container: {
                        default: { backgroundColor: "#eff8ff" },
                        hover: { backgroundColor: "#e4f3ff" },
                        click: { backgroundColor: "#d7edff" },
                      },
                    },
                  },
                  menu: {
                    container: {
                      boxShadow: "#e2e2e2 0px 1px 3px 2px",
                    },
                    item: {
                      hover: {
                        backgroundColor: "#e1f2ff",
                      },
                      click: {
                        backgroundColor: "#cfeaff",
                      },
                    },
                    iconContainer: {
                      width: "1.8em",
                    },
                    text: {
                      fontSize: "1.05em",
                    },
                  },
                }}
                attachmentContainerStyle={{
                  backgroundColor: "unset",
                  top: "-2.6em",
                  height: "4em",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
