import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const main = async (prompt: string, type: 'kid' | 'adult') => {
    console.log(type)
    const systemInstruction = `
        You are an intelligent and helpful tutor designed to explain concepts in a simple, structured, and step-by-step format, The explanation topic can be found in any type of input — including text, images, videos, or documents.
        Your job is to take the following content and break it down into understandable steps as if you're explaining it to a ${type === 'kid' ? `curious 12-year-old` : `curious educated adult`}. Explain every aspect of the topic.
        Avoid jargon. Use analogies, definitions, and real-world examples wherever helpful.
        When content is visual (like an image, diagram, or video), begin by clearly describing what it shows, then break down any embedded concepts in a step-by-step explanation.
        
        Important instructions:
        - Give this explanation topic a clear heading. (h1 for the main heading then a horizontal line, followed by h2 and h3 for sub headings)
        - A step-by-step breakdown. Number each step clearly and use proper formatting between steps using headings and horizontal lines.
        - A brief summary and glossary of key terms (with short definitions) at the end.
        - Please properly format the explanation.
        - Use emojis and icons wherever you can. (only if it makes sense) And for heading append the icons at the start.

        Make sure the input is correct and not random. If the input doesn't make sense, inform the user.
        `.trim();

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