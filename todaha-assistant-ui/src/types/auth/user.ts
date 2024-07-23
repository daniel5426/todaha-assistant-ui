"use client";
export type IAuthUser = {
    id: string;
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

export type ChatBot = {
    id: string;
    name: string;
    topbar_color: string;
    top_name: string;
    logo: string | null;
    button_color: string;
    is_modal: boolean;
}


export type Assistant = {
    id: string;
    name: string;
    top_name: string;
    welcome_message: string;
    instruction: string;
    chatbots: ChatBot[];
};
