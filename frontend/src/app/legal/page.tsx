export default function LegalPage() {
  return (
    <div className="p-gutter flex-grow flex flex-col lg:flex-row gap-gutter">
      
{/*  Left Pane: Regulatory Framework  */}
<section className="flex-1 glass-panel rounded-xl border border-outline-variant/30 flex flex-col overflow-hidden atmospheric-shadow relative">
{/*  3D Abstract Background Hint  */}
<div className="absolute inset-0 opacity-10 pointer-events-none" data-alt="Abstract 3D topographical mesh rendering in deep obsidian with faint champagne gold refractions, high-end dark mode, conveying legal and land structures subtly." ></div>

<div className="flex-1 overflow-y-auto p-4 relative z-10">
<div className="flex flex-col gap-2">
{/*  Item 1: Verified  */}
<div className="p-4 rounded-lg list-row-hover cursor-pointer border border-transparent transition-all group flex items-start gap-4">
<div className="mt-1">
<span className="material-symbols-outlined text-secondary" >workspace_premium</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-center mb-1">
<h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Statute 402.B: Eminent Domain Criteria</h3>
<span className="font-label-sm text-label-sm px-2 py-1 bg-surface-container rounded text-secondary border border-secondary/20">Verified</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">Mandates a minimum 90-day notice period and independent appraisal prior to issuing initial tender offers for commercial properties.</p>
<div className="mt-2 flex gap-2">
<span className="text-xs text-outline font-label-sm">Ref: ED-2023-V1</span>
<span className="text-xs text-outline font-label-sm border-l border-outline-variant pl-2">Federal</span>
</div>
</div>
</div>
{/*  Item 2: Warning  */}
<div className="p-4 rounded-lg list-row-hover cursor-pointer border border-transparent transition-all group flex items-start gap-4">
<div className="mt-1">
<span className="material-symbols-outlined text-outline">gavel</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-center mb-1">
<h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Zoning Ord. 11-A: Historic Preservation</h3>
<span className="font-label-sm text-label-sm px-2 py-1 bg-error-container/20 rounded text-error border border-error/20">Review Required</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">Prohibits alteration of facade structures predating 1950 without explicit clearance from the Heritage Council.</p>
<div className="mt-2 flex gap-2">
<span className="text-xs text-outline font-label-sm">Ref: ZO-11A-Rev3</span>
<span className="text-xs text-outline font-label-sm border-l border-outline-variant pl-2">Municipal</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Right Pane: Compliance Audit  */}
<section className="flex-1 glass-panel-active rounded-xl flex flex-col overflow-hidden atmospheric-shadow relative">

<div className="flex-1 overflow-y-auto p-6 bg-surface-container-low/30">
<div className="space-y-6">
{/*  Log Entry 1  */}
<div className="flex gap-4">
<div className="flex flex-col items-center">
<div className="w-6 h-6 rounded-full bg-primary-container/30 border border-primary flex items-center justify-center mt-1">
<span className="material-symbols-outlined text-[14px] text-primary">check</span>
</div>
<div className="w-[1px] h-full bg-outline-variant/50 mt-2"></div>
</div>
<div className="flex-1 pb-4">
<div className="flex justify-between items-baseline mb-2">
<h4 className="font-label-md text-label-md text-on-surface">Notice Period Verification</h4>
<span className="font-label-sm text-label-sm text-outline">10:42 AM</span>
</div>
<div className="bg-surface-container-high/50 p-3 rounded border border-outline-variant/30">
<p className="font-body-md text-body-md text-sm text-on-surface-variant">System confirms draft tender notice implies 94-day window, satisfying <span className="text-secondary cursor-pointer hover:underline">Statute 402.B</span> requirements.</p>
</div>
</div>
</div>
{/*  Log Entry 2  */}
<div className="flex gap-4">
<div className="flex flex-col items-center">
<div className="w-6 h-6 rounded-full bg-secondary-container/30 border border-secondary flex items-center justify-center mt-1">
<div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_5px_rgba(233,195,73,0.5)]"></div>
</div>
<div className="w-[1px] h-full bg-outline-variant/50 mt-2"></div>
</div>
<div className="flex-1 pb-4">
<div className="flex justify-between items-baseline mb-2">
<h4 className="font-label-md text-label-md text-on-surface">Appraisal Authenticity Check</h4>
<span className="font-label-sm text-label-sm text-outline">10:45 AM</span>
</div>
<div className="bg-surface-container-high/50 p-3 rounded border border-outline-variant/30">
<p className="font-body-md text-body-md text-sm text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary animate-spin">sync</span>
                                        Cross-referencing signature hashes with National Assessor Registry...
                                    </p>
</div>
</div>
</div>
</div>
</div>
</section>

    </div>
  );
}