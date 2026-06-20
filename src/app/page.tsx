import Link from "next/link";
import { Building2, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center py-20 px-6 sm:px-12 bg-card rounded-2xl border border-border shadow-lg">
        <div className="flex flex-col items-center gap-6 text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
            Smart Dossier
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            AI-powered property procedure management platform. 
            Select your role to get started.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
          <Link
            href="/dashboard"
            className="flex-1 flex flex-col items-center gap-4 p-8 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-heading font-semibold text-primary mb-2">Civil Servant</h2>
              <p className="text-sm text-muted-foreground">Manage dossiers, resolve alerts, and generate letters using AI.</p>
            </div>
          </Link>
          
          <Link
            href="/track/search"
            className="flex-1 flex flex-col items-center gap-4 p-8 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-heading font-semibold text-primary mb-2">Citizen</h2>
              <p className="text-sm text-muted-foreground">Track the status of your expropriation or privatization procedure.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
