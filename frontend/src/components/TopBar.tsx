"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center h-20 px-gutter bg-background/60 backdrop-blur-lg border-b-[0.5px] border-outline-variant/30 docked full-width top-0 z-40">
        <div className="flex items-center gap-8">
          <h2 className="font-display-lg text-display-lg tracking-tight text-on-surface text-[24px]">Dossier Intelligence</h2>
          <div className="hidden lg:flex gap-6">
            <Link className="font-label-sm text-label-sm text-tertiary hover:text-primary transition-colors" href="/directives">Directives</Link>
            <Link className="font-label-sm text-label-sm text-tertiary hover:text-primary transition-colors" href="/compliance">Compliance</Link>
            <Link className="font-label-sm text-label-sm text-tertiary hover:text-primary transition-colors" href="/transfers">Transfers</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-sm">search</span>
            <input 
              className="bg-surface-container-low border-b border-outline-variant/50 focus:border-secondary focus:ring-0 text-on-surface text-label-sm pl-9 pr-4 py-2 w-64 transition-all focus:shadow-[0_0_8px_rgba(233,195,73,0.2)] bg-transparent" 
              placeholder="Search dossiers..." 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
            />
            
            <AnimatePresence>
              {isSearchOpen && searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden z-50 glass-panel"
                >
                  <div className="p-3 border-b border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant font-medium">Search Results</span>
                    <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">{searchQuery.length * 2} found</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 hover:bg-surface-bright/50 cursor-pointer transition-colors border-b border-outline-variant/10 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-primary-container/30 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[16px]">folder</span>
                          </div>
                          <div>
                            <div className="font-label-sm text-on-surface">Dossier #{1024 + i * 13} - {searchQuery}</div>
                            <div className="text-[10px] text-on-surface-variant mt-0.5">Updated 2h ago • Sector {i}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-outline-variant/20 bg-surface-container/50">
                    <button className="w-full text-center text-xs text-secondary hover:text-primary transition-colors py-1">View all results →</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationsRef}>
              <button 
                className={`text-tertiary hover:text-secondary transition-colors glow-effect relative ${isNotificationsOpen ? 'text-secondary' : ''}`}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full led-pending"></span>
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-80 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden z-50 glass-panel origin-top-right"
                  >
                    <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container/50">
                      <span className="text-sm text-on-surface font-semibold">Notifications</span>
                      <span className="text-xs text-secondary cursor-pointer hover:underline">Mark all as read</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-4 hover:bg-surface-bright/50 transition-colors border-b border-outline-variant/10 cursor-pointer">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-secondary shrink-0"></div>
                          <div>
                            <div className="text-sm text-on-surface leading-tight">Valuation target approved for Dossier #1042.</div>
                            <div className="text-xs text-on-surface-variant mt-1">10 mins ago</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-surface-bright/50 transition-colors border-b border-outline-variant/10 cursor-pointer opacity-70">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-transparent border border-outline-variant shrink-0"></div>
                          <div>
                            <div className="text-sm text-on-surface leading-tight">Legal compliance check failed on Sector 7 property.</div>
                            <div className="text-xs text-on-surface-variant mt-1">2 hours ago</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-surface-bright/50 transition-colors cursor-pointer opacity-70">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-transparent border border-outline-variant shrink-0"></div>
                          <div>
                            <div className="text-sm text-on-surface leading-tight">New topographical survey data uploaded.</div>
                            <div className="text-xs text-on-surface-variant mt-1">Yesterday</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="text-tertiary hover:text-secondary transition-colors glow-effect">
              <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
            </button>
            <button className="ml-4 bg-transparent border border-secondary/50 text-secondary hover:bg-secondary/10 px-4 py-2 rounded-lg font-label-sm text-label-sm transition-all flex items-center gap-2">
              Execute Order
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
