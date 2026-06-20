'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Building2, Home, UploadCloud } from 'lucide-react'

export default function NewDossierPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({})

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => s - 1)
  
  const handleSubmit = async () => {
    toast.success('Dossier created successfully!')
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-heading font-bold text-primary">Create New Dossier</h1>
      
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-2 flex-1 rounded ${step >= i ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Step 1: Procedure Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant={formData.process_type === 'expropriation' ? 'default' : 'outline'}
                  className="h-32 text-lg flex flex-col gap-3 font-heading"
                  onClick={() => setFormData({...formData, process_type: 'expropriation'})}
                >
                  <Building2 className="w-8 h-8" />
                  Property Expropriation
                </Button>
                <Button 
                  variant={formData.process_type === 'ekb_privatization' ? 'default' : 'outline'}
                  className="h-32 text-lg flex flex-col gap-3 font-heading"
                  onClick={() => setFormData({...formData, process_type: 'ekb_privatization'})}
                >
                  <Home className="w-8 h-8" />
                  EKB Privatization
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Step 2: Owner Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">Full Name</Label>
                  <Input className="bg-muted border-border focus:ring-primary" value={formData.owner_name || ''} onChange={e => setFormData({...formData, owner_name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">National ID Number (NID)</Label>
                  <Input className="bg-muted border-border focus:ring-primary" value={formData.owner_id_number || ''} onChange={e => setFormData({...formData, owner_id_number: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Step 3: Property Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">Address</Label>
                  <Input className="bg-muted border-border focus:ring-primary" value={formData.property_address || ''} onChange={e => setFormData({...formData, property_address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">Area (m²)</Label>
                    <Input className="bg-muted border-border focus:ring-primary" type="number" value={formData.property_area_m2 || ''} onChange={e => setFormData({...formData, property_area_m2: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground font-semibold uppercase text-xs tracking-wider">Property Number</Label>
                    <Input className="bg-muted border-border focus:ring-primary" value={formData.property_id || ''} onChange={e => setFormData({...formData, property_id: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Step 4: Upload Documents (OCR)</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-16 text-center bg-muted/50 hover:bg-muted transition-colors cursor-pointer flex flex-col items-center justify-center">
                <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-primary font-medium">Drag and drop documents here, or click to browse</p>
                <p className="text-xs text-muted-foreground mt-2">PDF and Images supported. Text will be automatically extracted by AI.</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold mb-4 text-primary">Step 5: Summary</h2>
              <div className="bg-muted p-6 rounded-lg space-y-3 border border-border">
                <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Type</span><span className="font-heading font-medium text-primary">{formData.process_type === 'expropriation' ? 'Expropriation' : 'EKB Privatization'}</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Owner</span><span className="font-heading font-medium text-primary">{formData.owner_name}</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">NID</span><span className="font-heading font-medium text-primary">{formData.owner_id_number}</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Address</span><span className="font-heading font-medium text-primary">{formData.property_address}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Area</span><span className="font-heading font-medium text-primary">{formData.property_area_m2} m²</span></div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handlePrev} disabled={step === 1} className="font-medium">Back</Button>
            {step < 5 ? (
              <Button onClick={handleNext} disabled={step === 1 && !formData.process_type} className="font-medium px-8">Continue</Button>
            ) : (
              <Button className="bg-green-700 hover:bg-green-800 text-white font-medium px-8" onClick={handleSubmit}>Create Dossier</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
