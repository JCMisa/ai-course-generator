import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
};

const ChapterContent = ({ chapter, content }) => {
    return (
        <div className='p-10'>
            <div className='flex flex-row items-center gap-2'>
                <Link href={'/dashboard'}><ArrowLeftCircle className='cursor-pointer' /></Link>
                <h2 className='font-medium text-2xl'>{chapter?.chapterName}</h2>
            </div >
            <p className='text-gray-500 text-sm'>{chapter?.about}</p>

            {/* video */}
            <div className='flex justify-center my-6'>
                <YouTube
                    videoId={content?.videoId}
                    opts={opts}
                />
            </div>

            {/* content */}
            <div>
                {
                    content?.content?.map((item, index) => (
                        <div key={index} className='p-5 bg-dark-100 mb-3 rounded-lg'>
                            <h2 className='font-medium text-lg'>{item?.title}</h2>
                            {/* <p className='text-sm text-gray-400 whitespace-pre-wrap'>{item?.explanation}</p> */}
                            <ReactMarkdown className='text-sm text-gray-400'>{item?.explanation}</ReactMarkdown>
                            {
                                item?.codeExample && (
                                    <div className='p-4 bg-dark text-white rounded-md mt-3 overflow-hidden'>
                                        <pre>
                                            <code>{item?.codeExample}</code>
                                        </pre>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default ChapterContent