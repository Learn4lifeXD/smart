import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })

async function indexKnowledgeBase() {
  const kbPath = path.join(process.cwd(), 'src/data/knowledge')
  if (!fs.existsSync(kbPath)) {
    console.log('Knowledge base directory not found. Creating...')
    fs.mkdirSync(kbPath, { recursive: true })
    // Create some dummy files
    fs.writeFileSync(path.join(kbPath, 'expropriation-law.md'), 'Ligji per shpronesimin...')
    fs.writeFileSync(path.join(kbPath, 'ekb-privatization-law.md'), 'Ligji per EKB...')
  }

  const files = fs.readdirSync(kbPath)
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.json')) continue

    const content = fs.readFileSync(path.join(kbPath, file), 'utf-8')
    const chunks = content.match(/.{1,500}/g) || []

    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i]
      console.log(`Indexing chunk ${i + 1}/${chunks.length} from source ${file}`)

      try {
        const result = await model.embedContent(chunkText)
        const embedding = result.embedding.values

        await supabase.from('knowledge_chunks').upsert({
          source: file,
          process_type: file.includes('expropriation') ? 'expropriation' : 'ekb_privatization',
          chunk_index: i,
          chunk_text: chunkText,
          embedding: embedding
        }, { onConflict: 'source,chunk_index' })
      } catch (err) {
        console.error(`Error indexing chunk ${i} of ${file}:`, err)
      }
    }
  }
  console.log('Indexing complete.')
}

indexKnowledgeBase()
