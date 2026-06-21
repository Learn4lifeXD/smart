export default function DossiersPage() {
  return (
    <div className="p-gutter flex-grow flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] mx-auto">
      
{/*  Center Content: Dossier Timeline & Documents  */}
<div className="flex-1 flex flex-col gap-10">
{/*  Dossier Header Panel  */}
<section className="glass-panel rounded-xl p-8 relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
<div className="flex justify-between items-start mb-6">
<div>
<div className="flex items-center gap-3 mb-2">
<span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(233,195,73,0.8)]"></span>
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Active Dossier</span>
</div>
<h2 className="font-display-lg text-display-lg text-on-surface">DX-77492: West River Block</h2>
<p className="font-body-lg text-body-lg text-tertiary mt-2">Commercial Expropriation &amp; Redevelopment</p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-outline mb-1">Target Valuation</p>
<p className="font-headline-md text-headline-md text-primary">$42,500,000</p>
</div>
</div>
<div className="champagne-gradient-line mb-6"></div>
{/*  High-fidelity Stepper  */}
<div className="relative pt-4 pb-2">
<div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 -z-10 -translate-y-1/2"></div>
<div className="absolute top-1/2 left-0 w-[60%] h-[1px] bg-secondary -z-10 -translate-y-1/2 shadow-[0_0_10px_rgba(233,195,73,0.5)]"></div>
<div className="flex justify-between relative z-0">
{/*  Step 1 (Completed)  */}
<div className="flex flex-col items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[14px] text-secondary">check</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary">Initiation</span>
</div>
{/*  Step 2 (Completed)  */}
<div className="flex flex-col items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[14px] text-secondary">check</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary">Appraisal</span>
</div>
{/*  Step 3 (Active)  */}
<div className="flex flex-col items-center gap-2">
<div className="w-8 h-8 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center shadow-[0_0_15px_rgba(233,195,73,0.3)]">
<span className="w-2 h-2 bg-secondary rounded-full"></span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">Legal Review</span>
</div>
{/*  Step 4 (Pending)  */}
<div className="flex flex-col items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container border-2 border-outline-variant flex items-center justify-center">
</div>
<span className="font-label-sm text-label-sm text-outline">Negotiation</span>
</div>
{/*  Step 5 (Pending)  */}
<div className="flex flex-col items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container border-2 border-outline-variant flex items-center justify-center">
</div>
<span className="font-label-sm text-label-sm text-outline">Transfer</span>
</div>
</div>
</div>
</section>
{/*  Uploaded Documents  */}
<div>
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md text-on-surface">Dossier Documents</h3>
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center gap-1">
                        View Archive <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Doc 1  */}
<div className="glass-card-active rounded-xl p-5 cursor-pointer group">
<div className="flex items-start justify-between mb-4">
<div className="w-10 h-10 rounded bg-primary-container/30 flex items-center justify-center text-primary border border-primary/20">
<span className="material-symbols-outlined">description</span>
</div>
<span className="text-xs font-mono text-tertiary px-2 py-1 bg-surface-container-high rounded border border-outline-variant/30">PDF</span>
</div>
<h4 className="font-label-md text-label-md text-on-surface mb-1 group-hover:text-secondary transition-colors">Property Deed</h4>
<p className="font-body-md text-sm text-outline mb-4">Verified original copy. Scanned 12 Oct.</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center">
<span className="material-symbols-outlined text-[12px] text-primary">verified_user</span>
</div>
<span className="font-label-sm text-[10px] text-tertiary">Verified by Legal</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary">download</span>
</div>
</div>
{/*  Doc 2  */}
<div className="glass-card-active rounded-xl p-5 cursor-pointer group">
<div className="flex items-start justify-between mb-4">
<div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-tertiary border border-outline-variant/30">
<span className="material-symbols-outlined">landscape</span>
</div>
<span className="text-xs font-mono text-tertiary px-2 py-1 bg-surface-container-high rounded border border-outline-variant/30">GEO</span>
</div>
<h4 className="font-label-md text-label-md text-on-surface mb-1 group-hover:text-secondary transition-colors">Environmental Survey</h4>
<p className="font-body-md text-sm text-outline mb-4">Phase II impact assessment data.</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-[10px] text-tertiary">Requires Review</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary">download</span>
</div>
</div>
{/*  Doc 3  */}
<div className="glass-card-active rounded-xl p-5 cursor-pointer group md:col-span-2 lg:col-span-1">
<div className="flex items-start justify-between mb-4">
<div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/30">
<span className="material-symbols-outlined">request_quote</span>
</div>
<span className="text-xs font-mono text-tertiary px-2 py-1 bg-surface-container-high rounded border border-outline-variant/30">XLSX</span>
</div>
<h4 className="font-label-md text-label-md text-on-surface mb-1 group-hover:text-secondary transition-colors">Compensation Appraisal</h4>
<p className="font-body-md text-sm text-outline mb-4">Independent valuation metrics.</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span className="font-label-sm text-[10px] text-tertiary">Finalized</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary">download</span>
</div>
</div>
</div>
</div>
</div>
{/*  Right Panel: AI Intelligence Sidebar  */}
<aside className="w-full xl:w-96 flex-shrink-0 flex flex-col gap-6 h-[calc(100vh-140px)] sticky top-28">
{/*  AI Header / Orb Container  */}
<div className="glass-panel rounded-xl overflow-hidden relative border-t-2 border-t-primary/50">
<div className="h-40 w-full relative bg-surface-container-lowest/80 flex items-center justify-center overflow-hidden">
{/*  Background ambient glow  */}
<div className="absolute w-32 h-32 bg-primary/20 blur-[40px] rounded-full"></div>
{/*  3D AI Orb Embedded  */}
<div className="relative w-full h-full z-10 flex items-center justify-center">
{/*  STITCH_THREEJS_START:ANIMATION_4 className="absolute inset-0 w-full h-full"  */}
<div className="absolute inset-0 w-full h-full" >

<div id="threejs-container-ANIMATION_4" ></div>

</div>
{/*  STITCH_THREEJS_END:ANIMATION_4  */}
</div>
<div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(136,215,166,0.8)] animate-pulse"></span>
<span className="font-label-sm text-[10px] uppercase tracking-wider text-primary">Intelligence Active</span>
</div>
</div>
<div className="p-5 border-t border-outline-variant/30 bg-surface-container-low/60">
<h3 className="font-headline-md text-lg text-on-surface mb-1">Property Intelligence</h3>
<p className="font-body-md text-sm text-tertiary">Analyzing DX-77492 Legal Framework</p>
</div>
</div>
{/*  AI Chat / Summary Area  */}
<div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden relative">
<div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
{/*  System Message  */}
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center flex-shrink-0 mt-1">
<span className="material-symbols-outlined text-[16px] text-secondary">memory</span>
</div>
<div className="bg-surface-container-highest/50 rounded-lg rounded-tl-none p-4 border border-outline-variant/20">
<p className="font-label-sm text-xs text-secondary mb-2 uppercase tracking-wide">Automated Summary</p>
<p className="font-body-md text-sm text-tertiary leading-relaxed">
                                Reviewing the <span className="text-primary cursor-pointer hover:underline">Compensation Appraisal</span> against zoning statutes indicates a <strong className="text-on-surface font-semibold">12% undervaluation risk</strong> due to recent municipal re-classifications on bordering plots.
                            </p>
</div>
</div>
</div>
{/*  Action Area  */}
<div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-md">
<a href="/chat" className="w-full flex items-center justify-center gap-2 bg-primary-container/30 hover:bg-primary-container text-primary hover:text-on-primary-container py-3 rounded-lg border border-primary/20 transition-colors font-label-md">
<span className="material-symbols-outlined text-[18px]">forum</span>
Open Intelligence Chat
</a>
</div>
</div>
</aside>

    </div>
  );
}
