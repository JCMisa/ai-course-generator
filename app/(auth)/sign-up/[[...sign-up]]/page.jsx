import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        < section className="text-white" >
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="bg"
                        src="/images/auth-bg.avif"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="#">
                            <span className="sr-only">Home</span>
                            <img src="/images/pensieve-logo.png" alt="logo" className="h-8 sm:h-10" />
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Join the Pensieve Community
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Create an account to unlock the power of AI-generated content.
                        </p>

                        <div className="mt-8">
                            <SignUp />
                        </div>
                    </div>
                </main>
            </div>
        </section >
    )
}

export default SignUpPage