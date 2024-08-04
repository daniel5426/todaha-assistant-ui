"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import {
  updateChatbot,
} from "@/app/lib/data";
import { useAuthContext } from "@/states/auth";

const useCustom = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  
  const { state, updateUserInfo, currentChatbot } = useAuthContext();

  const chatbotSchema = z.object({
    logo: z.string().optional(),
    top_color: z.string().optional(),
    top_name: z.string().optional(),
    button_color: z.string().optional(),
    name_text_color: z.string().optional(),
    name: z.string().optional(),
    is_modal: z.boolean().optional(),
    id: z.string().optional(),
  });

  type CustomizationSchemaType = z.infer<typeof chatbotSchema>;

  const { control, handleSubmit, setValue, getValues } = useForm<CustomizationSchemaType>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: {
      id: currentChatbot?.id || "",
      logo: currentChatbot?.logo || "",
      top_color: currentChatbot?.top_color || "",
      top_name: currentChatbot?.top_name || "",
      button_color: currentChatbot?.button_color || "",
      name_text_color: currentChatbot?.name_text_color || "",
      name: currentChatbot?.name || "",
      is_modal: currentChatbot?.is_modal || false,
    },
  });


  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    updateChatbot(data)
      .then(async () => {
        console.log("Chatbot updated successfully");
        await updateUserInfo();
        setTimeout(() => {
          setIsLoading(false);
          toaster.success("Saved successfully.");
        }, 200);
      })
      .catch((error) => {
        console.error("Error updating chatbot:", error);
        toaster.error(error.response?.detail || "An error occurred");
      });
  });

  return {
    isLoading,
    control,
    onSubmit,
    setValue,
    getValues,
  };
};

type HookReturnType = ReturnType<typeof useCustom>;

const Context = createContext({} as HookReturnType);

export const CustomContextProvider = ({ children }: { children: ReactNode}) => {
  return (<Context.Provider value={useCustom()}>
  {children}
  </Context.Provider>);
};

export const useCustomHook = () => useContext(Context);

