'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Send, AlertTriangle, ArrowLeftRight, Droplets, Lightbulb, TreePine, MessageSquare } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const AVATAR = '/images/CHAT PENGADUAN PUTR SUMENEP (2).jpeg'

const GREETING: Message = {
  id: 0,
  role: 'assistant',
  content: `Selamat Datang di Chat AI Pengaduan PUTR Sumenep

👋 Assalamu'alaikum Warahmatullahi Wabarakatuh.

Selamat datang di Chat AI Pengaduan PUTR Sumenep, layanan digital yang membantu masyarakat Kabupaten Sumenep menyampaikan pengaduan, usulan, maupun informasi terkait infrastruktur dan pelayanan publik secara cepat, mudah, dan responsif.

Melalui layanan ini, Anda dapat melaporkan berbagai permasalahan seperti:
🚧 Jalan rusak atau berlubang
🌉 Jembatan rusak
🚰 Saluran drainase tersumbat atau rusak
💡 Penerangan jalan umum (PJU) padam
🌳 Pohon tumbang atau membahayakan
🚮 Persoalan infrastruktur umum lainnya yang menjadi kewenangan PUTR Sumenep

Cukup ketik laporan Anda secara singkat, sertakan lokasi kejadian, foto (jika ada), serta keterangan pendukung, maka sistem AI akan membantu mengarahkan laporan Anda agar dapat diteruskan kepada petugas yang berwenang.`,
  timestamp: new Date(),
}

const TOPICS = [
  {
    id: 'jalan-rusak',
    label: 'JALAN RUSAK',
    Icon: AlertTriangle,
    color: '#3B82F6',
    bg: '#EFF6FF',
    query: 'Saya ingin melaporkan jalan rusak atau berlubang. Mohon bantu saya menyampaikan pengaduan ini.',
  },
  {
    id: 'jembatan',
    label: 'JEMBATAN RUSAK',
    Icon: ArrowLeftRight,
    color: '#F59E0B',
    bg: '#FFFBEB',
    query: 'Saya ingin melaporkan kerusakan jembatan di wilayah Sumenep. Mohon bantu saya.',
  },
  {
    id: 'drainase',
    label: 'DRAINASE RUSAK',
    Icon: Droplets,
    color: '#06B6D4',
    bg: '#ECFEFF',
    query: 'Saya ingin melaporkan saluran drainase yang tersumbat atau rusak.',
  },
  {
    id: 'pju',
    label: 'PJU PADAM',
    Icon: Lightbulb,
    color: '#EAB308',
    bg: '#FEFCE8',
    query: 'Saya ingin melaporkan penerangan jalan umum (PJU) yang padam atau tidak berfungsi.',
  },
  {
    id: 'pohon',
    label: 'POHON TUMBANG',
    Icon: TreePine,
    color: '#10B981',
    bg: '#ECFDF5',
    query: 'Saya ingin melaporkan pohon tumbang atau pohon yang membahayakan warga.',
  },
  {
    id: 'lainnya',
    label: 'LAINNYA',
    Icon: MessageSquare,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    query: 'Saya ingin melaporkan persoalan infrastruktur umum lainnya yang menjadi kewenangan PUTR Sumenep.',
  },
]

function formatTime(date: Date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3 bubble-bot w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-1.5 h-1.5 rounded-full bg-[#E0A82E] block"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function ChatAIPUTR() {
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return
      setChatStarted(true)

      const userMsg: Message = {
        id: Date.now(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsLoading(true)

      try {
        const history = [...messages, userMsg]
          .filter((m) => m.id !== 0)
          .map((m) => ({ role: m.role, content: m.content }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        if (!res.ok || !res.body) throw new Error('API error')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        const botMsg: Message = { id: Date.now() + 1, role: 'assistant', content: '', timestamp: new Date() }

        setIsLoading(false)
        setMessages((prev) => [...prev, botMsg])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
            return updated
          })
        }
      } catch {
        setIsLoading(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            role: 'assistant',
            content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
            timestamp: new Date(),
          },
        ])
      }
    },
    [isLoading, messages],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <section id="chat-pengaduan" className="px-4 lg:px-8 py-10 lg:py-14" style={{ background: '#0d0f14' }}>
      <div className="max-w-[860px] mx-auto">

        {/* ── Banner header ── */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: 100 }}>
          <Image
            src={AVATAR}
            alt="Chat Pengaduan PUTR Sumenep"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* ── Greeting bubble ── */}
        <div className="flex items-start gap-3 mb-6">
          <div className="relative w-10 h-10 flex-shrink-0 mt-0.5 rounded-full overflow-hidden border-2 border-[#E0A82E]">
            <Image src={AVATAR} alt="AI" fill className="object-cover object-right" />
          </div>
          <div
            className="px-4 py-4 text-sm leading-relaxed max-w-xl whitespace-pre-line rounded-[18px_18px_18px_4px] border"
            style={{
              background: '#1a1d26',
              borderColor: 'rgba(224,168,46,0.2)',
              color: '#e5e7eb',
            }}
          >
            {GREETING.content}
          </div>
        </div>

        {/* ── Topic chips ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {TOPICS.map(({ id, label, Icon, color, bg, query }) => (
            <button
              key={id}
              onClick={() => sendMessage(query)}
              disabled={isLoading}
              className="rounded-2xl p-3.5 flex flex-col items-center gap-2 text-center hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
              style={{
                background: '#1a1d26',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: bg, border: `1px solid ${color}30` }}
              >
                <Icon size={18} style={{ color }} strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-bold text-gray-300 tracking-wide leading-tight">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Chat messages ── */}
        {chatStarted && (
          <div
            ref={scrollRef}
            className="rounded-2xl p-4 space-y-4 mb-4 overflow-y-auto no-scrollbar border"
            style={{ maxHeight: 420, background: '#111318', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {messages.slice(1).map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user' ? 'bubble-user font-medium' : 'bubble-bot'}`}>
                  {msg.content}
                </div>
                <span className="text-[9px] text-gray-600 mt-1 px-1">{formatTime(msg.timestamp)}</span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="relative w-7 h-7 flex-shrink-0 rounded-full overflow-hidden border border-[#E0A82E]">
                  <Image src={AVATAR} alt="AI" fill className="object-cover object-right" />
                </div>
                <TypingIndicator />
              </div>
            )}
          </div>
        )}

        {/* ── Input ── */}
        <form onSubmit={handleSubmit}>
          <div
            className="flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all"
            style={{ background: '#1a1d26', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden border border-[#E0A82E]">
              <Image src={AVATAR} alt="AI" fill className="object-cover object-right" />
            </div>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik laporan pengaduan Anda di sini..."
              disabled={isLoading}
              className="flex-1 text-sm placeholder-gray-600 bg-transparent outline-none disabled:opacity-50"
              style={{ color: '#e5e7eb' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100 flex-shrink-0"
            >
              <Send size={14} className="text-black" />
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}
