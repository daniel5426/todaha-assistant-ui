"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import { IChat } from "@/types/apps/chat";
import { fetchChats } from "@/app/lib/data";
import { set } from "react-hook-form";
import { transformChatsToIChat } from "@/app/lib/serialize/serialize";
import { useAuthContext } from "@/states/auth";

const useChatHook = (resource: any) => {
  const data = resource.read();
  const [isPending, setIsPending] = useState(false);
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>(
    undefined
  );
  const transformedChats = transformChatsToIChat(data, 1);

  const [chats, setChats] = useState<IChat[]>(transformedChats);
  const [currentPage, setCurrentPage] = useState<number>(1);


  async function fetchData(page: number) {
    setIsPending(true);
    try {
      const fetchedChats = await fetchChats(page);
      const transformedChats = transformChatsToIChat(fetchedChats, page);
      setCurrentPage(page);
      setChats(transformedChats);
      console.log("Fetched Chats:", transformedChats);
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
    fetchData,
    currentPage,
    isPending,
  };
};

type HookReturnType = ReturnType<typeof useChatHook>;

const Context = createContext({} as HookReturnType);

export const ChatContextProvider = ({
  children,
  resource,
}: {
  children: ReactNode;
  resource: any;
}) => {
  return (
    <Context.Provider value={useChatHook(resource)}>
      {children}
    </Context.Provider>
  );
};
export const useChat = () => useContext(Context);
