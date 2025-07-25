"use client"

import { useState } from "react"
import { ShoppingCart, ClipboardList, Users, Fish, Truck, FileText, BarChart3, Settings, Store } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { POSPage } from "@/components/pos-page"
import { OrdersPage } from "./components/orders-page"
import { CustomerManagementPage } from "@/components/customer-management-page"
import { ProductManagementPage } from "@/components/product-management-page"
import { DeliveryManagementPage } from "@/components/delivery-management-page"
import { ReportsDashboardPage } from "@/components/reports-dashboard-page"
import { SettingsPage } from "@/components/settings-page"
import { OrderSummaryModal } from "@/components/order-summary-modal"

// Menu items data
const menuItems = [
  {
    id: "pos",
    title: "ขายหน้าร้าน",
    subtitle: "POS",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    id: "orders",
    title: "คำสั่งซื้อ",
    subtitle: "Orders",
    icon: ClipboardList,
    color: "text-blue-600",
  },
  {
    id: "customers",
    title: "ลูกค้า",
    subtitle: "Customers",
    icon: Users,
    color: "text-purple-600",
  },
  {
    id: "products",
    title: "สินค้า",
    subtitle: "Products",
    icon: Fish,
    color: "text-orange-600",
  },
  {
    id: "delivery",
    title: "การจัดส่ง",
    subtitle: "Delivery",
    icon: Truck,
    color: "text-indigo-600",
  },
  {
    id: "documents",
    title: "เอกสาร",
    subtitle: "Documents",
    icon: FileText,
    color: "text-gray-600",
  },
  {
    id: "reports",
    title: "รายงาน",
    subtitle: "Reports",
    icon: BarChart3,
    color: "text-red-600",
  },
  {
    id: "settings",
    title: "ตั้งค่า",
    subtitle: "Settings",
    icon: Settings,
    color: "text-slate-600",
  },
]

// Page content components
const PageContent = ({ activeItem, onShowOrderSummary }: { activeItem: string; onShowOrderSummary: () => void }) => {
  const currentItem = menuItems.find((item) => item.id === activeItem)

  const getPageContent = () => {
    switch (activeItem) {
      case "pos":
        return <POSPage />
      case "orders":
        return <OrdersPage onShowOrderSummary={onShowOrderSummary} />
      case "customers":
        return <CustomerManagementPage />
      case "products":
        return <ProductManagementPage />
      case "documents":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">เอกสารธุรกิจ</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <span>ใบเสร็จรับเงิน</span>
                </div>
                <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <span>ใบกำกับภาษี</span>
                </div>
                <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <span>รายงานสต็อกสินค้า</span>
                </div>
              </div>
            </div>
          </div>
        )
      case "reports":
        return <ReportsDashboardPage />
      case "settings":
        return <SettingsPage />
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900">ยินดีต้อนรับสู่ระบบจัดการธุรกิจอาหารทะเล</h3>
            <p className="text-gray-600 mt-2">เลือกเมนูจากแถบด้านซ้ายเพื่อเริ่มต้นใช้งาน</p>
          </div>
        )
    }
  }

  return (
    <div className={activeItem === "pos" ? "" : "p-6"}>
      {activeItem !== "pos" && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{currentItem?.title}</h1>
          <p className="text-gray-600">{currentItem?.subtitle}</p>
        </div>
      )}
      {getPageContent()}
    </div>
  )
}

export default function SeafoodAdminLayout() {
  const [activeItem, setActiveItem] = useState("pos")
  const [showOrderSummary, setShowOrderSummary] = useState(false)

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-3 px-3 py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">SeaFresh Admin</h2>
              <p className="text-sm text-gray-600">ระบบจัดการธุรกิจอาหารทะเล</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItem === item.id}
                      onClick={() => setActiveItem(item.id)}
                      className="w-full justify-start gap-3 px-3 py-3 hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                    >
                      <button className="flex items-center gap-3 w-full">
                        <item.icon className={`h-5 w-5 ${activeItem === item.id ? "text-blue-600" : item.color}`} />
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">{item.title}</span>
                          <span className="text-xs text-gray-500">{item.subtitle}</span>
                        </div>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {activeItem !== "pos" && (
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-8">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">
                    {menuItems.find((item) => item.id === activeItem)?.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {activeItem === "orders" && (
              <div className="ml-auto">
                <Button
                  onClick={() => setShowOrderSummary(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  ดูยอดขาย
                </Button>
              </div>
            )}
          </header>
        )}

        <main className={`flex-1 ${activeItem === "pos" ? "" : "bg-gray-50 min-h-screen"}`}>
          <PageContent activeItem={activeItem} onShowOrderSummary={() => setShowOrderSummary(true)} />
        </main>
      </SidebarInset>

      <OrderSummaryModal isOpen={showOrderSummary} onClose={() => setShowOrderSummary(false)} orders={[]} />
    </SidebarProvider>
  )
}
