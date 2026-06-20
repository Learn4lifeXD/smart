'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function CitizenTrackPage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [code, setCode] = useState(params.code || '')
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md border-border shadow-md">
        <CardHeader className="border-b border-border mb-4">
          <CardTitle className="text-center text-2xl font-heading font-bold text-primary">Track Dossier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!params.code && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">Enter your tracking code to view the status of your procedure.</p>
              <div className="space-y-2">
                <Label htmlFor="code" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Tracking Code</Label>
                <Input id="code" className="bg-muted focus:ring-primary border-border" placeholder="e.g. EXP-2024-0001" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
              </div>
              <Button className="w-full font-medium" onClick={() => router.push(`/track/${code}`)}>Search</Button>
            </div>
          )}
          
          {params.code && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Status for dossier:</p>
                <h2 className="text-3xl font-mono text-primary font-bold tracking-wider mt-1">{params.code}</h2>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-primary text-sm leading-relaxed">
                  Your dossier is currently in the initial processing phase.
                  <br/><br/>
                  <strong>Responsible Institution:</strong> Municipality / Ministry of Infrastructure<br/>
                  <strong>Expected duration:</strong> 15 days.
                </p>
              </div>

              <div className="pt-4">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-1/4"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center uppercase tracking-wider font-semibold">Approximately 25% completed</p>
              </div>

              <Button variant="outline" className="w-full font-medium" onClick={() => router.push('/track/search')}>Track another dossier</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
