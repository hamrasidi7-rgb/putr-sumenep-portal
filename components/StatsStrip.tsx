import { statistics } from '@/data/putr'

export default function StatsStrip() {
  return (
    <section className="py-4 lg:py-8">
      {/* Mobile: horizontal scroll strip */}
      <div className="lg:hidden flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
        {statistics.map(({ value, unit, label, Icon }) => (
          <div
            key={label}
            className="card-dark flex-shrink-0 w-36 rounded-2xl p-3.5 flex flex-col gap-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[rgba(224,168,46,0.1)] border border-[rgba(224,168,46,0.2)] flex items-center justify-center">
              <Icon size={15} className="text-[#E0A82E]" strokeWidth={1.8} />
            </div>
            <div className="mt-0.5">
              <span className="text-xl font-extrabold text-gold-gradient">{value}</span>
              <span className="text-[10px] text-[#E0A82E] ml-1 font-semibold">{unit}</span>
            </div>
            <p className="text-[9px] text-gray-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Desktop: 5 columns */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4">
        {statistics.map(({ value, unit, label, Icon }, i) => (
          <div
            key={label}
            className="
              card-dark rounded-2xl p-5 flex flex-col gap-2
              hover:border-[rgba(224,168,46,0.35)] hover:bg-gray-50 hover:-translate-y-0.5
              hover:shadow-gold transition-all duration-200
            "
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-10 h-10 rounded-xl bg-[rgba(224,168,46,0.1)] border border-[rgba(224,168,46,0.2)] flex items-center justify-center">
              <Icon size={18} className="text-[#E0A82E]" strokeWidth={1.8} />
            </div>
            <div className="mt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl xl:text-3xl font-extrabold text-gold-gradient leading-none">
                  {value}
                </span>
                <span className="text-xs text-[#E0A82E] font-bold">{unit}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
