"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { LayoutGrid, Settings, Telescope, WalletCards } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "../../../components/ui/button";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import UsageTrack from "./UsageTrack";

const SideNav = ({ isShow }) => {
    const { user } = useUser();
    const router = useRouter();

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)

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
                    {/* {user?.primaryEmailAddress?.emailAddress ==
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
                        <div className="absolute bottom-10 left-3 w-[80%]">
                            <UsageTrack />
                        </div>
                    )} */}
                    <div className="absolute bottom-10 left-3 w-[80%]">
                        <UsageTrack />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideNav;