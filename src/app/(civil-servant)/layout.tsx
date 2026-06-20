import Link from 'next/link'
import { LayoutDashboard, AlertCircle, FilePlus, Search } from 'lucide-react'

export default function CivilServantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-heading font-bold text-primary">Smart Dossier</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/dossier/new" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <FilePlus className="w-5 h-5" />
            <span className="font-medium text-sm">New Dossier</span>
          </Link>
          <Link href="/alerts" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Alerts</span>
          </Link>
          <Link href="/track/search" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent text-foreground">
            <Search className="w-5 h-5" />
            <span className="font-medium text-sm">Search (Citizen)</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
