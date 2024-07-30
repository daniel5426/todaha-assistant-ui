"use client";
export type IAuthUser = {
    id: string;
    email: string;
    username: string;
    password: string;
    assistant: Assistant;
    firstName: string;
    lastName: string;
    avatar: string;
};

export type UserFile = {
    id: string | null;
    name: string ;
};

export type IChatBot = {
    id: string;
    name: string;
    top_color: string;
    top_name: string;
    logo: string | null;
    button_color: string;
    name_text_color: string;
    is_modal: boolean;
}


export type Assistant = {
    id: string;
    name: string;
    top_name: string;
    welcome_message: string;
    whatsapp_number: string;
    instruction: string;
    chatbots: IChatBot[];
    files: UserFile[];
    website_url: string;
};
