"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess({
    searchParams: { amount },
}) {
    const router = useRouter();
    return (
        <main className="max-w-3xl mx-auto p-10 text-white text-center border m-10 rounded-lg bg-dark-200">
            <div className="mb-10 flex flex-col items-center justify-center">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <h1 className="text-4xl font-extrabold mb-2">Payment successful</h1>
                <h2 className="text-xl text-gray-400">
                    Your ${amount} payment was successful. Enjoy!
                </h2>

                <div
                    className="linear-bg p-2 rounded-md text-white mt-5 text-lg font-bold w-full cursor-pointer"
                    onClick={() => router.back()}
                >
                    Go back
                </div>
            </div>
        </main>
    );
}