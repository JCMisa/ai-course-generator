import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div>
            <Image src={'/images/pensieve-logo.png'} width={25} height={25} alt='logo' />
        </div>
    )
}

export default Header