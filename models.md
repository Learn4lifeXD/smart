# Usable Gemini Models

This document lists the currently usable Gemini models and features based on active quota allocations (models with a non-zero or "Unlimited" limit).

## Text-Out & Multi-modal Models

| Model | Category | Requests Per Minute (RPM) | Tokens Per Minute (TPM) | Requests Per Day (RPD) |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini 2.5 Flash** | Text-out models | 5 | 250K | 20 |
| **Gemini 3.5 Flash** | Text-out models | 5 | 250K | 20 |
| **Gemini 2.5 Flash Lite** | Text-out models | 10 | 250K | 20 |
| **Gemini 3 Flash** | Text-out models | 5 | 250K | 20 |
| **Gemini 3.1 Flash Lite** | Text-out models | 15 | 250K | 500 |
| **Gemma 4 26B** | Other models | 15 | Unlimited | 1.5K |
| **Gemma 4 31B** | Other models | 15 | Unlimited | 1.5K |

## Audio & TTS Models

| Model | Category | Requests Per Minute (RPM) | Tokens Per Minute (TPM) | Requests Per Day (RPD) |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini 2.5 Flash TTS** | Multi-modal generative | 3 | 10K | 10 |
| **Gemini 3.1 Flash TTS** | Multi-modal generative | 3 | 10K | 10 |

## Live API Models

| Model | Category | Requests Per Minute (RPM) | Tokens Per Minute (TPM) | Requests Per Day (RPD) |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini 2.5 Flash Native Audio Dialog** | Live API | Unlimited | 1M | Unlimited |
| **Gemini 3 Flash Live** | Live API | Unlimited | 65K | Unlimited |
| **Gemini 3.5 Live Translate** | Live API | Unlimited | 20K | Unlimited |

## Image Generation Models

| Model | Category | Requests Per Day (RPD) |
| :--- | :--- | :--- |
| **Imagen 4 Fast Generate** | Multi-modal generative | 25 |
| **Imagen 4 Generate** | Multi-modal generative | 25 |
| **Imagen 4 Ultra Generate** | Multi-modal generative | 25 |

## Embeddings & Robotics

| Model | Category | Requests Per Minute (RPM) | Tokens Per Minute (TPM) | Requests Per Day (RPD) |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini Embedding 1** | Other models | 100 | 30K | 1K |
| **Gemini Embedding 2** | Other models | 100 | 30K | 1K |
| **Gemini Robotics ER 1.5 Preview**| Other models | 10 | 250K | 20 |
| **Gemini Robotics ER 1.6 Preview**| Other models | 5 | 250K | 20 |

---

## Usable Tools & Grounding Features

These tools currently have active daily limits, meaning they are available for use:

### Map Grounding (500 Requests / Day)
- Deep Research Pro Preview
- Gemini 2 Flash
- Computer Use Preview
- Gemini 2.5 Flash
- Gemini 2.5 Flash Lite
- Gemini 3.1 Flash Lite
- Gemini 3.1 Flash TTS
- Gemini Robotics ER 1.6 Preview

### Search Grounding (1.5K Requests / Day)
- Gemini 2
- Gemini 2.5
- Default
