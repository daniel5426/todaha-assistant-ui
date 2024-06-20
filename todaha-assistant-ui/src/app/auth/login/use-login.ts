"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import useToast from "@/hooks/use-toast";
import httpRequest from "@/services/api/request";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import axios from "axios";
import { get_token, get_user_info } from "@/app/lib/data";

const useLogin = () => {
  const router = useRouter();
  const { toaster } = useToast();
  const { setLoggedInUser, setToken } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const { control, handleSubmit, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  });

  const transformErrorToForm = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
      try {
        const response = await get_token(data);
        setToken({
          access_token: response.access_token,
        });
    
        const user_info = await get_user_info(data);
        console.log(user_info);
        setLoggedInUser(user_info);
        toaster.success("Login successfully...");
        router.push(routes.admin.dashboard);
      } catch (error : any) {
        if (typeof error.response.data.detail === 'string') {
          console.log(error.response);
          toaster.error(error.response.data.detail);
        } else {
          toaster.error("An unexpected error occurred. Please try again.");
        }
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

export default useLogin;
