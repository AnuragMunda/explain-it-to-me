'use client'

import { createContext, ReactNode, useState } from "react";

interface Explanation {
    data: string
    isFetching: boolean
    error: boolean
    backupPrompt: string
    setExplanation: (_data: string) => void
    setLoadingState: (_isFetching: boolean) => void
    setErrorState: (_error: boolean) => void
    setPromptBackup: (_prompt: string) => void
}

export const ExplanationContext = createContext<Explanation | undefined>(undefined);

export const ExplanationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [backupPrompt, setBackupPrompt] = useState<string>('');

    const setExplanation = (_data: string) => {
        setData(_data);
    }

    const setLoadingState = (_isFetching: boolean) => {
        setIsFetching(_isFetching);
    }

    const setErrorState = (_error: boolean) => {
        setError(_error);
    }

    const setPromptBackup = (_prompt: string) => {
        setBackupPrompt(_prompt);
    }

    return (
        <ExplanationContext.Provider
            value={{
                data,
                isFetching,
                error,
                backupPrompt,
                setExplanation,
                setLoadingState,
                setErrorState,
                setPromptBackup
            }}>
            {children}
        </ExplanationContext.Provider>
    );
}