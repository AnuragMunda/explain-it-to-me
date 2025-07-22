'use client'

import { createContext, ReactNode, useState } from "react";

interface Explanation {
    data: string
    isFetching: boolean
    error: boolean
    backupPrompt: string
    resultOnTop: boolean
    queries: QueryItem[]
    saved: boolean
    setExplanation: (_data: string) => void
    setLoadingState: (_isFetching: boolean) => void
    setErrorState: (_error: boolean) => void
    setPromptBackup: (_prompt: string) => void
    setResultOnTopState: (_on: boolean) => void
    setQueriesData: (_queries: QueryItem[]) => void
    setSavedState: (_saved: boolean) => void
}

type QueryItem = { id: string; query: string };

export const ExplanationContext = createContext<Explanation | undefined>(undefined);

export const ExplanationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [backupPrompt, setBackupPrompt] = useState<string>('');
    const [resultOnTop, setResultOnTop] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [queries, setQueries] = useState<QueryItem[]>([]);

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

    const setQueriesData = (_queries: QueryItem[]) => {
        setQueries(_queries);
    }

        const setSavedState = (_saved: boolean) => {
        setSaved(_saved);
    }

    return (
        <ExplanationContext.Provider
            value={{
                data,
                isFetching,
                error,
                backupPrompt,
                resultOnTop,
                queries,
                saved,
                setExplanation,
                setLoadingState,
                setErrorState,
                setPromptBackup,
                setResultOnTopState,
                setQueriesData,
                setSavedState
            }}>
            {children}
        </ExplanationContext.Provider>
    );
}