'use client'

import { db } from '@/utils/db'
import { Chapters, CourseList } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import BasicInfo from './_components/BasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { ArrowLeftCircle, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { chatSession, generateAiChapterContent } from '@/utils/AIModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/utils/service'

const CourseLayout = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();

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

    const generateChapterContent = async () => {
        const chapters = course?.courseOutput?.course?.chapters;
        chapters.forEach(async (chapter, index) => {
            const PROMPT = `Explain the concept in detail for topic: ${course?.name}, Chapter: ${chapter?.chapterName}, in JSON format which is a list of objects with properties as title, explanation which is a detailed explanation for the chapter, and codeExample in <precode> format if applicable.`;
            // if (index < chapters.length) {
            setLoading(true);
            try {
                // generate video url
                let videoId = '';
                service.getVideos(course?.name + ':' + chapter?.chapterName).then(resp => {
                    console.log('yt id: ', resp[0]?.id?.videoId);
                    videoId = resp[0]?.id?.videoId
                })

                // generate chapter ai content
                const result = await chatSession.sendMessage(PROMPT);
                console.log('chapter content: ', result?.response?.text());

                if (result && videoId != '') {
                    const content = JSON.parse(result?.response?.text());

                    // save chapter content + video url
                    await db.insert(Chapters).values({
                        chapterId: index,
                        courseId: course?.courseId,
                        content: content,
                        videoId: videoId
                    })

                    await db.update(CourseList).set({
                        published: true
                    })

                    router.replace(`/create-course/${course?.courseId}/finish`);
                }
            } catch (error) {
                toast(
                    <p className='text-sm text-red-500 font-bold'>Internal error occured while creating AI Course Content</p>
                )
                console.log('ai content error: ', error);
            } finally {
                setLoading(false);
            }
            // }
        })
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44 mb-20'>
            <div className='flex flex-row items-center gap-2 justify-center'>
                <ArrowLeftCircle className='cursor-pointer' onClick={() => router.back()} />
                <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
            </div>

            {/* basic info */}
            <BasicInfo courseInfo={course} refreshData={() => getCourseByCourseId()} />
            {/* course details */}
            <CourseDetails courseInfo={course} />
            {/* list of lessons */}
            <ChapterList courseInfo={course} refreshData={() => getCourseByCourseId()} />

            {/* submit button */}
            <Button onClick={generateChapterContent} className='my-5'>
                {
                    loading ? (
                        <LoaderCircle className={'animate-spin'} />
                    ) : (
                        'Generate Course'
                    )
                }
            </Button>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CourseLayout