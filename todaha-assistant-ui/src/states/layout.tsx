"use client";
import { useEffect, useMemo } from "react";

import { useTheme as daisyUseTheme } from "@/components/daisyui";

import createHookedContext from "@/hooks/create-hooked-context";
import useLocalStorage from "@/hooks/use-local-storage";
import { ILayoutState } from "@/types/layout/admin";

const INIT_STATE: ILayoutState = {
    theme: "light",
    leftbar: {
        hide: false,
        drawerOpen: false,
    },
};

const useHook = () => {
    const [state, setState] = useLocalStorage<ILayoutState>("__NEXUS_REACT_ADMIN_LAYOUT__", INIT_STATE);
    const { setTheme } = daisyUseTheme();

    useEffect(() => {
        setTheme(state.theme);
        if (htmlRef) {
            if (state.theme == "dark") {
                htmlRef.classList.add("dark");
            } else {
                htmlRef.classList.remove("dark");
            }
        }
    }, [state.theme]);

    const htmlRef = useMemo(() => {
        if (typeof document !== "undefined") {
          return document.querySelector("html");
        }
        return null;
      }, []);
    
    const toggleLeftbarDrawer = (open: boolean) => {
        console.log("toggleLeftbarDrawer", open);
        updateState({
            leftbar: {
                ...state.leftbar,
                drawerOpen: open,
                hide: open,
            },
        });
    };

    const updateState = (newState: Partial<ILayoutState>) => {
        setState({ ...state, ...newState });
    };

    const changeTheme = (theme: ILayoutState["theme"]) => {
        updateState({
            theme,
        });
    };

    const reset = () => {
        setState(INIT_STATE);
    };

    return {
        state,
        toggleLeftbarDrawer,
        changeTheme,
        reset,
    };
};

const [useLayoutContext, LayoutContextProvider] = createHookedContext(useHook);

export { useLayoutContext, LayoutContextProvider };
