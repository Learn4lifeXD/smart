export default function CompliancePage() {
  return (
    <div className="p-gutter flex-grow flex flex-col gap-8 w-full max-w-[1600px] mx-auto">
      
      {/* Top Section: Header & Top Nav */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="font-display-lg text-4xl text-primary tracking-tight mb-1">Sovereign</h1>
          <h1 className="font-display-lg text-4xl text-primary tracking-tight">Compliance</h1>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-8">
          {/* Top Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="font-label-md text-sm text-on-surface hover:text-primary transition-colors">Directives</a>
            <a href="#" className="font-label-md text-sm text-on-surface hover:text-primary transition-colors">Frameworks</a>
            <a href="#" className="font-label-md text-sm text-on-surface hover:text-primary transition-colors">Vault</a>
          </div>

          {/* Search Bar */}
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search directives..." 
              className="w-full bg-surface-container-high border border-outline-variant/30 rounded-md py-2 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Top Icons */}
          <div className="flex items-center gap-4 text-on-surface-variant">
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span></button>
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">cast</span></button>
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">account_circle</span></button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel p-6 rounded-xl border border-secondary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {/* Decorative curve */}
          <svg className="absolute bottom-0 right-0 w-full h-1/2 opacity-20 pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,40 T100,10" fill="none" stroke="#e9c349" strokeWidth="0.5"/>
            <path d="M0,50 Q30,10 60,30 T100,5" fill="none" stroke="#e9c349" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider font-semibold">Compliance Score</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
          </div>
          <p className="font-display-lg text-5xl text-secondary mb-3 relative z-10">98.5%</p>
          <div className="flex items-center gap-1.5 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-body-md text-[11px] text-tertiary">Target: 100% | Nominal Variance</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 relative">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider font-semibold">Open Audits</span>
            <span className="material-symbols-outlined text-outline text-[20px]">description</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <p className="font-display-lg text-5xl text-on-surface">07</p>
            <span className="font-headline-md text-lg text-on-surface">Total</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-error/10 border border-error/20">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            <span className="font-mono text-[10px] text-error uppercase tracking-wider">02 Critical</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 relative">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-sm text-[11px] text-tertiary uppercase tracking-wider font-semibold">Regulatory Risk</span>
            <span className="material-symbols-outlined text-primary text-[20px]">track_changes</span>
          </div>
          <p className="font-display-lg text-5xl text-primary mb-3">Low</p>
          <div className="flex items-center gap-1.5 text-tertiary">
            <span className="material-symbols-outlined text-[14px]">trending_flat</span>
            <span className="font-body-md text-[11px]">Stable Trend Projection</span>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Active Regulatory Audits Table */}
        <div className="flex-1 glass-panel rounded-xl overflow-hidden border border-outline-variant/20">
          <div className="p-6 border-b border-outline-variant/20">
            <h2 className="font-headline-md text-xl text-on-surface">Active Regulatory Audits</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/40 border-b border-outline-variant/20">
                  <th className="p-5 font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold w-1/4">Territory</th>
                  <th className="p-5 font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold w-1/4">Audit Type</th>
                  <th className="p-5 font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold w-1/4">Phase</th>
                  <th className="p-5 font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 font-label-md text-sm text-on-surface">Sector 4, Neo-<br/>Metropolis</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Financial<br/>Compliance</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Field<br/>Inspection</td>
                  <td className="p-5 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-secondary/30 bg-secondary/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span className="font-label-sm text-[10px] text-secondary">Pending</span>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 font-label-md text-sm text-on-surface">Agricultural<br/>Zone 9</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Environmental</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Report<br/>Generation</td>
                  <td className="p-5 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-primary/30 bg-primary/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-sm text-[10px] text-primary">Active</span>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 font-label-md text-sm text-on-surface">Coastal<br/>Reserve Alpha</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Asset<br/>Expropriation</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Initial Notice</td>
                  <td className="p-5 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-error/30 bg-error/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      <span className="font-label-sm text-[10px] text-error">Critical</span>
                    </div>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 font-label-md text-sm text-on-surface">Industrial Hub<br/>Zeta</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Labor Standards</td>
                  <td className="p-5 font-body-md text-sm text-tertiary">Review</td>
                  <td className="p-5 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-secondary/30 bg-secondary/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span className="font-label-sm text-[10px] text-secondary">Pending</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-6">
          
          {/* Risk Topography */}
          <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/20">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
              <h3 className="font-label-sm text-[11px] text-on-surface uppercase tracking-widest font-semibold">Risk Topography</h3>
              <span className="material-symbols-outlined text-[16px] text-secondary cursor-pointer hover:text-primary transition-colors">open_in_full</span>
            </div>
            <div className="h-[180px] relative bg-surface-container-lowest overflow-hidden">
              {/* Fake topography using radial gradients and dots */}
              <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(233, 195, 73, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(136, 215, 166, 0.1) 0%, transparent 40%)' }}></div>
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 opacity-30">
                <path d="M0 100 Q 100 50 200 100 T 400 100" fill="none" stroke="#3f4942" strokeWidth="1"/>
                <path d="M0 120 Q 100 70 200 120 T 400 120" fill="none" stroke="#3f4942" strokeWidth="1"/>
                <path d="M0 140 Q 100 90 200 140 T 400 140" fill="none" stroke="#3f4942" strokeWidth="1"/>
                <path d="M0 160 Q 100 110 200 160 T 400 160" fill="none" stroke="#3f4942" strokeWidth="1"/>
                <path d="M0 180 Q 100 130 200 180 T 400 180" fill="none" stroke="#3f4942" strokeWidth="1"/>
              </svg>
              {/* Hotspots */}
              <div className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(233,195,73,0.8)] animate-pulse"></div>
              <div className="absolute top-[60%] left-[50%] w-2 h-2 rounded-full bg-error shadow-[0_0_10px_rgba(255,180,171,0.8)] animate-pulse"></div>
              <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(136,215,166,0.8)]"></div>
            </div>
            <div className="p-3 bg-surface-container-low flex justify-between items-center text-[10px] border-t border-outline-variant/20">
              <span className="text-tertiary">Friction Hotspots</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
            </div>
          </div>

          {/* Regulatory Framework */}
          <div className="glass-panel rounded-xl p-6 border border-outline-variant/20 flex-1">
            <h3 className="font-headline-md text-xl text-on-surface mb-6">Regulatory Framework</h3>
            
            <div className="flex flex-col gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-lg border border-outline-variant/30 bg-surface-container-lowest/50 hover:border-outline-variant transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors">Sovereign Code Sec. 8B</h4>
                  <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-colors">open_in_new</span>
                </div>
                <p className="font-body-md text-[11px] text-tertiary leading-relaxed">
                  Mandates rigorous quarterly financial disclosures for all Tier 1 infrastructur...
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-lg border border-outline-variant/30 bg-surface-container-lowest/50 hover:border-outline-variant transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors">Mandate 22-X</h4>
                  <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-colors">open_in_new</span>
                </div>
                <p className="font-body-md text-[11px] text-tertiary leading-relaxed">
                  Environmental impact assessment protocols for coastal and agricultural...
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-lg border border-outline-variant/30 bg-surface-container-lowest/50 hover:border-outline-variant transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors">Directive Alpha-Omega</h4>
                  <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-primary transition-colors">open_in_new</span>
                </div>
                <p className="font-body-md text-[11px] text-tertiary leading-relaxed">
                  Overarching compliance framework for autonomous operations within...
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
