'use client'

import Ticker from 'framer-motion-ticker'
import React, { useContext, useState } from 'react'
import PromptDemoCard from './prompt-demo-card'
import { ExplanationContext } from '@/context/explanation-context'
import { AnimatePresence, motion } from 'motion/react'

const InfinitePromptScroll = () => {
    const [play, setPlay] = useState<boolean>(true);

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
            <AnimatePresence initial={false}>
                {!data && !isFetching && !error && (
                    <motion.section className="mask-fade w-full flex gap-12 justify-center mb-15 self-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "decay", duration: 0.5 }}
                        onHoverStart={() => setPlay(false)}
                        onHoverEnd={() => setPlay(true)}
                    >
                        <Ticker isPlaying={play}  duration={20}>
                            {demoPrompts.map((demoPrompt) => (
                                <PromptDemoCard key={demoPrompt.id} demoPrompt={demoPrompt.prompt} />
                            ))}
                        </Ticker>
                    </motion.section >
                )}
            </AnimatePresence>
        </>
    )
}

export default InfinitePromptScroll