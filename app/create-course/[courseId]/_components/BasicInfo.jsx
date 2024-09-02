import React from 'react'
import UploadImage from './UploadImage'
import Image from 'next/image'
import { LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditCourseInfo from './EditCourseInfo'

const BasicInfo = ({ courseInfo }) => {
    return (
        <div className='p-10 border rounded-xl shadow-lg mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='font-bold text-xl'>{courseInfo?.courseOutput?.course?.name} <EditCourseInfo courseInfo={courseInfo} /></h2>
                    <p className='text-sm text-gray-500 mt-3'>{courseInfo?.courseOutput?.course?.description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><LayoutDashboard /> {courseInfo?.category}</h2>
                    <Button className='w-full mt-5'>Start</Button>
                </div>
                <div>
                    {/* <UploadImage /> */}
                    <Image src={'/images/mockup-banner.jpg'} width={300} height={300} alt={'banner'} className='w-full rounded-xl min-h-[200px] max-h-[200px] object-cover' />
                </div>
            </div>
        </div>
    )
}

export default BasicInfo