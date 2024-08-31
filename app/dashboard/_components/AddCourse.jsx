'use client'

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'

const AddCourse = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='flex flex-row items-center justify-between gap-2'>
            <div>
                <h2 className='text-2xl'>Hello, <span className='linear-text font-bold'>{user ? user?.firstName : "Unknown"}</span>👋</h2>
                <p className='text-sm text-gray-500'>
                    Discover a new way to learn with Pensieve, your personalized AI course generator.
                </p>
            </div>
            <Button onClick={() => router.push('/create-course')} className='hidden sm:block'>+ Create Course</Button>
            <Button onClick={() => router.push('/create-course')} className='flex sm:hidden rounded-full w-10 h-10 items-center justify-center text-xl font-bold'>+</Button>
        </div>
    )
}

export default AddCourse