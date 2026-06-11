'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Send, Navigation, ArrowLeftRight, Droplets, Building2, Map, FlaskConical } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const GREETING: Message = {
  id: 0,
  role: 'assistant',
  content: 'Halo!\nSaya AI PUTR Sumenep.\nSilakan pilih topik atau ketik pertanyaan Anda mengenai pembangunan Kabupaten Sumenep.',
  timestamp: new Date(),
}

const TOPICS = [
  {
    id: 'jalan',
    label: 'JALAN',
    Icon: Navigation,
    color: '#3B82F6',
    bg: '#EFF6FF',
    query: 'Ceritakan informasi tentang kondisi jalan kabupaten di Sumenep.',
  },
  {
    id: 'jembatan',
    label: 'JEMBATAN',
    Icon: ArrowLeftRight,
    color: '#F59E0B',
    bg: '#FFFBEB',
    query: 'Ceritakan informasi tentang jembatan di Kabupaten Sumenep.',
  },
  {
    id: 'drainase',
    label: 'DRAINASE',
    Icon: Droplets,
    color: '#06B6D4',
    bg: '#ECFEFF',
    query: 'Ceritakan informasi tentang sistem drainase di Kabupaten Sumenep.',
  },
  {
    id: 'gedung',
    label: 'GEDUNG',
    Icon: Building2,
    color: '#10B981',
    bg: '#ECFDF5',
    query: 'Ceritakan informasi tentang gedung dan bangunan pemerintah di Sumenep.',
  },
  {
    id: 'tata-ruang',
    label: 'TATA RUANG',
    Icon: Map,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    query: 'Ceritakan informasi tentang tata ruang dan perencanaan wilayah Kabupaten Sumenep.',
  },
  {
    id: 'peralatan-lab',
    label: 'PERALATAN & LABORATORIUM',
    Icon: FlaskConical,
    color: '#F43F5E',
    bg: '#FFF1F2',
    query: 'Ceritakan informasi tentang peralatan dan laboratorium yang dimiliki PUTR Sumenep.',
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

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Terima pesan dari hero quick-input
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      sendMessage(e.detail as string)
    }
    window.addEventListener('hero-query', handler as EventListener)
    return () => window.removeEventListener('hero-query', handler as EventListener)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          .filter((m) => m.id !== 0) // exclude greeting from API call context
          .map((m) => ({ role: m.role, content: m.content }))

        // Always include greeting context for the API
        const apiMessages = [
          ...history,
        ]

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        })

        if (!res.ok || !res.body) throw new Error('API error')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        const botMsg: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        }

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
            content: 'Maaf, terjadi kesalahan. Silakan coba lagi atau pastikan API key sudah dikonfigurasi.',
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
    <section id="ai-putr" className="px-4 lg:px-0 py-10 lg:py-16">
      <div className="max-w-[860px] mx-auto">

        {/* ── Section heading ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/robot.jpeg"
              alt="AI PUTR"
              fill
              className="object-cover rounded-full border-2 border-[#E0A82E] shadow-gold animate-float"
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Section</p>
            <h2 className="text-lg lg:text-xl font-extrabold text-gray-900 tracking-wide">
              AI PUTR <span className="text-gold-gradient">SUMENEP</span>
            </h2>
          </div>
        </div>

        {/* ── Bot greeting bubble ── */}
        <div className="flex items-start gap-3 mb-6">
          <div className="relative w-8 h-8 flex-shrink-0 mt-0.5">
            <Image
              src="/images/robot.jpeg"
              alt="AI"
              fill
              className="object-cover rounded-full border-2 border-[#E0A82E]"
            />
          </div>
          <div className="bubble-bot px-4 py-3 text-sm leading-relaxed max-w-sm lg:max-w-md whitespace-pre-line">
            {GREETING.content}
          </div>
        </div>

        {/* ── Topic Cards Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {TOPICS.map(({ id, label, Icon, color, bg, query }) => (
            <button
              key={id}
              onClick={() => sendMessage(query)}
              disabled={isLoading}
              className="
                group card-dark rounded-2xl p-4 flex flex-col items-center gap-2.5 text-center
                hover:border-[rgba(224,168,46,0.4)] hover:bg-gray-50 hover:-translate-y-1
                hover:shadow-gold transition-all duration-200 disabled:opacity-50
              "
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: bg, border: `1px solid ${color}30` }}
              >
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </div>
              <span className="text-[11px] lg:text-xs font-bold text-gray-700 group-hover:text-gray-900 tracking-wide leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Chat messages (muncul setelah ada percakapan) ── */}
        {chatStarted && (
          <div
            ref={scrollRef}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4 mb-4 overflow-y-auto no-scrollbar"
            style={{ maxHeight: '420px' }}
          >
            {messages.slice(1).map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-2.5 text-sm leading-relaxed
                    ${msg.role === 'user' ? 'bubble-user font-medium' : 'bubble-bot'}
                    whitespace-pre-wrap
                  `}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src="/images/robot.jpeg" alt="AI" fill className="object-cover rounded-full border border-[#E0A82E]" />
                </div>
                <TypingIndicator />
              </div>
            )}
          </div>
        )}

        {/* ── Input ── */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200
            shadow-sm px-4 py-3 hover:border-[rgba(224,168,46,0.4)] transition-all">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image src="/images/robot.jpeg" alt="AI" fill className="object-cover rounded-full border border-[#E0A82E]" />
            </div>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan di sini..."
              disabled={isLoading}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center
                shadow-gold hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100 flex-shrink-0"
            >
              <Send size={14} className="text-black" />
            </button>
          </div>
        </form>

      </div>
    </section>
  )
}
