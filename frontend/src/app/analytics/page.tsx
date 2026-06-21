"use client";
import { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("1Y");

  // Mock data based on time range
  const chartData = {
    "1M": [30, 45, 60, 40, 50, 70, 85],
    "1Y": [30, 45, 40, 60, 55, 80, 95],
    "ALL": [10, 20, 35, 50, 70, 85, 100],
  }[timeRange] || [];

  const totalValue = {
    "1M": "$1.2B",
    "1Y": "$4.2B",
    "ALL": "$12.8B"
  }[timeRange];

  const activeDossiers = {
    "1M": "342",
    "1Y": "1,492",
    "ALL": "4,105"
  }[timeRange];
  return (
    <div className="p-gutter flex-grow">
      
<div className="max-w-[1440px] mx-auto">
{/*  Page Header  */}
<div className="mb-section-gap">
<h2 className="font-display-lg text-display-lg text-on-surface mb-2">Analytics Intelligence</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">High-level quantitative overview of expropriation values, timeline efficiencies, and asset distribution across active dossiers.</p>
</div>
{/*  Bento Grid Layout  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/*  KPI Cards  */}
<div className="col-span-1 flex flex-col gap-gutter">
<div className="glass-panel p-6 rounded-lg relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="relative z-10">
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Total Expropriation Value</h3>
<div className="font-display-lg text-display-lg text-secondary gold-glow">{totalValue}</div>
<div className="font-label-md text-label-md text-primary mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
                                    +12.4% vs prev
                                </div>
</div>
</div>
<div className="glass-panel p-6 rounded-lg relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="relative z-10">
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Active Dossiers</h3>
<div className="font-display-lg text-display-lg text-on-surface">{activeDossiers}</div>
<div className="font-label-md text-label-md text-on-surface-variant mt-2 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_5px_#e9c349]"></span>
                                    Pending Review (340)
                                </div>
</div>
</div>
</div>
{/*  Main Chart: Value Trends  */}
<div className="col-span-1 md:col-span-2 glass-panel p-6 rounded-lg flex flex-col">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Expropriation Value Trends</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant">Trailing 12 Months Valuation Trajectory</p>
</div>
<div className="flex gap-2 z-10 relative">
{["1M", "1Y", "ALL"].map((range) => (
  <button 
    key={range}
    onClick={() => setTimeRange(range)}
    className={`px-3 py-1 text-label-sm font-label-sm rounded transition-colors ${
      timeRange === range 
        ? "border border-secondary text-secondary bg-secondary/10 shadow-[0_0_8px_rgba(233,195,73,0.3)]" 
        : "border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline-variant/80"
    }`}
  >
    {range}
  </button>
))}
</div>
</div>
{/*  Pseudo Chart Area  */}
<div className="flex-grow relative min-h-[250px] flex items-end justify-between px-4 chart-gradient border-b border-l border-outline-variant/30 pb-2">
{/*  Y-axis labels  */}
<div className="absolute left-[-40px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-on-surface-variant py-2">
<span>$5B</span>
<span>$2.5B</span>
<span>$0</span>
</div>
{/*  Bars/Lines visualization  */}
{chartData.map((val, idx) => (
  <div key={idx} style={{ height: `${val}%` }} className={`w-8 bg-primary-container/50 relative group transition-all duration-500 ease-out ${idx === chartData.length - 1 ? 'border-t-2 border-secondary bg-primary-container/80' : 'border-t border-primary'}`}>
    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 rounded-full ${idx === chartData.length - 1 ? 'w-3 h-3 bg-secondary shadow-[0_0_8px_#e9c349]' : 'w-2 h-2 bg-secondary hidden group-hover:block gold-glow'}`}></div>
  </div>
))}
{/*  X-axis labels  */}
<div className="absolute -bottom-6 left-0 right-0 flex justify-between px-4 text-[10px] text-on-surface-variant">
<span>Jan</span>
<span>Mar</span>
<span>May</span>
<span>Jul</span>
<span>Sep</span>
<span>Nov</span>
<span>Dec</span>
</div>
</div>
</div>
{/*  Timeline Efficiency  */}
<div className="col-span-1 md:col-span-2 glass-panel p-6 rounded-lg">
<h3 className="font-headline-md text-headline-md text-on-surface mb-6">Succession Timeline Efficiency</h3>
<div className="space-y-6">
{/*  Progress Bar 1  */}
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-2">
<span className="text-on-surface">Initial Assessment Phase</span>
<span className="text-primary">Avg. 14 Days</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
<div className="h-full bg-primary w-[85%] relative">
<div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-secondary"></div>
</div>
</div>
</div>
{/*  Progress Bar 2  */}
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-2">
<span className="text-on-surface">Valuation &amp; Audit</span>
<span className="text-secondary">Avg. 45 Days</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
<div className="h-full bg-secondary w-[60%] relative">
<div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-primary"></div>
</div>
</div>
</div>
{/*  Progress Bar 3  */}
<div>
<div className="flex justify-between font-label-sm text-label-sm mb-2">
<span className="text-on-surface">Final Expropriation Decree</span>
<span className="text-on-surface-variant">Avg. 21 Days</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high rounded overflow-hidden">
<div className="h-full bg-surface-variant w-[30%] border border-outline-variant"></div>
</div>
</div>
</div>
</div>
{/*  Asset Distribution Donut  */}
<div className="col-span-1 glass-panel p-6 rounded-lg flex flex-col items-center justify-center">
<h3 className="font-headline-md text-headline-md text-on-surface w-full text-left mb-6">Asset Distribution</h3>
{/*  CSS Donut Chart representation  */}
<div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6" style={{ background: "conic-gradient(#88d7a6 0% 45%, #e9c349 45% 75%, #353534 75% 100%)" }}>
<div className="w-36 h-36 bg-[#1a1a1a] rounded-full absolute flex flex-col items-center justify-center">
<span className="font-display-lg text-display-lg text-on-surface">100<span className="text-[20px]">%</span></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Allocated</span>
</div>
</div>
<div className="w-full space-y-3">
<div className="flex justify-between items-center font-label-sm text-label-sm">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded bg-primary"></div>
<span className="text-on-surface">Commercial Real Estate</span>
</div>
<span className="text-on-surface-variant">45%</span>
</div>
<div className="flex justify-between items-center font-label-sm text-label-sm">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded bg-secondary"></div>
<span className="text-on-surface">Industrial Land</span>
</div>
<span className="text-on-surface-variant">30%</span>
</div>
<div className="flex justify-between items-center font-label-sm text-label-sm">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded bg-surface-variant border border-outline-variant"></div>
<span className="text-on-surface">Agricultural</span>
</div>
<span className="text-on-surface-variant">25%</span>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
}
