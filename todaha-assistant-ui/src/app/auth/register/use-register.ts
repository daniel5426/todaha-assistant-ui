"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import httpRequest from "@/services/api/request";
import routes from "@/services/routes";

const useRegister = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const transformErrorToForm = (errors: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        Object.entries(errors).forEach(([key, value]) => {
            if (typeof key === "string") {
                setError(key as keyof RegisterSchemaType, { message: value as string });
            }
        });
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);

        try {
            await httpRequest.post("/api/any/success/", data);
            router.push(routes.auth.login);
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

export default useRegister;
