"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalState";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setMessages } = useGlobalState();

  const handleNewDossier = () => {
    const topic = window.prompt("Enter the subject or target for the new dossier:");
    if (topic) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "user",
          text: `Please generate a new classified dossier for: ${topic}`,
        },
      ]);
      router.push("/chat");
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Dossiers", href: "/", icon: "folder_managed" },
    { name: "Topography", href: "/topography", icon: "map" },
    { name: "Legal", href: "/legal", icon: "gavel" },
    { name: "Analytics", href: "/analytics", icon: "analytics" },
    { name: "Chat with AI", href: "/chat", icon: "smart_toy" },
  ];

  const footerLinks = [
    { name: "Settings", href: "/settings", icon: "settings" },
    { name: "Support", href: "/support", icon: "help" },
  ];

  return (
    <>
      {/* SideNavBar */}
      <nav className="h-screen w-72 fixed left-0 top-0 border-r-[0.5px] border-secondary/30 bg-surface-container-lowest/90 z-50 shadow-[20px_0_40px_rgba(0,0,0,0.4)] flex flex-col py-container-padding bg-surface-container-low/80 backdrop-blur-xl hidden md:flex">
        {/* Header */}
        <div className="px-6 mb-12 flex items-center gap-4 group cursor-pointer">
          <Link href="/profile" className="w-12 h-12 rounded-full bg-surface-container-high border border-secondary/20 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img className="w-full h-full object-cover" data-alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9YHasl366hXQ0v61c7w_DPrtwJirrkAALrg7Y9df8ykDtK7Gwlxg8Jm0XM2Izdh6hgIGRyeXGskR9QMJlgOrOeujVGxTZjxQO7lpX0OP_HGuKUgj1FbYUcpPCawhf_seOHgyUB1cEjir9npzaI1wGZzlLokraCB5f9A4BQADuM3JTSwCiIiAnlpli3JQvPFXxelempjPjpbX09nHCGa9tSUM1PYdkhN0zilNvfu_lowR9YzGU4ptx26sbNumCYRHpQsLNxqmZfto"/>
          </Link>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-secondary hover:underline cursor-pointer"><Link href="/profile">Expropriation Authority</Link></h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Executive Suite</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="px-6 mb-8">
          <button 
            onClick={handleNewDossier}
            className="w-full bg-primary-container hover:bg-primary-container/90 text-on-primary border-t border-secondary/30 rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-label-md text-label-md transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            New Dossier
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
                  isActive 
                    ? "text-primary bg-primary-container/20 border-l-2 border-secondary scale-95" 
                    : "text-on-surface-variant hover:bg-surface-bright/50 hover:text-on-surface"
                }`}
              >
                <span 
                  className="material-symbols-outlined" 
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {link.icon}
                </span>
                <span className="font-label-md text-label-md">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Tabs */}
        <div className="mt-auto flex flex-col gap-2 border-t border-outline-variant/20 pt-4">
          {footerLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-3 transition-all duration-300 ${
                  isActive 
                    ? "text-primary bg-primary-container/20 border-l-2 border-secondary" 
                    : "text-on-surface-variant hover:bg-surface-bright/50 hover:text-on-surface"
                }`}
              >
                <span 
                  className="material-symbols-outlined" 
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {link.icon}
                </span>
                <span className="font-label-md text-label-md">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
