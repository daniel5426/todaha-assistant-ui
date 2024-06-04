import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";
import "@/assets/css/custom/_layout.css"
import { Button, Menu, MenuDetails, MenuItem, MenuTitle } from "@/components/daisyui";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { getActivatedLeftbarParentKeys } from "@/helpers/layout/admin/leftbar";
import { cn } from "@/helpers/utils/cn";
import { IMenuItem } from "@/types/layout/admin";

const LeftMenuItem = ({ menuItem, activated }: { menuItem: IMenuItem; activated: Set<string> }) => {
    const { icon, isTitle, label, children, url } = menuItem;

    const selected = activated.has(menuItem.key);

    if (isTitle) {
        return <MenuTitle className="font-semibold">{label}</MenuTitle>;
    }

    if (!children) {
        return (
            <MenuItem className="mb-0.5">
                <Link
                    href={url ?? ""}
                    className={cn("hover:bg-base-content/15", {
                        "bg-base-content/10": selected,
                    })}>
                    <div className="flex items-center gap-2">
                        {icon && <Icon icon={icon} fontSize={18} />}
                        {label}
                    </div>
                </Link>
            </MenuItem>
        );
    }

    return (
        <MenuItem className="mb-0.5">
            <MenuDetails
                open={selected}
                label={
                    <div className="flex items-center gap-2">
                        {icon && <Icon icon={icon} fontSize={18} />}
                        {label}
                    </div>
                }>
                {children.map((item, index) => (
                    <LeftMenuItem menuItem={item} key={index} activated={activated} />
                ))}
            </MenuDetails>
        </MenuItem>
    );
};


const Leftbar = ({ hide, menuItems }: { hide?: boolean; menuItems: IMenuItem[] }) => {
    const  pathname  = usePathname();

    const activatedParents = useMemo(() => new Set(getActivatedLeftbarParentKeys(menuItems, pathname as any)), [pathname]);

    return (
        <div
            className={cn("leftmenu-wrapper", {
                hide: hide,
            })}>
            <div className="flex h-16 items-center justify-center">
                <Logo />
            </div>
            <SimpleBar className="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)] ">
                <Menu className="mb-6">
                    {menuItems.map((item, index) => (
                        <LeftMenuItem menuItem={item} key={index} activated={activatedParents} />
                    ))}
                </Menu>
            </SimpleBar>

            <div className={"mx-4 hidden rounded bg-base-200 px-3 py-4 lg:block"}>
                <p className="text-center text-base font-medium">Need Premium?</p>
                <p className="mt-3 text-center text-sm">Access all features with single time purchase</p>
                <div className="mt-3 text-center">
                    <Button color={"primary"} size={"sm"}>
                        Purchase
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Leftbar;
