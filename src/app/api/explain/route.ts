import { NextRequest, NextResponse } from "next/server";
import main from "@/lib/gemini";

export async function POST(request: NextRequest) {
    const { inputText } = await request.json();

    if (!inputText) {
        return NextResponse.json({
            error: 'Input text is required'
        },
            { status: 400 }
        );
    }

    const response = await main(inputText);
    
    if (!response) {
        return NextResponse.json({
            error: 'Request Failed'
        },
            { status: 401 }
        );
    }
    return NextResponse.json({ explanation: response }, { status: 200 }) // Returned explanation from gemini
}