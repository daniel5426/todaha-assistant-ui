"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { IChat } from "@/types/apps/chat";
import { fetchChats } from "@/app/lib/data";
import { set } from "react-hook-form";
import { transformChatsToIChat } from "@/app/lib/serialize/serialize";
import { useAuthContext } from "@/states/auth";

const useChatHook = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>(
    undefined
  );
  const { state } = useAuthContext();
  const [chats, setChats] = useState<IChat[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function fetchData(page: number) {
    try {
      startTransition(async () => {
        if (!state.user?.assistant_id) {
          return;
        }
        const fetchedChats = await fetchChats(state.user?.assistant_id, page);
        const transformedChats = transformChatsToIChat(fetchedChats, page);
        setCurrentPage(page);
        setChats(transformedChats);
        console.log("Fetched Chats:", transformedChats);
      });
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

    useEffect(() => {
      fetchData(currentPage);    
        }, []);
  
  
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

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  return <Context.Provider value={useChatHook()}>{children}</Context.Provider>;
};
export const useChat = () => useContext(Context);
