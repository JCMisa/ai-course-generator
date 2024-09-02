import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDescriptions = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (name, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='mx-20 lg:mx-44'>
            {/* input topic */}
            <div className='mt-5'>
                <label>
                    Write topic for the course you want to create
                </label>
                <Input placeholder={'e.g. Python'} onChange={(e) => handleInputChange('topic', e.target.value)} defaultValue={userCourseInput?.topic} />
            </div>

            {/* textarea for desc */}
            <div className='mt-5'>
                <label>
                    Tell us more about your course (optional)
                </label>
                <Textarea placeholder={'About your course'} onChange={(e) => handleInputChange('description', e.target.value)} defaultValue={userCourseInput?.description} />
            </div>
        </div>
    )
}

export default TopicDescriptions