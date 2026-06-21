export default function TransfersPage() {
  return (
    <div className="p-gutter flex-grow flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] mx-auto">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Header Section */}
        <div>
          <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">Sovereign Transfers</h1>
          <p className="font-body-md text-sm text-tertiary">
            Secure Asset Relocation &amp; Liquidity Management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between h-32 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-transparent opacity-50 pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold">Total Value In-Transit</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">flight_takeoff</span>
            </div>
            <div className="relative z-10">
              <p className="font-display-lg text-3xl mb-1">
                <span className="text-secondary">$</span><span className="text-on-surface">14.2B</span>
              </p>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                <span className="font-body-md text-[10px]">+2.4% vs last quarter</span>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-xl border border-secondary/20 flex flex-col justify-between h-32 relative">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] text-secondary uppercase tracking-widest font-semibold">Pending Authorizations</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">signature</span>
            </div>
            <div className="flex items-baseline gap-4">
              <p className="font-display-lg text-5xl text-on-surface">03</p>
              <span className="font-label-sm text-[10px] text-secondary">Awaiting Signature</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 flex flex-col justify-between h-32 relative">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-widest font-semibold">Global Liquidity Index</span>
              <span className="material-symbols-outlined text-outline text-[18px]">cloud_sync</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-display-lg text-xl text-on-surface">Optimal</p>
              {/* Mini Chart Graphic */}
              <div className="w-16 h-10 border border-primary/30 rounded bg-surface-container-lowest/50 relative overflow-hidden flex items-end">
                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path d="M0 40 L 20 20 L 40 30 L 60 10 L 80 20 L 100 5" fill="none" stroke="#88d7a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 40 L 20 20 L 40 30 L 60 10 L 80 20 L 100 5 L 100 50 L 0 50 Z" fill="rgba(136, 215, 166, 0.1)" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Secure Ledger Table */}
        <div className="flex-1 glass-panel rounded-xl overflow-hidden border border-outline-variant/20 flex flex-col">
          <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
            <h2 className="font-headline-md text-lg text-on-surface">Recent Secure Ledger</h2>
            <span className="material-symbols-outlined text-tertiary cursor-pointer hover:text-secondary transition-colors">filter_list</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="p-5 font-label-sm text-[11px] text-tertiary font-semibold w-[25%]">Territory</th>
                  <th className="p-5 font-label-sm text-[11px] text-tertiary font-semibold w-[25%]">Asset Type</th>
                  <th className="p-5 font-label-sm text-[11px] text-tertiary font-semibold w-[20%]">Value</th>
                  <th className="p-5 font-label-sm text-[11px] text-tertiary font-semibold w-[20%]">Status</th>
                  <th className="p-5 font-label-sm text-[11px] text-tertiary font-semibold text-right w-[10%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-3 rounded-sm bg-surface-container border border-outline-variant/30 overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white"></div></div>
                      </div>
                      <span className="font-label-md text-xs text-on-surface">Zurich, CHE</span>
                    </div>
                  </td>
                  <td className="p-5 font-body-md text-xs text-tertiary">Digital<br/>Assets</td>
                  <td className="p-5 font-label-md text-xs text-on-surface">$2.1B</td>
                  <td className="p-5 font-label-md text-xs text-primary">Completed</td>
                  <td className="p-5 text-right text-outline cursor-pointer hover:text-on-surface">...</td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-3 rounded-sm bg-surface-container border border-outline-variant/30 overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-600"></div>
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white flex items-center justify-center">
                          <span className="text-[4px] text-red-600 leading-none">★</span>
                        </div>
                      </div>
                      <span className="font-label-md text-xs text-on-surface">Singapore,<br/>SGP</span>
                    </div>
                  </td>
                  <td className="p-5 font-body-md text-xs text-tertiary">Bullion</td>
                  <td className="p-5 font-label-md text-xs text-on-surface">$850M</td>
                  <td className="p-5 font-label-md text-xs text-secondary">In-Transit</td>
                  <td className="p-5 text-right text-outline cursor-pointer hover:text-on-surface">...</td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-3 rounded-sm bg-surface-container border border-outline-variant/30 flex">
                        <div className="flex-1 bg-red-600"></div><div className="flex-1 bg-white"></div><div className="flex-1 bg-blue-400"></div>
                      </div>
                      <span className="font-label-md text-xs text-on-surface">Luxembourg,<br/>LUX</span>
                    </div>
                  </td>
                  <td className="p-5 font-body-md text-xs text-tertiary">Real<br/>Estate</td>
                  <td className="p-5 font-label-md text-xs text-on-surface">€4.2B</td>
                  <td className="p-5 font-label-md text-xs text-primary">Completed</td>
                  <td className="p-5 text-right text-outline cursor-pointer hover:text-on-surface">...</td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-3 rounded-sm bg-surface-container border border-outline-variant/30 flex">
                        <div className="w-1/4 bg-red-600"></div><div className="flex-1 bg-white flex flex-col"><div className="flex-1 bg-green-700"></div><div className="flex-1 bg-white"></div><div className="flex-1 bg-black"></div></div>
                      </div>
                      <span className="font-label-md text-xs text-on-surface">Dubai, ARE</span>
                    </div>
                  </td>
                  <td className="p-5 font-body-md text-xs text-tertiary">Digital<br/>Assets</td>
                  <td className="p-5 font-label-md text-xs text-on-surface">$1.5B</td>
                  <td className="p-5 font-label-md text-xs text-error">Halted</td>
                  <td className="p-5 text-right text-outline cursor-pointer hover:text-on-surface">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Context Sidebar */}
      <div className="w-full xl:w-[360px] shrink-0 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mt-2">
          <h2 className="font-headline-md text-xl text-on-surface leading-tight">Authorization<br/>Queue</h2>
          <span className="px-2 py-1 bg-surface-container-high border border-outline-variant/30 text-outline text-[10px] font-mono uppercase tracking-widest rounded">High Priority</span>
        </div>

        {/* Authorization Card 1 */}
        <div className="glass-panel p-6 rounded-xl border border-secondary/20 relative">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-sm text-[11px] text-secondary uppercase tracking-widest font-semibold">TRX-8892A</span>
            <span className="material-symbols-outlined text-secondary text-[14px]">lock</span>
          </div>
          
          <h3 className="font-label-md text-sm text-on-surface mb-1">Project Sovereign</h3>
          <p className="font-body-md text-xs text-tertiary mb-6">Relocation to Cayman Inst.</p>
          
          <p className="font-label-sm text-[10px] text-outline uppercase tracking-wider mb-1">Disbursement</p>
          <p className="font-display-lg text-lg text-secondary mb-6">$450,000,000</p>
          
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors rounded text-xs font-label-md shadow-[0_0_15px_rgba(136,215,166,0.1)]">
            <span className="material-symbols-outlined text-[14px]">signature</span>
            Executive Sig Required
          </button>
        </div>

        {/* Authorization Card 2 */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant/30 relative opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label-sm text-[11px] text-tertiary uppercase tracking-widest font-semibold">TRX-9104B</span>
            <span className="material-symbols-outlined text-secondary text-[14px]">lock</span>
          </div>
          
          <h3 className="font-label-md text-sm text-on-surface mb-1">Bullion Transfer</h3>
          <p className="font-body-md text-xs text-tertiary mb-6">London to Zurich Vaults</p>
          
          <p className="font-label-sm text-[10px] text-outline uppercase tracking-wider mb-1">Value Equivalent</p>
          <p className="font-display-lg text-lg text-secondary mb-6">£120,000,000</p>
          
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-secondary/50 text-secondary hover:bg-secondary/10 transition-colors rounded text-xs font-label-md">
            <span className="material-symbols-outlined text-[14px]">signature</span>
            Executive Sig Required
          </button>
        </div>

      </div>

    </div>
  );
}
