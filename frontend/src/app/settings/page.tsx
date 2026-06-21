export default function SettingsPage() {
  return (
    <div className="p-gutter flex-grow">
      
{/*  TopAppBar (Web)  */}

{/*  Page Content Canvas  */}
<div className="flex-1 p-gutter md:p-container-padding max-w-[1440px] mx-auto w-full">
{/*  Page Header  */}
<div className="mb-section-gap">
<h1 className="font-display-lg text-display-lg text-on-surface mb-2">Administrative Settings</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Manage authority profiles, security protocols, and support channels.</p>
</div>
{/*  Custom Tabs Navigation  */}
<div className="flex gap-8 border-b border-outline-variant/30 mb-8 overflow-x-auto hide-scrollbar">
<button className="pb-4 font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors whitespace-nowrap">
                    Authority Profiles
                </button>
<button className="pb-4 font-label-md text-label-md text-secondary active-tab-glow whitespace-nowrap">
                    Security Protocols
                </button>
<button className="pb-4 font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors whitespace-nowrap">
                    System Support
                </button>
</div>
{/*  Bento Grid Content Area (Security Protocols Active)  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/*  Main Security Panel  */}
<section className="lg:col-span-8 glass-panel rounded-xl p-8 relative overflow-hidden group">
<div className="absolute inset-0 z-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" data-alt="A dark, abstract digital visualization of a biometric fingerprint scanning process. Thin, elegant lines in glowing emerald green map over an obsidian surface. Subtle champagne gold data nodes pulse in the background. The aesthetic is high-tech, secure, and cinematic." ></div>
<div className="relative z-10">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-secondary text-3xl">fingerprint</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Biometric Authentication</h3>
</div>
<div className="gold-gradient-line w-full mb-8"></div>
<div className="space-y-6">
{/*  Toggle Item 1  */}
<div className="flex items-center justify-between p-4 bg-surface-container/50 rounded-lg border border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors">
<div>
<h4 className="font-label-md text-label-md text-on-surface mb-1">Require Biometrics for Dossier Execution</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Enforce fingerprint or retinal scan for Level 1 clearances.</p>
</div>
{/*  Custom Toggle  */}
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked="" className="sr-only peer" type="checkbox" defaultValue=""/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container border border-outline-variant"></div>
</label>
</div>
{/*  Toggle Item 2  */}
<div className="flex items-center justify-between p-4 bg-surface-container/50 rounded-lg border border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors">
<div>
<h4 className="font-label-md text-label-md text-on-surface mb-1">Strict Encryption Mode (AES-256)</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Enable end-to-end encryption for all topographical data.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" defaultValue=""/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container border border-outline-variant"></div>
</label>
</div>
{/*  Input Field  */}
<div className="pt-4">
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">Session Timeout Duration (Minutes)</label>
<input className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface py-2 focus:ring-0 focus:border-secondary focus:shadow-[0_0_8px_rgba(233,195,73,0.3)] transition-all font-body-md" type="number" defaultValue="15"/>
</div>
</div>
</div>
</section>
{/*  Sidebar Info / Contact  */}
<aside className="lg:col-span-4 space-y-gutter">
{/*  Support Card  */}
<div className="glass-panel rounded-xl p-6 relative">
<div className="flex items-start justify-between mb-4">
<h3 className="font-headline-md text-headline-md text-on-surface">Executive Helpdesk</h3>
<span className="flex h-3 w-3 mt-2">
<span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Direct line to technical support for Level 1 clearances. Response time &lt; 5 minutes.</p>
<div className="space-y-4">
<button className="w-full bg-transparent border border-secondary text-secondary font-label-md text-label-md py-3 px-4 rounded hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined">support_agent</span>
                                Initiate Secure Chat
                            </button>
<button className="w-full bg-transparent border border-outline-variant text-on-surface-variant font-label-md text-label-md py-3 px-4 rounded hover:border-outline hover:text-on-surface transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined">call</span>
                                Request Callback
                            </button>
</div>
</div>
{/*  System Status Card  */}
<div className="glass-panel rounded-xl p-6">
<h3 className="font-label-md text-label-md text-on-surface mb-4 uppercase tracking-widest text-on-surface-variant">System Status</h3>
<div className="space-y-3">
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Encryption Nodes</span>
<span className="text-primary flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check_circle</span> Operational</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Data Centers</span>
<span className="text-primary flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check_circle</span> Operational</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Topography Sync</span>
<span className="text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">sync</span> Syncing...</span>
</div>
</div>
</div>
</aside>
</div>
</div>

    </div>
  );
}