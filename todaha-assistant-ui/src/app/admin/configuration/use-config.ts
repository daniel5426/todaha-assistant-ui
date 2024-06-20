"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { UpdateAiConfiguration } from "@/app/lib/data";

const useConfig = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toaster } = useToast();

  const contactSchema = z.object({
    name: z.string(),
    welcomeMessage: z.string(),
    instruction: z.string().email(),
  });

  type ConfigSchemaType = z.infer<typeof contactSchema>;

  const { control, handleSubmit, setError } = useForm<ConfigSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      // Ensure default values are provided
      name: "",
      instruction: "",
      welcomeMessage: "",
    },
  });

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
      const result = await UpdateAiConfiguration(data);
      toaster.success('Saved successfully.');
    } catch (e) {
      transformErrorToForm((e as any).response.data);
    }
    setIsLoading(false);
  });

  return {
    isLoading,
    control,
    onSubmit,
  };
};

export default  useConfig;
