"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import { updateAiConfiguration } from "@/app/lib/data";
import { useAuthContext } from "@/states/auth";

const useConfig = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { state, updateAssistant } = useAuthContext();
  const [files, setFiles] = useState(state.user?.assistant.files || []);
  const contactSchema = z.object({
    welcome_message: z.string().optional(),
    instruction: z.string().optional(),
    initial_questions: z.string().optional(),
  });

  type ConfigSchemaType = z.infer<typeof contactSchema>;

  const { control, handleSubmit, setError } = useForm<ConfigSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      // Ensure default values are provided
      instruction: state.user?.assistant.instruction || "",
      welcome_message: state.user?.assistant.welcome_message || "",
      initial_questions: state.user?.assistant.initial_questions || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await updateAiConfiguration(data);
      updateAssistant(data);
      setTimeout(() => {
        setIsLoading(false);
        toaster.success("Saved successfully.");
      }, 200);
    } catch (error: any) {
      toaster.error(error.response.detail);
    }
  });

  return {
    isLoading,
    control,
    onSubmit,
    files,
  };
};

export default useConfig;
