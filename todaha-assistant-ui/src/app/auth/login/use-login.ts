'use client';

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

const useLogin = () => {
    const router = useRouter();
    const { toaster } = useToast();
    const { setLoggedInUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    type LoginSchemaType = z.infer<typeof loginSchema>;

    const { control, handleSubmit, setError } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "admin@daisyui.com",
            password: "password",
        },
    });

    const transformErrorToForm = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const response = await httpRequest.post("/api/auth/login/", data);
            setLoggedInUser(response.data);
            toaster.success("Login successfully...");
            const redirectTo = (router as any).query.redirectTo as string | undefined;
            router.push(redirectTo ?? routes.home);
        }  catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    transformErrorToForm(error.response.data);
                } else {
                    // Handle cases where error.response is undefined
                    toaster.error("An unexpected error occurred. Please try again.");
                    console.error(error);
                }
            } else {
                // Handle non-Axios errors
                toaster.error("An unexpected error occurred. Please try again.");
                console.error(error);
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