'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getDossiers } from '@/lib/supabase/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { STATUS_LABELS_EN } from '@/lib/constants'
import { format } from 'date-fns'
import { LayoutDashboard, AlertCircle, TrendingUp, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [institutionFilter, setInstitutionFilter] = useState('All Institutions')
  
  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: getDashboardStats })
  const { data: dossiers } = useQuery({ queryKey: ['dossiers'], queryFn: () => getDossiers() })

  // Apply rudimentary filtering for UI interaction
  const filteredDossiers = dossiers?.filter(d => {
    if (statusFilter !== 'All Statuses' && d.status !== statusFilter.toLowerCase()) return false;
    // We don't have institutions explicitly mapped to dossiers in mock data, but we can pretend.
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-heading text-4xl text-primary font-semibold mb-1">Active Legal Dossiers</h1>
          <p className="text-muted-foreground">Monitoring active expropriation and privatization cases.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-card border border-border p-4 rounded-lg min-w-[120px] shadow-sm cursor-pointer hover:bg-accent transition-colors" onClick={() => setStatusFilter('Active')}>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active</span>
            <span className="block text-2xl font-heading text-primary font-bold mt-1">{stats?.active || 0}</span>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg min-w-[120px] shadow-sm cursor-pointer hover:bg-accent transition-colors" onClick={() => setStatusFilter('Blocked')}>
            <span className="text-xs text-destructive uppercase tracking-wider font-semibold">Blocked</span>
            <span className="block text-2xl font-heading text-destructive font-bold mt-1">{stats?.blocked || 0}</span>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg min-w-[120px] shadow-sm">
            <span className="text-xs text-orange-600 uppercase tracking-wider font-semibold">Due Soon</span>
            <span className="block text-2xl font-heading text-orange-600 font-bold mt-1">{stats?.due_this_week || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-muted border border-border p-4 rounded-xl flex flex-wrap items-center gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary uppercase">Filters:</span>
        </div>
        <select 
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Blocked</option>
          <option>Completed</option>
        </select>
        <select 
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
          value={institutionFilter}
          onChange={(e) => setInstitutionFilter(e.target.value)}
        >
          <option>All Institutions</option>
          <option>Ministry of Infrastructure</option>
          <option>National Property Authority</option>
          <option>Judicial Council</option>
        </select>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Dossier Board (Kanban)</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {['application_received', 'technical_evaluation', 'commission_review', 'final_decision', 'execution'].map(phase => {
            const phaseDossiers = filteredDossiers?.filter(d => d.current_phase === phase) || [];
            return (
              <div key={phase} className="min-w-[320px] bg-accent/50 border border-border p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-4 uppercase text-xs tracking-wider flex items-center justify-between">
                  {phase.replace(/_/g, ' ')}
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-[10px]">
                    {phaseDossiers.length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {phaseDossiers.map(d => (
                    <Card 
                      key={d.id} 
                      className="cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all border-border bg-card"
                      onClick={() => router.push(`/dossier/${d.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-mono bg-muted text-primary px-2 py-1 rounded font-medium">{d.tracking_code}</span>
                          <Badge variant="outline" className={d.status === 'blocked' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-primary/10 text-primary border-primary/20'}>
                            {STATUS_LABELS_EN[d.status]}
                          </Badge>
                        </div>
                        <p className="font-heading font-semibold text-primary mb-1">{d.owner_name}</p>
                        <p className="text-sm text-muted-foreground truncate mb-3">{d.property_address}</p>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                          {d.deadline_date ? (
                            <div className="flex items-center text-xs font-medium text-orange-600 gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {format(new Date(d.deadline_date), 'dd MMM yyyy')}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">No deadline</div>
                          )}
                          <div className="flex -space-x-2">
                             <div className="w-6 h-6 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center border-2 border-card">AI</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
