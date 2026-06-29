// src/services/aiService.js

export async function askAI(memory, question) {

  // We will replace this with OpenAI later.

  return `🤖 AI Service received your question:

"${question}"

Current Memory:

${memory.join("\n")}`;
}