'use client'

import { createContext, ReactNode, useState } from "react";

interface Explanation {
    data: string
    isFetching: boolean
    error: boolean
    backupPrompt: string
    backupExplanationType: 'kid' | 'adult'
    resultOnTop: boolean
    queries: QueryItem[]
    saved: boolean
    currentId: string
    setExplanation: (_data: string) => void
    setLoadingState: (_isFetching: boolean) => void
    setErrorState: (_error: boolean) => void
    setPromptBackup: (_prompt: string) => void
    setExplanationTypeBackup: (_type: 'kid' | 'adult') => void
    setResultOnTopState: (_on: boolean) => void
    setQueriesData: (_queries: QueryItem[]) => void
    setSavedState: (_saved: boolean) => void
    setCurrentId: (_id: string) => void
}

type QueryItem = { id: string; query: string };

export const ExplanationContext = createContext<Explanation | undefined>(undefined);

export const ExplanationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [backupPrompt, setBackupPrompt] = useState<string>('');
    const [backupExplanationType, setBackupExplanationType] = useState<'kid' | 'adult'>('adult');
    const [resultOnTop, setResultOnTop] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [queries, setQueries] = useState<QueryItem[]>([]);
    const [currentId, setCurrentId] = useState<string>("");

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

    const setExplanationTypeBackup = (_type: 'kid' | 'adult') => {
        setBackupExplanationType(_type);
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
                backupExplanationType,
                resultOnTop,
                queries,
                saved,
                currentId,
                setExplanation,
                setLoadingState,
                setErrorState,
                setPromptBackup,
                setExplanationTypeBackup,
                setResultOnTopState,
                setQueriesData,
                setSavedState,
                setCurrentId
            }}>
            {children}
        </ExplanationContext.Provider>
    );
}