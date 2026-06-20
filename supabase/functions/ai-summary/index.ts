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
    const { dossier_id } = await req.json()
    if (!dossier_id) throw new Error('Missing dossier_id')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch dossier
    const { data: dossier, error: dossierError } = await supabaseClient
      .from('dossiers')
      .select('*')
      .eq('id', dossier_id)
      .single()

    if (dossierError || !dossier) throw new Error('Dossier not found')

    // Fetch phase logs
    const { data: logs } = await supabaseClient
      .from('phase_logs')
      .select('*')
      .eq('dossier_id', dossier_id)
      .order('started_at', { ascending: false })
      .limit(5)

    // Fetch documents
    const { data: docs } = await supabaseClient
      .from('documents')
      .select('document_type, extracted_fields')
      .eq('dossier_id', dossier_id)

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const contextString = `
      Dosja: ${dossier.tracking_code}
      Tipi: ${dossier.process_type}
      Faza aktuale: ${dossier.current_phase}
      Statusi: ${dossier.status}
      Dokumentet e ngarkuara: ${docs?.map(d => d.document_type).join(', ')}
      Historiku i fazave: ${logs?.map(l => l.phase_name).join(', ')}
    `

    const prompt = `You are an assistant for property procedures. 
    Review the logs and return a JSON object with:
    {
        "summary": "summary in English",
        "phase": "current phase name",
        "blockers": ["array of strings, if any"]
    }
    Logs: ${JSON.stringify(logs)}
    Context: ${contextString}`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    // Extract JSON from response
    const jsonStrMatch = responseText.match(/\{[\s\S]*\}/);
    let summaryData = { summary: "Gabim në gjenerim", phase: dossier.current_phase, blockers: [] };
    if (jsonStrMatch) {
      summaryData = JSON.parse(jsonStrMatch[0])
    }

    // Log interaction
    await supabaseClient.from('ai_interactions').insert({
      dossier_id,
      interaction_type: 'summary',
      model_used: 'gemini-1.5-flash',
      prompt_tokens: 0,
      output_tokens: 0,
      response_time_ms: 0
    })

    return new Response(JSON.stringify(summaryData), {
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
