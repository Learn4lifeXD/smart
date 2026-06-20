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
    const { dossier_id, process_type } = await req.json()
    if (!dossier_id || !process_type) throw new Error('Missing parameters')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: dossier, error: dossierError } = await supabaseClient
      .from('dossiers')
      .select('*')
      .eq('id', dossier_id)
      .single()

    if (dossierError || !dossier) throw new Error('Dossier not found')

    // Read process def (In production, this would be read from DB or via fetch if hosted. We will simulate it).
    // Let's assume we pass the process definitions to prompt directly or we have a hardcoded version for edge.
    // For this edge function, we will query Gemini and let it figure out based on the phase.
    
    const { data: docs } = await supabaseClient
      .from('documents')
      .select('document_type')
      .eq('dossier_id', dossier_id)

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
      Bazuar në fazën aktuale dhe dokumentet e ngarkuara, cili është hapi konkret tjetër? 
      Jep 1 veprim specifik, jo listë të gjatë.
      
      Faza aktuale: ${dossier.current_phase}
      Tipi procedurës: ${process_type}
      Dokumentet e ngarkuara: ${docs?.map(d => d.document_type).join(', ')}
      
      Kthe vetëm JSON me këtë strukturë ekzakte:
      {
        "next_action": "Specific action in English",
        "next_action_en": "English translation of action",
        "missing_documents": ["document_type_1", "document_type_2"],
        "responsible_institution": "Emri i institucionit",
        "estimated_days": 15,
        "urgency": "medium"
      }
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    const jsonStrMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonStrMatch) throw new Error('Invalid JSON from AI')
    const responseData = JSON.parse(jsonStrMatch[0])

    await supabaseClient.from('ai_interactions').insert({
      dossier_id,
      interaction_type: 'next_step',
      model_used: 'gemini-1.5-flash',
      prompt_tokens: 0,
      output_tokens: 0,
      response_time_ms: 0
    })

    return new Response(JSON.stringify(responseData), {
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
