"use client"; // Add this line at the very top
import menuIcon from "@iconify/icons-lucide/menu";
import { useState, useEffect } from "react";
import  Link  from "next/link";
import { Button, Drawer, Menu, MenuItem, Navbar, NavbarEnd, NavbarStart } from "@/components/daisyui";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { cn } from "@/helpers/utils/cn";
import routes from "@/services/routes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import avatar1 from "@/assets/images/avatars/1.png";
import userIcon from "@iconify/icons-lucide/user";
import logoutIcon from "@iconify/icons-lucide/log-out";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Mask,
} from "@/components/daisyui";

const Topbar = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const  t  = useTranslations('common');
    const locale = useLocale();
    const isRTL = locale === "he";
  
    useEffect(() => {
        // Check authentication status whenever component mounts or updates
        const loggedIn = Cookies.get("loggedIn") === "true";
        setIsAuthenticated(loggedIn);
    }, []);

    const handleDashboardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) {
            window.location.href = routes.dashboard; // Force full page load
        } else {
            router.push(routes.auth.login);
        }
    };

    const doLogout = () => {
        Cookies.remove("loggedIn");
        setIsAuthenticated(false);
        router.push(routes.auth.login);
    };

    return (
        <>
            <div
                className={cn("fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500", {
                    "z-20 border-b border-base-content/10 bg-base-100 lg:bg-opacity-90 dark:lg:bg-opacity-95": !atTop,
                    "border-transparent": atTop,
                })}  >
                <div className="container">
                    <Navbar className="px-0">
                        <NavbarStart className="gap-2">
                            <div className="flex " >
                                <Drawer 
                                    style={{ direction: "ltr" }}
                                    open={drawerOpened}
                                    onClickOverlay={() => setDrawerOpened(!drawerOpened)}
                                    end={isRTL}
                                    side={
                                        <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
                                            <MenuItem className="font-medium">
                                                <Logo />
                                            </MenuItem>

                                            <MenuItem className="font-medium">
                                                <Link href={routes.landing}>{t('home')}</Link>
                                            </MenuItem>
                                            <MenuItem className="font-medium">
                                                <Link href={routes.dashboard}>{t('dashboard')}</Link>
                                            </MenuItem>
                                            <MenuItem className="font-medium">
                                                <Link href={routes.contact}>{t('Contact')}</Link>
                                            </MenuItem>
                                        </Menu>
                                    }>
                                    <Button shape="square" color="ghost" onClick={() => setDrawerOpened(true)}>
                                        <Icon icon={menuIcon} className="inline-block text-xl" />
                                    </Button>
                                </Drawer>
                            </div>

                            <Logo />
                        </NavbarStart>

                        <NavbarEnd className="gap-3">
                            <Menu horizontal size="sm" className="hidden gap-2 px-1 lg:inline-flex">
                                <MenuItem className="font-medium">
                                    <Link href={routes.landing}>{t('home')}</Link>
                                </MenuItem>
                                <MenuItem className="font-medium">
                                    <a href={routes.dashboard} onClick={handleDashboardClick}>{t('dashboard')}</a>
                                </MenuItem>
                                <MenuItem className="font-medium">
                                    <Link href={routes.contact}>{t('Contact')}</Link>
                                </MenuItem>
                            </Menu>
                            {isAuthenticated ? (
                                <Dropdown vertical="bottom" end>
                                    <DropdownToggle
                                        className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
                                        button={false}>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                src={avatar1.src}
                                                size={30}
                                                innerClassName={Mask.className({ variant: "squircle" })}/>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="mt-4 w-52">
                                        <DropdownItem onClick={() => router.push(routes.dashboard)}>
                                            <Icon icon={userIcon} fontSize={16} />
                                            {t('dashboard')}
                                        </DropdownItem>
                                        <DropdownItem onClick={() => router.push(routes.dashboard)}>
                                            <Icon icon={userIcon} fontSize={16} />
                                            {t('Account')}
                                        </DropdownItem>
                                        <hr className="-mx-2 my-1 border-base-content/10" />
                                        <DropdownItem className="text-error" onClick={doLogout}>
                                            <Icon icon={logoutIcon} fontSize={16} />
                                            {t('Logout')}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Button size={"sm"} color="primary">
                                    <Link href={routes.auth.login}>{t('Login')}</Link>
                                </Button>
                            )}
                        </NavbarEnd>
                    </Navbar>
                </div>
            </div>
        </>
    );
};

export default Topbar;
