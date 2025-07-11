// 'use client';

import { ExplanationContext } from "@/context/explanation-context";
import { useContext } from "react";
import Markdown from "react-markdown";
import { Trash2 } from "lucide-react";
import { Bookmark } from "lucide-react";

const ResultSection = () => {
    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { data, setExplanation } = explanationContext;

    return (
        <section className="w-full flex justify-center mb-15">
            {data && (
                <article className="w-full md:w-[80%] lg:w-[65%] px-5 py-8 bg-black/30 rounded-2xl whitespace-pre-line">
                    <div className="float-right flex gap-3">
                    <Bookmark className="cursor-pointer hover:text-[#bba62c]" />
                    <Trash2 className="cursor-pointer hover:text-red-400" onClick={() => {setExplanation("")}} />
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
            )}
        </section>
    )
}

export default ResultSection