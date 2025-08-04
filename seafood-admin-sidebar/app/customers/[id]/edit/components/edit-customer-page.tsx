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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EditCustomerPageProps {
  customerId: string
}

// Sample customer data (expanded for pagination) - Moved here for direct access
const initialCustomers = [
  {
    id: "1",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    address: "123 ถนนสุขุมวิข แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-15",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "2",
    name: "บริษัท อาหารทะเล จำกัด",
    phone: "02-123-4567",
    address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "credit" as const,
    creditLimit: 50000,
    outstandingBalance: 12500,
    unpaidBills: 3,
    overdueDays: 15,
    overdueAmount: 12500,
    lastOrderDate: "2024-01-14",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "3",
    name: "นางสาวมาลี สวยงาม",
    phone: "089-876-5432",
    address: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-13",
    lineNotifications: true,
    isActive: false,
  },
  {
    id: "4",
    name: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    address: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    type: "credit" as const,
    creditLimit: 30000,
    outstandingBalance: 8750,
    unpaidBills: 2,
    overdueDays: 7,
    overdueAmount: 8750,
    lastOrderDate: "2024-01-12",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "5",
    name: "นายประยุทธ์ รักทะเล",
    phone: "081-555-9999",
    address: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-10",
    lineNotifications: false,
    isActive: false,
  },
  {
    id: "6",
    name: "โรงแรมสีฟู้ด พาราไดซ์",
    phone: "02-987-6543",
    address: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    type: "credit" as const,
    creditLimit: 100000,
    outstandingBalance: 25400,
    unpaidBills: 5,
    overdueDays: 22,
    overdueAmount: 25400,
    lastOrderDate: "2024-01-09",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "7",
    name: "นายวิชัย ธุรกิจดี",
    phone: "081-111-2222",
    address: "111 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-08",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "8",
    name: "ร้านซีฟู้ดแสนอร่อย",
    phone: "02-333-4444",
    address: "222 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900",
    type: "credit" as const,
    creditLimit: 40000,
    outstandingBalance: 5000,
    unpaidBills: 1,
    overdueDays: 5,
    overdueAmount: 5000,
    lastOrderDate: "2024-01-07",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "9",
    name: "นางสุดา ปลาสด",
    phone: "089-555-6666",
    address: "333 ถนนบางนา แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-06",
    lineNotifications: true,
    isActive: false,
  },
  {
    id: "10",
    name: "บริษัท ทะเลไทย จำกัด",
    phone: "02-777-8888",
    address: "444 ถนนสาทร แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "credit" as const,
    creditLimit: 80000,
    outstandingBalance: 15000,
    unpaidBills: 2,
    overdueDays: 10,
    overdueAmount: 15000,
    lastOrderDate: "2024-01-05",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "11",
    name: "นายสมศักดิ์ รักปลา",
    phone: "081-999-0000",
    address: "555 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-04",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "12",
    name: "ร้านกุ้งปู ปลาหมึก",
    phone: "02-111-2222",
    address: "666 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    type: "credit" as const,
    creditLimit: 25000,
    outstandingBalance: 3000,
    unpaidBills: 1,
    overdueDays: 3,
    overdueAmount: 3000,
    lastOrderDate: "2024-01-03",
    lineNotifications: true,
    isActive: false,
  },
]

const EditCustomerPage = ({ customerId }: EditCustomerPageProps) => {
  // Initial states without default values, will be populated by useEffect
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerAddress, setCustomerAddress] = React.useState("")
  const [customerType, setCustomerType] = React.useState<"cash" | "credit">("cash")

  const [creditType, setCreditType] = React.useState<"amount" | "bills" | "days">("amount")
  const [creditLimit, setCreditLimit] = React.useState(0)
  const [creditBills, setCreditBills] = React.useState(0)
  const [creditDays, setCreditDays] = React.useState(0)

  const [notifications, setNotifications] = React.useState({
    orderConfirmation: false,
    paymentReminder: false,
    packaging: false,
    shipping: false,
  })

  const [showEditConfirmation, setShowEditConfirmation] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true) // New state for loading
  const [customerFound, setCustomerFound] = React.useState(false) // New state to check if customer exists

  // Effect to load customer data
  React.useEffect(() => {
    setIsLoading(true)
    const foundCustomer = initialCustomers.find((c) => c.id === customerId)

    if (foundCustomer) {
      setCustomerFound(true)
      setCustomerName(foundCustomer.name)
      setCustomerPhone(foundCustomer.phone)
      setCustomerAddress(foundCustomer.address)
      setCustomerType(foundCustomer.type)

      if (foundCustomer.type === "credit") {
        // For credit customers, set creditLimit and default creditType to 'amount'
        // If your mock data had creditBills or creditDays, you'd add logic here to infer creditType
        setCreditLimit(foundCustomer.creditLimit)
        setCreditType("amount") // Defaulting to 'amount' as per mock data structure
      } else {
        setCreditLimit(0)
        setCreditBills(0)
        setCreditDays(0)
        setCreditType("amount") // Reset for cash customers
      }

      // Set detailed notifications based on the single lineNotifications from mock data
      setNotifications({
        orderConfirmation: foundCustomer.lineNotifications,
        paymentReminder: foundCustomer.lineNotifications,
        packaging: foundCustomer.lineNotifications,
        shipping: foundCustomer.lineNotifications,
      })
    } else {
      setCustomerFound(false)
      console.warn(`Customer with ID ${customerId} not found.`)
      // Optionally, redirect or show an error message
    }
    setIsLoading(false)
  }, [customerId]) // Re-run effect if customerId changes

  const handleNotificationChange = (type: keyof typeof notifications, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowEditConfirmation(true)
  }

  const confirmEdit = () => {
    console.log({
      customerId,
      customerName,
      customerPhone,
      customerAddress,
      customerType,
      ...(customerType === "credit" && {
        creditType,
        ...(creditType === "amount" && { creditLimit }),
        ...(creditType === "bills" && { creditBills }),
        ...(creditType === "days" && { creditDays }),
      }),
      notifications,
    })
    setShowEditConfirmation(false)
  }

  const cancelEdit = () => {
    setShowEditConfirmation(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>กำลังโหลดข้อมูลลูกค้า...</p>
      </div>
    )
  }

  if (!customerFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลลูกค้า</h2>
        <p className="text-muted-foreground mb-6">ไม่พบลูกค้าที่มีรหัส: {customerId}</p>
        <Button asChild>
          <Link href="/customers">กลับไปหน้ารายชื่อลูกค้า</Link>
        </Button>
      </div>
    )
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
          <h1 className="text-3xl font-bold">แก้ไขข้อมูลลูกค้า</h1>
          <p className="text-muted-foreground">แก้ไขข้อมูลลูกค้า: {customerName || "ไม่มีชื่อลูกค้า"}</p>
        </div>
      </div>

      {/* Form - Full width */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card className="border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ข้อมูลลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-name">
                  ชื่อลูกค้า <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="กรอกชื่อลูกค้า"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customer-phone">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customer-phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customer-address">
                  ที่อยู่ <span className="text-red-500">*</span>
                </Label>
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
          <Card className="border-0 rounded-2xl">
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
                    <RadioGroupItem value="cash" id="cash" className="border-black" />
                    <Label htmlFor="cash" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      เงินสด
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" className="border-black" />
                    <Label htmlFor="credit" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      เครดิต
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Credit Information Card */}
              {customerType === "credit" && (
                <Card className="border-0 shadow-sm rounded-2xl bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg">ข้อมูลเครดิต</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>ประเภทเครดิต</Label>
                      <RadioGroup value={creditType} onValueChange={setCreditType} className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="amount" id="amount" className="border-black" />{" "}
                          <Label htmlFor="amount">วงเงินเครดิต</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bills" id="bills" className="border-black" />{" "}
                          <Label htmlFor="bills">จำนวนบิล</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="days" id="days" className="border-black" />{" "}
                          <Label htmlFor="days">จำนวนวัน</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {creditType === "amount" && (
                        <div>
                          <Label>วงเงินเครดิต (บาท)</Label>
                          <Input
                            type="number"
                            value={creditLimit}
                            onChange={(e) => setCreditLimit(Number(e.target.value))}
                            placeholder="กรอกวงเงิน"
                          />
                        </div>
                      )}
                      {creditType === "bills" && (
                        <div>
                          <Label>จำนวนบิล</Label>
                          <Input
                            type="number"
                            value={creditBills}
                            onChange={(e) => setCreditBills(Number(e.target.value))}
                            placeholder="กรอกจำนวนบิล"
                          />
                        </div>
                      )}
                      {creditType === "days" && (
                        <div>
                          <Label>จำนวนวัน</Label>
                          <Input
                            type="number"
                            value={creditDays}
                            onChange={(e) => setCreditDays(Number(e.target.value))}
                            placeholder="กรอกจำนวนวัน"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                การแจ้งเตือนลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">เลือกประเภทการแจ้งเตือนที่ต้องการส่งให้ลูกค้าผ่าน LINE</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-confirmation">แจ้งคอนเฟิร์มออเดอร์</Label>
                    <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อได้รับคำสั่งซื้อและยืนยันออเดอร์</p>
                  </div>
                  <Switch
                    id="order-confirmation"
                    checked={notifications.orderConfirmation}
                    onCheckedChange={(checked) => handleNotificationChange("orderConfirmation", checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-reminder">แจ้งเตือนยอดค้างชำระ</Label>
                    <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อมียอดค้างชำระหรือใกล้ครบกำหนด</p>
                  </div>
                  <Switch
                    id="payment-reminder"
                    checked={notifications.paymentReminder}
                    onCheckedChange={(checked) => handleNotificationChange("paymentReminder", checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="packaging">แพ็คสินค้า</Label>
                    <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อเริ่มแพ็คสินค้าและพร้อมจัดส่ง</p>
                  </div>
                  <Switch
                    id="packaging"
                    checked={notifications.packaging}
                    onCheckedChange={(checked) => handleNotificationChange("packaging", checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shipping">จัดส่ง</Label>
                    <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อสินค้าถูกจัดส่งและหมายเลขติดตาม</p>
                  </div>
                  <Switch
                    id="shipping"
                    checked={notifications.shipping}
                    onCheckedChange={(checked) => handleNotificationChange("shipping", checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              บันทึกการแก้ไข
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/customers">ยกเลิก</Link>
            </Button>
          </div>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showEditConfirmation} onOpenChange={setShowEditConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการแก้ไขข้อมูล</DialogTitle>
            <DialogDescription>คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลสำหรับลูกค้า "{customerName}" หรือไม่?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={cancelEdit}>
              ยกเลิก
            </Button>
            <Button onClick={confirmEdit}>ยืนยันการแก้ไข</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { EditCustomerPage }
export default EditCustomerPage
