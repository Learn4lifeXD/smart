import { extractPDFTextLayer } from './pdf-extractor'
import { runTesseract } from './tesseract-client'
import { callPaddleOCR } from './paddle-client'

export interface OCRResult {
  text: string
  method: 'pdf_text_layer' | 'tesseract' | 'paddleocr'
  confidence: number
}

export async function processDocument(file: File): Promise<OCRResult> {
  // STEP 1: If PDF — try text layer first (fastest, most accurate)
  if (file.type === 'application/pdf') {
    try {
      const textLayerResult = await extractPDFTextLayer(file)
      if (textLayerResult.text && textLayerResult.text.length > 100) {
        return { text: textLayerResult.text, method: 'pdf_text_layer', confidence: 0.99 }
      }
    } catch (e) {
      console.warn('PDF text layer extraction failed', e)
    }
  }
  
  // STEP 2: Tesseract.js (client-side, Albanian language pack)
  try {
    const tesseractResult = await runTesseract(file, ['alb', 'eng'])
    if (tesseractResult.confidence > 70) {
      return { text: tesseractResult.text, method: 'tesseract', confidence: tesseractResult.confidence / 100 }
    }
  } catch (e) {
    console.warn('Tesseract failed', e)
  }
  
  // STEP 3: PaddleOCR microservice (better accuracy for low-quality scans)
  // We use this as a fallback.
  try {
    const paddleResult = await callPaddleOCR(file)
    return { text: paddleResult.text, method: 'paddleocr', confidence: paddleResult.confidence }
  } catch (e) {
    console.warn('PaddleOCR failed', e)
    // Absolute fallback: return empty or whatever tesseract gave
    return { text: 'OCR failed or returned low confidence.', method: 'tesseract', confidence: 0 }
  }
}
