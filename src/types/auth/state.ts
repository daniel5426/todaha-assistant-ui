"use client";
import { IAuthUser } from "./user";

export type IAuthState = {
    user?: IAuthUser;
};

export type Token = {
    access_token?: string;
    token_type?: string;
};
