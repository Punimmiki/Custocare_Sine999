"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagementTab } from "./user-management-tab"
import { LineNotificationTab } from "./line-notification-tab"
import { ShippingSettingsTab } from "./shipping-settings-tab"
import { UnitsTab } from "./units-tab"
import { BankTab } from "./bank-tab"
import { CompanyTab } from "./company-tab"
import { SalesChannelsTab } from "./sales-channels-tab"
import { WebsiteTab } from "./website-tab"
import { Users, MessageCircle, Truck, Calculator, Building2, Building, Store, Globe, Package } from "lucide-react"
import { ManageCategoriesPage } from "./manageproducts"
import { ScrollArea } from "@/components/ui/scroll-area"

const settingsTabs = [
  {
    value: "users",
    label: "ผู้ใช้",
    icon: Users,
    component: UserManagementTab,
  },
  {
    value: "company",
    label: "บริษัท",
    icon: Building,
    component: CompanyTab,
  },
  {
    value: "units",
    label: "หน่วยนับ",
    icon: Calculator,
    component: UnitsTab,
  },
  {
    value: "categories",
    label: "หมวดหมู่",
    icon: Package,
    component: ManageCategoriesPage,
  },
  {
    value: "bank",
    label: "ธนาคาร",
    icon: Building2,
    component: BankTab,
  },
  {
    value: "sales-channels",
    label: "ช่องทางขาย",
    icon: Store,
    component: SalesChannelsTab,
  },
  {
    value: "shipping",
    label: "จัดส่ง",
    icon: Truck,
    component: ShippingSettingsTab,
  },
  {
    value: "website",
    label: "เว็บไซต์",
    icon: Globe,
    component: WebsiteTab,
  },
  {
    value: "line",
    label: "LINE",
    icon: MessageCircle,
    component: LineNotificationTab,
  },
]

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่าระบบ</h1>
        <p className="text-muted-foreground">จัดการการตั้งค่าและการกำหนดค่าต่างๆ ของระบบ</p>
      </div>

      {/* Tabbed Settings */}
      <Tabs defaultValue="users" className="space-y-6">
        {/* Responsive Tabs List */}
        <div className="border-0 shadow-sm rounded-2xl bg-white p-1">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-auto w-max min-w-full bg-transparent p-1 gap-1">
              {settingsTabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-50 transition-all whitespace-nowrap"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </ScrollArea>
        </div>

        {/* Tab Contents */}
        {settingsTabs.map((tab) => {
          const ComponentToRender = tab.component
          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <ComponentToRender />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export { SettingsPage }
export default SettingsPage
