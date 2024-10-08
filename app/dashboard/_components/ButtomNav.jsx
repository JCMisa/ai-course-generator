import React from "react";
import { LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtomNav = () => {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: <LayoutGrid />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Explore",
            icon: <Telescope />,
            path: "/dashboard/explore",
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <WalletCards />,
            path: "/dashboard/upgrade",
        },
        {
            id: 4,
            name: "Settings",
            icon: <Settings />,
            path: "/dashboard/setting",
        },
    ];

    const path = usePathname();

    return (
        <div className="shadow-lg min-h-20 border-t bg-dark">
            <div className="flex gap-5 sm:gap-10 md:hidden justify-center items-center text-center">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={menu.id || index}>
                        <div className="py-3">
                            <h2
                                className={`flex gap-1 sm:gap-5 items-center text-gray-400 font-medium p-2 sm:p-5 cursor-pointer rounded-md hover:text-light hover:bg-primary-200 transition-all mb-2 ${path == menu.path && "text-light linear-bg"
                                    }`}
                            >
                                {menu.icon}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ButtomNav;