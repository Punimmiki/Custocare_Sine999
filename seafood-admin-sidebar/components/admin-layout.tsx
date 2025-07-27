import type React from "react"
import { AppSidebar } from "./app-sidebar"
import { AdminHeader } from "./admin-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "16rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex flex-1 flex-col gap-4 p-6 pt-4 bg-slate-50 min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
