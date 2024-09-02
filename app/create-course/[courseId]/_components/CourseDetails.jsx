import { BookOpen, ChartBar, SquarePlay, Timer } from 'lucide-react'
import React from 'react'

const CourseDetails = ({ courseInfo }) => {
    return (
        <div className='border p-6 rounded-xl shadow-md mt-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <ChartBar className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Difficulty Level</h2>
                        <h2 className='font-medium text-lg'>{courseInfo?.level}</h2>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Timer className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Duration</h2>
                        <h2 className='font-medium text-lg'>{courseInfo?.courseOutput?.duration}</h2>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <BookOpen className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No. of Chapters</h2>
                        <h2 className='font-medium text-lg'>{courseInfo?.courseOutput?.chapters}</h2>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <SquarePlay className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Video Included?</h2>
                        <h2 className='font-medium text-lg'>{courseInfo?.includeVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails