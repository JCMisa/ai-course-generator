'use client'

import LoadingDialog from '@/app/create-course/_components/LoadingDialog'
import { db } from '@/utils/db'
import { Chapters, CourseList } from '@/utils/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ChapterListCard from './_components/ChapterListCard'
import { AlignJustify } from 'lucide-react'
import ChapterContent from './_components/ChapterContent'

const CourseStart = ({ params }) => {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(false);
    const [showSideNav, setShowSideNav] = useState(true);
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        params && getCourse();
    }, [params])

    const getCourse = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(CourseList)
                .where(
                    eq(CourseList?.courseId, params?.courseId)
                )

            if (result) {
                setCourse(result[0]);
                getSelectedChapterContent(0);
            }
        } catch (error) {
            toast(
                <p className='font-bold text-sm text-red-500'>Internal error occured while fetching the course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    const getSelectedChapterContent = async (chapterId) => {
        const result = await db.select()
            .from(Chapters)
            .where(
                and(
                    eq(Chapters?.chapterId, chapterId),
                    eq(Chapters?.courseId, course?.courseId)
                )
            )

        if (result) {
            setChapterContent(result[0]);
        }
    }

    return (
        <div>
            {/* chapter list sidebar */}
            {/* show */}
            <div className={`${showSideNav ? 'fixed' : 'hidden'} w-full md:w-64 h-screen bg-dark-100 transition-all overflow-y-auto card-scroll`}>
                <div className='bg-dark-500 p-4 flex items-center justify-between gap-5'>
                    <h2 className='font-medium text-md'>{course?.courseOutput?.course?.name}</h2>
                    <AlignJustify className='cursor-pointer w-10 h-10' onClick={() => setShowSideNav(prev => !prev)} />
                </div>

                <div>
                    {
                        course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                            <div key={index} className={`cursor-pointer hover:bg-dark ${selectedChapter?.chapterName == chapter?.chapterName && 'bg-primary'}`} onClick={() => { setSelectedChapter(chapter); getSelectedChapterContent(index) }}>
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* hidden */}
            <div className={`${showSideNav ? 'hidden' : 'fixed'} w-20 h-screen bg-dark-100 transition-all`}>
                <div className='bg-dark-500 p-4 flex items-center justify-between gap-5'>
                    <AlignJustify className='cursor-pointer w-10 h-10' onClick={() => setShowSideNav(prev => !prev)} />
                </div>

                <div>
                    {
                        course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                            <div key={index} className={`cursor-pointer hover:bg-dark ${selectedChapter?.chapterName == chapter?.chapterName && 'bg-dark'}`} onClick={() => { setSelectedChapter(chapter); getSelectedChapterContent(index) }}>
                                <div className='grid grid-cols-5 p-4 items-center border-b shadow-lg'>
                                    <div>
                                        <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index + 1}</h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            {/* course content */}
            <div className={`${showSideNav ? 'ml-64' : 'ml-20'}`}>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CourseStart