"use client"

import type * as React from "react"
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
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items for the seafood business admin
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="default" asChild>
              <Link href="/orders">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Fish className="size-3" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold">ระบบจัดการซีฟู้ด</span>
                  <span className="truncate text-xs text-muted-foreground">จัดการ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(item.url + "/")}>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
