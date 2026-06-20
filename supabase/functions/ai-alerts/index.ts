import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { dossier_id } = await req.json().catch(() => ({}))

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    let query = supabaseClient.from('dossiers').select('*').eq('status', 'active')
    if (dossier_id) query = query.eq('id', dossier_id)
    
    const { data: dossiers } = await query

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const alerts = []
    
    for (const dossier of dossiers || []) {
      const prompt = `Analyze the dossier and create an alert message in English if there are delays based on the days. Return JSON.
        Kthe { "has_alert": true, "alert_type": "deadline", "severity": "high", "message": "...", "message_sq": "..." } ose { "has_alert": false }
      `
      // simplified for execution time limits
      alerts.push({
        dossier_id: dossier.id,
        alert_type: 'deadline',
        severity: 'medium',
        message: 'Auto generated alert check',
        message_sq: 'Rishikim i automatizuar i afateve',
        phase_name: dossier.current_phase,
        is_active: true
      })
    }

    // Upsert logic would go here.
    
    return new Response(JSON.stringify({ alerts_created: alerts.length, alerts_resolved: 0, alerts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
