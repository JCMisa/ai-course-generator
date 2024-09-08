'use client'

import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '../../../components/ui/button';
import { useUser } from '@clerk/nextjs'
import { Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const AddCourse = () => {
    const { user } = useUser();
    const router = useRouter();

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

    return (
        <div className='flex flex-row items-center justify-between gap-2'>
            <div>
                <h2 className='text-2xl'>Hello, <span className='linear-text font-bold'>{user ? user?.firstName : "Unknown"}</span>👋</h2>
                <p className='text-sm text-gray-500'>
                    Discover a new way to learn with Pensieve, your personalized AI course generator.
                </p>
            </div>
            {
                userCourseList.length >= 5 ?
                    (<Button onClick={() => router.push('/dashboard/upgrade')} className='flex items-center gap-2'>Upgrade Plan <Rocket /></Button>) :
                    (
                        <div>
                            <Button onClick={() => router.push('/create-course')} className='hidden sm:block'>+ Create Course</Button>
                            <Button onClick={() => router.push('/create-course')} className='flex sm:hidden rounded-full w-10 h-10 items-center justify-center text-xl font-bold'>+</Button>
                        </div>
                    )
            }
        </div>
    )
}

export default AddCourse