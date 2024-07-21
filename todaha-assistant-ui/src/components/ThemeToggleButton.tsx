"use client";
import moonIcon from "@iconify/icons-lucide/moon";
import sunIcon from "@iconify/icons-lucide/sun";

import { Button, ButtonProps } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { useLayoutContext } from "@/states/layout";

const ThemeToggleButton = (props: ButtonProps) => {
    const { state, changeTheme } = useLayoutContext();

    return (
        <>
            <Button {...props} onClick={() => changeTheme(state.theme == "dark" ? "light" : "dark")} >
                {state.theme == "light" && <Icon icon={sunIcon} fontSize={25} />}
                {state.theme == "dark" && <Icon icon={moonIcon} fontSize={25} />}
            </Button>
        </>
    );
};

export default ThemeToggleButton;
