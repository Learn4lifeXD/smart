"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ThreeDMap from "@/components/ThreeDMap";

export default function TopographyPage() {
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showUtilities, setShowUtilities] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const prompt = "Generate a short, highly professional, executive summary topography report for Parcel 84-A.9. Bedrock depth is 14.5m, soil stability 0.92, water table nominal, area 14.2 hectares, commercial R3 zoning.";
      const res = await fetch("/api/v1/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_text: prompt })
      });
      const data = await res.json();
      setReportText(data.summary || "Report generated successfully.");
      setShowModal(true);
    } catch (err) {
      setReportText("Error generating report. Please check AI connection.");
      setShowModal(true);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="p-gutter flex-grow flex flex-col h-full min-h-[calc(100vh-80px)]">
      
{/*  Interactive Map Area  */}
<div className="flex-1 relative overflow-hidden bg-surface print:hidden min-h-[500px] rounded-xl border border-outline-variant/30">
{/*  Simulated Map Image Layer  */}
<ThreeDMap />
{/*  Map Overlays / Property Highlights  */}
<svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 1000">
{showBoundaries && (
  <>
    {/*  Selected Parcel  */}
    <path className="animate-pulse" d="M450,300 L600,280 L650,450 L500,500 Z" fill="rgba(136, 215, 166, 0.1)" stroke="#e9c349" strokeWidth="2"  />
    {/*  Adjacent Parcels  */}
    <path d="M300,320 L450,300 L500,500 L350,550 Z" fill="transparent" stroke="rgba(233, 195, 73, 0.4)" strokeWidth="1" />
    <path d="M600,280 L750,250 L800,400 L650,450 Z" fill="transparent" stroke="rgba(233, 195, 73, 0.4)" strokeWidth="1" />
    <path d="M650,450 L800,400 L850,550 L700,600 Z" fill="transparent" stroke="rgba(233, 195, 73, 0.4)" strokeWidth="1" />
  </>
)}
{showUtilities && (
  <>
    {/*  Infrastructure / Grid Lines  */}
    <path d="M0,400 Q500,450 1000,350" fill="transparent" stroke="rgba(136, 215, 166, 0.8)" strokeDasharray="4,4" strokeWidth="1.5" />
    <path d="M400,0 Q450,500 300,1000" fill="transparent" stroke="rgba(136, 215, 166, 0.8)" strokeDasharray="4,4" strokeWidth="1.5" />
    <path d="M200,800 Q700,700 900,900" fill="transparent" stroke="rgba(233, 195, 73, 0.8)" strokeDasharray="2,2" strokeWidth="1.5" />
  </>
)}
</svg>

{/*  Map Controls  */}
<div className="absolute right-gutter top-gutter flex flex-col gap-2 z-10">
<div className="glass-panel rounded border border-outline-variant/30 flex flex-col overflow-hidden">
<button className="p-3 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/50 transition-colors border-b border-outline-variant/30">
<span className="material-symbols-outlined text-[20px]">add</span>
</button>
<button className="p-3 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/50 transition-colors">
<span className="material-symbols-outlined text-[20px]">remove</span>
</button>
</div>
<button className="glass-panel p-3 rounded border border-outline-variant/30 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/50 transition-colors mt-2">
<span className="material-symbols-outlined text-[20px]">my_location</span>
</button>
<button className="glass-panel p-3 rounded border border-outline-variant/30 text-on-surface-variant hover:text-secondary hover:bg-surface-bright/50 transition-colors">
<span className="material-symbols-outlined text-[20px]">layers</span>
</button>
</div>
{/*  Coordinate Readout  */}
<div className="absolute bottom-gutter left-gutter glass-panel px-4 py-2 border border-outline-variant/30 rounded font-label-sm text-label-sm text-tertiary font-mono flex items-center gap-4">
<span>LAT: 40.7128° N</span>
<span className="text-outline-variant">|</span>
<span>LON: 74.0060° W</span>
<span className="text-outline-variant">|</span>
<span className="text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">satellite_alt</span> SGNL: LOCK</span>
</div>
</div>
{/*  Geospatial Intelligence Side Panel  */}
<div className="absolute right-0 top-0 bottom-0 w-[420px] glass-panel border-l-[0.5px] border-secondary/20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-20 flex flex-col transform translate-x-0 transition-transform duration-500 ease-in-out">
{/*  Panel Header  */}
<div className="p-6 border-b border-secondary/20 relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/50 via-primary/50 to-transparent"></div>
<div className="flex justify-between items-start mb-4">
<div>
<div className="flex items-center gap-2 mb-2">
<div className="status-dot-active"></div>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Target Acquired</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Parcel 84-A.9</h2>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="gold-gradient-line mt-4 opacity-50"></div>
</div>
{/*  Panel Content (Scrollable)  */}
<div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
{/*  Quick Stats Bento  */}
<div className="grid grid-cols-2 gap-4">
<div className="glass-card-active p-4 rounded flex flex-col justify-between h-24">
<span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Area</span>
<div className="flex items-end gap-1">
<span className="font-headline-md text-headline-md text-secondary">14.2</span>
<span className="font-label-sm text-label-sm text-on-surface-variant mb-1">Hectares</span>
</div>
</div>
<div className="glass-panel p-4 rounded border border-outline-variant/20 flex flex-col justify-between h-24 hover:bg-surface-bright/20 transition-colors cursor-pointer">
<span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Zoning</span>
<span className="font-body-md text-body-md text-on-surface font-medium">Commercial / R3</span>
</div>
</div>
{/*  Elevation Profile  */}
<div>
<h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">terrain</span>
                        Elevation Profile
                    </h3>
<div className="glass-panel border border-outline-variant/20 rounded p-4 relative h-32 flex items-end justify-between">
{/*  Abstract Elevation Chart CSS/SVG  */}
<div className="absolute inset-0 p-4 pb-2 opacity-50">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
<path d="M0,50 L0,30 Q25,20 50,40 T100,10 L100,50 Z" fill="url(#elev-grad)" />
<path d="M0,30 Q25,20 50,40 T100,10" fill="transparent" stroke="#88d7a6" strokeWidth="1" />
<defs>
<linearGradient id="elev-grad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="rgba(136, 215, 166, 0.4)"></stop>
<stop offset="100%" stopColor="rgba(136, 215, 166, 0)"></stop>
</linearGradient>
</defs>
</svg>
</div>
<div className="relative z-10 w-full flex justify-between font-label-sm text-label-sm text-tertiary border-t border-outline-variant/30 pt-1 mt-auto">
<span>0m</span>
<span>Peak: 420m</span>
<span>1km</span>
</div>
</div>
</div>
{/*  Soil & Substrate  */}
<div>
<h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">landscape</span>
                        Substrate Analysis
                    </h3>
<div className="space-y-3">
{/*  Stat Row  */}
<div className="group flex items-center justify-between p-3 rounded hover:bg-surface-bright/30 transition-all border-l-2 border-transparent hover:border-primary">
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Bedrock Depth</span>
<span className="font-body-md text-body-md text-primary">14.5m</span>
</div>
<div className="group flex items-center justify-between p-3 rounded hover:bg-surface-bright/30 transition-all border-l-2 border-transparent hover:border-primary">
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Soil Stability Index</span>
<span className="font-body-md text-body-md text-secondary">0.92 / 1.0</span>
</div>
<div className="group flex items-center justify-between p-3 rounded hover:bg-surface-bright/30 transition-all border-l-2 border-transparent hover:border-primary">
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Water Table</span>
<span className="font-body-md text-body-md text-on-surface">Nominal</span>
</div>
</div>
</div>
{/*  Overlays Toggles  */}
<div>
<h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">layers</span>
                        Active Overlays
                    </h3>
<div className="space-y-2">
<label className={`flex items-center justify-between p-3 glass-panel border rounded cursor-pointer transition-all ${showBoundaries ? 'border-secondary/30' : 'border-outline-variant/20 opacity-70 hover:opacity-100'}`}>
<span className={`font-body-md text-body-md ${showBoundaries ? 'text-on-surface' : 'text-on-surface-variant'}`}>Expropriation Boundaries</span>
<div className="relative w-10 h-5" onClick={() => setShowBoundaries(!showBoundaries)}>
  <div className={`absolute inset-0 rounded-full transition-colors ${showBoundaries ? 'bg-primary/20 border border-primary/50' : 'bg-surface-bright border border-outline-variant'}`}></div>
  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${showBoundaries ? 'right-1 bg-primary shadow-[0_0_5px_#88d7a6]' : 'left-1 bg-tertiary'}`}></div>
</div>
</label>
<label className={`flex items-center justify-between p-3 glass-panel border rounded cursor-pointer transition-all ${showUtilities ? 'border-secondary/30' : 'border-outline-variant/20 opacity-70 hover:opacity-100'}`}>
<span className={`font-body-md text-body-md ${showUtilities ? 'text-on-surface' : 'text-on-surface-variant'}`}>Underground Utilities</span>
<div className="relative w-10 h-5" onClick={() => setShowUtilities(!showUtilities)}>
  <div className={`absolute inset-0 rounded-full transition-colors ${showUtilities ? 'bg-primary/20 border border-primary/50' : 'bg-surface-bright border border-outline-variant'}`}></div>
  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${showUtilities ? 'right-1 bg-primary shadow-[0_0_5px_#88d7a6]' : 'left-1 bg-tertiary'}`}></div>
</div>
</label>
</div>
</div>
</div>
{/*  Panel Footer Action  */}
<div className="p-6 border-t border-secondary/10 bg-surface-container-lowest/50">
<button 
  onClick={generateReport}
  disabled={isGenerating}
  className="w-full bg-surface-container-high border border-secondary text-secondary font-label-md text-label-md py-3 rounded hover:bg-secondary/10 transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(233,195,73,0.1)] disabled:opacity-50 disabled:cursor-not-allowed">
  {isGenerating ? 'Generating via AI...' : 'Generate Topography Report'}
</button>
</div>
</div>

{/* Report Modal */}
{showModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden">
    <div className="glass-panel max-w-2xl w-full rounded-xl border border-secondary/30 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-headline-md font-headline-md text-secondary tracking-tight">Geospatial Topography Report</h2>
        <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-error transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="prose prose-invert max-w-none mb-8 text-on-surface text-sm prose-p:text-on-surface prose-strong:text-secondary">
        <ReactMarkdown>{reportText}</ReactMarkdown>
      </div>
      <div className="flex justify-end gap-4 print:hidden">
        <button onClick={() => setShowModal(false)} className="px-6 py-2 rounded border border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors">Close</button>
        <button onClick={() => window.print()} className="px-6 py-2 rounded bg-primary-container text-on-primary-container hover:bg-primary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export PDF
        </button>
      </div>
    </div>
  </div>
)}

{/* Hidden Print-Only Document */}
<div className="hidden print:block absolute inset-0 bg-white z-[99999] p-12 text-black w-full min-h-screen">
  <div className="max-w-4xl mx-auto">
    <div className="border-b-2 border-black pb-4 mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold mb-2">Expropriation Authority</h1>
        <h2 className="text-xl text-gray-700">Official Topography Report</h2>
      </div>
      <div className="text-sm text-gray-500 font-mono">
        REF: {new Date().getTime()}-84A9<br/>
        DATE: {new Date().toLocaleDateString()}
      </div>
    </div>
    
    <div className="prose max-w-none prose-p:text-black prose-strong:text-black prose-headings:text-black">
      <ReactMarkdown>{reportText}</ReactMarkdown>
    </div>
    
    <div className="mt-24 pt-8 border-t border-gray-300 grid grid-cols-2 gap-8">
      <div>
        <div className="h-16 border-b border-black mb-2"></div>
        <p className="text-sm font-semibold text-gray-600 uppercase">Authorized Signature</p>
      </div>
      <div>
        <div className="h-16 border-b border-black mb-2"></div>
        <p className="text-sm font-semibold text-gray-600 uppercase">Official Seal</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}