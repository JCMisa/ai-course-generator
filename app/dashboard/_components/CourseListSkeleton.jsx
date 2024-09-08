import React from 'react'

const CourseListSkeleton = () => {
    return (
        <div className='shadow-lg bg-dark-100 p-2 rounded-lg animate-pulse'>
            <div className='w-full h-[200px] object-cover rounded-lg cursor-pointer bg-dark'></div>
            <div className='p-2 flex flex-col gap-2'>
                <h2 className='font-medium text-lg flex justify-between items-center'>
                    <span className='min-w-20 min-h-5 bg-dark'></span>
                </h2>
                <p className='text-sm min-w-20 min-h-5 bg-dark'></p>
                <div className='flex items-center justify-between gap-5 mt-1'>
                    <h2 className='flex flex-row items-center gap-2 p-2 min-w-20 min-h-5 bg-dark rounded-lg'></h2>
                    <h2 className='min-w-20 min-h-5 bg-dark p-2 rounded-lg'></h2>
                </div>
            </div>
        </div>
    )
}

export default CourseListSkeleton