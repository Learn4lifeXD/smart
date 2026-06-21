"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function AITest() {
  const [backendStatus, setBackendStatus] = useState<string>("Loading...");
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/dossiers")
      .then(res => res.json())
      .then(d => setBackendStatus(d.message || "Connected"))
      .catch(e => setBackendStatus("Error connecting to backend"));
  }, []);

  const testAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_text: "The property located at 123 Main St, Sector 4, is required for the new highway project. The estimated valuation is 4.2 million dollars. Please proceed with the expropriation order." })
      });
      const data = await res.json();
      setAiSummary(data.summary);
    } catch (e) {
      setAiSummary("Error calling AI Orchestrator");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-lg border border-secondary/30 mt-6 max-w-2xl mx-auto mb-8">
      <h3 className="text-secondary font-headline-md mb-2">E2E Integration Test</h3>
      <p className="text-on-surface-variant text-sm mb-4">
        Dossier Service: <span className="text-primary">{backendStatus}</span>
      </p>
      
      <button 
        onClick={testAI}
        disabled={loading}
        className="bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm hover:bg-primary-container/80 transition-colors disabled:opacity-50"
      >
        {loading ? "Generating..." : "Test Gemini AI Summary"}
      </button>

      {aiSummary && (
        <div className="mt-4 p-4 bg-surface-container-low rounded border border-outline-variant/30 text-sm">
          <p className="text-tertiary mb-2 text-xs uppercase">Gemini Output:</p>
          <div className="prose prose-sm prose-invert max-w-none prose-p:text-on-surface prose-strong:text-secondary prose-ul:text-on-surface">
            <ReactMarkdown>{aiSummary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
