'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ExplanationContext } from "@/context/explanation-context"
import { fetchExplanationById, fetchQueries } from "@/lib/fetch"
import { useContext, useEffect } from "react"

export function AppSidebar() {
    const explanationContext = useContext(ExplanationContext);
    if (!explanationContext) {
        throw new Error("useContext must be used inside an <ExplanationProvider>");
    }

    const {
        queries,
        setExplanation,
        setLoadingState,
        setResultOnTopState,
        setErrorState,
        setQueriesData,
        setSavedState
    } = explanationContext;

    const getQueries = async () => {
        try {
            const response = await fetchQueries()
            setQueriesData(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQueries()
    }, [])

    const onClickHandler = async (id: string) => {
        setResultOnTopState(true);
        setErrorState(false);
        setLoadingState(true);
        try {
            const response = await fetchExplanationById(id)
            setExplanation(response.explanation)
            setSavedState(true)
        } catch (error) {
            console.log("something went wrong", error)
            setResultOnTopState(false)
            setLoadingState(false)
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <Sidebar>
            <SidebarContent className="text-white bg-linear-to-b from-[#052329] to-black px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg text-white mb-5">Anurag Munda</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {queries.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton className="hover:bg-[#1493ac] cursor-pointer"
                                        onClick={() => onClickHandler(item.id)} asChild>
                                        <span>{item.query}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}