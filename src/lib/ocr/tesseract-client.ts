import Tesseract from 'tesseract.js'

export async function runTesseract(file: File, langs: string[] = ['alb', 'eng']): Promise<{text: string, confidence: number}> {
  const worker = await Tesseract.createWorker(langs.join('+'))
  
  // Create object url
  const imageUrl = URL.createObjectURL(file)
  
  const { data: { text, confidence } } = await worker.recognize(imageUrl)
  
  await worker.terminate()
  URL.revokeObjectURL(imageUrl)
  
  return { text, confidence }
}
