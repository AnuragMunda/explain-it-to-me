// 'use client';

import { ExplanationContext } from "@/context/explanation-context";
import { useContext } from "react";
import Markdown from "react-markdown";
import { Trash2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { fetchExplanation } from "@/lib/fetch";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ApiResponse";

const ResultSection = () => {
    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { data, backupPrompt, setExplanation, isFetching, error, setErrorState, setLoadingState, setPromptBackup } = explanationContext;

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
        <section className="w-full md:w-[80%] lg:w-[65%] px-5 py-8 bg-black/30 rounded-2xl self-center flex justify-center mb-15">

            {isFetching ? (
                <h1>Loading...</h1>
            ) : (
                error ? (
                    <div className="flex flex-col items-center gap-2">
                        <h1>Something went wrong.</h1>
                        <Button className="cursor-pointer bg-[#6E642C] hover:bg-[#6E642C]/50"
                            onClick={() => getExplanation()}
                        >
                            Try again
                        </Button>
                    </div>
                ) : (
                    data && (
                        <article className="whitespace-pre-line">
                            <div className="float-right flex gap-3">
                                <Bookmark className="cursor-pointer hover:text-[#bba62c]" />
                                <Trash2 className="cursor-pointer hover:text-red-400" onClick={() => { setExplanation("") }} />
                            </div>

                            <Markdown
                                components={{
                                    h1: (props) => (
                                        <h1 className="text-3xl font-bold mt-6 text-[#bba62c]" {...props} />
                                    ),
                                    h2: (props) => (
                                        <h2 className="text-2xl font-semibold mt-4 text-[#bba62c]" {...props} />
                                    ),
                                    h3: (props) => (
                                        <h3 className="text-xl font-semibold mt-2 text-[#bba62c]" {...props} />
                                    ),
                                    strong: (props) => (
                                        <strong className="text-base font-bold text-[#e5dcab]" {...props} />
                                    ),
                                }}
                            >
                                {data}
                            </Markdown>
                        </article>
                    )
                )
            )}
        </section>
    )
}

export default ResultSection