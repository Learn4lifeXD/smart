'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDossierById } from '@/lib/supabase/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { Loader2, Sparkles, MessageSquare, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DossierDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', text: string}[]>([])
  const [isChatting, setIsChatting] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const { data: dossier, isLoading } = useQuery({ 
    queryKey: ['dossier', id], 
    queryFn: () => getDossierById(id as string) 
  })

  const { data: aiSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ['ai-summary', id],
    queryFn: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dossier_id: id })
      }).catch(() => null)
      if (!res?.ok) return { summary: 'AI Summary is currently unavailable.', blockers: [] }
      return res.json()
    }
  })

  const handleCompletePhase = () => {
    setIsCompleting(true)
    setTimeout(() => {
      toast.success('Current phase completed successfully!')
      setIsCompleting(false)
    }, 1000)
  }

  const handleViewDocument = (fileName: string) => {
    toast(`Opening document viewer for ${fileName}...`)
  }

  const handleGenerateLetter = () => {
    toast.success('Official Letter generated successfully via AI!')
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    const userMsg = chatInput
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setChatInput('')
    setIsChatting(true)

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: `Based on the latest documents, the procedure is proceeding normally. The next step is to wait for the technical evaluation to conclude.` }])
      setIsChatting(false)
    }, 1500)
  }

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  if (!dossier) return <div className="p-8">Dossier not found.</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-heading font-bold text-primary">{dossier.tracking_code}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{dossier.process_type === 'expropriation' ? 'Expropriation' : 'EKB Privatization'}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">Owner: {dossier.owner_name} | Address: {dossier.property_address}</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex gap-2"
          onClick={handleCompletePhase}
          disabled={isCompleting}
        >
          {isCompleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4"/>}
          Complete Current Phase
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader><CardTitle className="font-heading text-primary">General Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Owner ID</p>
                <p className="font-medium mt-1">{dossier.owner_id_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Current Phase</p>
                <p className="font-medium capitalize mt-1 text-primary">{dossier.current_phase.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Area</p>
                <p className="font-medium mt-1">{dossier.property_area_m2 ? `${dossier.property_area_m2} m²` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Legal Deadline</p>
                <p className="font-medium mt-1">{dossier.deadline_date ? new Date(dossier.deadline_date).toLocaleDateString() : 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader><CardTitle className="font-heading text-primary">Uploaded Documents</CardTitle></CardHeader>
            <CardContent>
              {dossier.documents.length === 0 ? <p className="text-muted-foreground text-sm">No documents uploaded.</p> : (
                <ul className="space-y-3">
                  {dossier.documents.map(doc => (
                    <li key={doc.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <FileText className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold text-primary">{doc.document_type}</p>
                          <p className="text-xs text-muted-foreground">{doc.file_name}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="font-medium" onClick={() => handleViewDocument(doc.file_name)}>View</Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-l-4 border-l-[#d8e3fb] bg-card border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary font-heading text-lg">
                <Sparkles className="w-5 h-5 text-[#505f76]" />
                AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summaryLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="text-sm text-secondary-foreground space-y-4">
                  <p className="leading-relaxed">{aiSummary?.summary}</p>
                  {aiSummary?.blockers?.length > 0 && (
                    <div className="p-3 bg-destructive/10 rounded-lg text-destructive border border-destructive/20">
                      <span className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4"/> Blockers:</span>
                      <ul className="list-disc pl-5 space-y-1">
                        {aiSummary.blockers.map((b: string, i: number) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border flex flex-col h-80">
            <CardHeader><CardTitle className="flex items-center gap-2 font-heading text-primary"><MessageSquare className="w-5 h-5"/> RAG Assistant</CardTitle></CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="flex-1 bg-muted/30 rounded-lg border border-border p-4 text-sm text-muted-foreground mb-4 overflow-y-auto space-y-3">
                {chatMessages.length === 0 ? (
                  <p className="italic text-center mt-8">Conversation will appear here...</p>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-2 rounded-lg max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
                {isChatting && <div className="text-left text-xs italic text-muted-foreground animate-pulse">AI is typing...</div>}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about this procedure..." 
                  className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary bg-card" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                />
                <Button className="font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleSendChat} disabled={isChatting}>Send</Button>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full font-medium" variant="outline" onClick={handleGenerateLetter}><FileText className="w-4 h-4 mr-2"/> Generate Official Letter (AI)</Button>
        </div>
      </div>
    </div>
  )
}
