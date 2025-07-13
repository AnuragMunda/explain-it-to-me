'use client'

import Ticker from 'framer-motion-ticker'
import React, { useContext } from 'react'
import PromptDemoCard from './prompt-demo-card'
import { ExplanationContext } from '@/context/explanation-context'

const InfinitePromptScroll = () => {
    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { data, isFetching, error } = explanationContext;

    const demoPrompts = [
        {
            id: 1,
            prompt: 'Explain to me how rocket works.'
        },
        {
            id: 2,
            prompt: 'What is this image about?'
        },
        {
            id: 3,
            prompt: 'Create a detailed explanation of this video.'
        },
        {
            id: 4,
            prompt: "Newton's second law."
        },
        {
            id: 5,
            prompt: "What is Artificial Intelligence?"
        },
    ]

    return (
        <>
            {!data && !isFetching && !error && (
                <section className="mask-fade w-full flex gap-10 justify-center mb-15 self-center">
                    <Ticker duration={20}>
                        {demoPrompts.map((demoPrompt) => (
                            <PromptDemoCard key={demoPrompt.id} demoPrompt={demoPrompt.prompt} />
                        ))}
                    </Ticker>
                </section >
            )}
        </>
    )
}

export default InfinitePromptScroll