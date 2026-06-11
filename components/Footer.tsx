import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Camera,
  PlayCircle,
  ExternalLink,
} from 'lucide-react'

const links = {
  layanan: [
    { label: 'Pengaduan Online', href: '#' },
    { label: 'Perizinan Bangunan (PBG)', href: '#' },
    { label: 'Data Infrastruktur', href: '#' },
    { label: 'Galeri Pembangunan', href: '#' },
  ],
  informasi: [
    { label: 'Profil Dinas', href: '#' },
    { label: 'RPJMD Sumenep', href: '#' },
    { label: 'Regulasi & Peraturan', href: '#' },
    { label: 'Kontak Kami', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="hidden lg:block bg-gray-100 border-t border-gray-200 mt-8">
      <div className="max-w-[1280px] mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
                <Building2 size={18} className="text-black" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#E0A82E]">PUTR SUMENEP</p>
                <p className="text-[9px] text-gray-500">Kota Untuk Kita</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Sumenep. Menata kota dan melayani warga dengan infrastruktur berkualitas.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { Icon: Users, href: '#', label: 'Facebook' },
                { Icon: Camera, href: '#', label: 'Instagram' },
                { Icon: PlayCircle, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#E0A82E] hover:border-[#E0A82E] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-[#E0A82E] uppercase tracking-widest mb-4">
              Kontak
            </h3>
            <ul className="space-y-3 text-xs text-gray-500">
              <li className="flex gap-2">
                <MapPin size={13} className="text-[#E0A82E] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Dr. Cipto No.37, Pajagalan, Kec. Kota Sumenep, Kabupaten Sumenep, Jawa Timur 69417
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-[#E0A82E] flex-shrink-0" />
                <span>(0328) 662420</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[#E0A82E] flex-shrink-0" />
                <span>putr@sumenepkab.go.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={13} className="text-[#E0A82E] flex-shrink-0" />
                <span>sumenepkab.go.id</span>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-xs font-bold text-[#E0A82E] uppercase tracking-widest mb-4">
              Layanan
            </h3>
            <ul className="space-y-2.5">
              {links.layanan.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs text-gray-500 hover:text-[#E0A82E] transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink
                      size={10}
                      className="text-gray-400 group-hover:text-[#E0A82E] transition-colors"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-xs font-bold text-[#E0A82E] uppercase tracking-widest mb-4">
              Informasi
            </h3>
            <ul className="space-y-2.5">
              {links.informasi.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-xs text-gray-500 hover:text-[#E0A82E] transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink
                      size={10}
                      className="text-gray-400 group-hover:text-[#E0A82E] transition-colors"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-[10px] text-gray-400">
            © 2026 Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Sumenep. Semua hak dilindungi.
          </p>
          <p className="text-[10px] text-gray-400">
            Didukung oleh <span className="text-[#E0A82E]">AI PUTR</span> — Kota Untuk Kita
          </p>
        </div>
      </div>
    </footer>
  )
}
