"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import useToast from "@/hooks/use-toast";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { get_token } from "@/app/lib/data";

const useLogin = () => {
  const router = useRouter();
  const { toaster } = useToast();
  const { updateUserInfo, setToken } = useAuthContext();

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
    resolver: zodResolver(loginSchema),
  });

  const transformErrorToForm = (errors: Record<string, any>) => {
    Object.entries(errors).forEach(([key, value]: any[]) =>
      setError(key, { message: value })
    );
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    return get_token(data)
      .then((response) => {
        setToken({
          access_token: response.access_token,
        });
        return updateUserInfo();
      })
      .then(() => {
        toaster.success("Login successful");
        router.replace(routes.admin.dashboard); // Changed from push to replace
      })
      .catch((error) => {
        if (typeof error?.response?.data?.detail === "string") {
          console.log(error.response);
          toaster.error(error.response.data.detail);
        } else {
          toaster.error("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
