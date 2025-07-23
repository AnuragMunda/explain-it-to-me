import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

// API call to fetch the output for the given prompt
export const fetchExplanation = async (prompt: string) => {
    const response = await axios.post<ApiResponse>('/api/explain', {
        inputText: prompt
    })
    return response
}

export const saveExplanation = async (email: string, query: string, explanation: string) => {
    const response = await axios.post('/api/save-explanation', {
        email,
        query,
        explanation
    })
    return response.data.id
}

export const fetchQueries = async () => {
    const response = await axios.get('http://localhost:3000/api/get-queries')
    return response
}

export const fetchExplanationById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/api/get-explanation?id=${id}`)
    return response.data.message
}

export const deleteExplanationById = async (id: string) => {
        const response = await axios.delete("/api/delete-explanation/", {
            data: { id }
        })
        return response.data.message
}