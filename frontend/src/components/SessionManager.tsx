"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// 60 minutes in milliseconds
const TIMEOUT_DURATION = 60 * 60 * 1000; 

export default function SessionManager({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Session expired
      localStorage.removeItem("executive_auth");
      setIsAuthenticated(false);
      router.push("/login");
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Check initial auth state
    const auth = localStorage.getItem("executive_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    if (isAuthenticated === true && pathname !== "/login") {
      // Initialize activity listeners
      const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
      
      const handleActivity = () => {
        resetTimeout();
      };

      events.forEach(event => document.addEventListener(event, handleActivity));
      
      // Start the initial timeout
      resetTimeout();

      return () => {
        events.forEach(event => document.removeEventListener(event, handleActivity));
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isAuthenticated, pathname]);

  // Prevent flash of unauthenticated content
  if (isAuthenticated === null) {
    return <div className="h-screen w-full bg-background flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>;
  }

  return <>{children}</>;
}
