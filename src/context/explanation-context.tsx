'use client'

import { createContext, ReactNode, useState } from "react";

interface Explanation {
    data: string
    setExplanation: (_data: string) => void
}

export const ExplanationContext = createContext<Explanation | undefined>(undefined);

export const ExplanationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");

    const setExplanation = (_data: string) => {
        setData(_data);
    }

    return (
        <ExplanationContext.Provider value={{ data, setExplanation }}>
            {children}
        </ExplanationContext.Provider>
    );
}