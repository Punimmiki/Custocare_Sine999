"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ReceiptIcon as CashRegister,
  FileText,
  Fish,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "ขายหน้าร้าน",
    url: "/pos",
    icon: CashRegister,
  },
  {
    title: "คำสั่งซื้อ",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "ลูกค้า",
    url: "/customers",
    icon: Users,
  },
  {
    title: "สินค้า",
    url: "/products",
    icon: Package,
  },
  {
    title: "การจัดส่ง",
    url: "/delivery",
    icon: Truck,
  },
  {
    title: "เอกสาร",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "รายงาน",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "ตั้งค่า",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const handleLogout = () => {
    console.log("Logging out...")
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "16rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <SidebarHeader className="border-b border-slate-700/50 py-4 group-data-[collapsible=icon]:py-3 flex-shrink-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="hover:bg-slate-700/50 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:mx-auto"
              >
                <Link
                  href="/orders"
                  className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center"
                >
                 <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg">
                    <img src="/logo.png" alt="Logo" className="size-10" />
                  </div>

                  <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-white">SINE 999</span>
                    
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Menu */}
        <SidebarContent className="flex-1 px-3 py-4 group-data-[collapsible=icon]:px-2 overflow-hidden">
          <SidebarGroup className="h-full">
            <SidebarGroupContent className="flex flex-col">
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        size="lg"
                        asChild
                        className={`
                          group relative overflow-hidden rounded-xl transition-all duration-200
                          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:mx-auto
                          ${
                            isActive
                              ? "bg-slate-600/80 text-white shadow-lg backdrop-blur-sm"
                              : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3 px-3 py-2.5 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full"
                        >
                          <item.icon
                            className={`size-5 transition-colors group-data-[collapsible=icon]:size-6 ${isActive ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-300"}`}
                          />
                          <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                          {isActive && (
                            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full group-data-[collapsible=icon]:hidden" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-slate-700/50 p-3 group-data-[collapsible=icon]:p-2 flex-shrink-0">
          <Button
            onClick={handleLogout}
            className="w-full justify-start gap-3 rounded-xl bg-slate-600/80 text-white hover:bg-slate-500/80 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:w-16 group-data-[collapsible=icon]:mx-auto"
            variant="ghost"
          >
            <LogOut className="size-4 group-data-[collapsible=icon]:size-5" />
            <span className="group-data-[collapsible=icon]:hidden">ออกจากระบบ</span>
          </Button>
        </SidebarFooter>
      </div>

      {/* Sidebar Rail (optional) */}
      <SidebarRail />
    </Sidebar>
  )
}