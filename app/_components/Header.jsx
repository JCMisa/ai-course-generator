import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between items-center p-5 shadow-lg'>
            <div className='flex flex-row items-end'>
                <Image src={'/images/pensieve-logo.png'} width={40} height={40} alt='logo' />
                <h2 className='logo-text font-bold text-lg'>Pensieve</h2>
            </div>
            <Button>Get Started</Button>
        </div>
    )
}

export default Header