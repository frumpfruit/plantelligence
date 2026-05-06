"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Topbar } from "@/components/Topbar"
import { ScrollToTop } from "@/components/ScrollToTop"
import { ToastProvider } from "@/components/ToastProvider"
import { SensorProvider } from "@/components/SensorProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ToastProvider>
      <SensorProvider>
        <div className="flex min-h-screen bg-muted/30">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex-1 lg:pl-[240px]">
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="pt-[80px]">
              <div className="p-4 md:p-8 mx-auto max-w-7xl">
                {children}
              </div>
            </main>
            <ScrollToTop />
          </div>
        </div>
      </SensorProvider>
    </ToastProvider>
  )
}
