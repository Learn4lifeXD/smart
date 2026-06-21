"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useGlobalState, Message } from "@/context/GlobalState";
import { jsPDF } from "jspdf";

export default function ChatPage() {
  const { messages, setMessages } = useGlobalState();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastProcessedId = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === "user" && lastProcessedId.current !== lastMsg.id) {
      lastProcessedId.current = lastMsg.id;
      generateAIResponse(lastMsg.text);
    }
  }, [messages]);

  const generateAIResponse = async (text: string) => {
    setIsLoading(true);
    setAgentStatus("Orchestrator is routing request...");
    try {
      const response = await fetch("/api/v1/ai/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_text: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let finalData = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            const data = JSON.parse(line.replace("data: ", ""));
            if (data.status === "error") {
              throw new Error(data.data);
            } else if (data.status === "complete") {
              finalData = data.data;
              break;
            } else {
              setAgentStatus(data.status);
            }
          }
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: finalData || "No response received.",
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "ai", text: `*Error:* ${err.message}` }]);
    } finally {
      setIsLoading(false);
      setAgentStatus(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedFile({
        name: file.name,
        content: event.target?.result as string,
      });
    };
    reader.readAsText(file);
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const userText = input;
    const fileContext = attachedFile ? `[Attached File: ${attachedFile.name}]\n\n${attachedFile.content}\n\n` : "";
    const fullQuery = fileContext + userText;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText || `Attached file: ${attachedFile?.name}` };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachedFile(null);

    await generateAIResponse(fullQuery);
  };

  const exportToPDF = (text: string, id: string) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 15, 20);
    
    doc.save(`dossier_${id}.pdf`);
  };

  const exportToMD = (text: string, id: string) => {
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dossier_${id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden w-full max-w-[1600px] mx-auto p-gutter gap-8">
      {/* Left Column: Chat Area */}
      <div className="flex flex-col flex-grow min-w-0 bg-surface-container-lowest/30 rounded-xl border border-outline-variant/10 backdrop-blur-sm relative">
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border shadow-lg ${msg.sender === "ai" ? "bg-surface-container border-primary/30" : "bg-surface-container border-outline-variant/30"}`}>
                {msg.sender === "ai" ? (
                  <span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span>
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
                )}
              </div>
              <div className={`glass-panel p-5 rounded-xl border ${msg.sender === "user" ? "border-outline-variant/20 rounded-tr-none" : "border-primary/20 rounded-tl-none"} shadow-xl`}>
                <div className="prose prose-sm prose-invert max-w-none prose-p:text-on-surface prose-strong:text-secondary prose-ul:text-on-surface">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.sender === "ai" && msg.id === "1" && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-outline-variant/30 bg-surface-container-low">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary led-pending"></div>
                    <span className="text-[10px] text-on-surface-variant font-mono uppercase">System Ready</span>
                  </div>
                )}
                
                {/* Export Buttons for AI Messages */}
                {msg.sender === "ai" && (
                  <div className="mt-4 flex gap-3 border-t border-outline-variant/10 pt-3">
                    <button onClick={() => exportToPDF(msg.text, msg.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-high border border-outline-variant/30 hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-colors text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                      Export PDF
                    </button>
                    <button onClick={() => exportToMD(msg.text, msg.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-high border border-outline-variant/30 hover:bg-secondary/20 hover:border-secondary/50 hover:text-secondary transition-colors text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">markdown</span>
                      Export MD
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border shadow-lg bg-surface-container border-primary/30">
                <span className="material-symbols-outlined text-[20px] text-primary animate-pulse">smart_toy</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-primary/20 rounded-tl-none shadow-xl flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150"></div>
                </div>
                {agentStatus && (
                  <div className="border-l border-primary/20 pl-4 py-1">
                    <span className="text-[13px] font-mono text-primary animate-pulse">{agentStatus}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-6 bg-surface border-t border-outline-variant/20 z-10">
          {attachedFile && (
            <div className="mb-3 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-sm animate-in fade-in slide-in-from-bottom-2">
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span className="max-w-[200px] truncate font-medium">{attachedFile.name}</span>
              <button onClick={() => setAttachedFile(null)} className="hover:text-error transition-colors ml-1 flex items-center bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}
          <div className="relative flex gap-4 items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.md,.csv,.json"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-4 text-on-surface-variant hover:text-primary transition-colors flex items-center bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter directive, query dossier, or attach file..."
              className="flex-1 bg-surface-container border border-outline-variant/30 text-on-surface p-4 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-[15px] resize-none"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !attachedFile) || isLoading}
              className="w-[60px] h-[60px] shrink-0 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(136,215,166,0.2)] hover:shadow-[0_0_20px_rgba(136,215,166,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[24px]">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Context Sidebar */}
      <div className="w-[380px] shrink-0 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[24px]">info</span>
          <h2 className="font-headline-md text-[24px] text-on-surface">Dossier Context</h2>
        </div>

        {/* Map Card */}
        <div className="glass-panel border border-outline-variant/20 rounded-xl p-5 relative overflow-hidden group hover:border-secondary/30 transition-colors">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-[10px] text-tertiary uppercase tracking-widest font-mono">Active Target</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary led-pending"></div>
              <span className="text-[10px] text-secondary">Pending Acquisition</span>
            </div>
          </div>
          <h3 className="font-headline-md text-[22px] text-on-surface mb-1 relative z-10">West River Block</h3>
          <p className="text-[12px] font-mono text-on-surface-variant mb-6 relative z-10">ID: DX-77492</p>
          
          {/* Mock Map View */}
          <div className="h-[140px] rounded-lg border border-outline-variant/30 bg-surface-container/50 relative overflow-hidden flex items-end p-3">
            <div className="absolute inset-0 opacity-40">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 Q 50 10 90 50 T 170 50" fill="transparent" stroke="#88d7a6" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                <path d="M0 80 Q 40 40 80 80 T 160 80 T 240 80" fill="transparent" stroke="#3f4942" strokeWidth="0.5" />
                <path d="M20 120 Q 60 80 100 120 T 180 120 T 260 120" fill="transparent" stroke="#3f4942" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="relative z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 backdrop-blur-md">
              <span className="material-symbols-outlined text-[10px] text-primary">my_location</span>
              <span className="text-[9px] text-primary font-mono uppercase tracking-widest">Zone 4B</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4 py-2 border-b border-outline-variant/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">Total Valuation</span>
            <span className="font-label-md text-on-surface text-[15px]">$142.5M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">Total Parcels</span>
            <span className="font-label-md text-on-surface text-[15px]">14 (8 Res, 6 Com)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">Compliance Rate</span>
            <span className="font-label-md text-primary text-[15px]">78%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-on-surface-variant">Deadline</span>
            <span className="font-label-md text-error text-[15px]">14 Days</span>
          </div>
        </div>

        {/* Stakeholders */}
        <div className="pt-2">
          <h4 className="text-[11px] text-tertiary font-mono uppercase tracking-widest mb-4">Primary Stakeholders</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-outline-variant/30 bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">domain</span>
              </div>
              <div>
                <p className="text-sm font-label-md text-on-surface">Apex Logistics Group</p>
                <p className="text-[11px] text-on-surface-variant">Parcel C-7 Owner</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-outline-variant/30 bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">account_balance</span>
              </div>
              <div>
                <p className="text-sm font-label-md text-on-surface">State Infrastructure Bd.</p>
                <p className="text-[11px] text-on-surface-variant">Acquiring Entity</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
