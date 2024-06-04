"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import httpRequest from "@/services/api/request";
import routes from "@/services/routes";
import { sendEmail } from "@/data/contact";

const useContact = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const contactSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    message: z.string(),
  });

  type ContactSchemaType = z.infer<typeof contactSchema>;

  const { control, handleSubmit, setError } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
  });

  const transformErrorToForm = (
    errors: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (typeof key === "string") {
        setError(key as keyof ContactSchemaType, { message: value as string });
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      sendEmail(data);
    } catch (e) {
      transformErrorToForm((e as any).response.data);
    }
    setIsLoading(false);
  });

  return {
    showPassword,
    isLoading,
    control,
    onSubmit,
    toggleShowPassword,
  };
};

export default useContact;
