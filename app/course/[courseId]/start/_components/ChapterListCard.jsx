import { Clock } from 'lucide-react'
import React from 'react'

const ChapterListCard = ({ chapter, index }) => {
    return (
        <div className='grid grid-cols-5 p-4 items-center border-b shadow-lg'>
            <div>
                <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index + 1}</h2>
            </div>
            <div className='col-span-4'>
                <h2 className='font-medium'>{chapter?.chapterName}</h2>
                <h2 className='text-sm text-gray-500 flex flex-row items-center gap-2'><Clock className='w-5 h-5' /> {chapter?.duration}</h2>
            </div>
        </div>
    )
}

export default ChapterListCard