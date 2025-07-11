'use client'

import { Textarea } from './ui/textarea'
import FileUploder from './file-uploader'
import { Button } from './ui/button'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ExplanationContext } from '@/context/explanation-context'

const PromptInput: React.FC = () => {
    const [prompt, setPrompt] = useState('');

    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { setExplanation } = explanationContext;

    const fetchExplanation = async (prompt: string) => {
        if(prompt === '') return

        try {
            const response = await axios.post('/api/explain', {
                inputText: prompt
            })
            if (!response.status) console.log("Error while fetching");
            
            setExplanation(response.data.explanation);
            setPrompt("")
        } catch (error) {
            console.log("error, ", error)
        }
    }
    return (
        <section className="flex flex-col items-center justify-center gap-6 md:gap-9 mb-15">
            <h1 className="font-semibold text-4xl md:text-5xl tracking-wide">What can I explain?</h1>
            <div className="flex flex-col items-center gap-7 w-full">
                <div className="w-full border-2 rounded-2xl bg-black flex flex-col gap-2 justify-between md:w-[80%] lg:w-[65%] min-h-40 max-h-60 md:max-h-100 p-2">
                    <Textarea className="resize-none border-0 md:text-lg focus:ring-0" placeholder="Ask anything..." 
                    onChange={(e) => { setPrompt(e.target.value) }} 
                    />
                    <FileUploder />
                </div>
                <Button className="px-10 py-5 text-lg border-2 bg-black font-semibold cursor-pointer hover:text-black hover:bg-white hover:border-black transition duration-300 ease-in-out"
                    onClick={() => fetchExplanation(prompt)}
                >
                    Explain It To Me
                </Button>
            </div>
        </section>
    )
}

export default PromptInput