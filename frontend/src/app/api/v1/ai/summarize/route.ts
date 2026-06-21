import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { document_text } = await req.json();

    if (!document_text) {
      return NextResponse.json({ error: "Missing document_text" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_API_KEY is completely missing from the environment. Please ensure you restarted the Next.js dev server." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: document_text }],
        },
      ],
      config: {
        systemInstruction: "You are the Sovereign AI Core. Speak in a highly secure, classified, and professional tone. Respond concisely as an automated intelligence system managing high-stakes corporate and governmental dossiers.",
      }
    });

    return NextResponse.json({ summary: response.text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
