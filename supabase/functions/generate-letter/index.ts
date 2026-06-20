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
    const { dossier_id, letter_type, additional_context } = await req.json()
    if (!dossier_id || !letter_type) throw new Error('Missing params')

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `
      You are a legal specialist for property procedures.
      Generate an official state letter in English.
      Lloji letrës: ${letter_type}
      
      Kthe JSON:
      {
        "letter_content": "Teksti i plote...",
        "letter_type": "...",
        "reference_number": "REF-1234",
        "generated_at": "2024-01-01T00:00:00Z"
      }
    `
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    const jsonStrMatch = responseText.match(/\{[\s\S]*\}/);
    let responseData = { letter_content: "Gabim", letter_type, reference_number: "ERR", generated_at: new Date().toISOString() };
    if (jsonStrMatch) {
      responseData = JSON.parse(jsonStrMatch[0])
    }

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
