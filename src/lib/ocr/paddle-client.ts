export async function callPaddleOCR(file: File): Promise<{text: string, confidence: number}> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(process.env.NEXT_PUBLIC_PADDLE_OCR_URL + '/ocr', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('PaddleOCR service failed')
  }

  const data = await response.json()
  return {
    text: data.text || '',
    confidence: data.confidence || 0
  }
}
