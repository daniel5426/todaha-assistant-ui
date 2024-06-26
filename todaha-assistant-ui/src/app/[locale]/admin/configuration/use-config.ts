"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { get_user_info, updateAiConfiguration } from "@/app/lib/data";
import { useAuthContext } from "@/states/auth";

const useConfig = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { toaster } = useToast();
  const { state, setLoggedInUser, updateUserInfo } = useAuthContext();
  const [files, setFiles] = useState(state.user?.files || []);
  const contactSchema = z.object({
    welcome_message: z.string().optional(),
    instruction: z.string().optional(),
  });

  type ConfigSchemaType = z.infer<typeof contactSchema>;

  const { control, handleSubmit, setError } = useForm<ConfigSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      // Ensure default values are provided
      instruction: state.user?.assistant.instruction || "",
      welcome_message: state.user?.assistant.welcome_message || "",
    },
  });

  useEffect(() => {
     updateUserInfo();
  }, []);

  const transformErrorToForm = (
    errors: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (typeof key === "string") {
        setError(key as keyof ConfigSchemaType, { message: value as string });
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const result = await updateAiConfiguration(data);
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
    files,
  };
};

export default useConfig;
