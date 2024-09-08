"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import ButtomNav from "./_components/ButtomNav";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { UserSubscriptionContext } from "../_context/UserSubscriptionContext";
import { TotalUsageContext } from "../_context/TotalUsageContext";

const DashboardLayout = ({ children }) => {
    const [show, setShow] = useState(true);
    const [userCourseList, setUserCourseList] = useState([]);
    const [userSubscription, setUserSubscription] = useState(false);
    const [totalUsage, setTotalUsage] = useState(0);

    const showSideNav = () => {
        setShow((prev) => !prev);
    };

    return (
        <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
            <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
                <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
                    <div className="">
                        <div className="fixed md:w-64 hidden md:block">
                            <SideNav isShow={show} />
                        </div>
                        <div className={`${show ? "md:ml-64" : ""} transition-all`}>
                            <DashboardHeader showSideNav={showSideNav} />
                            <div className='p-7'>
                                {children}
                            </div>
                        </div>
                        <div className="fixed block md:hidden w-full bottom-0">
                            <ButtomNav />
                        </div>
                    </div>
                </UserSubscriptionContext.Provider>
            </TotalUsageContext.Provider>
        </UserCourseListContext.Provider>
    );
};

export default DashboardLayout;