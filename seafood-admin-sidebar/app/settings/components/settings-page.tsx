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
import { Users, MessageCircle, Truck, Calculator, Building2, Building, Store, Globe } from "lucide-react"

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
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">ผู้ใช้</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">บริษัท</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">หน่วยนับ</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">ธนาคาร</span>
          </TabsTrigger>
          <TabsTrigger value="sales-channels" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">ช่องทางขาย</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">จัดส่ง</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">เว็บไซต์</span>
          </TabsTrigger>
          <TabsTrigger value="line" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">LINE</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="company">
          <CompanyTab />
        </TabsContent>

        <TabsContent value="units">
          <UnitsTab />
        </TabsContent>

        <TabsContent value="bank">
          <BankTab />
        </TabsContent>

        <TabsContent value="sales-channels">
          <SalesChannelsTab />
        </TabsContent>

        <TabsContent value="shipping">
          <ShippingSettingsTab />
        </TabsContent>

        <TabsContent value="website">
          <WebsiteTab />
        </TabsContent>

        <TabsContent value="line">
          <LineNotificationTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { SettingsPage }
export default SettingsPage
