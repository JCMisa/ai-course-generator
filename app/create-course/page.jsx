'use client'

import { Button } from '../../components/ui/button'
import { LayoutGrid, Lightbulb, LoaderCircle, Settings } from 'lucide-react'
import React, { useState, useContext, useEffect } from 'react'
import SelectCategory from './_components/SelectCategory'
import TopicDescriptions from './_components/TopicDescriptions'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import { chatSession } from '@/utils/AIModel'
import { toast } from 'sonner'
import LoadingDialog from './_components/LoadingDialog'
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const CreateCourse = () => {
    const { user } = useUser();
    const router = useRouter();

    const stepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <LayoutGrid />
        },
        {
            id: 2,
            name: 'Topic',
            icon: <Lightbulb />
        },
        {
            id: 3,
            name: 'Options',
            icon: <Settings />
        },
    ]

    const [loading, setLoading] = useState(false);
    const [activeIndex, setactiveIndex] = useState(0);
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    useEffect(() => {
        console.log('user course context: ', userCourseInput);
    }, [userCourseInput])

    // check if context array is empty, then disable te next button
    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true;
        }
        if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
            return true;
        }
        if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
            return true;
        }
        if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.chapters == undefined)) {
            return true;
        }
        return false;
    }

    // method to generate ai response
    const generateCourseLayout = async () => {
        const PROMPT = `Generate a course tutorial on the following details, category with value of ${userCourseInput?.category}, topic with value of ${userCourseInput?.topic}, level with value of ${userCourseInput?.level}, duration with value of ${userCourseInput?.duration}, and chapters which is ${userCourseInput?.chapters}, based on those properties I want additional property called course which has an object value with properties called name which is the name of the course, description which is the description of the course, chapters which is an array of objects and each object has properties called chapterName which is the name of the chapter, about which is what the chapter is all about, and duration which is the duration of the chapter, make it in JSON format.`

        setLoading(true);
        try {
            const result = await chatSession.sendMessage(PROMPT);
            if (result) {
                console.log(JSON.parse(result.response.text()));
                saveCourseLayout(JSON.parse(result.response.text()));
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while generating AI response</p>
            )
        } finally {
            setLoading(false);
        }
    }

    const saveCourseLayout = async (courseOutput) => {
        const courseId = uuid4();
        setLoading(true);
        try {
            const result = await db.insert(CourseList).values({
                courseId: courseId,
                name: userCourseInput?.topic,
                level: userCourseInput?.level,
                category: userCourseInput?.category,
                courseOutput: courseOutput,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                username: user?.fullName,
                userProfileImage: user?.imageUrl,
                includeVideo: userCourseInput?.displayVideo
            })

            if (result) {
                toast(
                    <p className='text-sm font-bold text-green-500'>Course layout saved successfully</p>
                )
                router.replace(`/create-course/${courseId}`);
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while saving to database</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* stepper */}
            <div className='flex flex-col items-center justify-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {
                        stepperOptions.map((item, index) => (
                            <div key={item.id || index} className='flex flex-row items-center'>
                                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                    <div className={`bg-dark-100 p-3 rounded-full text-white ${activeIndex >= index && "linear-bg"}`}>
                                        {item.icon}
                                    </div>
                                    <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                                </div>
                                {
                                    index !== stepperOptions.length - 1 &&
                                    <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && "linear-bg"}`}></div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {/* components */}
                {
                    activeIndex === 0 ? <SelectCategory /> :
                        activeIndex === 1 ? <TopicDescriptions /> :
                            <SelectOption />
                }

                {/* next & prev btns */}
                <div className='flex flex-col gap-3 sm:flex-row justify-between mt-10 items-center'>
                    <Button onClick={() => setactiveIndex(activeIndex - 1)} disabled={activeIndex === 0} className='min-w-52 border-primary hover:bg-primary hover:text-white' variant={'outline'}>
                        Previous
                    </Button>
                    {
                        activeIndex < 2 &&
                        <Button onClick={() => setactiveIndex(activeIndex + 1)} className='min-w-52' disabled={checkStatus()}>
                            Next
                        </Button>
                    }
                    {
                        activeIndex === 2 &&
                        <Button onClick={() => generateCourseLayout()} className='min-w-52' disabled={checkStatus()}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Generate Course Layout'}
                        </Button>
                    }
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div >
    )
}

export default CreateCourse