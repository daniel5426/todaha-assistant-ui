"use client";
export type IAuthUser = {
    id: number;
    email: string;
    username: string;
    password: string;
    assistant: Assistant;
    firstName: string;
    lastName: string;
    avatar: string;
};

export type Assistant = {
    id: number;
    name: string;
    welcome_message: string;
    instruction: string;
};
