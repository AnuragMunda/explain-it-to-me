export interface ApiResponse {
    success: boolean;
    explanation: string;
}

export interface ApiErrorResponse {
    success: boolean;
    error: string;
}