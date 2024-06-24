"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import routes from "@/services/routes";
import { register } from "@/app/lib/data";
import useToast from "@/hooks/use-toast";

const useRegister = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toaster } = useToast();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  type RegisterSchemaType = z.infer<typeof registerSchema>;

  const { control, handleSubmit, setError } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    
  });

  const transformErrorToForm = (
    errors: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (typeof key === "string") {
        setError(key as keyof RegisterSchemaType, { message: value as string });
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
  
    try {
      const result = await register(data);
      toaster.success('Registration successful. Please login.');
      router.push(routes.auth.login);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Handle validation errors from the server
        const { data } = error.response;
        console.log('Validation errors:', data);
        transformErrorToForm({ username: data.detail }); // Set errors in the form
      } else if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized (though it's uncommon for registration)
        toaster.error('You are not authorized to access this resource. Please login.');
        router.push(routes.auth.login);
      } else {
        console.error('Unexpected error:', error);
        toaster.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  });
  
  return {
    showPassword,
    isLoading,
    control,
    onSubmit,
    toggleShowPassword,
  };
};

export default useRegister;
