import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TopicDescriptions = () => {
    return (
        <div className='mx-20 lg:mx-44'>
            {/* input topic */}
            <div className='mt-5'>
                <label>
                    Write topic for the course you want to create
                </label>
                <Input placeholder={'e.g. Python'} />
            </div>

            {/* textarea for desc */}
            <div className='mt-5'>
                <label>
                    Tell us more about your course
                </label>
                <Textarea placeholder={'About your course'} />
            </div>
        </div>
    )
}

export default TopicDescriptions