"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import AIcon from "../../../../../assets/images/avatars/logo.png";
import { useAuthContext } from "@/states/auth";
import { useLocale } from "next-intl";
import UserIcon from "../../../../../assets/images/avatars/user1.png";
import { useLayoutContext } from "@/states/layout";
import ResetIcon from "../../customization/component/icons/ResetIcon";
import useToast from "@/hooks/use-toast";
// Helper function to retrieve query parameters from the URL

const Chatbot = () => {
  const chatElementRef = useRef<any>(null); // Adjust type as per actual DeepChat component
  const { state } = useAuthContext();
  const { state: layoutState } = useLayoutContext();
  const assistantId = state.user?.assistant.id!;
  const {toaster} = useToast();
  const isWhite = layoutState.theme === "light"; // Change this to dynamically set the theme
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
                              background: unset; 
                              color: ${isWhite ? "#000000" : "#ffffff"};
                              justify-content: space-around;
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
                          top: 50%; 
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

  const [reset, setReset] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!; // Adjust based on Next.js environment variable usage


  // Handle window resize events to adjust the layout dynamically

  // Fetch a new thread ID from the API when the component mounts or resets
  useEffect(() => {
    axios
      .get<{ thread_id: string }>(`${api_url}/chat/create-thread`, {
        params: { assistant_id: assistantId },
      })
      .then((response) => {
        setThreadId(response.data.thread_id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reset]);
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

  const handleReset = () => {
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
    setReset((prevReset) => !prevReset);
  };



  // Reset the chat messages
  const handleResetClick = () => {
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  const locale = useLocale();
  const isRTL = locale == "he";
  const marginRight = isRTL ? "0px" : "auto";
  const marginLeft = isRTL ? "auto" : "0px";

  return (
    <div className="App" style={{ direction: "ltr" }}>
      <div className="shadow-xl rounded-xl join join-vertical relative">
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
            width: window.innerWidth < 750 ? window.innerWidth - 50 : 600,
            height: window.innerWidth < 500 ? 400 : 600,
            border: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
            boxShadow: isWhite ? "0px 0px 12px 12px rgba(230,233,236)" : "0px 0px 12px 12px rgb(11,13,17)",
            borderRadius: "15px",
            backgroundColor: isWhite ? "#ffffff" : "#191E23",
          }}
          avatars={{
            html: {//TODO
              styles: {
                avatar: {
                  width: "0px",
                  height: "0px"
                }
              },
            },
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

            if (responseDetails.text == "MAX_TOKEN_REACHED") {
              toaster.error("All your tokens of this month are used. Please Upgrade your plan.");
              responseDetails.text = "All your tokens of this month are used. Please Upgrade your plan.";
            }
            return responseDetails;
          }}
          textInput={{
            styles: {
              container: {
                borderRadius: "20px",
                border: isWhite ? "0.3px solid rgb(229,229,229)" : "0.3px solid rgb(20,24,28)",
                width: "88%",
                backgroundColor: isWhite ? "rgba(255,255,255)" : "rgb(20,24,28)",
                boxShadow: isWhite ? "2px 2px 5px rgba(0, 0, 0, 0.16)" : "2px 2px 5px rgba(0, 0, 0, 0.16)",
              },
              text: {
                padding: "10px",
                direction: isRTL ? "rtl" : "ltr",
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
            html: { shared: { bubble: //TODO
              { backgroundColor: 'unset', 
                padding: '0px', 
                boxShadow: 'none', 
                borderBottom: 'hidden',
                borderTop: 'hidden',
                border: 'unset'
              },
              outerContainer: {
                borderBottom: 'hidden',
                borderTop: 'hidden',
                border: 'unset'
              },

            } },
            default: {
              shared: {
                bubble: {
                  textAlign: isRTL ? "right" : "left",
                  direction: isRTL ? "rtl" : "ltr",
                  backgroundColor: "unset",
                  marginTop: "10px",
                  marginBottom: "10px",
                  maxWidth: "calc(100% - 80px)",
                  marginRight: marginRight,
                  marginLeft: marginLeft,
                  fontSize: "1em",
                  color: isWhite ? "#000000" : "#ffffff",
                },
                outerContainer: {
                  direction: isRTL ? "rtl" : "ltr",
                },
              },
              user: {
                bubble: {
                  color: isWhite ? "black" : "white",
                },
                outerContainer: {
                  borderBottom: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
                },
              },
              html: {
                bubble: {
                  direction: "ltr",
                  marginLeft:  "0",
                  marginRight: "auto",  
                },
              },
              ai: {
                outerContainer: {
                  backgroundColor: isWhite ? "rgba(255,255,255)" : "rgb(25,30,35)",
                  borderBottom: isWhite ? "1px solid rgba(230,233,236)" : "1px solid rgba(0,0,0,0.7)",
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
                    transform: isRTL ? "scaleX(-1)" : "none",
                    filter: isWhite
                      ? "brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)"
                      : "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(170deg) brightness(0%) contrast(0%)",
                  },
                },
              },
            },
            loading: {
              text: {
                styles: {
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
      </div>
    </div>
  );
};

export default Chatbot;

