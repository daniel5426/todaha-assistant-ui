"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchChats } from "@/app/lib/data";
import { transformChatsToIChat } from "@/app/lib/serialize/serialize";

const useChatHook = () => {
  const [isPending, setIsPending] = useState(false);

  const [chats, setChats] = useState<any[]>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalChats, setTotalChats] = useState<number>(0);
  const updateChats = async (page: number) => {
    setIsPending(true);
    try {
      const {last_chat, total_chats} = await fetchChats(page);
      const transformedChats = transformChatsToIChat(last_chat, page);
      setCurrentPage(page);
      setChats(transformedChats);
      setSelectedChat(transformedChats[0] || null);
      setTotalChats(total_chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
    setIsPending(false);
  }

  useEffect(() => {
    updateChats(1);
  }, []);


  const loadMore = async (page: number) => {
    setIsPending(true);
    try {
      updateChats(page);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
    setIsPending(false);
  }


  return {
    chats: chats,
    selectedChat,
    setSelectedChat,
    loadMore,
    totalChats,
    currentPage,
    isPending,
    setIsPending,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const ChatContextProvider = ({ children }: { children: ReactNode}) => {
  return <Context.Provider value={useChatHook()}>{children}</Context.Provider>;
};

export const useChat = () => useContext(Context);
