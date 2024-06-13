"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { IChat } from "@/types/apps/chat";
import { fetchChats } from "@/app/lib/data";
import { set } from "react-hook-form";
import { transformChatsToIChat } from "@/app/lib/serialize/serialize";

const useChatHook = () => {
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>(
    undefined
  );
  const [chats, setChats] = useState<IChat[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadChats(page: number) {
    setIsLoading(true);
    try {
      const fetchedChats = await fetchChats("asst_gE6RWQvul8PGsCRMJeSc2Elo", page);
      const transformedChats = transformChatsToIChat(fetchedChats, page);
      setCurrentPage(page);
      setChats(transformedChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
        setIsLoading(false);
      }
    }


  useEffect(() => {
    console.log("loading chats");
    loadChats(currentPage);
      }, []);

  return {
    chats: chats,
    selectedChat,
    setSelectedChat,
    loadChats,
    currentPage,
    isLoading,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  return <Context.Provider value={useChatHook()}>{children}</Context.Provider>;
};
export const useChat = () => useContext(Context);
