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

  const updateChats = async (page: number) => {
    const fetchedChats = await fetchChats(page);
    const transformedChats = transformChatsToIChat(fetchedChats, page);
    setCurrentPage(page);
    setChats(transformedChats);
    setSelectedChat(transformedChats[0] || null);
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
      setIsPending(false);
    }
    setIsPending(false);
  }


  return {
    chats: chats,
    selectedChat,
    setSelectedChat,
    loadMore,
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
