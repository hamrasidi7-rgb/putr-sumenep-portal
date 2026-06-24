'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* ── Data marker infrastruktur Sumenep ── */
const MARKERS = [
  {
    id: 'jl-1',
    type: 'JALAN',
    label: 'Jalan Raya Sumenep – Pamekasan',
    desc: 'Panjang ±12,4 km · Kondisi baik',
    lat: -7.0500, lng: 113.7600,
    color: '#3B82F6',
  },
  {
    id: 'jl-2',
    type: 'JALAN',
    label: 'Jalan Lingkar Kota Sumenep',
    desc: 'Panjang ±8,2 km · Kondisi sedang',
    lat: -7.0050, lng: 113.8450,
    color: '#3B82F6',
  },
  {
    id: 'jl-3',
    type: 'JALAN',
    label: 'Jalan Arteri Pusat Kota',
    desc: 'Panjang ±5,6 km · Kondisi baik',
    lat: -7.0150, lng: 113.8800,
    color: '#3B82F6',
  },
  {
    id: 'jb-1',
    type: 'JEMBATAN',
    label: 'Jembatan Kali Marengan',
    desc: 'Bentang 45 m · Kelas A',
    lat: -7.0200, lng: 113.8700,
    color: '#F59E0B',
  },
  {
    id: 'jb-2',
    type: 'JEMBATAN',
    label: 'Jembatan Talango',
    desc: 'Jembatan penyeberangan pulau',
    lat: -7.0550, lng: 113.9500,
    color: '#F59E0B',
  },
  {
    id: 'jb-3',
    type: 'JEMBATAN',
    label: 'Jembatan Kalianget',
    desc: 'Bentang 30 m · Kelas B',
    lat: -7.0420, lng: 113.9420,
    color: '#F59E0B',
  },
  {
    id: 'em-1',
    type: 'EMBUNG',
    label: 'Embung Kebonagung',
    desc: 'Kapasitas ±250.000 m³',
    lat: -7.0800, lng: 113.8200,
    color: '#06B6D4',
  },
  {
    id: 'em-2',
    type: 'EMBUNG',
    label: 'Embung Rubaru',
    desc: 'Kapasitas ±180.000 m³',
    lat: -7.1500, lng: 113.8500,
    color: '#06B6D4',
  },
  {
    id: 'em-3',
    type: 'EMBUNG',
    label: 'Embung Manding',
    desc: 'Kapasitas ±120.000 m³',
    lat: -7.1650, lng: 113.8150,
    color: '#06B6D4',
  },
]

const ABBR: Record<string, string> = { JALAN: 'JL', JEMBATAN: 'JB', EMBUNG: 'EM' }

function createIcon(type: string, color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};width:38px;height:38px;border-radius:50%;
      border:2.5px solid #E0A82E;display:flex;align-items:center;
      justify-content:center;color:#fff;font-size:10px;font-weight:800;
      font-family:sans-serif;box-shadow:0 0 14px ${color}80,0 0 0 3px #E0A82E30;
    ">${ABBR[type]}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -24],
  })
}

const LEGEND = [
  { abbr: 'JL', label: 'Jalan', color: '#3B82F6' },
  { abbr: 'JB', label: 'Jembatan', color: '#F59E0B' },
  { abbr: 'EM', label: 'Embung', color: '#06B6D4' },
]

export default function MapClient() {
  useEffect(() => {
    /* hapus cache icon default Leaflet yang broken di webpack */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Override popup style agar dark */}
      <style>{`
        .leaflet-popup-content-wrapper{
          background:#1e2535!important;
          border:1px solid rgba(224,168,46,.3)!important;
          border-radius:12px!important;
          box-shadow:0 6px 24px rgba(0,0,0,.5)!important;
          padding:0!important;
        }
        .leaflet-popup-tip{ background:#1e2535!important; }
        .leaflet-popup-content{ margin:0!important; }
        .leaflet-control-zoom a{
          background:#1e2535!important;color:#E0A82E!important;
          border-color:rgba(224,168,46,.3)!important;
        }
        .leaflet-control-zoom a:hover{ background:#E0A82E!important;color:#000!important; }
        .leaflet-control-attribution{
          background:rgba(13,15,20,.8)!important;color:#6b7280!important;font-size:9px!important;
        }
        .leaflet-control-attribution a{ color:#E0A82E!important; }
      `}</style>

      <MapContainer
        center={[-7.0167, 113.8667]}
        zoom={11}
        zoomControl={false}
        style={{ width: '100%', height: '100%', background: '#0d0f14' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          maxZoom={19}
        />

        <ZoomControl position="bottomright" />

        {MARKERS.map(({ id, type, label, desc, lat, lng, color }) => (
          <Marker key={id} position={[lat, lng]} icon={createIcon(type, color)}>
            <Popup>
              <div style={{ padding: '12px 14px', minWidth: 200 }}>
                <span style={{ color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {type}
                </span>
                <p style={{ margin: '5px 0 4px', fontWeight: 700, fontSize: 13, color: '#f3f4f6', lineHeight: 1.3 }}>
                  {label}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div
        className="absolute top-4 left-4 z-[1000] rounded-2xl px-4 py-3 flex flex-col gap-2"
        style={{ background: 'rgba(13,15,20,0.85)', border: '1px solid rgba(224,168,46,0.25)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-[10px] font-bold text-[#E0A82E] tracking-widest uppercase mb-1">Keterangan</p>
        {LEGEND.map(({ abbr, label, color }) => (
          <div key={abbr} className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-extrabold flex-shrink-0"
              style={{ background: color, border: '1.5px solid #E0A82E' }}
            >
              {abbr}
            </div>
            <span className="text-xs text-gray-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
