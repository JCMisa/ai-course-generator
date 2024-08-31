'use client'

import { Button } from '@/components/ui/button'
import { LayoutGrid, Lightbulb, Settings } from 'lucide-react'
import React, { useState } from 'react'
import SelectCategory from './_components/SelectCategory'
import TopicDescriptions from './_components/TopicDescriptions'
import SelectOption from './_components/SelectOption'

const CreateCourse = () => {
    const stepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <LayoutGrid />
        },
        {
            id: 2,
            name: 'Topic',
            icon: <Lightbulb />
        },
        {
            id: 3,
            name: 'Options',
            icon: <Settings />
        },
    ]

    const [activeIndex, setactiveIndex] = useState(0);

    return (
        <div>
            {/* stepper */}
            <div className='flex flex-col items-center justify-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {
                        stepperOptions.map((item, index) => (
                            <div key={item.id || index} className='flex flex-row items-center'>
                                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                    <div className={`bg-dark-100 p-3 rounded-full text-white ${activeIndex >= index && "linear-bg"}`}>
                                        {item.icon}
                                    </div>
                                    <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                                </div>
                                {
                                    index !== stepperOptions.length - 1 &&
                                    <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && "linear-bg"}`}></div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {/* components */}
                {
                    activeIndex === 0 ? <SelectCategory /> :
                        activeIndex === 1 ? <TopicDescriptions /> :
                            <SelectOption />
                }

                {/* next & prev btns */}
                <div className='flex flex-col gap-3 sm:flex-row justify-between mt-10 items-center'>
                    <Button onClick={() => setactiveIndex(activeIndex - 1)} disabled={activeIndex === 0} className='min-w-52 border-primary hover:bg-primary hover:text-white' variant={'outline'}>
                        Previous
                    </Button>
                    {
                        activeIndex < 2 &&
                        <Button onClick={() => setactiveIndex(activeIndex + 1)} className='min-w-52'>
                            Next
                        </Button>
                    }
                    {
                        activeIndex === 2 &&
                        <Button onClick={() => setactiveIndex(activeIndex + 1)} className='min-w-52'>
                            Generate Course Layout
                        </Button>
                    }
                </div>
            </div>
        </div >
    )
}

export default CreateCourse