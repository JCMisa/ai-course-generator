'use client'

import LoadingDialog from '@/app/create-course/_components/LoadingDialog'
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { desc } from 'drizzle-orm'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import CourseCard from '../_components/CourseCard'
import { Button } from '@/components/ui/button'

const ExplorePage = () => {
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const getAllCourses = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(CourseList)
                .limit(9)
                .offset(pageIndex * 9)
                .orderBy(desc(CourseList?.id))

            if (result.length > 0) {
                setCourseList(result);
            }
        } catch (error) {
            toast(
                <p className='font-bold text-sm text-red-500'>Internal error occured while fetching latest courses</p>
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCourses();
    }, [pageIndex])

    return (
        <div>
            <h2 className='font-bold text-3xl'>Explore More Projects</h2>
            <p className='text-gray-500 text-sm'>Discover latest AI generated courses built by users all around the world.</p>

            {/* course list */}
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {
                    courseList?.map((course, index) => (
                        <div key={index}>
                            <CourseCard course={course} displayUser={true} />
                        </div>
                    ))
                }
            </div>

            <div className='mt-5 flex justify-between items-center'>
                {pageIndex != 0 && <Button variant='outline' onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>}
                <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
            </div>

            <LoadingDialog loading={loading} />
        </div>
    )
}

export default ExplorePage