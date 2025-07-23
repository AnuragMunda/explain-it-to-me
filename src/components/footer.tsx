'use client'

import { ExplanationContext } from '@/context/explanation-context';
import { AnimatePresence } from 'motion/react';
import React, { useContext } from 'react'
import { motion } from 'motion/react';
import Link from 'next/link';
import { Dot, Github, Linkedin, Twitter } from 'lucide-react';

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
                        <ul className='mb-2'>
                            <li className='flex items-center h-5 gap-2'>
                                <Link className='hover:text-[#1493ac]' target='_blank' href="https://www.linkedin.com/in/anuragmunda/"><Linkedin size={20} /></Link>
                                <Dot />
                                <Link className='hover:text-[#1493ac]' target='_blank' href="https://x.com/0xShenigun"><Twitter size={20} /></Link>
                                <Dot />
                                <Link className='hover:text-[#1493ac]' target='_blank' href="https://github.com/AnuragMunda"><Github size={20} /></Link>
                            </li>
                        </ul>
                        <span>© 2025 ExplainItToMe. Anurag Munda.</span>
                    </motion.footer>
                )}
            </AnimatePresence>
        </>
    )
}

export default Footer