"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, User, Settings } from "lucide-react"

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "แดชบอร์ด",
  "/orders": "คำสั่งซื้อ",
  "/orders/create": "สร้างคำสั่งซื้อใหม่",
  "/pos": "ขายหน้าร้าน",
  "/customers": "ลูกค้า",
  "/products": "สินค้า",
  "/delivery": "การจัดส่ง",
  "/documents": "เอกสาร",
  "/reports": "รายงาน",
  "/settings": "ตั้งค่า",
  "/settings/users": "จัดการผู้ใช้",
  "/settings/company": "ตั้งค่าบริษัท",
  "/settings/units": "ตั้งค่าหน่วยนับ",
  "/settings/bank": "ตั้งค่าธนาคาร",
  "/settings/sales-channels": "ช่องทางการขาย",
  "/settings/shipping": "การจัดส่ง",
  "/settings/website": "ตั้งค่าเว็บไซต์",
  "/settings/line": "การแจ้งเตือน LINE",
}

export function AdminHeader() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-slate-600 hover:text-slate-900" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
                  หน้าหลัก
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const path = "/" + pathSegments.slice(0, index + 1).join("/")
              const isLast = index === pathSegments.length - 1
              const title = breadcrumbMap[path] || segment

              return (
                <div key={path} className="flex items-center">
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-slate-900 font-medium">{title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={path} className="text-slate-600 hover:text-slate-900">
                          {title}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-slate-900">บัญชีของฉัน</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-slate-700 hover:text-slate-900">
              <User className="mr-2 h-4 w-4" />
              โปรไฟล์
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="text-slate-700 hover:text-slate-900">
                <Settings className="mr-2 h-4 w-4" />
                ตั้งค่า
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">ออกจากระบบ</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
