// src/services/aiService.js

import { GoogleGenerativeAI } from "@google/generative-ai";
console.log(process.env.REACT_APP_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY
);

export async function askAI(memory, question) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are Context DNA.

You remember information about the user.

User Memory:
${memory.join("\n")}

User Question:
${question}

Answer naturally and personalize your response based on the user's memory.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);
    return "❌ Sorry, I couldn't connect to the AI.";
  }
}
export async function extractMemory(message) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI memory extractor.

Your job is to decide whether the user's latest message contains useful long-term information.

If YES, return ONLY ONE memory.

Examples:

Input:
I love football.
Output:
❤️ Likes: Football

Input:
I'm learning Python.
Output:
📚 Learning: Python

Input:
My goal is Microsoft.
Output:
🎯 Goal: Microsoft

Input:
My favourite hobby is badminton.
Output:
🏸 Hobby: Badminton

Input:
I have a dog named Bruno.
Output:
🐶 Pet: Bruno

If the message contains nothing worth remembering,
return exactly:

NONE

User message:

${message}
`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();

  } catch (error) {
    console.error(error);
    return "NONE";
  }
}