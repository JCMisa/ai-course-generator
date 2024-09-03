'use client'

import { db } from '@/utils/db';
import { storage } from '@/utils/firebaseConfig';
import { CourseList } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UploadImage = ({ courseInfo }) => {
    const [selectedFile, setSelectedFile] = useState();

    // select image from files and upload to to firebase storage
    const onFileSelected = async (e) => {
        const file = e.target.files[0]; // get the selected image file
        setSelectedFile(URL.createObjectURL(file)) // create a blob of the image file

        const fileName = Date.now() + '.jpg'; // generate the name of the file
        const storageRef = ref(storage, 'ai-course-generator/' + fileName); // pass the filename to the specific path in the storage
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('upload file complete') // this will store the image bytes to the firebase storage specified location
        }).then((resp) => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log('img url: ', downloadUrl); // this will get the viewable url of the img
                try {
                    // update the record's courseBanner column
                    const result = await db.update(CourseList).set({
                        courseBanner: downloadUrl
                    }).where(eq(CourseList?.id, courseInfo?.id))

                    if (result) {
                        toast(
                            <p className='text-sm font-bold text-green-500'>Course banner updated successfully</p>
                        )
                    }
                } catch (error) {
                    toast(
                        <p className='text-sm font-bold text-red-500'>Internal error occured while updating the course banner</p>
                    )
                }
            })
        })
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