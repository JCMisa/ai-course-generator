'use client'

import { db } from '@/utils/db';
import { CourseList } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import CourseCard from './CourseCard';
import { useRouter } from 'next/navigation';

const UserCourseList = () => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [courseList, setCourseList] = useState([])

    const getUserCourses = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(CourseList)
                .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))

            if (result) {
                setCourseList(result);
            }
        } catch (error) {
            toast(
                <p className='text-sm text-red-500 font-bold'>Internal error occured while fetching data.</p>
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        user && getUserCourses();
    }, [user])


    return (
        <div className=''>
            <h2 className='font-medium text-xl mt-10'>My AI Courses</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4'>
                {
                    courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserCourseList