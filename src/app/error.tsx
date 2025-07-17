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
        <div className='min-h-screen bg-linear-to-b from-[#093b45] to-black text-white flex flex-col items-center justify-center gap-5'>
            <h1 className='text-3xl font-bold'>Something went wrong!</h1>
            <Button className='px-10 py-5 bg-black hover:bg-[#1493ac] border-2 border-[#1493ac] text-lg font-semibold cursor-pointer transition duration-300 ease-in-out'
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