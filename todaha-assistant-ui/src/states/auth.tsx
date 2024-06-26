"use client";
import Cookies from "js-cookie";

import { useCallback, useEffect } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IAuthState, IAuthUser, Token } from "@/types/auth";
import axiosInstance from "@/app/lib/axiosConfig";
import { get_user_info } from "@/app/lib/data";

export const getToken = () => {
  return Cookies.get('token');
}

const useHook = () => {
  
  const [state, setState] = useSessionStorage<IAuthState>("__ADMIN_AUTH__", {});

  const setLoggedInUser = (user: IAuthUser) => {
    updateState({ user });
  };
  const isLoggedIn = useCallback(() => {
    return state.user != undefined;
  }, [state.user]);


  const setToken = (token: any) => {
    if (token.access_token) {
      Cookies.set("loggedIn", "true", { expires: 1 });
      Cookies.set("token", token.access_token, { expires: 1 });
    }
  };

  const updateState = (changes: Partial<IAuthState>) => {
    setState({
      ...state,
      ...changes,
    });
  };

  const updateUserInfo = async () => {
    const user_info = await get_user_info();
    console.log(user_info);
    setLoggedInUser(user_info);
  };

  const logout = () => {
    updateState({
      user: undefined,
    });
    setToken({
      access_token: undefined,
    });
    Cookies.set("loggedIn", "false", { expires: 1 });
    Cookies.set("token", "", { expires: 1 });
};

  return {
    state,
    setLoggedInUser,
    isLoggedIn,
    logout,
    setToken,
    updateUserInfo,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
