'use client'

import { useQuery } from '@tanstack/react-query'
import { getActiveAlerts } from '@/lib/supabase/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SEVERITY_COLORS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { AlertCircle, FileWarning, Search, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AlertsPage() {
  const router = useRouter()
  const { data: alerts, isLoading } = useQuery({ queryKey: ['alerts'], queryFn: getActiveAlerts })

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-1">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and resolve system-generated dossier alerts.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-destructive/10 border-destructive/20 shadow-sm">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive font-semibold text-sm uppercase tracking-wider">Critical</p>
            <p className="text-3xl font-heading font-bold text-destructive mt-1">{alerts?.filter(a => a.severity === 'critical').length || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <FileWarning className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-orange-800 font-semibold text-sm uppercase tracking-wider">High</p>
            <p className="text-3xl font-heading font-bold text-orange-900 mt-1">{alerts?.filter(a => a.severity === 'high').length || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <Search className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-yellow-800 font-semibold text-sm uppercase tracking-wider">Medium</p>
            <p className="text-3xl font-heading font-bold text-yellow-900 mt-1">{alerts?.filter(a => a.severity === 'medium').length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Dossier</th>
                <th className="p-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Phase</th>
                <th className="p-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Severity</th>
                <th className="p-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider">Message</th>
                <th className="p-4 font-semibold text-xs text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alerts?.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No active alerts.</td></tr>
              ) : alerts?.map(alert => (
                <tr key={alert.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-mono text-sm font-medium text-primary bg-muted/30 m-2 rounded inline-block">{alert.dossier_id.substring(0,8)}...</td>
                  <td className="p-4 capitalize text-sm text-secondary-foreground">{alert.phase_name?.replace(/_/g, ' ')}</td>
                  <td className="p-4">
                    <Badge variant="outline" className={SEVERITY_COLORS[alert.severity] + " uppercase text-[10px] tracking-wider"}>
                      {alert.severity}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-foreground max-w-md">{alert.message}</td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="font-medium gap-2" onClick={() => router.push(`/dossier/${alert.dossier_id}`)}><Eye className="w-4 h-4"/> View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
