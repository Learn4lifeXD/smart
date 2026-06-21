import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { runAgent } from "../agents";

export async function POST(req: NextRequest) {
  const { document_text } = await req.json();

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const ai = new GoogleGenAI({ apiKey });

  const encoder = new TextEncoder();
  const customReadable = new ReadableStream({
    async start(controller) {
      function sendUpdate(status: string, data?: string) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status, data })}\n\n`));
      }

      try {
        // 1. Archivist
        sendUpdate("Archivist is retrieving historical context...");
        await new Promise(r => setTimeout(r, 600)); // Simulate vector retrieval
        
        // 2. Surveyor
        sendUpdate("Surveyor is mapping topographic data...");
        const surveyorInput = `Analyze and provide geographic constraints, zoning codes, and spatial properties for the following target: ${document_text}`;
        const surveyorOut = await runAgent(ai, "gemini-3-flash", "You are the Surveyor Agent. Analyze topography, zones, and borders concisely in a technical tone.", surveyorInput);

        // 3. Appraiser
        sendUpdate("Appraiser is generating financial valuations...");
        const appraiserInput = `Generate valuation data for: ${document_text}\nGeographic Context: ${surveyorOut}`;
        const appraiserOut = await runAgent(ai, "gemini-2.5-flash-lite", "You are the Appraiser Agent. Calculate highly realistic budgets, parcel valuations, and financial compensation. Output in millions/billions.", appraiserInput);

        // 4. Auditor
        sendUpdate("Auditor is verifying legal compliance...");
        const auditorInput = `Verify legal compliance for: ${document_text}\nFinance: ${appraiserOut}`;
        const auditorOut = await runAgent(ai, "gemini-3.5-flash", "You are the Auditor Agent. Cite specific simulated state codes and expropriation laws. Ensure legal bulletproofing.", auditorInput);

        // 5. Sentinel
        sendUpdate("Sentinel is assessing risk factors...");
        const sentinelInput = `Identify risks for: ${document_text}\nLegal: ${auditorOut}`;
        const sentinelOut = await runAgent(ai, "gemini-3.1-flash-lite", "You are the Sentinel Agent. Assess security, stakeholder friction, media fallout, and operational delays.", sentinelInput);

        // 6. Scribe
        sendUpdate("Scribe is compiling final dossier...");
        const scribeInput = `Compile the final dossier based on the following sub-reports:\n\nTarget: ${document_text}\nSurveyor: ${surveyorOut}\nAppraiser: ${appraiserOut}\nAuditor: ${auditorOut}\nSentinel: ${sentinelOut}`;
        const finalDossier = await runAgent(ai, "gemini-2.5-flash", "You are the Scribe Agent. Synthesize the provided reports into a cohesive, highly professional, classified-style Markdown dossier. Use strict headers, bullet points, and bold text. Start with an Executive Summary.", scribeInput);

        sendUpdate("complete", finalDossier);
        controller.close();
      } catch (err: any) {
        sendUpdate("error", err.message);
        controller.close();
      }
    }
  });

  return new Response(customReadable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  });
}
