'use client'

import Image from 'next/image';
import React, { useState } from 'react'

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState();

    const onFileSelected = (e) => {
        const file = e.target.files[0];
        setSelectedFile(URL.createObjectURL(file))
        console.log('blob file: ', URL.createObjectURL(file))
    }

    return (
        /* From Uiverse.io by akshat-patel28 */
        <div>
            {
                selectedFile ? (
                    <div>
                        <label htmlFor="upload-image">
                            <Image src={selectedFile} width={300} height={300} alt={'banner'} className='min-w-[200px] max-w-[400px] rounded-xl min-h-[200px] max-h-[200px] object-cover cursor-pointer' />
                        </label>
                        <input className="w-10 opacity-0" name="file" type="file" id='upload-image' onChange={onFileSelected} />
                    </div>
                ) : (
                    <div className="input-div-upload">
                        <input className="input-upload" name="file" type="file" id='upload-image' onChange={onFileSelected} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="icon-upload"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                    </div>
                )
            }
        </div>
    )
}

export default UploadImage