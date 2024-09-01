import CategoryList from '@/app/_shared/CategoryList'
import React, { useContext } from 'react'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext';

const SelectCategory = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (category) => {
        // passing the category as an element inside the context array
        setUserCourseInput(prev => ({
            ...prev,
            category: category
        }));
    }

    return (
        <div className='px-10 md:px-20'>
            <h2 className='text-sm'>Select course category</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5'>
                {
                    CategoryList.map((item, index) => (
                        <div onClick={() => handleCategoryChange(item.name)} className={`flex flex-col p-5 border items-center bg-dark-100 shadow-lg rounded-xl cursor-pointer hover:border-primary hover:scale-110 transition-all ${userCourseInput?.category == item.name && 'border-primary scale-125'}`} key={item.id || index}>
                            <Image src={item.icon} width={50} height={50} alt='categoryIcon' />
                            <h2>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectCategory