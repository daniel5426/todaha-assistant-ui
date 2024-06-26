"use client";
export type IAuthUser = {
    id: number;
    email: string;
    username: string;
    password: string;
    assistant: Assistant;
    files: UserFile[];
    firstName: string;
    lastName: string;
    avatar: string;
};

export type UserFile = {
    id: string | null;
    name: string ;
};


export type Assistant = {
    id: number;
    name: string;
    welcome_message: string;
    instruction: string;
};
