import React from 'react'
import { Textarea } from './ui/textarea'
import FileUploder from './file-uploader'
import { Button } from './ui/button'

const PromptInput = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6 md:gap-9 mb-15">
            <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl tracking-wide">What can I explain?</h1>
            <div className="flex flex-col items-center gap-7 w-full">
                <div className="w-full border-2 rounded-2xl bg-black flex flex-col gap-2 justify-between md:w-[80%] lg:w-[65%] min-h-40 max-h-60 md:max-h-100 p-2">
                    <Textarea className="resize-none border-0 md:text-lg focus:ring-0" placeholder="Ask anything..." />
                    <FileUploder />
                </div>
                <Button className="px-10 py-5 text-lg border-2 bg-black font-semibold cursor-pointer hover:text-black hover:bg-white hover:border-black transition duration-300 ease-in-out">Explain It To Me</Button>
            </div>
        </section>
    )
}

export default PromptInput