'use client'

import { useUser } from '@clerk/nextjs';
import React from 'react'

const Hero = () => {
    const { user } = useUser();

    return (
        <section className="text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-[#F96D00] to-[#3795BD] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Pensieve: Where Learning

                        <span className="sm:block"> Meets Innovation </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Create personalized courses tailored to your unique learning style.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {
                            user ? (
                                <a
                                    className="block w-full rounded border border-primary-100 bg-primary-100 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                    href="/dashboard"
                                >
                                    Get Started
                                </a>
                            ) : (
                                <a
                                    className="block w-full rounded border border-primary-100 bg-primary-100 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                    href="/sign-in"
                                >
                                    Sign-in
                                </a>
                            )
                        }


                        <a
                            className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero