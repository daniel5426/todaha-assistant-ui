'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";

import useToast from "@/hooks/use-toast";
import httpRequest from "@/services/api/request";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";

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
            const redirectTo = router.query.redirectTo as string | undefined;
            router.push(redirectTo ?? routes.home);
        } catch (e: any) {
            transformErrorToForm(e.response.data);
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