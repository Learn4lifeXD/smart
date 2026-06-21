"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept any credentials as per user instructions for this mock
    if (officialId && password) {
      localStorage.setItem("executive_auth", "true");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-body-md text-on-surface bg-background w-full">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjMn-PyvZVvAGe_omANMuZbAnHQbdMYGzRbJKRkbtqjv6BkQyoo9NPjoQkq4uncgkT7bske5eQjefVKpVbyN_VXVggHBKnjgCns4opIhdTKxpyEzlagZtGrKZM4OtJLsytu_6fk1LoqDGP1ZAW4BGKdnjtsRfKHHUircb6FyThsbo0_D6-65l6xnukLiw2YGmka2dOf1LpJoCYYZZ3iRB2A5WjPPuGp9K8k9WBFmHc-8N9Pt_vj7OsylrN7E0L1gHfF4j_P3LVmoI')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))", backgroundSize: "100% 4px" }}></div>
      </div>

      {/* Main Login Card */}
      <main className="relative z-10 w-full max-w-md px-6 py-12 md:p-12 bg-surface-container-high/80 backdrop-blur-xl border-[0.5px] border-secondary/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(233,195,73,0.05)] mx-4 group">
        
        {/* Header / Branding */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-full border border-secondary/20 flex items-center justify-center mb-6 bg-surface-container-highest shadow-[0_0_15px_rgba(233,195,73,0.1)] relative">
            <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'wght' 200" }}>fingerprint</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-secondary uppercase tracking-tight mb-2">Executive Access</h1>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest opacity-80">Sovereign Tier Suite</p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          
          {/* Official ID Field */}
          <div className="flex flex-col gap-1 relative">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="official-id">Official ID</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-0 text-on-surface-variant/50 ml-1" style={{ fontVariationSettings: "'wght' 300" }}>badge</span>
              <input 
                autoComplete="off" 
                className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 pl-10 pr-4 text-on-surface font-body-lg text-body-lg focus:border-secondary focus:ring-0 transition-all placeholder:text-on-surface-variant/30" 
                id="official-id" 
                placeholder="Enter assigned identifier" 
                spellCheck="false" 
                type="text"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Biometric Signature Field */}
          <div className="flex flex-col gap-1 relative mt-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="bio-sig">Biometric Signature</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-0 text-on-surface-variant/50 ml-1" style={{ fontVariationSettings: "'wght' 300" }}>visibility_off</span>
              <input 
                className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 pl-10 pr-12 text-on-surface font-body-lg text-body-lg focus:border-secondary focus:ring-0 transition-all placeholder:text-on-surface-variant/30 tracking-[0.2em]" 
                id="bio-sig" 
                placeholder="••••••••••••" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                className={`absolute right-0 p-2 text-secondary/70 hover:text-secondary transition-colors cursor-pointer ${isScanning ? 'animate-pulse text-primary' : ''}`} 
                title="Initiate Retinal Scan" 
                type="button"
                onClick={() => setIsScanning(!isScanning)}
              >
                <span className="material-symbols-outlined">center_focus_strong</span>
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="mt-8 w-full bg-primary-container text-secondary font-label-md text-label-md py-4 rounded flex items-center justify-center gap-3 border-t-[0.5px] border-secondary/40 hover:bg-[#007043] transition-all duration-300 shadow-[0_4px_20px_rgba(0,96,57,0.3)] hover:shadow-[0_4px_25px_rgba(0,96,57,0.5)] active:scale-[0.98]" 
            type="submit"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300" }}>login</span>
            AUTHENTICATE ACCESS
          </button>
        </form>

        {/* Footer Protocol Links */}
        <div className="mt-10 flex justify-between items-center border-t border-outline-variant/20 pt-6">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-wider text-[10px]" href="#">Request Clearance</a>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="font-label-sm text-[10px] text-on-surface-variant tracking-widest uppercase">Secure Link</span>
          </div>
        </div>

      </main>

      {/* Subtle atmospheric light flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0"></div>
    </div>
  );
}
