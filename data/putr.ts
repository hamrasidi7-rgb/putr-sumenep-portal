import {
  Route,
  Droplets,
  LayoutGrid,
  Building2,
  HardHat,
  FlaskConical,
  BarChart3,
  Camera,
  FileText,
  Map,
  AlertTriangle,
  Lightbulb,
  Waves,
  Trash2,
  Construction,
  MoreHorizontal,
  Home,
  User,
  Building,
  Database,
  Bot,
  ArrowLeftRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface QuickTopic {
  id: string
  label: string
  Icon: LucideIcon
  color: string
  href: string
}

export interface PengaduanCategory {
  id: string
  label: string
  Icon: LucideIcon
  color: string
  bg: string
}

export interface StatItem {
  value: string
  unit: string
  label: string
  Icon: LucideIcon
}

export interface NavItem {
  id: string
  label: string
  Icon: LucideIcon
  href: string
}

export const quickTopics: QuickTopic[] = [
  { id: 'jalan', label: 'Jalan & Jembatan', Icon: Route, color: '#E0A82E', href: '#' },
  { id: 'air', label: 'Sumber Daya Air', Icon: Droplets, color: '#60A5FA', href: '#' },
  { id: 'ruang', label: 'Penataan Ruang', Icon: LayoutGrid, color: '#A78BFA', href: '#' },
  { id: 'bangunan', label: 'Bangunan & Lingkungan', Icon: Building2, color: '#34D399', href: '#' },
  { id: 'konstruksi', label: 'Jasa Konstruksi', Icon: HardHat, color: '#F97316', href: '#' },
  { id: 'lab', label: 'Laboratorium & Peralatan', Icon: FlaskConical, color: '#F472B6', href: '#' },
  { id: 'statistik', label: 'Statistik PUTR', Icon: BarChart3, color: '#FBBF24', href: '#' },
  { id: 'galeri', label: 'Galeri Pembangunan', Icon: Camera, color: '#06B6D4', href: '/galeri' },
  { id: 'regulasi', label: 'Regulasi', Icon: FileText, color: '#A3E635', href: '#' },
  { id: 'peta', label: 'Peta Infrastruktur', Icon: Map, color: '#E879F9', href: '/peta' },
]

export const pengaduanCategories: PengaduanCategory[] = [
  {
    id: 'jalan-rusak',
    label: 'Jalan Rusak',
    Icon: AlertTriangle,
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.12)',
  },
  {
    id: 'lampu-pju',
    label: 'Lampu PJU Mati',
    Icon: Lightbulb,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
  },
  {
    id: 'drainase',
    label: 'Drainase Tersumbat',
    Icon: Waves,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
  },
  {
    id: 'sampah',
    label: 'Sampah',
    Icon: Trash2,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
  },
  {
    id: 'jembatan',
    label: 'Jembatan Rusak',
    Icon: Construction,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
  },
  {
    id: 'lainnya',
    label: 'Lainnya',
    Icon: MoreHorizontal,
    color: '#9CA3AF',
    bg: 'rgba(156,163,175,0.12)',
  },
]

export const statistics: StatItem[] = [
  {
    value: '1.256,45',
    unit: 'km',
    label: 'Panjang Jalan Kabupaten',
    Icon: Route,
  },
  {
    value: '312',
    unit: 'unit',
    label: 'Jumlah Jembatan',
    Icon: ArrowLeftRight,
  },
  {
    value: '158',
    unit: 'unit',
    label: 'Jumlah Embung',
    Icon: Droplets,
  },
  {
    value: '1.124',
    unit: 'ha',
    label: 'Lahan Irigasi',
    Icon: Waves,
  },
  {
    value: '645',
    unit: 'unit',
    label: 'PBG Terbit',
    Icon: Building2,
  },
]

export const quickChips = [
  'Berapa panjang jalan kabupaten saat ini?',
  'Program pembangunan jembatan 2024?',
  'Lokasi embung di Kec. Ganding?',
]

export const navItems: NavItem[] = [
  { id: 'beranda', label: 'Beranda', Icon: Home, href: '/' },
  { id: 'profil', label: 'Profil', Icon: User, href: '/profil' },
  { id: 'pembangunan', label: 'Pembangunan', Icon: Building, href: '/pembangunan' },
  { id: 'data', label: 'Data', Icon: Database, href: '/data' },
  { id: 'ai-putr', label: 'AI PUTR', Icon: Bot, href: '/ai-putr' },
]
