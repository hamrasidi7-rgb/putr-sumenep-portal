import Image from 'next/image'
import { quickTopics } from '@/data/putr'

export default function QuickTopics() {
  return (
    <section className="px-4 lg:px-0 py-6 lg:py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5 lg:mb-7">
        <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
          <Image
            src="/images/robot.jpeg"
            alt="AI PUTR mascot"
            fill
            className="object-cover rounded-full border-2 border-[#E0A82E] shadow-gold"
          />
        </div>
        <div>
          <h2 className="text-sm lg:text-base font-bold text-[#E0A82E] tracking-wide">
            AI PUTR SUMENEP
          </h2>
          <p className="text-xs text-gray-400">
            Halo! Saya AI PUTR Sumenep. Silakan pilih topik atau ketik pertanyaan Anda.
          </p>
        </div>
      </div>

      {/* Grid: 2 col mobile → 5 col desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 lg:gap-3">
        {quickTopics.map(({ id, label, Icon, color }) => (
          <button
            key={id}
            className="
              group card-dark p-3 lg:p-4 rounded-2xl flex flex-col items-center gap-2 text-center
              hover:border-[rgba(224,168,46,0.4)] hover:bg-[#161616] hover:-translate-y-0.5
              hover:shadow-gold transition-all duration-200
            "
          >
            <div
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon size={20} style={{ color }} strokeWidth={1.8} />
            </div>
            <span className="text-[10px] lg:text-xs text-gray-300 group-hover:text-white leading-tight font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
