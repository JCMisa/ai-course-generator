import React from 'react'
import UploadImage from './UploadImage'
import { LayoutDashboard } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import EditCourseInfo from './EditCourseInfo'
import Link from 'next/link'

const BasicInfo = ({ courseInfo, refreshData, edit = true }) => {
    return (
        <div className='p-10 border rounded-xl shadow-lg mt-5'>
            {/* grid grid-cols-1 md:grid-cols-2 items-center gap-5 */}
            <div className='flex flex-col md:flex-row items-center gap-5 md:gap-20'>
                <div>
                    <h2 className='font-bold text-xl'>
                        {courseInfo?.courseOutput?.course?.name}
                        {edit && <EditCourseInfo courseInfo={courseInfo} refreshData={refreshData} />}
                    </h2>
                    <p className='text-sm text-gray-500 mt-3'>{courseInfo?.courseOutput?.course?.description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><LayoutDashboard /> {courseInfo?.category}</h2>
                    {!edit && <Link href={`/course/${courseInfo?.courseId}/start`} ><Button className='w-full mt-5'>Start</Button></Link>}
                </div>
                <div className='flex items-center justify-center min-w-[200px] max-w-[400px] rounded-xl min-h-[200px] max-h-[200px]'>
                    <UploadImage courseInfo={courseInfo} edit={edit} />
                    {/* <Image src={'/images/mockup-banner.jpg'} width={300} height={300} alt={'banner'} className='min-w-[200px] max-w-[400px] rounded-xl min-h-[200px] max-h-[200px] object-cover' /> */}
                </div>
            </div>
        </div>
    )
}

export default BasicInfo