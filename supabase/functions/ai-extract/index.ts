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
    const { document_text, document_type, process_type, phase_id } = await req.json()
    if (!document_text || !document_type) throw new Error('Missing parameters')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
      Extract the following fields from this property document text in English.
      Tipi dokumentit: ${document_type}
      
      Kthe VETËM JSON të vlefshëm. 
      Për çdo fushë, jep edhe 'confidence' (0.0-1.0).
      Nëse fusha nuk gjendet, kthe null për vlerën.
      
      Struktura e pritur JSON:
      {
        "fields": {
          "emer_fushe": { "value": "vlera_e_gjetur", "confidence": 0.95 }
        },
        "overall_confidence": 0.90,
        "raw_extraction": "teksti ose shenime"
      }
      
      Teksti:
      ${document_text.substring(0, 5000)}
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    const jsonStrMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonStrMatch) throw new Error('Invalid JSON from AI')
    const responseData = JSON.parse(jsonStrMatch[0])

    await supabaseClient.from('ai_interactions').insert({
      interaction_type: 'extraction',
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
