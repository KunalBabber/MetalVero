import { GoogleGenerativeAI } from "@google/generative-ai";
import { FACTORY_KNOWLEDGE } from "@/lib/knowledge-base";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message, history } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY?.trim();

        if (!apiKey) {
            return NextResponse.json({
                success: true,
                reply: "I am currently in demo mode. (Please set GEMINI_API_KEY in .env to enable full AI)"
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: `
                ${FACTORY_KNOWLEDGE}
                
                Important:
                1. Answer ONLY based on the provided factory knowledge.
                2. If the information is not available, politely guide them to contact support.
                3. Keep responses concise and helpful.
                4. Do not mention that you are an AI model or have limitations unless asked about your nature.
            `
        });

        // Format history for Gemini API
        // Gemini requires history to start with a 'user' message.
        // We skip any leading 'assistant' messages.
        let startIndex = 0;
        const safeHistory = history || [];
        while (startIndex < safeHistory.length && safeHistory[startIndex].role !== 'user') {
            startIndex++;
        }

        const formattedHistory = safeHistory.slice(startIndex).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ success: true, reply: text });

    } catch (error) {
        console.error("AI Chat Error Details:", error);

        return NextResponse.json({
            success: false,
            reply: `AI Service Error: ${error.message || "Please try again later."}`,
            message: error.message
        }, { status: 500 });
    }
}
