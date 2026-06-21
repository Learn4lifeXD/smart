"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  label: string;
  icon: string;
  options: string[];
  activeColor?: string;
  onSelect?: (val: string) => void;
}

export default function Dropdown({ label, icon, options, activeColor = "bg-primary", onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-colors text-sm group"
      >
        {icon === "status" ? (
          <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(136,215,166,0.8)] ${activeColor}`}></div>
        ) : (
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>{icon}</span>
        )}
        <span className="font-label-md text-label-md ml-1">{selected}</span>
        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 group-hover:text-on-surface-variant transition-colors" style={{ fontVariationSettings: "'wght' 300" }}>
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 bg-surface-container-high border border-outline-variant/30 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden z-50 py-1"
          >
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary-container/20 hover:text-primary ${selected === option ? 'text-primary bg-primary-container/10' : 'text-on-surface-variant'}`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
