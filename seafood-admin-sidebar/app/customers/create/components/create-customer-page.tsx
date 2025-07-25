"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, User, CreditCard, Banknote, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const CreateCustomerPage = () => {
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerAddress, setCustomerAddress] = React.useState("")
  const [customerType, setCustomerType] = React.useState<"cash" | "credit">("cash")
  const [creditLimit, setCreditLimit] = React.useState(0)
  const [lineNotifications, setLineNotifications] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({
      customerName,
      customerPhone,
      customerAddress,
      customerType,
      creditLimit,
      lineNotifications,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">เพิ่มลูกค้าใหม่</h1>
          <p className="text-muted-foreground">เพิ่มข้อมูลลูกค้าใหม่เข้าสู่ระบบ</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ข้อมูลลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-name">ชื่อลูกค้า *</Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="กรอกชื่อลูกค้า"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer-phone">เบอร์โทรศัพท์ *</Label>
                <Input
                  id="customer-phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer-address">ที่อยู่</Label>
                <Textarea
                  id="customer-address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="กรอกที่อยู่ลูกค้า"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Customer Type and Credit */}
          <Card>
            <CardHeader>
              <CardTitle>ประเภทลูกค้าและเครดิต</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ประเภทลูกค้า</Label>
                <RadioGroup
                  value={customerType}
                  onValueChange={(value) => setCustomerType(value as "cash" | "credit")}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      เงินสด
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      เครดิต
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {customerType === "credit" && (
                <div>
                  <Label htmlFor="credit-limit">วงเงินเครดิต (บาท)</Label>
                  <Input
                    id="credit-limit"
                    type="number"
                    min="0"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(Number.parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                การแจ้งเตือน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="line-notifications" checked={lineNotifications} onCheckedChange={setLineNotifications} />
                <Label htmlFor="line-notifications">เปิดการแจ้งเตือนผ่าน LINE</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                เมื่อเปิดใช้งาน ลูกค้าจะได้รับการแจ้งเตือนเกี่ยวกับคำสั่งซื้อและการชำระเงินผ่าน LINE
              </p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              เพิ่มลูกค้า
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/customers">ยกเลิก</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { CreateCustomerPage }
export default CreateCustomerPage
