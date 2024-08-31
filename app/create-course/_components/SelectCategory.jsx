import CategoryList from '@/app/_shared/CategoryList'
import React from 'react'
import Image from 'next/image'

const SelectCategory = () => {
    return (
        <div>
            <h2 className='text-sm px-10 md:px-20'>Select course category</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10 md:px-20 mt-5'>
                {
                    CategoryList.map((item, index) => (
                        <div className='flex flex-col p-5 border items-center bg-dark-100 shadow-lg rounded-xl cursor-pointer hover:border-primary hover:scale-125 transition-all'>
                            <Image src={item.icon} width={50} height={50} />
                            <h2>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectCategory