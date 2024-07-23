"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import ImageUploading from 'react-images-uploading';
import { get_user_info, updateAiConfiguration, updateChatbot } from "@/app/lib/data";
import { useAuthContext } from "@/states/auth";
import React from "react";

const useCustom = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { state, updateUserInfo, currentChatbotId } = useAuthContext();

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const chatbotSchema = z.object({
    topbar_color: z.string().optional(),
    top_name: z.string().optional(),
    logo: z.string().optional(),
    button_color: z.string().optional(),
    name: z.string().optional(),
    is_modal: z.boolean().optional(),
    id: z.string().optional(),
  });

  type ConfigSchemaType = z.infer<typeof chatbotSchema>;

  const { control, handleSubmit, setError, setValue } = useForm<ConfigSchemaType>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: {
      // Ensure default values are provided
      ...(() => {
        const chatbot = state.user?.assistant.chatbots.find(chatbot => chatbot.id === currentChatbotId);
        return {
          id: chatbot?.id || "",
          topbar_color: chatbot?.topbar_color || "",
          logo: chatbot?.logo || null,
          top_name: chatbot?.top_name || "",
          button_color: chatbot?.button_color || "",
          name: chatbot?.name || "",
          is_modal: chatbot?.is_modal || false,
        };
      })(),
    },
  });

  useEffect(() => {
     updateUserInfo();
  }, []);


  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await updateChatbot(data);
      toaster.success("Saved successfully.");
      await updateUserInfo();
    } catch (error: any) {
      toaster.error(error.response.detail);
    }
    setIsLoading(false);
  });

  return {
    isLoading,
    control,
    onSubmit,
    setValue,
  };
};

export default useCustom;
