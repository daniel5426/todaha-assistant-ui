"use client";
import avatar1 from "@/assets/images/avatars/1.png";

import bellIcon from "@iconify/icons-lucide/bell";
import logoutIcon from "@iconify/icons-lucide/log-out";
import menuIcon from "@iconify/icons-lucide/menu";
import userIcon from "@iconify/icons-lucide/user";

import { useRouter } from "next/navigation";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Mask,
    Navbar,
    NavbarCenter,
    NavbarEnd,
    NavbarStart,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import routes from "@/services/routes";
import { useAuthContext } from "@/states/auth";
import { useLayoutContext } from "@/states/layout";
import { useTranslations } from "next-intl";

const Topbar = () => {
    const { toggleLeftbarDrawer, state: layoutState } = useLayoutContext();
    const { logout, state: authState } = useAuthContext();
    const navigate = useRouter();
    const t = useTranslations("dashboard");

    const doLogout = () => {
        logout();
        navigate.push(routes.auth.login);
    };

    return (
        <Navbar className="z-10  border-b border-base-200 px-3">
            <NavbarStart className="gap-3">
                <Button
                    shape="square"
                    color="ghost"
                    size="sm"
                    onClick={() => toggleLeftbarDrawer(!layoutState.leftbar.drawerOpen)}>
                    <Icon icon={menuIcon} className="inline-block" fontSize={20} />
                </Button>
            </NavbarStart>
            <NavbarCenter></NavbarCenter>
            <NavbarEnd className="gap-1.5 px-5">
                <ThemeToggleButton shape="circle" color="ghost" size="sm" />

                <Dropdown vertical="bottom" end>
                    <DropdownToggle
                        className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
                        button={false}>
                        <div className="flex items-center gap-2">
                            {authState.user.username && (
                            <Avatar
                                letters={authState.user.username.slice(0, 2)}
                                    color="secondary"
                                    size={30}
                                    innerClassName={Mask.className({ variant: "squircle" })} />
                            )}
                        </div>
                    </DropdownToggle>
                    <DropdownMenu className="mt-4 w-52">
                        <DropdownItem onClick={() => navigate.push(routes.dashboard)}>
                            <Icon icon={userIcon} fontSize={16} />
                            {t("Dashboard")}
                        </DropdownItem>
                        <DropdownItem onClick={() => navigate.push(routes.admin.account)}>
                            <Icon icon={userIcon} fontSize={16} />
                            {t("Account")}
                        </DropdownItem>
                        <hr className="-mx-2 my-1 border-base-content/10" />
                        <DropdownItem className="text-error" onClick={doLogout}>
                            <Icon icon={logoutIcon} fontSize={16} />
                            {t("Logout")}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarEnd>
        </Navbar>
    );
};

export default Topbar;
