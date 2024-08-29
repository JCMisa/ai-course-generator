"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FileClock, LayoutGrid, Settings, WalletCards } from "lucide-react";

const SideNav = ({ isShow }) => {
    const { user } = useUser();

    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: <LayoutGrid />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "History",
            icon: <FileClock />,
            path: "/dashboard/history",
        },
        {
            id: 3,
            name: "Billing",
            icon: <WalletCards />,
            path: "/dashboard/billing",
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
        <div>
            {isShow && (
                <div className="h-screen p-5 border shadow-md transition-all relative">
                    <Link href={"/"}>
                        <div className="flex items-end gap-2 cursor-pointer">
                            <Image src={"/images/pensieve-logo.png"} alt="logo" width={40} height={40} />
                            <p className="text-xl font-bold sm:block hidden">
                                <span className="logo-text">Pensieve</span>
                            </p>
                        </div>
                    </Link>
                    <div className="mt-5">
                        {menuList.map((menu, index) => (
                            <Link href={menu.path} key={menu.id || index}>
                                <div>
                                    <h2
                                        className={`flex gap-2 items-center text-white font-medium p-5 cursor-pointer rounded-md hover:text-light hover:bg-primary transition-all mb-2 ${path == menu.path && "text-light linear-bg"
                                            }`}
                                    >
                                        {menu.icon}
                                        {menu.name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {user?.primaryEmailAddress?.emailAddress ==
                        "johncarlomisa399@gmail.com" ? (
                        <div className="fixed bottom-5 p-2 flex gap-2 items-center text-light">
                            <UserButton />
                            <div className="">
                                <p className="text-sm font-bold">{user?.fullName}</p>
                                <p className="text-xs text-slate-400">
                                    {user?.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute bottom-5 left-0 w-full">
                            {/* <UsageTrack /> */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SideNav;