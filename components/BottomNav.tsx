'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navItems } from '@/data/putr'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-t border-gray-200 shadow-lg safe-area-bottom">
      <div className="flex items-stretch h-16">
        {navItems.map(({ id, label, Icon, href }) => {
          const isActive = pathname === href || (href === '/' && pathname === '/')
          return (
            <Link
              key={id}
              href={href}
              className={`
                flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-all
                ${
                  isActive
                    ? 'text-[#E0A82E]'
                    : 'text-gray-400 hover:text-gray-700'
                }
              `}
            >
              <div
                className={`
                  w-8 h-5 flex items-center justify-center rounded-full transition-all
                  ${isActive ? 'bg-[rgba(224,168,46,0.12)]' : ''}
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? 'text-[#E0A82E]' : ''}
                />
              </div>
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
      <div className="h-safe-bottom bg-white" />
    </nav>
  )
}
