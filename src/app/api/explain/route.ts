import { NextRequest, NextResponse } from "next/server";
import main from "@/lib/gemini";

export async function POST(request: NextRequest) {
    const { inputText, type } = await request.json();

    if (!inputText) {
        return NextResponse.json({
            success: false,
            error: 'Input text is required'
        }, { status: 400 });
    }

    const response = await main(inputText, type);

    if (!response) {
        return NextResponse.json({
            success: false,
            error: 'Something went wrong. Please try again.'
        }, { status: 401 });
    }
    return NextResponse.json({ success: true, explanation: response }, { status: 200 }) // Returned explanation from gemini
}