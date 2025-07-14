'use client'

import { ExplanationContext } from "@/context/explanation-context";
import { useContext } from "react";
import Markdown from "react-markdown";
import { Trash2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { fetchExplanation } from "@/lib/fetch";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ApiResponse";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const ResultSection = () => {

    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { data,
        backupPrompt,
        setExplanation,
        isFetching,
        error,
        resultOnTop,
        setErrorState,
        setLoadingState,
        setPromptBackup,
        setResultOnTopState
    } = explanationContext;

    // API call to fetch the output for the given prompt
    const getExplanation = async () => {
        setErrorState(false);
        setLoadingState(true);
        try {
            const response = await fetchExplanation(backupPrompt);
            setExplanation(response.data.explanation);
            setPromptBackup("");
        } catch (error) {
            setErrorState(true);
            const apiError = error as AxiosError<ApiErrorResponse>;
            console.log(apiError.response?.data.error ?? "An unexpected error occurred.");
        } finally {
            setLoadingState(false);
        }
    }

    return (
        <>
            <AnimatePresence>
                {(resultOnTop) && (
                    <motion.section className={cn("absolute w-full md:w-[80%] lg:w-[65%] min-h-full px-5 py-8 bg-black/30 rounded-2xl self-center flex justify-center mb-15")}
                        initial={{ y: 1000 }}
                        animate={{ y: 60 }}
                        exit={{ y: 1000 }}
                        transition={{ type: "tween", duration: 0.7 }}
                    >

                        {isFetching ? (
                            <motion.div className="mt-50 w-15 h-15 md:w-20 md:h-20 border-6 border-t-[#1493ac] rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >

                            </motion.div>
                        ) : (
                            error ? (
                                <div className="w-full">
                                    <Trash2 className="cursor-pointer float-right hover:text-red-400" onClick={() => {

                                        setResultOnTopState(false)
                                        setErrorState(false)
                                    }} />
                                    <div className="flex flex-col items-center gap-5 mt-30">
                                        <h1 className="text-center text-xl">Something went wrong.<br />Please try again or close the window.</h1>
                                        <Button className="px-10 py-5 bg-[#1493ac] hover:bg-[#1493ac]/50 text-base font-semibold cursor-pointer transition duration-300 ease-in-out"
                                            onClick={() => getExplanation()}
                                        >
                                            Try again
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                data && (
                                    <article className="whitespace-pre-line">
                                        <div className="float-right flex gap-3">
                                            <Bookmark className="cursor-pointer hover:text-[#1493ac]" />
                                            <Trash2 className="cursor-pointer hover:text-red-400" onClick={() => {
                                                setResultOnTopState(false)
                                                setExplanation("")
                                            }} />
                                        </div>

                                        <Markdown
                                            components={{
                                                h1: (props) => (
                                                    <h1 className="text-3xl font-bold mt-6 text-[#1493ac]" {...props} />
                                                ),
                                                h2: (props) => (
                                                    <h2 className="text-2xl font-semibold mt-4 text-[#1493ac]" {...props} />
                                                ),
                                                h3: (props) => (
                                                    <h3 className="text-xl font-semibold mt-2 text-[#1493ac]" {...props} />
                                                ),
                                                h4: (props) => (
                                                    <h3 className="text-lg font-bold text-[#1493ac]" {...props} />
                                                ),
                                                strong: (props) => (
                                                    <strong className="text-base font-bold text-[#6ebccb]" {...props} />
                                                ),
                                            }}
                                        >
                                            {data}
                                        </Markdown>
                                    </article>
                                )
                            )
                        )}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export default ResultSection