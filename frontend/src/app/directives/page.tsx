"use client";

import { useState } from "react";

export default function DirectivesPage() {
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [showAllMandates, setShowAllMandates] = useState(false);

  const handleArchive = () => {
    setIsArchiving(true);
    setTimeout(() => {
      setIsArchiving(false);
      alert("All completed mandates have been moved to the secure cold-storage archive.");
    }, 1500);
  };
  return (
    <div className="p-gutter flex-grow flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] mx-auto">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-2">Sovereign Mandates</h1>
            <p className="font-body-md text-sm text-on-surface-variant max-w-lg">
              Executive High-Command Interface. Issuance, tracking, and enforcement of top-tier policy directives.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleArchive}
              disabled={isArchiving}
              className="px-6 py-2 rounded border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className={`material-symbols-outlined text-[18px] ${isArchiving ? 'animate-spin' : ''}`}>
                {isArchiving ? 'sync' : 'archive'}
              </span>
              {isArchiving ? 'Archiving...' : 'Archive'}
            </button>
            <button 
              onClick={() => setShowDraftModal(true)}
              className="px-6 py-2 rounded bg-primary-container border border-primary/50 text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors font-label-md flex items-center gap-2 shadow-[0_0_15px_rgba(136,215,166,0.15)] hover:shadow-[0_0_25px_rgba(136,215,166,0.3)]">
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              Draft Mandate
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-primary">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Active Orders</span>
            </div>
            <p className="font-display-lg text-[48px] text-primary mb-2">12</p>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-body-md text-[11px]">+3 this quarter</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-secondary">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Pending Approvals</span>
            </div>
            <p className="font-display-lg text-[48px] text-secondary mb-2">04</p>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">signature</span>
              <span className="font-body-md text-[11px]">Requires Executive Sig.</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-outline-variant">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">Compliance Rate</span>
            </div>
            <p className="font-display-lg text-[48px] text-on-surface mb-2">99.8%</p>
            <div className="flex items-center gap-1 text-outline">
              <span className="font-body-md text-[11px]">Across all territories</span>
            </div>
          </div>
        </div>

        {/* Operational Mandates List */}
        <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col">
          <div className="p-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">format_list_bulleted</span>
              <h2 className="font-headline-md text-lg text-on-surface">Operational Mandates</h2>
            </div>
            <div className="flex items-center gap-2 text-tertiary">
              <button className="hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">filter_list</span></button>
              <button className="hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="p-5 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors group cursor-pointer flex gap-5">
              <div className="w-10 h-10 shrink-0 rounded bg-secondary/10 flex items-center justify-center border border-secondary/20 mt-1">
                <span className="material-symbols-outlined text-secondary text-[20px]">gavel</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-label-md text-xs text-secondary">ORD-77492-X</span>
                  <span className="px-1.5 py-0.5 rounded bg-error/10 text-error border border-error/20 font-mono text-[9px] uppercase tracking-wider">Urgent</span>
                </div>
                <h3 className="font-headline-md text-[17px] text-on-surface mb-2 group-hover:text-secondary transition-colors">Priority Acquisition: Northern Sector</h3>
                <div className="flex items-center gap-4 text-outline font-body-md text-xs">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">account_circle</span>High Chancellor</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span>Issued: Today</div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-5 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors group cursor-pointer flex gap-5">
              <div className="w-10 h-10 shrink-0 rounded bg-primary/10 flex items-center justify-center border border-primary/20 mt-1">
                <span className="material-symbols-outlined text-primary text-[20px]">security</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-label-md text-xs text-primary">DIR-88104-B</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono text-[9px] uppercase tracking-wider">In Progress</span>
                </div>
                <h3 className="font-headline-md text-[17px] text-on-surface mb-2 group-hover:text-primary transition-colors">Asset Reallocation Protocol Beta</h3>
                <div className="flex items-center gap-4 text-outline font-body-md text-xs">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">account_balance</span>Dept. of Expropriation</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span>Issued: Oct 12</div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-5 hover:bg-surface-container-high/30 transition-colors group cursor-pointer flex gap-5 opacity-70">
              <div className="w-10 h-10 shrink-0 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant/30 mt-1">
                <span className="material-symbols-outlined text-outline text-[20px]">task_alt</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-label-md text-xs text-outline">MAN-11029-C</span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-outline font-mono text-[9px] uppercase tracking-wider">Completed</span>
                </div>
                <h3 className="font-headline-md text-[17px] text-on-surface mb-2 line-through decoration-outline/50">Suborbital Defense Grid Integration</h3>
                <div className="flex items-center gap-4 text-outline font-body-md text-xs">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">military_tech</span>Imperial Command</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">event_available</span>Closed: Oct 01</div>
                </div>
              </div>
            </div>
            {/* Hidden items (only shown if showAllMandates is true) */}
            {showAllMandates && (
              <>
                <div className="p-5 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors group cursor-pointer flex gap-5">
                  <div className="w-10 h-10 shrink-0 rounded bg-secondary/10 flex items-center justify-center border border-secondary/20 mt-1">
                    <span className="material-symbols-outlined text-secondary text-[20px]">account_balance</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-label-md text-xs text-secondary">DIR-88221-A</span>
                      <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 font-mono text-[9px] uppercase tracking-wider">Pending Legal</span>
                    </div>
                    <h3 className="font-headline-md text-[17px] text-on-surface mb-2 group-hover:text-secondary transition-colors">Treaty Override Clearance</h3>
                    <div className="flex items-center gap-4 text-outline font-body-md text-xs">
                      <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">account_circle</span>Dept of Compliance</div>
                      <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span>Issued: Oct 10</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest/50 flex justify-center">
            <button 
              onClick={() => setShowAllMandates(!showAllMandates)}
              className="px-6 py-2 border border-on-surface rounded text-[11px] font-label-md text-secondary hover:bg-surface-container-highest transition-colors uppercase tracking-wider">
              {showAllMandates ? "HIDE ARCHIVED MANDATES" : "VIEW ALL MANDATES"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Context Sidebar */}
      <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-6">
        
        {/* Directive Progression */}
        <div className="glass-panel rounded-xl p-6 border border-outline-variant/20">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-[24px]">timeline</span>
            <h3 className="font-headline-md text-xl text-on-surface">Directive Progression</h3>
          </div>

          <div className="relative pl-6 flex flex-col gap-8">
            {/* Timeline Line */}
            <div className="absolute top-2 bottom-2 left-[7px] w-[2px] bg-outline-variant/30"></div>

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-[14px] h-[14px] rounded-full bg-surface-container border-2 border-secondary flex items-center justify-center shadow-[0_0_8px_rgba(233,195,73,0.4)]">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
              </div>
              <h4 className="font-label-sm text-[11px] text-secondary uppercase tracking-widest mb-1">Drafting</h4>
              <p className="font-body-md text-sm text-on-surface">Initial formulation of policy scope.</p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1 w-[14px] h-[14px] rounded-full bg-surface-container border-2 border-primary flex items-center justify-center shadow-[0_0_8px_rgba(136,215,166,0.4)]">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              </div>
              <h4 className="font-label-sm text-[11px] text-primary uppercase tracking-widest mb-1">Legal Review</h4>
              <p className="font-body-md text-sm text-on-surface mb-3">Compliance check against Sovereign Code.</p>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-high border border-outline-variant/50">
                <span className="material-symbols-outlined text-[12px] text-outline">schedule</span>
                <span className="text-[10px] text-outline font-mono">Pending Sign-off (Dept 4)</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative opacity-50">
              <div className="absolute -left-[30px] top-1 w-[14px] h-[14px] rounded-full bg-surface-container border-2 border-outline-variant flex items-center justify-center"></div>
              <h4 className="font-label-sm text-[11px] text-outline uppercase tracking-widest mb-1">Executive Signature</h4>
              <p className="font-body-md text-sm text-outline">Final authorization by High Command.</p>
            </div>

            {/* Step 4 */}
            <div className="relative opacity-50">
              <div className="absolute -left-[30px] top-1 w-[14px] h-[14px] rounded-full bg-surface-container border-2 border-outline-variant flex items-center justify-center"></div>
              <h4 className="font-label-sm text-[11px] text-outline uppercase tracking-widest mb-1">Disseminated</h4>
              <p className="font-body-md text-sm text-outline">Enforcement protocol initiated globally.</p>
            </div>
          </div>
        </div>

        {/* Legislative Compliance */}
        <div className="glass-panel rounded-xl p-6 border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline-md text-xl text-on-surface">Legislative<br/>Compliance</h3>
            <span className="material-symbols-outlined text-secondary text-[24px]">account_balance</span>
          </div>
          <p className="font-body-md text-sm text-outline leading-relaxed mb-6">
            All directives must adhere to the Sovereign Expropriation Act of 2042. Authority clearance is restricted to Tier 1 Executives.
          </p>
          
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
              <span className="font-label-md text-xs text-on-surface">Code Sec. 4A - Asset Seizure</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
              <span className="font-label-md text-xs text-on-surface">Protocol Delta - Rapid Deployment</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <span className="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span>
              <span className="font-label-md text-xs text-outline">Treaty Override Clearance (Pending)</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Retrieving secure documents...\n\nSovereign Expropriation Act of 2042 (Code Sec. 4A): Full text has been securely sent to your local terminal for offline review.")}
            className="w-full flex items-center justify-center gap-2 py-3 border border-on-surface rounded hover:bg-surface-container transition-colors text-sm font-label-md text-on-surface">
            View Full Regulatory Basis <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>

      </div>

      {/* Draft Mandate Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-panel p-8 rounded-xl border-t-2 border-t-primary max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setShowDraftModal(false)}
              className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">post_add</span>
              <h2 className="font-headline-md text-2xl text-on-surface">Draft Executive Mandate</h2>
            </div>
            
            <p className="font-body-md text-tertiary mb-6">
              Initiate a new Sovereign Directive. All drafts require Tier 1 Executive clearance and subsequent legal review before global dissemination.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div>
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider mb-2 block">Directive Title</label>
                <input type="text" className="w-full bg-surface-container border border-outline-variant rounded p-3 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Asset Seizure Protocol" />
              </div>
              <div>
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider mb-2 block">Priority Classification</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded p-3 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors appearance-none">
                  <option>Standard Review</option>
                  <option>Expedited (48 Hours)</option>
                  <option>URGENT (Override)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDraftModal(false)} className="px-6 py-2 rounded border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-label-md">
                Cancel
              </button>
              <button onClick={() => {
                alert("New Mandate securely drafted and sent to Legal Review queue.");
                setShowDraftModal(false);
              }} className="px-6 py-2 rounded bg-primary text-on-primary hover:bg-primary-fixed transition-colors font-label-md shadow-[0_0_15px_rgba(136,215,166,0.2)]">
                Submit Draft
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
