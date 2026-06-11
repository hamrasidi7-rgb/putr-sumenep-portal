import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Kamu adalah AI Pengaduan PUTR Sumenep, asisten digital resmi Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Sumenep yang bertugas menerima dan membantu warga menyampaikan pengaduan infrastruktur.

KATEGORI PENGADUAN YANG DITANGANI:
- Jalan rusak atau berlubang
- Jembatan rusak atau membahayakan
- Saluran drainase tersumbat atau rusak
- Penerangan Jalan Umum (PJU) padam atau rusak
- Pohon tumbang atau membahayakan
- Infrastruktur umum lainnya di bawah kewenangan PUTR Sumenep

CARA MERESPONS:
1. Sambut warga dengan ramah dan sopan
2. Identifikasi jenis pengaduan yang dilaporkan
3. Tanyakan detail yang diperlukan: lokasi kejadian (desa/kelurahan, kecamatan), deskripsi kondisi, sudah berapa lama, apakah ada korban/bahaya
4. Ringkas laporan secara terstruktur dan berikan nomor referensi laporan (format: PUTR-2026-XXXX, isi XXXX dengan angka acak 4 digit)
5. Informasikan bahwa laporan akan diteruskan ke petugas berwenang dan berikan estimasi tindak lanjut (1–3 hari kerja untuk laporan darurat, 7–14 hari kerja untuk pemeliharaan rutin)
6. Ucapkan terima kasih atas laporan warga

Gunakan bahasa Indonesia yang ramah, sopan, dan mudah dipahami. Jika warga menyebutkan kondisi darurat atau membahayakan jiwa, prioritaskan dan minta segera menghubungi call center darurat PUTR Sumenep.`

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
