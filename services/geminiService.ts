import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Safely check for process.env to avoid ReferenceError in browser environments
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || ''; 

const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model', text: string }[] = []
): Promise<string> => {

  return "Sorry, I am still in development. I will be able to access Toan's data and answer questions in the next version. You can ask me about Toan's research, projects, and other information."
  
  if (!apiKey) {
    return "API_KEY_MISSING: Please provide a valid API Key in the environment variables.";
  }

  try {
    const modelId = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: "You are a helpful AI assistant running inside ToanOS, a web-based desktop environment. Be concise, friendly, and helpful.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};