'use client'

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='flex justify-between items-center p-5 shadow-lg'>
            <div className='flex flex-row items-end'>
                <Image src={'/images/pensieve-logo.png'} width={40} height={40} alt='logo' />
                <h2 className='logo-text font-bold text-lg'>Pensieve</h2>
            </div>
            {
                user ? (
                    <UserButton />
                ) : (
                    <Button onClick={() => router.push('/sign-in')}>Get Started</Button>
                )
            }
        </div>
    )
}

export default Header