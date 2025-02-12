"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import { useAuthContext } from "@/states/auth";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutContext } from "@/states/layout";

const Chatbot = () => {
  const chatElementRef = useRef<any>(null);
  const { state } = useAuthContext();
  const { state: layoutState } = useLayoutContext();
  const assistantId = "asst_cqai9Gl5vxtG1G25rqd0RZHa";
  const [chatbotConfig, setChatbotConfig] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [savedMessages, setSavedMessages] = useState<any[]>([]);

  const [threadId, setThreadId] = useState<string | null>(null);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!;
  const isWhite = layoutState.theme === "light";
  const [reset, setReset] = useState(false);
  const [activeText, setActiveText] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const active_lg = {
    he: "מחובר",
    en: "Active",
    fr: "Actif",
  };
  const placeholder_text_possible_values = {
    he: "הקלד הודעה...",
    en: "Type your message...",
    fr: "Écrivez votre message...",
  };

  const welcome_message_possible_values = {
    fr: "Salut! 🌟\nPrêt à créer un chatbot IA unique pour votre site ? Posez-moi vos questions, je suis là pour vous accompagner !",
    en: "Hi! 🌟\nReady to create a unique AI chatbot for your site? Ask me your questions, I'm here to help!",
    he: "שלום! 🌟\nמוכנים ליצור צ'אטבוט AI ייחודי לאתר שלכם? שאלו אותי שאלות, אני כאן כדי לעזור!",
  };

  const initial_questions_possible_values = {
    fr: "Peut-on l'intégrer à Shopify ou Wix ?\nQuels sont les coûts ?",
    en: "Can it be integrated with Shopify or Wix?\nWhat are the costs?",
    he: "האם ניתן לשלב את זה עם Shopify או Wix?\nמה העלויות והאם אפשר לנסות אותו בחינם?\nמה העלויות והאם אפשר לנסות אותו בחינם?\nמה העלויות והאם אפשר לנסות אותו בחינם?",
  };

  const currentLocale = useLocale();
  const isRightToLeft = currentLocale === "he";
  const [buttonOpacity, setButtonOpacity] = useState(0);
  useEffect(() => {
    const fetchChatbotConfig = async () => {
      try {
        const response = await axios.get(`${api_url}/chat/get-assistant`, {
          params: { assistant_id: assistantId },
        });
        const { assistant } = response.data;
        const lg = currentLocale;

        setChatbotConfig({
          bg_color: assistant.chatbots[0].bg_color,
          top_color: assistant.chatbots[0].top_color,
          name_text_color: assistant.chatbots[0].name_text_color,
          logo: assistant.chatbots[0].logo || "",
          top_name: assistant.chatbots[0].top_name,
          button_text_color: assistant.chatbots[0].button_text_color,
          button_text: assistant.chatbots[0].button_text,
          button_color: assistant.chatbots[0].button_color,
          lg: assistant.chatbots[0].lg,
          initial_questions:
            initial_questions_possible_values[lg] ||
            assistant.initial_questions,
          welcome_message:
            welcome_message_possible_values[lg] || assistant.welcome_message,
        });

        setPlaceholderText(placeholder_text_possible_values[lg]);
        setActiveText(active_lg[lg]);
      } catch (error) {
        console.error("Failed to fetch chatbot configuration:", error);
      }
    };

    fetchChatbotConfig();
  }, [assistantId, api_url]);

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
  }, [reset]);

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
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
      setSavedMessages([]);
    }
  };

  const toggleChatbot = () => {
    if (isOpen) {
      setIsOpen(false);
      if (chatElementRef.current) {
        const currentMessages = chatElementRef.current.getMessages();
        setSavedMessages(currentMessages);
      }
      setTimeout(() => setIsRendered(false), 300);
    } else {
      setIsRendered(true);
      setTimeout(() => setIsOpen(true), 50);
    }
  };

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
    const charWidth = currentLocale === 'he' ? 8 : 9;
    return Math.max(approximateCharsPerRow * charWidth, 40);
  }

  useEffect(() => {
    if (chatbotConfig) {
      setTimeout(() => setButtonOpacity(1), 100);
    }
  }, [chatbotConfig]);

  if (!chatbotConfig) {
    return null;
  }

  const isRTL = chatbotConfig?.lg === "he";

  return (
    <div className="fixed bottom-5 end-2 z-[9999]">
      <div
        className="flex justify-end"
        style={{
          zIndex: 9999,
          direction: "ltr",
          opacity: buttonOpacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div className="relative inline-block text-left">
          <button
            onClick={toggleChatbot}
            style={{
              backgroundColor: chatbotConfig?.button_color,
              color: chatbotConfig?.button_text_color,
            }}
            className="inline-flex justify-center items-center rounded-full text-xl transition-all duration-200 ease-in-out transform hover:scale-107 active:scale-95"
          >
            {chatbotConfig?.button_text && (
              <span
                className="pl-4 mr-[-7px]"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                {chatbotConfig?.button_text}
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

          {isRendered && (
            <div
              className="join join-vertical mb-3 absolute right-0 bottom-full border-[1px] border-gray-200"
              style={{
                transformOrigin: "bottom right",
                transition: "all 0.3s ease-in-out",
                opacity: isOpen ? 1 : 0,
                transform: isOpen
                  ? "scale(1) translateY(0)"
                  : "scale(0.95) translateY(0)",
                pointerEvents: isOpen ? "auto" : "none",
                visibility: isOpen ? "visible" : "hidden",
                position: "absolute",
                borderRadius: "25px",
                boxShadow: `
                  0 15px 50px 0px rgb(0 0 0 / 0.07),
                  0 -15px 50px 0px rgb(0 0 0 / 0.03),
                  15px 0 50px 0px rgb(0 0 0 / 0.07),
                  -15px 0 50px 0px rgb(0 0 0 / 0.07)
                `,
                backgroundColor: chatbotConfig?.bg_color,
              }}
            >
              <div
                className="p-2 join-item relative z-10"
                style={{
                  backgroundColor: chatbotConfig.top_color,
                  marginBottom: "15px",
                }}
              >
                <div
                  className="flex flex-col"
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    borderRadius: "0 0 25px 25px",
                    marginBottom: "-16.5px",
                    position: "relative",

                    zIndex: 2,
                  }}
                >
                  <div className={`flex flex-row items-center `}>
                    {chatbotConfig?.logo !== "" && (
                      <div className={`p-1`} style={{ padding: "0 0.70rem" }}>
                        <div className="w-9 h-9 rounded-full ">
                          <img
                            src={chatbotConfig.logo}
                            alt="Logo"
                            className="w-full h-full object-cover "
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className="grow flex flex-row"
                      style={{ color: chatbotConfig.name_text_color }}
                    >
                      <span
                        className="text-center self-center"
                        style={{ padding: "0 0.35rem" }}
                      >
                        <p className="text-lg font-bold">
                          {chatbotConfig.top_name}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-full w-2 h-2"
                            style={{ backgroundColor: "#28A745" }}
                          ></div>
                          <p className="text-xs">{activeText}</p>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex flex-row absolute top-2"
                    style={{
                      left: isRTL ? "10px" : "auto",
                      right: isRTL ? "auto" : "10px",
                    }}
                  >
                    <button
                      style={{
                        color: chatbotConfig?.name_text_color,
                      }}
                      className="p-1 rounded-full bg-transparent hover:rotate-180 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-1"
                      onClick={handleReset}
                    >
                      <svg
                        fill={chatbotConfig.name_text_color}
                        className="w-5 h-5"
                        viewBox="0 0 1920 1920"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke={chatbotConfig.name_text_color}
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
                      className="p-1 rounded-full bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      onClick={toggleChatbot}
                      style={{ color: chatbotConfig.name_text_color }}
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
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: 0,
                    width: "100%",
                    height: "22px",
                    zIndex: 1,
                  }}
                >
                  <svg
                    viewBox="0 0 500 50"
                    preserveAspectRatio="none"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <path
                      d={isRTL 
                        ? "M500,50 C375,0 225,80 0,30 L0,0 L500,0 Z"
                        : "M0,50 C125,0 275,80 500,30 L500,0 L0,0 Z"
                      }
                      fill={chatbotConfig.top_color}
                    />
                  </svg>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>

              <DeepChat
                id="deep-chat"
                className="join-item"
                stream={true}
                ref={chatElementRef}
                style={{
                  height:
                    window.innerWidth > 380
                      ? "540px"
                      : `${(window.innerWidth - 20) * (540 / 380)}px`,
                  fontSize: "0.90em",
                  width:
                    window.innerWidth > 380
                      ? "380px"
                      : `${window.innerWidth - 20}px`,
                  zIndex: 50,
                  border: "none",
                  borderRadius: "0 0 25px 25px",
                  outline: "none",
                  backgroundColor: chatbotConfig?.bg_color,
                }}
                initialMessages={
                  savedMessages.length > 1
                    ? savedMessages
                    : [
                        {
                          role: "ai",
                          text: chatbotConfig?.welcome_message || "",
                        },
                        ...(chatbotConfig?.initial_questions
                          ? (() => {
                              const questions = chatbotConfig?.initial_questions
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
                                  <div style="width: calc(100% - 17px);overflow-x: auto; white-space: nowrap; padding: 10px 18px; scrollbar-width: none; -ms-overflow-style: none;">
                                    <div style="display: inline-flex; gap: 8px; margin-bottom: 5px; padding-right: 7%;">
                                      ${questions
                                        .map(
                                          ({ text, width }) => `
                                        <button 
                                          class="deep-chat-button deep-chat-suggestion-button" 
                                          style="border: none; 
                                            background: white; 
                                            justify-content: space-around;
                                            box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16); 
                                            width: ${width}px;
                                            white-space: normal; 
                                            height: 45px; 
                                            border-radius: 8px;
                                            display: flex; 
                                            align-items: center; 
                                            text-align: center; 
                                            padding: 8px 12px; 
                                            direction: ${
                                              isRightToLeft ? "rtl" : "ltr"
                                            };
                                            line-height: 1.2;"
                                        >${text}</button>
                                      `
                                        )
                                        .join("")}
                                    </div>
                                  </div>
                                  ${
                                    totalWidth > 320 && window.innerWidth > 768
                                      ? `
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
                                        right: -20px; 
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
                      ]
                }
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
                      marginBottom: "30px",
                      borderRadius: "20px",
                      width: "90%",
                      border: "0.3px solid rgb(229,229,229)",
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
                  html: {
                    shared: {
                      bubble: {
                        backgroundColor: "white",
                        padding: "0px",
                        borderBottom: "hidden",
                        borderTop: "hidden",
                        border: "0px",
                        boxShadow: "unset",
                      },
                      outerContainer: {
                        borderBottom: "hidden",
                        borderTop: "hidden",
                        border: "0px",
                      },
                    },
                  },
                  default: {
                    shared: {
                      bubble: {
                        direction: isRTL ? "rtl" : "ltr",
                        marginTop: "10px",
                        background: "white",
                        marginBottom: "10px",
                        maxWidth: "calc(100% - 80px)",
                        boxShadow:
                          "0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16)",
                      },
                    },
                    html: {
                      bubble: {
                        direction: "ltr",
                        marginLeft: "0",
                        marginRight: "auto",
                      },
                    },
                    user: {
                      bubble: {
                        direction: isRTL ? "rtl" : "ltr",
                        background: "white",
                        color: "#000000",
                        marginLeft: isRTL ? "0" : "auto",
                        marginRight: isRTL ? "auto" : "0",
                      },
                    },
                    ai: {
                      bubble: {
                        background: "white",
                        marginLeft: isRTL ? "auto" : "0",
                        marginRight: isRTL ? "0" : "auto",
                      },
                    },
                  },
                  loading: {
                    bubble: {
                      padding: "0.6em 1.78em 0.6em 1.3em",
                      marginLeft: isRTL ? "auto" : "0",
                      marginRight: isRTL ? "0" : "auto",
                    },
                  },
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
                          transform: isRTL ? "scaleX(-1)" : "none",
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
                  backgroundColor: "transparent",
                  position: "relative", // Changed from absolute to relative
                  marginTop: "-28px",
                  zIndex: 100,
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
                  <span style={{ color: "#206BAB", fontWeight: "bold" }}>
                    Todaha
                  </span>
                </a>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
