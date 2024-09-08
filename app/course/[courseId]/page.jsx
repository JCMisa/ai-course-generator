'use client'

import Header from '@/app/_components/Header';
import BasicInfo from '@/app/create-course/[courseId]/_components/BasicInfo';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails';
import LoadingDialog from '@/app/create-course/_components/LoadingDialog';
import { db } from '@/utils/db';
import { CourseList } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';

const Course = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([])

    useEffect(() => {
        user && getCourse();
    }, [params, user])

    const getCourse = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList?.courseId, params?.courseId)
                    )
                )

            if (result.length > 0) {
                setCourse(result[0]);
            }
        } catch (error) {
            toast(
                <p className='font-bold text-sm text-red-500'>Internal error occured while fetching the course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Header />
            <div className='py-5 px-10 md:px-20 lg:px-44'>
                <ArrowLeftCircle onClick={() => router.back()} className='cursor-pointer' />
                <BasicInfo courseInfo={course} refreshData={() => getCourse()} edit={false} />
                <CourseDetails courseInfo={course} />
                <ChapterList courseInfo={course} refreshData={() => getCourse()} edit={false} />
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default Course