
"use client"; // Add this line at the very top

import menuIcon from "@iconify/icons-lucide/menu";

import { useEffect, useState } from "react";
import  Link  from "next/link";

import { Button, Drawer, Menu, MenuItem, Navbar, NavbarEnd, NavbarStart } from "@/components/daisyui";
import useTranslation from "next-translate/useTranslation";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { cn } from "@/helpers/utils/cn";
import routes from "@/services/routes";

const Topbar = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const { t } = useTranslation("common");


    return (
        <>
            <div
                className={cn("fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500", {
                    "z-20 border-b border-base-content/10 bg-base-100 lg:bg-opacity-90 dark:lg:bg-opacity-95": !atTop,
                    "border-transparent": atTop,
                })}>
                <div className="container">
                    <Navbar className="px-0">
                        <NavbarStart className="gap-2">
                            <div className="flex-none ">
                                <Drawer
                                    open={drawerOpened}
                                    onClickOverlay={() => setDrawerOpened(!drawerOpened)}
                                    side={
                                        <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
                                            <MenuItem className="font-medium">
                                                <Logo />
                                            </MenuItem>

                                            <MenuItem className="font-medium">
                                                <Link href={routes.landing}>{t('home')}</Link>
                                            </MenuItem>
                                            <MenuItem className="font-medium">
                                                <Link href={routes.dashboards.ecommerce}>{t('dashboard')}</Link>
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
                                    <Link href={routes.dashboards.ecommerce}>{t('dashboard')}</Link>
                                </MenuItem>
                                <MenuItem className="font-medium">
                                    <Link href={routes.contact}>{t('Contact')}</Link>
                                </MenuItem>
                            </Menu>
                            <Button size={"sm"} color="primary" onClick={() => setDrawerOpened(true)}>
                                Purchase Now
                            </Button>
                        </NavbarEnd>
                    </Navbar>
                </div>
            </div>
        </>
    );
};

export default Topbar;
