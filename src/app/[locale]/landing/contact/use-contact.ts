"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendEmail } from "@/app/lib/data";
import useToast from "@/hooks/use-toast";

const useContact = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toaster } = useToast();

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
      const result = await sendEmail(data);
    } catch (e) {
      toaster.error('An unexpected error occurred. Please try again.');
    }
    setIsLoading(false);
    toaster.success('Message sent successfully.');
  });

  return {
    isLoading,
    control,
    onSubmit,
  };
};

export default  useContact;
