"use client";
import Cookies from "js-cookie";

import { useCallback, useEffect, useRef } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import {
  IAssistant,
  IAuthState,
  IAuthUser,
  IChatBot,
  Token,
} from "@/types/auth";
import axiosInstance from "@/app/lib/axiosConfig";
import { get_user_info } from "@/app/lib/data";

export const getToken = () => {
  return Cookies.get("token");
};

const useHook = () => {
  const [state, setState] = useSessionStorage<IAuthState>("__ADMIN_AUTH__", {});
  const [currentChatbot, setCurrentChatbot] = useSessionStorage<IChatBot>(
    "__CURRENT_CHATBOT__",
    {
      button_color: "#000",
      button_text_color: "#fff",
      button_text: "",
      top_color: "#000",
      name_text_color: "#000",
      bg_color: "#000",
      lg: "en",
      logo: "",
      id: "",
      name: "",
      top_name: "",
      is_modal: false,
    }
  );

  const setLoggedInUser = (user: IAuthUser) => {
    setState({ user: user });
  };

  const isLoggedIn = () => {
    return Cookies.get("loggedIn") === "true";
  };

  const setToken = (token: any) => {
    if (token.access_token) {
      Cookies.set("loggedIn", "true", { expires: 10 });
      Cookies.set("token", token.access_token, { expires: 10 });
    }
  };

  const updateState = (changes: Partial<IAuthState>) => {
    setState({
      ...state,
      ...changes,
    });
  };

  const updateAssistant = (changes: Partial<IAssistant>) => {
    setState({
      ...state,
      user: {
        ...state.user,
        assistant: {
          ...state.user?.assistant,
          ...changes,
        },
      },
    });
  };

  const updateChatbotState = (changes: Partial<IChatBot>) => {
    setCurrentChatbot({
      ...currentChatbot,
      ...changes,
    });
  };

  const updateUserInfo = async () => {
    if (isLoggedIn()) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const user_info = await get_user_info();
      setLoggedInUser(user_info);
      const newChatbot = user_info?.assistant?.chatbots[0] || null;
      console.log("New chatbot:", newChatbot);

      setCurrentChatbot((prevChatbot) => {
        console.log("Previous currentChatbot:", prevChatbot);
        console.log("Updated currentChatbot:", newChatbot);
        return newChatbot;
      });
    }
  };


  const logout = () => {
    updateState({
      user: undefined,
    });
    setToken({
      access_token: undefined,
    });
    updateChatbotState({
      id: "",
      name: "",
      logo: "",
      lg: "en",
      is_modal: false,
    });
    Cookies.set("loggedIn", "false", { expires: 1 });
    Cookies.set("token", "", { expires: 1 });
  };

  return {
    state,
    setLoggedInUser,
    isLoggedIn,
    logout,
    setToken,
    currentChatbot,
    updateUserInfo,
    updateChatbotState,
    updateState,
    updateAssistant,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
