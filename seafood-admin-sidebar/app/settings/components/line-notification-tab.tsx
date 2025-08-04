"use client"

import * as React from "react"
import { MessageCircle, Save, RotateCcw, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Default message templates
const defaultTemplates = {
  orderConfirmation: {
    enabled: true,
    subject: "ยืนยันคำสั่งซื้อ",
    message: `สวัสดีครับ/ค่ะ คุณ {customerName}

ขอบคุณสำหรับคำสั่งซื้อ รหัส: {orderId}
วันที่สั่ง: {orderDate}
ยอดรวม: {totalAmount} บาท

รายการสินค้า:
{orderItems}

สถานะ: รอดำเนินการ

หากมีข้อสงสัยกรุณาติดต่อ 02-xxx-xxxx
ขอบคุณครับ/ค่ะ`,
  },
  paymentRequest: {
    enabled: true,
    subject: "แจ้งชำระเงิน",
    message: `สวัสดีครับ/ค่ะ คุณ {customerName}

แจ้งชำระเงินสำหรับคำสั่งซื้อ รหัส: {orderId}
ยอดที่ต้องชำระ: {amount} บาท
กำหนดชำระ: {dueDate}

ช่องทางการชำระเงิน:
- โอนเงินผ่านธนาคาร xxx-x-xxxxx-x
- เงินสดหน้าร้าน

กรุณาแจ้งหลักฐานการโอนเงินด้วยครับ/ค่ะ
ขอบคุณครับ/ค่ะ`,
  },
  deliveryUpdate: {
    enabled: true,
    subject: "อัพเดทการจัดส่ง",
    message: `สวัสดีครับ/ค่ะ คุณ {customerName}

อัพเดทสถานะการจัดส่ง รหัส: {orderId}
สถานะ: {deliveryStatus}
คนขับ: {driverName}
เบอร์โทรคนขับ: {driverPhone}
ทะเบียนรถ: {vehiclePlate}

{deliveryMessage}

หากมีข้อสงสัยกรุณาติดต่อคนขับโดยตรง
ขอบคุณครับ/ค่ะ`,
  },
}

const availableVariables = {
  orderConfirmation: ["{customerName}", "{orderId}", "{orderDate}", "{totalAmount}", "{orderItems}"],
  paymentRequest: ["{customerName}", "{orderId}", "{amount}", "{dueDate}"],
  deliveryUpdate: [
    "{customerName}",
    "{orderId}",
    "{deliveryStatus}",
    "{driverName}",
    "{driverPhone}",
    "{vehiclePlate}",
    "{deliveryMessage}",
  ],
}

export function LineNotificationTab() {
  const [templates, setTemplates] = React.useState(defaultTemplates)
  const [lineSettings, setLineSettings] = React.useState({
    channelAccessToken: "",
    webhookUrl: "",
    isEnabled: true,
  })

  const handleTemplateChange = (templateType: keyof typeof templates, field: string, value: any) => {
    setTemplates((prev) => ({
      ...prev,
      [templateType]: {
        ...prev[templateType],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving LINE notification settings:", { templates, lineSettings })
    // Show success message
  }

  const handleReset = (templateType: keyof typeof templates) => {
    setTemplates((prev) => ({
      ...prev,
      [templateType]: defaultTemplates[templateType],
    }))
  }

  const handleTestMessage = (templateType: keyof typeof templates) => {
    // Test message logic here
    console.log("Testing message template:", templateType)
    // Show test result
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">การแจ้งเตือน LINE</h2>
        <p className="text-muted-foreground">จัดการเทมเพลตข้อความและการตั้งค่า LINE Notification</p>
      </div>

      {/* LINE Configuration */}
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            การตั้งค่า LINE
          </CardTitle>
          <CardDescription>กำหนดค่าการเชื่อมต่อกับ LINE Messaging API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="line-enabled"
              checked={lineSettings.isEnabled}
              onCheckedChange={(checked) => setLineSettings((prev) => ({ ...prev, isEnabled: checked }))}
            />
            <Label htmlFor="line-enabled">เปิดใช้งานการแจ้งเตือน LINE</Label>
            <Badge variant={lineSettings.isEnabled ? "default" : "secondary"}>
              {lineSettings.isEnabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="access-token">Channel Access Token</Label>
              <Input
                id="access-token"
                type="password"
                value={lineSettings.channelAccessToken}
                onChange={(e) => setLineSettings((prev) => ({ ...prev, channelAccessToken: e.target.value }))}
                placeholder="กรอก Channel Access Token"
              />
            </div>
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={lineSettings.webhookUrl}
                onChange={(e) => setLineSettings((prev) => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://your-domain.com/webhook"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <div className="space-y-6">
        {/* Order Confirmation Template */}
        <Card className="border-0 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>เทมเพลตยืนยันคำสั่งซื้อ</CardTitle>
                <CardDescription>ข้อความที่ส่งให้ลูกค้าเมื่อมีคำสั่งซื้อใหม่</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={templates.orderConfirmation.enabled}
                  onCheckedChange={(checked) => handleTemplateChange("orderConfirmation", "enabled", checked)}
                />
                <Button variant="outline" size="sm" onClick={() => handleReset("orderConfirmation")}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  รีเซ็ต
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTestMessage("orderConfirmation")}>
                  <TestTube className="h-4 w-4 mr-1" />
                  ทดสอบ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="order-subject">หัวข้อข้อความ</Label>
              <Input
                id="order-subject"
                value={templates.orderConfirmation.subject}
                onChange={(e) => handleTemplateChange("orderConfirmation", "subject", e.target.value)}
                placeholder="หัวข้อข้อความ"
              />
            </div>
            <div>
              <Label htmlFor="order-message">เนื้อหาข้อความ</Label>
              <Textarea
                id="order-message"
                value={templates.orderConfirmation.message}
                onChange={(e) => handleTemplateChange("orderConfirmation", "message", e.target.value)}
                placeholder="เนื้อหาข้อความ"
                rows={8}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">ตัวแปรที่ใช้ได้:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableVariables.orderConfirmation.map((variable) => (
                  <Badge key={variable} variant="outline" className="text-xs">
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Request Template */}
        <Card className="border-0 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>เทมเพลตแจ้งชำระเงิน</CardTitle>
                <CardDescription>ข้อความแจ้งเตือนการชำระเงินสำหรับลูกค้าเครดิต</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={templates.paymentRequest.enabled}
                  onCheckedChange={(checked) => handleTemplateChange("paymentRequest", "enabled", checked)}
                />
                <Button variant="outline" size="sm" onClick={() => handleReset("paymentRequest")}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  รีเซ็ต
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTestMessage("paymentRequest")}>
                  <TestTube className="h-4 w-4 mr-1" />
                  ทดสอบ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="payment-subject">หัวข้อข้อความ</Label>
              <Input
                id="payment-subject"
                value={templates.paymentRequest.subject}
                onChange={(e) => handleTemplateChange("paymentRequest", "subject", e.target.value)}
                placeholder="หัวข้อข้อความ"
              />
            </div>
            <div>
              <Label htmlFor="payment-message">เนื้อหาข้อความ</Label>
              <Textarea
                id="payment-message"
                value={templates.paymentRequest.message}
                onChange={(e) => handleTemplateChange("paymentRequest", "message", e.target.value)}
                placeholder="เนื้อหาข้อความ"
                rows={8}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">ตัวแปรที่ใช้ได้:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableVariables.paymentRequest.map((variable) => (
                  <Badge key={variable} variant="outline" className="text-xs">
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Update Template */}
        <Card className="border-0 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>เทมเพลตอัพเดทการจัดส่ง</CardTitle>
                <CardDescription>ข้อความแจ้งสถานะการจัดส่งให้ลูกค้า</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={templates.deliveryUpdate.enabled}
                  onCheckedChange={(checked) => handleTemplateChange("deliveryUpdate", "enabled", checked)}
                />
                <Button variant="outline" size="sm" onClick={() => handleReset("deliveryUpdate")}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  รีเซ็ต
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTestMessage("deliveryUpdate")}>
                  <TestTube className="h-4 w-4 mr-1" />
                  ทดสอบ
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="delivery-subject">หัวข้อข้อความ</Label>
              <Input
                id="delivery-subject"
                value={templates.deliveryUpdate.subject}
                onChange={(e) => handleTemplateChange("deliveryUpdate", "subject", e.target.value)}
                placeholder="หัวข้อข้อความ"
              />
            </div>
            <div>
              <Label htmlFor="delivery-message">เนื้อหาข้อความ</Label>
              <Textarea
                id="delivery-message"
                value={templates.deliveryUpdate.message}
                onChange={(e) => handleTemplateChange("deliveryUpdate", "message", e.target.value)}
                placeholder="เนื้อหาข้อความ"
                rows={8}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">ตัวแปรที่ใช้ได้:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableVariables.deliveryUpdate.map((variable) => (
                  <Badge key={variable} variant="outline" className="text-xs">
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  )
}
