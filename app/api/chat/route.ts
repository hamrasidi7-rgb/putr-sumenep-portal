import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Kamu adalah AI PUTR Sumenep, asisten cerdas Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Sumenep.

DATA PUTR SUMENEP:
- Panjang Jalan Kabupaten: 1.256,45 km
- Jumlah Jembatan: 312 unit
- Jumlah Embung: 158 unit
- Luas Irigasi: 1.124 ha
- PBG Terbit: 645 unit

Tugasmu: Menjawab pertanyaan warga tentang infrastruktur, pembangunan, dan layanan PUTR Sumenep dengan ramah, jelas, dan informatif. Gunakan data di atas jika relevan.`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
