import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { ArrowBigUpDash, Clock, Hash, SquarePlay } from 'lucide-react'


const SelectOption = () => {
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                <div>
                    <div className='flex flex-row items-center gap-1'>
                        <ArrowBigUpDash className='w-5 h-5' />
                        <label className='text-sm'>Course Difficulty</label>
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className='flex flex-row items-center gap-1'>
                        <Clock className='w-5 h-5' />
                        <label className='text-sm'>Course Duration</label>
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hour">1 Hour</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="Advance">More than 2 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className='flex flex-row items-center gap-1'>
                        <SquarePlay className='w-5 h-5' />
                        <label className='text-sm'>Add Video?</label>
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className='flex flex-row items-center gap-1'>
                        <Hash className='w-5 h-5' />
                        <label className='text-sm'>No. of Chapters</label>
                    </div>
                    <Input type={'number'} />
                </div>
            </div>
        </div>
    )
}

export default SelectOption