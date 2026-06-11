'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Send, ChevronRight, Zap } from 'lucide-react'
import { quickChips } from '@/data/putr'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: 'assistant',
  content:
    'Halo! Saya AI PUTR Sumenep 👋\n\nSaya siap membantu pertanyaan Anda mengenai pembangunan infrastruktur di Kabupaten Sumenep. Tanyakan tentang jalan, jembatan, embung, irigasi, dan lainnya!',
  timestamp: new Date(),
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3 bubble-bot w-fit max-w-[80%]">
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
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

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
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
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
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            }
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
            content:
              'Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi atau pastikan API key sudah dikonfigurasi.',
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

  const handleChip = (chip: string) => {
    sendMessage(chip)
  }

  return (
    <section className="px-4 lg:px-0 py-4 lg:py-8">
      {/* Section title */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 flex-shrink-0">
            <Image
              src="/images/robot.jpeg"
              alt="AI PUTR"
              fill
              className="object-cover rounded-full border border-[#E0A82E]"
            />
          </div>
          <h2 className="text-sm lg:text-base font-bold text-white">Chat AI PUTR</h2>
        </div>
        <button className="flex items-center gap-1 text-[10px] text-[#E0A82E] hover:text-[#F0B83C] transition-colors">
          Lihat semua <ChevronRight size={12} />
        </button>
      </div>

      {/* ── Main layout: 1 col mobile, 2 col desktop ── */}
      <div className="grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-4">

        {/* Left: chat area */}
        <div className="card-dark rounded-2xl overflow-hidden flex flex-col" style={{ height: '420px' }}>
          {/* Chat header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[rgba(224,168,46,0.12)]">
            <div className="relative w-8 h-8">
              <Image
                src="/images/robot.jpeg"
                alt="AI PUTR"
                fill
                className="object-cover rounded-full border-2 border-[#E0A82E] animate-float"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">AI PUTR Sumenep</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] lg:max-w-[75%] px-3.5 py-2.5 text-xs leading-relaxed
                    ${msg.role === 'user' ? 'bubble-user font-medium' : 'bubble-bot'}
                    whitespace-pre-wrap
                  `}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-gray-600 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* Quick chips (mobile: inside chat) */}
          <div className="lg:hidden px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                disabled={isLoading}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(224,168,46,0.25)] text-[9px] text-[#E0A82E] hover:bg-[rgba(224,168,46,0.08)] transition-all disabled:opacity-40"
              >
                <Zap size={9} />
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(224,168,46,0.12)]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan di sini..."
              disabled={isLoading}
              className="
                flex-1 bg-[#1a1a1a] border border-[rgba(224,168,46,0.15)] rounded-xl
                px-3.5 py-2 text-xs text-white placeholder-gray-600
                focus:outline-none focus:border-[rgba(224,168,46,0.5)] transition-all
                disabled:opacity-50
              "
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="
                w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center
                shadow-gold hover:shadow-gold-lg transition-all hover:scale-105
                disabled:opacity-40 disabled:scale-100 flex-shrink-0
              "
            >
              <Send size={15} className="text-black" />
            </button>
          </form>
        </div>

        {/* Right: sidebar (desktop only) */}
        <div className="hidden lg:flex flex-col gap-3">
          {/* Quick prompts */}
          <div className="card-dark rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#E0A82E] mb-3 flex items-center gap-1.5">
              <Zap size={12} />
              Pertanyaan Populer
            </p>
            <div className="flex flex-col gap-2">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  disabled={isLoading}
                  className="
                    text-left text-[11px] text-gray-300 hover:text-white
                    px-3 py-2.5 rounded-xl border border-[rgba(224,168,46,0.12)]
                    hover:border-[rgba(224,168,46,0.35)] hover:bg-[#181818]
                    transition-all leading-snug disabled:opacity-40
                  "
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Topik tersedia */}
          <div className="card-dark rounded-2xl p-4 flex-1">
            <p className="text-xs font-semibold text-[#E0A82E] mb-3">Topik Tersedia</p>
            <ul className="space-y-2 text-[11px] text-gray-400">
              {[
                'Data Jalan Kabupaten',
                'Data Jembatan & Kondisi',
                'Program Embung 2024',
                'Irigasi & Pertanian',
                'PBG & Perizinan',
                'RPJMD Sumenep',
                'Regulasi Konstruksi',
                'Jadwal Proyek',
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 hover:text-[#E0A82E] cursor-pointer transition-colors"
                  onClick={() => handleChip(`Informasi tentang ${t}?`)}
                >
                  <span className="w-1 h-1 rounded-full bg-[#E0A82E] flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
