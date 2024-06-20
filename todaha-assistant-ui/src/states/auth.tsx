"use client";
import Cookies from 'js-cookie';

import { useCallback, useEffect } from "react";
import createHookedContext from "@/hooks/create-hooked-context";
import useSessionStorage from "@/hooks/use-session-storage";
import { IAuthState, IAuthUser, Token } from "@/types/auth";
import axiosInstance from "@/app/lib/axiosConfig";

const useHook = () => {
  const [state, setState] = useSessionStorage<IAuthState>(
    "__ADMIN_AUTH__",
    {}
  );
  const [token, setToken] = useSessionStorage<Token>(
    "__SESSION_TOKEN__",
    {}
  );

  const setLoggedInUser = (user: IAuthUser) => {
    updateState({ user });
  };
  const isLoggedIn = useCallback(() => {
    return state.user != undefined;
  }, [state.user]);

  const initializeToken = () => {
    if (token.access_token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
    }
  };

  useEffect(() => {
    console.log("Token changed", token.access_token);
    initializeToken();
    if (token.access_token) {
      Cookies.set('loggedIn', "true", { expires: 1 });
      Cookies.set('token', token.access_token, { expires: 1 });
    }
  }, [token]);

  const updateState = (changes: Partial<IAuthState>) => {
    setState({
      ...state,
      ...changes,
    });
  };


  const logout = () => {
    updateState({
      user: undefined,
    });
    setToken({
        access_token: undefined,
    });
    Cookies.set('loggedIn', "false", { expires: 1 });
  };

  return {
    state,
    setLoggedInUser,
    isLoggedIn,
    logout,
    setToken,
  };
};

const [useAuthContext, AuthContextProvider] = createHookedContext(useHook);

export { useAuthContext, AuthContextProvider };
