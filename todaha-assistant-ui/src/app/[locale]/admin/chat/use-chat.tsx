"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import { fetchChats } from "@/app/lib/data";
import { transformChatsToIChat } from "@/app/lib/serialize/serialize";

const useChatHook = (resource: any) => {
  const data = resource.read();
  const [isPending, setIsPending] = useState(false);
  const transformedChats = transformChatsToIChat(data, 1);

  const [chats, setChats] = useState<any[]>(transformedChats);
  const [selectedChat, setSelectedChat] = useState<any>(transformedChats[0] || null);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const loadMore = async (page: number) => {
    setIsPending(true);
    try {
      const fetchedChats = await fetchChats(page);
      const transformedChats = transformChatsToIChat(fetchedChats, page);
      setCurrentPage(page);
      setChats(transformedChats);
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

export const ChatContextProvider = ({ children, resource }: { children: ReactNode, resource: any }) => {
  return <Context.Provider value={useChatHook(resource)}>{children}</Context.Provider>;
};

export const useChat = () => useContext(Context);
