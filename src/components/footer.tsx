'use client'

import { ExplanationContext } from '@/context/explanation-context';
import { AnimatePresence } from 'motion/react';
import React, { useContext } from 'react'
import { motion } from 'motion/react';

const Footer = () => {
    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const { resultOnTop } = explanationContext;

    return (
        <>
            <AnimatePresence initial={false}>
                {!resultOnTop && (
                    <motion.footer className="mt-auto flex flex-col items-center gap-3 text-sm mb-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "decay", duration: 0.6 }}
                    >
                        <span>LinkedIn | Discord | Portfolio | X</span>
                        <span>© 2025 ExplainItToMe. Anurag Munda.</span>
                    </motion.footer>
                )}
            </AnimatePresence>
        </>
    )
}

export default Footer