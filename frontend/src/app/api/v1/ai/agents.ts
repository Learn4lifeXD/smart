import { GoogleGenAI } from "@google/genai";

export async function runAgent(ai: GoogleGenAI, modelName: string, roleInstruction: string, input: string) {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{ text: input }] }],
      config: {
        systemInstruction: roleInstruction,
      }
    });
    return response.text;
}
