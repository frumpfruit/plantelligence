"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Activity, 
  Leaf, 
  SlidersHorizontal, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  User 
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Monitoring", href: "/monitoring", icon: Activity },
  { name: "Tanaman", href: "/tanaman", icon: Leaf },
  { name: "Kontrol", href: "/kontrol", icon: SlidersHorizontal },
  { name: "Analitik", href: "/analitik", icon: BarChart3 },
  { name: "Laporan", href: "/laporan", icon: FileText },
  { name: "Notifikasi", href: "/notifikasi", icon: Bell },
  { name: "Pengaturan", href: "/pengaturan", icon: Settings },
  { name: "Profil", href: "/profil", icon: User },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-[240px] border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-[80px] items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary" onClick={onClose}>
            <Leaf className="h-6 w-6" />
            <span>Plantelligence</span>
          </Link>
        </div>
        <div className="overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </>
  )
}
