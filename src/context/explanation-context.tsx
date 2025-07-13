'use client'

import { createContext, ReactNode, useState } from "react";

interface Explanation {
    data: string
    isFetching: boolean
    error: boolean
    backupPrompt: string
    resultOnTop: boolean
    setExplanation: (_data: string) => void
    setLoadingState: (_isFetching: boolean) => void
    setErrorState: (_error: boolean) => void
    setPromptBackup: (_prompt: string) => void
    setResultOnTopState: (_on: boolean) => void
}

export const ExplanationContext = createContext<Explanation | undefined>(undefined);

export const ExplanationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [backupPrompt, setBackupPrompt] = useState<string>('');
    const [resultOnTop, setResultOnTop] = useState<boolean>(false);

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

    const setResultOnTopState = (_on: boolean) => {
        setResultOnTop(_on);
    }

    return (
        <ExplanationContext.Provider
            value={{
                data,
                isFetching,
                error,
                backupPrompt,
                resultOnTop,
                setExplanation,
                setLoadingState,
                setErrorState,
                setPromptBackup,
                setResultOnTopState
            }}>
            {children}
        </ExplanationContext.Provider>
    );
}