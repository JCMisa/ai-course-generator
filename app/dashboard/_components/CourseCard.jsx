import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CourseCard = ({ course }) => {
    return (
        <div className='shadow-sm'>
            <Image src={course?.courseBanner} width={300} height={300} className='w-full h-[200px] object-cover rounded-lg' />
            <div className='p-2 flex flex-col gap-2'>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.name}</h2>
                <p className='text-sm text-gray-500'>{course?.category}</p>
                <div className='flex items-center justify-between gap-5 mt-1'>
                    <h2 className='flex flex-row items-center gap-2 p-2 bg-dark-100 text-primary-100 text-sm rounded-lg'><BookOpen className='w-5 h-5' /> {course?.courseOutput?.chapters} Chapters</h2>
                    <h2 className='text-sm bg-dark-100 text-primary p-2 rounded-lg'>{course?.courseOutput?.level}</h2>
                </div>
            </div>
        </div>
    )
}

export default CourseCard