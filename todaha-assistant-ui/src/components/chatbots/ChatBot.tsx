"use client";
import { DeepChat } from "deep-chat-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LogoImg from "./images/1.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const App = () => {
  const he = "480px";
  const we = "400px";
  console.log(he, we);

  const chatElementRef = useRef<any>(null);

  const assistantId = "asst_YPWyIo8l9IYB9QFWaI2mRvS1";
  const initialMessages = [
    {
      role: "ai",
      text: "היי, מה נשמע? מדברת שרה, תפקידי לענות על כל שאלה לגבי שירות עוזר בינה מלאכותי המותאם אישית שלנו.",
    },
  ];

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [reset, setReset] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [isAnimating, setAnimating] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1;
  const  t  = useTranslations('common');

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

  const handleRequestInterceptor = (requestDetails: { body: { messages?: any; text?: any; role?: string; thread_id?: null; assistant_id?: string; }; }) => {
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
          <Image src={LogoImg} className="w-8 h-8" alt={""} />
        </button>

        {isChatVisible && (
          <div className={`join join-vertical -top-4 absolute right-0 -translate-y-full bg-slate-900 rounded-2xl shadow-xl ring-1 ring-black ring-opacity-0 transition-opacity duration-300 ease-in-out transform ${isAnimating ? 'scale-100 opacity-100' : 'scale-85 opacity-0'}`}>
            <div className="p-2">
              <div className="flex flex-row rounded-2xl">
                <div className="flex flex-row items-center ml-3">
                  <div className="pr-5 p-1">
                    <div className="w-8 h-8 rounded-full">
                      <Image
                        src={LogoImg}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-white self-center">Todaha & Co</span>
                </div>
                <div className="flex flex-row absolute right-2 top-2">
                  <button
                    className="p-1 rounded-full text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-1"
                    onClick={handleResetClick}
                  >
                    {t('reset')}
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
                  width: window.innerWidth > 400 ? we : `${window.innerWidth - 20}px`,
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
                      boxShadow:
                        "0px 0px 3px 2px rgba(0, 0, 0, 0.16)",
                    },
                    text: {
                      padding: "10px",
                      textAlign: "right",
                      direction: "rtl",
                      paddingLeft: "15px",
                      paddingRight: "34px",
                    },
                  },
                  placeholder: {
                    text: "תשאל אותי כל שאלה",
                    style: {
                      color: "#606060",
                      textAlign: "right",
                    },
                  },
                }}
                messageStyles={{
                  default: {
                    shared: {
                      bubble: {
                        textAlign: "right",
                        direction: "rtl",
                        backgroundColor: "unset",
                        marginTop: "10px",
                        marginBottom: "10px",
                        boxShadow:
                          "0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16)",
                      },
                    },
                    user: {
                      bubble: {
                        textAlign: "right",
                        direction: "rtl",
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
