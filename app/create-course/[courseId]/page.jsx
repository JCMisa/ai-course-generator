'use client'

import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import BasicInfo from './_components/BasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'

const CourseLayout = ({ params }) => {
    const { user } = useUser();

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({})

    useEffect(() => {
        params && getCourseByCourseId();
    }, [params, user])

    const getCourseByCourseId = async () => {
        setLoading(true);
        try {
            const result = await db.select().
                from(CourseList)
                .where(and(
                    eq(CourseList?.courseId, params?.courseId),
                    eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
                ))

            if (result) {
                setCourse(result[0]);
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while fetching course layout</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            {/* basic info */}
            <BasicInfo courseInfo={course} />
            {/* course details */}
            <CourseDetails courseInfo={course} />
            {/* list of lessons */}
            <ChapterList courseInfo={course} />
        </div>
    )
}

export default CourseLayout