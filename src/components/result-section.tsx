'use client'

import { ExplanationContext } from "@/context/explanation-context";
import { useContext, useState } from "react";
import Markdown from "react-markdown";
import { Trash2, Bookmark, Copy, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { deleteExplanationById, fetchExplanation, fetchQueries, saveExplanation } from "@/lib/fetch";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ApiResponse";
import { AnimatePresence, motion } from "motion/react";
import { Session } from "next-auth";
import copy from 'copy-to-clipboard'
import toast from "react-hot-toast";

const ResultSection = ({ session }: { session: Session | null }) => {
    const [hover, setHover] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const {
        data,
        backupPrompt,
        isFetching,
        error,
        resultOnTop,
        saved,
        currentId,
        setExplanation,
        setErrorState,
        setLoadingState,
        setResultOnTopState,
        setQueriesData,
        setSavedState,
        setCurrentId
    } = explanationContext;

    // API call to fetch the output for the given prompt
    const getExplanation = async () => {
        setErrorState(false);
        setLoadingState(true);
        try {
            const response = await fetchExplanation(backupPrompt);
            setExplanation(response.data.explanation);
        } catch (error) {
            setErrorState(true);
            const apiError = error as AxiosError<ApiErrorResponse>;
            console.log(apiError.response?.data.error ?? "An unexpected error occurred.");
        } finally {
            setLoadingState(false);
        }
    }

    const getQueries = async () => {
        try {
            const response = await fetchQueries()
            setQueriesData(response.data.message)
        } catch (error) {
            console.log("Error while fetching queries: ", error)
        }
    }

    const saveData = async (email: string, username: string, explanation: string) => {
        if (!processing) {
            setProcessing(true)
            let toastId;
            try {
                toastId = toast.loading("Saving")
                const id = await saveExplanation(email, backupPrompt, explanation)
                setCurrentId(id)
                getQueries()
                toast.success("Saved", { id: toastId })
                setSavedState(true)
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong", { id: toastId })
            } finally {
                setProcessing(false)
            }
        }
    }

    const deleteExplanation = async (id: string) => {
        if (!processing) {
            let toastId;
            try {
                setProcessing(true)
                toastId = toast.loading("Deleting")
                await deleteExplanationById(id)
                setCurrentId("")
                toast.success("Deleted", { id: toastId })
                setSavedState(false)
                getQueries()
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong", { id: toastId })
            } finally {
                setProcessing(false)
            }
        }
    }

    return (
        <>
            <AnimatePresence>
                {(resultOnTop) && (
                    <motion.section className="absolute w-[95%] md:w-[80%] lg:w-[65%] min-h-full px-5 py-8 bg-black/30 rounded-2xl self-center flex justify-center mb-15 overflow-x-hidden"
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
                                    <div className="relative w-10 h-10 float-right mr-5">
                                        <motion.span className="absolute inset-0 rounded-full bg-red-500 -z-1"
                                            initial={{ scale: 0 }}
                                            animate={hover ? { scale: 1 } : { scale: 0 }}
                                            transition={{ duration: 0.3 }}
                                        ></motion.span>
                                        <motion.span className="cursor-pointer absolute inset-0 self-center justify-self-center z-1"
                                            onHoverStart={() => setHover(true)}
                                            onHoverEnd={() => setHover(false)}
                                        >
                                            <Trash2 onClick={() => {
                                                setResultOnTopState(false)
                                                setErrorState(false)
                                            }} />
                                        </motion.span>
                                    </div>
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
                                    <article className="whitespace-pre-line max-w-[100%]">
                                        <div className="float-right mr-5 flex gap-6">
                                            {session?.user && (
                                                saved ? (
                                                    <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => deleteExplanation(currentId)} />
                                                ) : (
                                                    <Bookmark className="cursor-pointer hover:text-[#1493ac]" onClick={() => {
                                                        saveData(session.user?.email || "", session.user?.name || "", data)
                                                    }} />
                                                )
                                            )}
                                            <Copy className="cursor-pointer hover:text-[#1493ac]" onClick={() => {
                                                copy(data)
                                                toast.success("Copied")
                                            }} />
                                            <XCircle size={25} className="cursor-pointer hover:text-red-400" onClick={() => {
                                                setResultOnTopState(false)
                                                setExplanation("")
                                            }} />
                                        </div>

                                        <Markdown
                                            components={{
                                                h1: (props) => (
                                                    <h1 className="text-2xl md:text-3xl font-bold mt-6 text-[#1493ac]" {...props} />
                                                ),
                                                h2: (props) => (
                                                    <h2 className="text-xl md:text-2xl font-semibold mt-4 text-[#1493ac]" {...props} />
                                                ),
                                                h3: (props) => (
                                                    <h3 className="text-lg md:text-xl font-semibold mt-2 text-[#1493ac]" {...props} />
                                                ),
                                                h4: (props) => (
                                                    <h3 className="text-base md:text-lg font-bold text-[#1493ac]" {...props} />
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