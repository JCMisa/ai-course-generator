'use client'

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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { eq } from 'drizzle-orm'


const EditCourseInfo = ({ courseInfo, refreshData }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        courseInfo && setName(courseInfo?.courseOutput?.course?.name);
        courseInfo && setDescription(courseInfo?.courseOutput?.course?.description);
    }, [courseInfo])

    const onUpdateHandler = async () => {
        setLoading(true);
        try {
            courseInfo.courseOutput.course.name = name;
            courseInfo.courseOutput.course.description = description;

            const result = await db.update(CourseList).set({
                courseOutput: courseInfo?.courseOutput // set the courseOutput property to its new state after updating name and desc
            }).where(eq(CourseList?.id, courseInfo?.id))
            if (result) {
                toast(
                    <p className='text-sm font-bold text-green-500'>Course info updated successfully</p>
                )
                refreshData()
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while updating course info</p>
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
                    <DialogTitle>Edit Course Title and Description</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={courseInfo?.courseOutput?.course?.name} onChange={(e) => setName(e.target.value ? e.target?.value : courseInfo?.courseOutput?.course?.name)} />
                        </div>
                        <div className='mt-2'>
                            <label>Description</label>
                            <Textarea defaultValue={courseInfo?.courseOutput?.course?.description} onChange={(e) => setDescription(e.target.value ? e.target?.value : courseInfo?.courseOutput?.course?.description)} className='card-scroll h-32' />
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

export default EditCourseInfo