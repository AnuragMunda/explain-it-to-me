import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

// API call to fetch the output for the given prompt
export const fetchExplanation = async (prompt: string) => {
    const response = await axios.post<ApiResponse>('/api/explain', {
        inputText: prompt
    })
    return response
}