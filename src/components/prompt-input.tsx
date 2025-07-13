'use client'

import { Textarea } from './ui/textarea'
// import FileUploder from './file-uploader'
import { Button } from './ui/button'
import { AxiosError } from 'axios'
import React, { useContext, useState } from 'react'
import { ExplanationContext } from '@/context/explanation-context'
import { ApiErrorResponse } from '@/types/ApiResponse'
import { fetchExplanation } from '@/lib/fetch'

const PromptInput: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("")

    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { setExplanation, setLoadingState, setErrorState, setPromptBackup } = explanationContext;

    // API call to fetch the output for the given prompt
    const getExplanation = async () => {
        if (prompt === '') return
        setErrorState(false);

        setLoadingState(true);
        try {
            const response = await fetchExplanation(prompt);
            setExplanation(response.data.explanation);
        } catch (error) {
            setErrorState(true);
            setPromptBackup(prompt);
            const apiError = error as AxiosError<ApiErrorResponse>;
            console.log(apiError.response?.data.error ?? "An unexpected error occurred.");
        } finally {
            setPrompt("");
            setLoadingState(false);
        }
    }

    return (
        <section className="flex flex-col items-center justify-center gap-6 md:gap-9 mb-15">
            <h1 className="font-semibold text-4xl md:text-5xl tracking-wide">What can I explain?</h1>
            <div className="flex flex-col items-center gap-7 w-full">
                <div className="w-full border-2 rounded-2xl bg-black flex flex-col gap-2 justify-between md:w-[80%] lg:w-[65%] min-h-40 max-h-60 md:max-h-100 p-2">
                    <Textarea className="resize-none border-0 md:text-lg focus:ring-0" placeholder="Ask anything..."
                        value={prompt}
                        onChange={(e) => { setPrompt(e.target.value) }}
                    />
                    {/* <FileUploder /> */}
                </div>
                <Button className="px-10 py-5 text-lg border-2 bg-black font-semibold cursor-pointer hover:text-black hover:bg-white hover:border-black transition duration-300 ease-in-out"
                    onClick={() => getExplanation()}
                    disabled={(prompt === '')}
                >
                    Explain It To Me
                </Button>
            </div>
        </section>
    )
}

export default PromptInput