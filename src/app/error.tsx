'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='min-h-screen bg-linear-to-b from-[#6E642C] to-black text-white flex flex-col items-center justify-center gap-5'>
            <h1 className='text-3xl font-bold'>Something went wrong!</h1>
            <Button className='px-14 py-6 text-xl border-2 bg-black font-semibold cursor-pointer hover:text-black hover:bg-white hover:border-black transition duration-300 ease-in-out'
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}