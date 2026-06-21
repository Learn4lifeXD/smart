import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import AppShell from "@/components/AppShell";
import { GlobalStateProvider } from "@/context/GlobalState";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Dossier Intelligence - Dossier Management",
  description: "Smart Dossier Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <MouseGlow />
        <div className="font-body-md text-body-md overflow-hidden bg-surface-lowest min-h-screen text-[#e5e2e1]">
        {/* Ambient Background */}
      
{/* Ambient Background */}
<div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high/20 via-surface/0 to-surface/0"></div>
<div className="absolute top-[20%] left-[10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-30 mix-blend-screen"></div>
<div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] opacity-20 mix-blend-screen"></div>
</div>
        <GlobalStateProvider>
          <AppShell>
            {children}
          </AppShell>
        </GlobalStateProvider>
      </div>
      </body>
    </html>
  );
}
