"use client"

import { useState } from "react"
import { Settings, User, Bell, Shield, Palette, Database, Printer, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    stockAlerts: true,
    paymentAlerts: true,
    emailNotifications: false,
    smsNotifications: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    language: "th",
    timezone: "Asia/Bangkok",
    currency: "THB",
    dateFormat: "dd/mm/yyyy",
    theme: "light",
  })

  const handleSave = () => {
    // Save settings logic here
    alert("บันทึกการตั้งค่าเรียบร้อยแล้ว")
  }

  return (
    <div className="space-y-8 font-['Inter',sans-serif]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
          <Settings className="h-8 w-8 mr-3 text-blue-500" />
          การตั้งค่าระบบ
        </h1>
        <p className="text-slate-600 mt-2">จัดการการตั้งค่าและกำหนดค่าระบบ</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-slate-100 rounded-xl p-1">
          <TabsTrigger value="profile" className="rounded-lg">
            โปรไฟล์
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">
            การแจ้งเตือน
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg">
            ระบบ
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">
            ความปลอดภัย
          </TabsTrigger>
          <TabsTrigger value="printer" className="rounded-lg">
            เครื่องพิมพ์
          </TabsTrigger>
          <TabsTrigger value="backup" className="rounded-lg">
            สำรองข้อมูล
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                ข้อมูลโปรไฟล์
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">ชื่อผู้ใช้</Label>
                  <Input
                    defaultValue="admin"
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">อีเมล</Label>
                  <Input
                    type="email"
                    defaultValue="admin@seafresh.com"
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">ชื่อร้าน</Label>
                  <Input
                    defaultValue="SeaFresh - ธุรกิจอาหารทะเล"
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">เบอร์โทรศัพท์</Label>
                  <Input
                    defaultValue="038-123-456"
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">ที่อยู่</Label>
                <Textarea
                  defaultValue="123 ถนนทะเลสาบ ตำบลปลาสด อำเภอทะเลใส จังหวัดชลบุรี 20000"
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                  rows={3}
                />
              </div>

              <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3">
                <Save className="h-4 w-4 mr-2" />
                บันทึกข้อมูล
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-500" />
                การตั้งค่าการแจ้งเตือน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">แจ้งเตือนคำสั่งซื้อใหม่</div>
                    <div className="text-sm text-slate-600">รับการแจ้งเตือนเมื่อมีคำสั่งซื้อใหม่</div>
                  </div>
                  <Switch
                    checked={notifications.orderAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">แจ้งเตือนสต็อกต่ำ</div>
                    <div className="text-sm text-slate-600">รับการแจ้งเตือนเมื่อสินค้าใกล้หมด</div>
                  </div>
                  <Switch
                    checked={notifications.stockAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, stockAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">แจ้งเตือนการชำระเงิน</div>
                    <div className="text-sm text-slate-600">รับการแจ้งเตือนเมื่อมีการชำระเงิน</div>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">การแจ้งเตือนทางอีเมล</div>
                    <div className="text-sm text-slate-600">ส่งการแจ้งเตือนผ่านอีเมล</div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">การแจ้งเตือนทาง SMS</div>
                    <div className="text-sm text-slate-600">ส่งการแจ้งเตือนผ่าน SMS</div>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3">
                <Save className="h-4 w-4 mr-2" />
                บันทึกการตั้งค่า
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Palette className="h-5 w-5 mr-2 text-blue-500" />
                การตั้งค่าระบบ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">ภาษา</Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="th">ไทย</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">เขตเวลา</Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Asia/Bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">สกุลเงิน</Label>
                  <Select
                    value={systemSettings.currency}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, currency: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="THB">บาท (THB)</SelectItem>
                      <SelectItem value="USD">ดอลลาร์ (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">รูปแบบวันที่</Label>
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">ธีม</Label>
                <Select
                  value={systemSettings.theme}
                  onValueChange={(value) => setSystemSettings({ ...systemSettings, theme: value })}
                >
                  <SelectTrigger className="h-12 rounded-xl border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="light">สว่าง</SelectItem>
                    <SelectItem value="dark">มืด</SelectItem>
                    <SelectItem value="auto">อัตโนมัติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3">
                <Save className="h-4 w-4 mr-2" />
                บันทึกการตั้งค่า
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                ความปลอดภัย
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">รหัสผ่านปัจจุบัน</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">รหัสผ่านใหม่</Label>
                <Input
                  type="password"
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-slate-700">ยืนยันรหัสผ่านใหม่</Label>
                <Input
                  type="password"
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">การเข้าสู่ระบบแบบสองขั้นตอน</div>
                    <div className="text-sm text-slate-600">เพิ่มความปลอดภัยด้วย 2FA</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">บันทึกการเข้าสู่ระบบ</div>
                    <div className="text-sm text-slate-600">เก็บประวัติการเข้าใช้งาน</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3">
                <Save className="h-4 w-4 mr-2" />
                อัปเดตรหัสผ่าน
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Printer Settings */}
        <TabsContent value="printer">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Printer className="h-5 w-5 mr-2 text-blue-500" />
                การตั้งค่าเครื่องพิมพ์
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">เครื่องพิมพ์ใบเสร็จ</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="เลือกเครื่องพิมพ์" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="thermal1">Thermal Printer 1</SelectItem>
                      <SelectItem value="thermal2">Thermal Printer 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block text-slate-700">เครื่องพิมพ์เอกสาร</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="เลือกเครื่องพิมพ์" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="laser1">Laser Printer 1</SelectItem>
                      <SelectItem value="inkjet1">Inkjet Printer 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">พิมพ์ใบเสร็จอัตโนมัติ</div>
                    <div className="text-sm text-slate-600">พิมพ์ใบเสร็จทันทีหลังการขาย</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">พิมพ์ใบเบิกสินค้าอัตโนมัติ</div>
                    <div className="text-sm text-slate-600">พิมพ์ใบเบิกสินค้าเมื่อยืนยันคำสั่งซื้อ</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3">
                <Printer className="h-4 w-4 mr-2" />
                ทดสอบการพิมพ์
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-500" />
                การสำรองข้อมูล
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">สำรองข้อมูลอัตโนมัติ</div>
                    <div className="text-sm text-slate-600">สำรองข้อมูลทุกวันเวลา 02:00 น.</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800">สำรองข้อมูลไปยัง Cloud</div>
                    <div className="text-sm text-slate-600">อัปโหลดไฟล์สำรองไปยัง Google Drive</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="font-semibold text-blue-800 mb-2">การสำรองข้อมูลล่าสุด</div>
                  <div className="text-sm text-blue-700">15 มกราคม 2024 เวลา 02:00 น.</div>
                  <div className="text-sm text-blue-700">ขนาดไฟล์: 45.2 MB</div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3">
                    <Database className="h-4 w-4 mr-2" />
                    สำรองข้อมูลตอนนี้
                  </Button>
                  <Button variant="outline" className="rounded-xl px-6 py-3 border-slate-200 bg-transparent">
                    กู้คืนข้อมูล
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
