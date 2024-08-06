"use client";
export type IAuthUser = {
    id: string;
    email: string;
    username: string;
    password: string;
    assistant: IAssistant;
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
    lg: string;
    name: string;
    bg_color: string;
    top_color: string;
    top_name: string;
    logo: string | null;
    button_color: string;
    button_text_color: string;
    button_text: string;
    name_text_color: string;
    is_modal: boolean;
}


export type IAssistant = {
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
