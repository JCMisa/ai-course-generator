import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderCircle, SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { eq } from 'drizzle-orm'

const EditCourseChapters = ({ courseInfo, courseId, refreshData }) => {
    const courseOutputChapters = courseInfo?.courseOutput?.course?.chapters;

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState()
    const [about, setAbout] = useState()
    const [duration, setDuration] = useState()

    useEffect(() => {
        courseInfo && setName(courseOutputChapters[courseId]?.chapterName);
        courseInfo && setAbout(courseOutputChapters[courseId]?.about)
        courseInfo && setDuration(courseOutputChapters[courseId]?.duration)
    }, [courseInfo])


    const onUpdateHandler = async () => {
        setLoading(true)
        try {
            courseInfo.courseOutput.course.chapters[courseId].chapterName = name;
            courseInfo.courseOutput.course.chapters[courseId].about = about;
            courseInfo.courseOutput.course.chapters[courseId].duration = duration;

            const result = await db.update(CourseList).set({
                courseOutput: courseInfo?.courseOutput
            }).where(eq(CourseList?.id, courseInfo?.id))

            if (result) {
                toast(
                    <p className='text-sm font-bold text-green-500'>Course chapter updated successfully</p>
                )
                refreshData()
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while updating course chapter</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <SquarePen />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Chapter Title</label>
                            <Input defaultValue={courseOutputChapters[courseId].chapterName} onChange={(e) => setName(e.target.value ? e.target.value : courseOutputChapters[courseId]?.chapterName)} />
                        </div>
                        <div className='mt-2'>
                            <label>Course Chapter About</label>
                            <Textarea defaultValue={courseOutputChapters[courseId].about} onChange={(e) => setAbout(e.target.value ? e.target.value : courseOutputChapters[courseId]?.about)} className='card-scroll h-32' />
                        </div>
                        <div className='mt-2'>
                            <label>Course Chapter Duration</label>
                            <Input defaultValue={courseOutputChapters[courseId].duration} onChange={(e) => setDuration(e.target.value ? e.target.value : courseOutputChapters[courseId]?.duration)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={() => onUpdateHandler()}>
                            {
                                loading ? <LoaderCircle className='animate-spin' /> : 'Update'
                            }
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseChapters