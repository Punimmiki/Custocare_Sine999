"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagementTab } from "./user-management-tab"
import { LineNotificationTab } from "./line-notification-tab"
import { ShippingSettingsTab } from "./shipping-settings-tab"
import { Users, MessageCircle, Truck } from "lucide-react"

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            จัดการผู้ใช้
          </TabsTrigger>
          <TabsTrigger value="line" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            การแจ้งเตือน LINE
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            การจัดส่ง
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="line">
          <LineNotificationTab />
        </TabsContent>

        <TabsContent value="shipping">
          <ShippingSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { SettingsPage }
export default SettingsPage
