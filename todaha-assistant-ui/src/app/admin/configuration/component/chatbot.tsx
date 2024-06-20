"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { DeepChat } from "deep-chat-react";
import AIcon from "../../../../assets/images/avatars/logo.png";
import FacebookIcon from "./icons/FacebookIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import CloseIcon from "./icons/CloseIcon";
import EmailIcon from "./icons/EmailIcon";
import ResetIcon from "./icons/ResetIcon";
import { useAuthContext } from "@/states/auth";

// Helper function to retrieve query parameters from the URL

const Chatbot = () => {
  const chatElementRef = useRef<any>(null); // Adjust type as per actual DeepChat component
  const { state } = useAuthContext();
  const assistantId = state.user?.assistant_id!;
  const initialMessages = [
    {
      role: "ai",
      text: "היי, מה נשמע? מדברת שרה, תפקידי לענות על כל שאלה לגבי שירות עוזר בינה מלאכותי המותאם אישית שלנו.",
    },
  ];

  const [reset, setReset] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!; // Adjust based on Next.js environment variable usage

  // Handle window resize events to adjust the layout dynamically
  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      if (event.data.type === "resize") {
        const width = event.data.width;
        document.getElementById("deep-chat")!.style.width = `${width}px`;
      }
    };

    window.addEventListener("message", handleResize);
    return () => {
      window.removeEventListener("message", handleResize);
    };
  }, []);

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
  }, [reset, api_url, assistantId]);

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

  // Open WhatsApp in a new tab
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/yourwhatsappnumber", "_blank");
  };

  // Open Facebook in a new tab
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/yourfacebookpage", "_blank");
  };

  // Reset the chat messages
  const handleResetClick = () => {
    setReset((prevReset) => !prevReset);
    if (chatElementRef.current) {
      chatElementRef.current.clearMessages();
    }
  };

  return (
    <div className="App">
          <div>
            <DeepChat
              id="deep-chat"
              className="join-item"
              stream={true}
              ref={chatElementRef}
              style={{
                height: "640px",
                width: "630px",
                border: "1px solid rgba(230,233,236)",
                boxShadow: "0px 0px 12px 12px rgba(230,233,236)",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
              }}
              avatars={{
                ai: {
                  src: AIcon.src,
                  styles: {
                    position: "right",
                    avatar: {
                      width: "30px",
                      height: "30px",
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
                    boxShadow: "3px 3px 3px 2px rgba(230,233,236)",
                  },
                  text: {
                    padding: "10px",
                    textAlign: "right",
                    paddingLeft: "15px",
                    paddingRight: "34px",
                    fontSize: "1.1em",
                  },
                },
                placeholder: {
                  text: "...תשאל אותי כל שאלה",
                  style: {
                    color: "#606060",
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
                      maxWidth: "100%",
                      marginRight: "0px",
                      marginLeft: "auto",
                      fontSize: "1.1em",
                    },
                  },
                  user: {
                    bubble: {
                      color: "black",
                    },
                  },
                  ai: {
                    outerContainer: {
                      maxWidth: "100%",
                      marginRight: "0px",
                      backgroundColor: "rgba(255,255,255)",
                      borderTop: "1px solid rgba(230,233,236)",
                      borderBottom: "1px solid rgba(230,233,236)",
                    },
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
                  text: {
                    styles: {
                      default: { marginRight: "0px", marginLeft: "auto" },
                    },
                  },
                  svg: {
                    styles: {
                      default: {
                        marginRight: "0px" ,
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
