'use client'

import { db } from '@/utils/db';
import { CourseList } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import BasicInfo from '../_components/BasicInfo';
import { toast } from 'sonner';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const FinishScreen = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({});
    const [copied, setCopied] = useState(false);

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
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center font-bold text-2xl my-3 logo-text'>Congratulations! Your Course is Ready 🎉</h2>
            <BasicInfo courseInfo={course} refreshData={() => getCourseByCourseId()} />
            <div className='mt-3 flex flex-row gap-2 items-center'>
                <h2>Course URL</h2>
                <h2 className='text-center text-gray-500 border p-2 rounded-lg flex gap-2 items-center cursor-pointer' onClick={async () => { await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + '/course/view/' + course?.courseId); setCopied(true) }}>
                    {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
                    {copied ? <ClipboardCheck className='w-5 h-5 cursor-pointer text-green-500' /> : <Clipboard className='w-5 h-5 cursor-pointer' />}
                </h2>
            </div>
        </div>
    )
}

export default FinishScreen