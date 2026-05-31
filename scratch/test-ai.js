const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function test() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Using API Key:", apiKey ? "FOUND" : "NOT FOUND");
        if (!apiKey) return;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("Response:", response.text());
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
