'use client'

import { BookOpen, EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import DropdownOption from './DropdownOption'
import LoadingDialog from '@/app/create-course/_components/LoadingDialog'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { Chapters, CourseList } from '@/utils/schema'
import { eq } from 'drizzle-orm'

const CourseCard = ({ course, refreshData }) => {
    const [loading, setLoading] = useState(false);

    const deleteCourse = async (courseId) => {
        setLoading(true);
        try {
            const data = await db.delete(Chapters)
                .where(eq(Chapters?.courseId, course?.courseId))

            if (data) {
                const result = await db.delete(CourseList)
                    .where(eq(CourseList?.id, courseId))

                if (result) {
                    toast(
                        <p className='font-bold text-green-500 text-sm'>Course deleted successfully</p>
                    )
                    refreshData();
                }
            }
        } catch (error) {
            toast(
                <p className='font-bold text-red-500 text-sm'>Internal error occured while deleting the course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='shadow-lg bg-dark-100 p-2 rounded-lg cursor-pointer'>
            <Image src={course?.courseBanner} width={300} height={300} className='w-full h-[200px] object-cover rounded-lg' />
            <div className='p-2 flex flex-col gap-2'>
                <h2 className='font-medium text-lg flex justify-between items-center'>
                    {course?.courseOutput?.course?.name}
                    <DropdownOption children={<EllipsisVertical />} deleteCourse={() => deleteCourse(course?.id)} />
                </h2>
                <p className='text-sm text-gray-500'>{course?.category}</p>
                <div className='flex items-center justify-between gap-5 mt-1'>
                    <h2 className='flex flex-row items-center gap-2 p-2 bg-dark-100 text-primary-100 text-sm rounded-lg'><BookOpen className='w-5 h-5' /> {course?.courseOutput?.chapters} Chapters</h2>
                    <h2 className='text-sm bg-dark-100 text-primary p-2 rounded-lg'>{course?.courseOutput?.level}</h2>
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CourseCard