'use client'

import { Textarea } from './ui/textarea'
// import FileUploder from './file-uploader'
import { Button } from './ui/button'
import { AxiosError } from 'axios'
import React, { useContext, useState } from 'react'
import { ExplanationContext } from '@/context/explanation-context'
import { ApiErrorResponse } from '@/types/ApiResponse'
import { fetchExplanation } from '@/lib/fetch'
import { AnimatePresence, motion } from 'motion/react'

const PromptInput: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("")

    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const {
        resultOnTop,
        isFetching,
        setExplanation,
        setLoadingState,
        setErrorState,
        setPromptBackup,
        setResultOnTopState,
        setSavedState
    } = explanationContext;

    // API call to fetch the output for the given prompt
    const getExplanation = async () => {
        if (prompt === '') return
        setResultOnTopState(true);
        setErrorState(false);
        setLoadingState(true);
        setSavedState(false);
        try {
            const response = await fetchExplanation(prompt);
            setExplanation(response.data.explanation);
        } catch (error) {
            setErrorState(true);
            const apiError = error as AxiosError<ApiErrorResponse>;
            console.log(apiError.response?.data.error ?? "An unexpected error occurred.");
        } finally {
            setPrompt("");
            setPromptBackup(prompt);
            setLoadingState(false);
        }
    }

    return (
        <>
            <AnimatePresence initial={false}>
                {!resultOnTop && (
                    <motion.section className="flex flex-col items-center justify-center gap-6 md:gap-9 mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "decay", duration: 0.6 }}

                    >
                        <h1 className="font-semibold text-4xl md:text-5xl tracking-wide">What can I explain?</h1>
                        <div className="flex flex-col items-center gap-7 w-full">
                            <div className="w-full rounded-2xl border-[#1493ac] bg-white/5 flex justify-between md:w-[80%] lg:w-[65%] min-h-40 max-h-60 md:max-h-100 p-2 border">
                                <Textarea className="resize-none border-0 md:text-lg focus:ring-0" placeholder="Ask anything..."
                                    value={prompt}
                                    onChange={(e) => { setPrompt(e.target.value) }}
                                />
                                {/* <FileUploder /> */}
                            </div>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring" }}
                            >
                                <Button className="px-10 py-5 bg-white/5 hover:bg-[#1493ac] border border-[#1493ac] text-lg font-semibold cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => getExplanation()}
                                    disabled={(prompt === '' || isFetching)}
                                >
                                    Explain It To Me
                                </Button>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export default PromptInput