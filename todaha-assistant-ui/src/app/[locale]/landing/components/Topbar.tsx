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
import { useAuthContext } from "@/states/auth";


const Topbar = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const  t  = useTranslations('common');
    const locale = useLocale();
    const isRTL = locale === "he";
    const { state } = useAuthContext();
    useEffect(() => {
        // Check authentication status whenever component mounts or updates
        const loggedIn = Cookies.get("loggedIn") === "true";
        setIsAuthenticated(loggedIn);
        setIsLoading(false);
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
            {/* Overlay - moved before the menu to be behind it */}
            {drawerOpened && (
                <div 
                    className="lg:hidden fixed inset-0 z-[65] bg-black/20 backdrop-blur-sm pointer-events-auto"
                    onClick={() => setDrawerOpened(false)}
                />
            )}

            <div className="lg:hidden fixed inset-0 z-[70] pointer-events-none">
                <div 
                    className={cn(
                        "fixed inset-x-0 transform transition-all duration-300 ease-in-out pointer-events-auto",
                        "bg-base-100 shadow-lg"
                    )}
                    style={{
                        transform: drawerOpened ? 'translateY(0)' : 'translateY(-100%)',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    {/* Close button */}
                    <div className={cn(
                        "flex p-2",
                        isRTL ? "justify-start" : "justify-end"
                    )}>
                        <Button 
                            shape="circle" 
                            size="sm" 
                            color="ghost"
                            onClick={() => setDrawerOpened(false)}
                        >
                            <Icon icon="lucide:x" className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Menu Items */}
                    <div className="px-4 pb-6" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                        <Menu className="space-y-1">
                            <MenuItem className="w-full">
                                <Link href={routes.landing} className={cn(
                                    "w-full py-2",
                                    isRTL ? "text-right" : "text-left"
                                )}>
                                    {t('home')}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={routes.pricing} className="w-full py-2">
                                    {t('Pricing')}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={routes.dashboard} className="w-full py-2">
                                    {t('dashboard')}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href={routes.contact} className="w-full py-2">
                                    {t('Contact')}
                                </Link>
                            </MenuItem>
                        </Menu>

                        <div className="border-t border-base-200 my-4" />

                        <div className="space-y-2">
                            {!isAuthenticated && (
                                <>
                                    <Button 
                                        color="primary" 
                                        className="w-full"
                                        onClick={() => router.push(routes.auth.register)}
                                    >
                                        {t('Sign up')}
                                    </Button>
                                    <Button 
                                        color="primary" 
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => router.push(routes.auth.login)}
                                    >
                                        {t('Login')}
                                    </Button>
                                </>
                            )}
                            {isAuthenticated && (
                                <Button 
                                    color="error" 
                                    variant="outline"
                                    className="w-full"
                                    onClick={doLogout}
                                >
                                    {t('Logout')}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container fixed left-1/2 top-2 z-[60] -translate-x-1/2">
                <div
                    className={cn(
                        "rounded-full px-3 transition-all duration-300",
                        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
                        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                        {
                            "shadow-[0_8px_30px_rgb(0,0,0,0.24)]": !atTop,
                            "bg-white/50 dark:bg-gray-900/50": atTop
                        }
                    )}
                >
                    <Navbar className="min-h-[2.5rem] px-1">
                        <NavbarStart className="gap-2 ml-3">
                            <div className="lg:hidden flex">
                                <Button shape="square" color="ghost" onClick={() => setDrawerOpened(true)}>
                                    <Icon icon={menuIcon} className="inline-block text-xl" />
                                </Button>
                            </div>
                            <Logo />
                        </NavbarStart>

                        <NavbarEnd className="gap-3">
                            <Menu horizontal size="sm" className="hidden gap-2 px-1 lg:inline-flex">
                                <MenuItem className="font-medium">
                                    <Link href={routes.landing}>{t('home')}</Link>
                                </MenuItem>
                                <MenuItem className="font-medium">
                                                <Link href={routes.pricing}>{t('Pricing')}</Link>
                                            </MenuItem>

                                <MenuItem className="font-medium">
                                    <a href={routes.dashboard} onClick={handleDashboardClick}>{t('dashboard')}</a>
                                </MenuItem>
                                <MenuItem className="font-medium">
                                    <Link href={routes.contact}>{t('Contact')}</Link>
                                </MenuItem>
                            </Menu>
                            {!isLoading && (
                                isAuthenticated ? (
                                    <Dropdown vertical="bottom" end>
                                        <DropdownToggle
                                            className="btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20"
                                            button={false}>
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                    letters={state.user?.username.slice(0, 2) || ""}
                                                    color="secondary"
                                                    size={30}
                                                    innerClassName={Mask.className({ variant: "squircle" })}/>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu className="mt-4 w-52">
                                            <DropdownItem onClick={() => router.push(routes.dashboard)}>
                                                <Icon icon={userIcon} fontSize={16} />
                                                {t('dashboard')}
                                            </DropdownItem>
                                            <DropdownItem onClick={() => router.push(routes.admin.account)}>
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
                                )
                            )}
                        </NavbarEnd>
                    </Navbar>
                </div>
            </div>
        </>
    );
};

export default Topbar;
