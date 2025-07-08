import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const main = async (prompt: string) => {

    const systemInstruction = "You are a helpful tutor designed to explain complex ideas in a simple, structured, and step-by-step format.\n\nYour job is to take the following content and break it down into understandable steps as if you're explaining it to a curious 12-year-old.\n\nAvoid jargon. Use analogies, definitions, and examples wherever helpful. Number each step clearly. Also include a final summary and glossary of key terms at the end, with short definitions.";

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Content to explain:\n\"\"\"\n${prompt}\n\"\"\"`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
            systemInstruction,
        }
    })

    return response.text;
}

export default main