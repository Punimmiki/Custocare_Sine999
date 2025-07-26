"use client"

import React from "react"
import { CalendarIcon, Search, Plus, Trash2, Send } from "lucide-react"
import { format } from "date-fns"
import { th } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const orders = [
  {
    id: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    channel: "LINE",
    orderDate: "2024-01-15",
    receiveDate: "2024-01-20",
    totalPrice: 2450,
    orderStatus: "pending",
    paymentStatus: "unpaid",
    printed: false,
    customerType: "บุคคล",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
  },
  {
    id: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    channel: "Facebook",
    orderDate: "2024-01-15",
    receiveDate: "2024-01-22",
    totalPrice: 8900,
    orderStatus: "packing",
    paymentStatus: "paid",
    printed: true,
    customerType: "บริษัท",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: false,
    },
  },
  {
    id: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    channel: "Shopee",
    orderDate: "2024-01-14",
    receiveDate: "2024-01-19",
    totalPrice: 1200,
    orderStatus: "delivering",
    paymentStatus: "paid",
    printed: false,
    customerType: "บุคคล",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: true,
    },
  },
  {
    id: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    channel: "Lazada",
    orderDate: "2024-01-14",
    receiveDate: "2024-01-18",
    totalPrice: 15600,
    orderStatus: "completed",
    paymentStatus: "paid",
    printed: true,
    customerType: "ร้านค้า",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
  },
  {
    id: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    channel: "LINE",
    orderDate: "2024-01-13",
    receiveDate: "2024-01-21",
    totalPrice: 3200,
    orderStatus: "pending",
    paymentStatus: "partially_paid",
    printed: false,
    customerType: "บุคคล",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
  },
  {
    id: "ORD-006",
    customerName: "โรงแรมสีฟู้ด พาราไดซ์",
    channel: "เว็บไซต์",
    orderDate: "2024-01-13",
    receiveDate: "2024-01-20",
    totalPrice: 25400,
    orderStatus: "packing",
    paymentStatus: "paid",
    printed: true,
    customerType: "บริษัท",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: false,
      pickList: true,
    },
  },
]

const orderStatusMap = {
  pending: { label: "รอยืนยันคำสั่งซื้อ", color: "bg-gray-50 text-gray-600 border-gray-200" },
  packing: { label: "รอแพ็คของ", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  delivering: { label: "รอจัดส่ง", color: "bg-orange-50 text-orange-600 border-orange-200" },
  completed: { label: "จัดส่งแล้ว", color: "bg-green-50 text-green-600 border-green-200" },
} as const

const paymentStatusMap = {
  unpaid: { label: "รอชำระเงิน", color: "bg-red-50 text-red-600 border-red-200" },
  partially_paid: { label: "ชำระบางส่วน", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  paid: { label: "ชำระเงินแล้ว", color: "bg-green-50 text-green-600 border-green-200" },
} as const

// Mock data สำหรับสินค้า
const products = [
  { id: "P001", name: "ปลาทูน่าสด", price: 250, unit: "กิโลกรัม" },
  { id: "P002", name: "กุ้งขาว", price: 180, unit: "กิโลกรัม" },
  { id: "P003", name: "ปลาแซลมอน", price: 450, unit: "กิโลกรัม" },
  { id: "P004", name: "หอยแมลงภู่", price: 120, unit: "กิโลกรัม" },
]

// Mock data สำหรับลูกค้า
const customers = [
  {
    id: "C001",
    name: "นายสมชาย ใจดี",
    type: "cash",
    addresses: [
      { id: "A001", address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110", isDefault: true },
      { id: "A002", address: "456 ถนนพระราม 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500", isDefault: false },
    ],
  },
  {
    id: "C002",
    name: "บริษัท อาหารทะเล จำกัด",
    type: "credit",
    creditLimit: 50000,
    creditType: "amount",
    creditDays: 30,
    addresses: [{ id: "A003", address: "789 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500", isDefault: true }],
  },
]

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [customerTypeFilter, setCustomerTypeFilter] = React.useState("all")
  const [channelFilter, setChannelFilter] = React.useState("all")
  const [orderStatusFilter, setOrderStatusFilter] = React.useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = React.useState("all")
  const [printStatusFilter, setPrintStatusFilter] = React.useState("all")
  const [dateFrom, setDateFrom] = React.useState<Date>()
  const [receiveDateFrom, setReceiveDateFrom] = React.useState<Date>()
  const [showSalesDialog, setShowSalesDialog] = React.useState(false)
  const [showNewOrderDialog, setShowNewOrderDialog] = React.useState(false)

  // New Order Form States
  const [selectedCustomer, setSelectedCustomer] = React.useState("")
  const [contactChannel, setContactChannel] = React.useState("")
  const [selectedAddress, setSelectedAddress] = React.useState("")
  const [orderItems, setOrderItems] = React.useState<
    Array<{
      productId: string
      quantity: number
      discount: number
    }>
  >([])
  const [shippingCost, setShippingCost] = React.useState(0)
  const [shippingMethod, setShippingMethod] = React.useState("")
  const [totalDiscount, setTotalDiscount] = React.useState(0)
  const [notes, setNotes] = React.useState("")

  // Pagination state
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)

  // คำนวณยอดต่างๆ
  const totalAmount = orders.reduce((sum, o) => sum + o.totalPrice, 0)
  const totalPaid = orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.totalPrice, 0)
  const totalUnpaid = orders
    .filter((o) => o.paymentStatus === "unpaid" || o.paymentStatus === "partially_paid")
    .reduce((sum, o) => sum + o.totalPrice, 0)

  // กรอง orders ตาม filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCustomerType = customerTypeFilter === "all" || order.customerType === customerTypeFilter
    const matchesChannel = channelFilter === "all" || order.channel === channelFilter
    const matchesOrderStatus = orderStatusFilter === "all" || order.orderStatus === orderStatusFilter
    const matchesPaymentStatus = paymentStatusFilter === "all" || order.paymentStatus === paymentStatusFilter

    let printStatusMatch = true
    if (printStatusFilter === "printed") printStatusMatch = order.printed === true
    else if (printStatusFilter === "not_printed") printStatusMatch = order.printed === false

    const orderDate = new Date(order.orderDate)
    const matchesOrderDate = !dateFrom || orderDate >= dateFrom

    const receiveDate = new Date(order.receiveDate)
    const matchesReceiveDate = !receiveDateFrom || receiveDate >= receiveDateFrom

    return (
      matchesSearch &&
      matchesCustomerType &&
      matchesChannel &&
      matchesOrderStatus &&
      matchesPaymentStatus &&
      printStatusMatch &&
      matchesOrderDate &&
      matchesReceiveDate
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)
  const pagedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleDocumentChange = (orderId: string, documentType: string, checked: boolean) => {
    console.log(`Order ${orderId}: ${documentType} = ${checked}`)
  }

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1, discount: 0 }])
  }

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  const updateOrderItem = (index: number, field: string, value: any) => {
    const updatedItems = [...orderItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setOrderItems(updatedItems)
  }

  const calculateOrderSummary = () => {
    const subtotal = orderItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return sum
      return sum + (product.price * item.quantity - item.discount)
    }, 0)

    const total = subtotal - totalDiscount + shippingCost
    return { subtotal, total }
  }

  const clearForm = () => {
    setSelectedCustomer("")
    setContactChannel("")
    setSelectedAddress("")
    setOrderItems([])
    setShippingCost(0)
    setShippingMethod("")
    setTotalDiscount(0)
    setNotes("")
  }

  const handleCreateOrder = () => {
    console.log("สร้างคำสั่งซื้อ:", {
      customer: selectedCustomer,
      channel: contactChannel,
      address: selectedAddress,
      items: orderItems,
      shipping: { cost: shippingCost, method: shippingMethod },
      discount: totalDiscount,
      notes,
    })
    setShowNewOrderDialog(false)
    clearForm()
  }

  const handleSendToLine = () => {
    console.log("ส่งข้อมูลไป LINE")
  }

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)

  return (
    <div className="space-y-6">
      {/* Navbar */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">คำสั่งซื้อ</h1>
        <div className="flex gap-2">
          <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มคำสั่งซื้อ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>สร้างคำสั่งซื้อใหม่</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* ข้อมูลลูกค้าและช่องทางติดต่อ */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>เลือกลูกค้า</Label>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกลูกค้า" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} ({customer.type === "credit" ? "เครดิต" : "เงินสด"})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>ช่องทางติดต่อ</Label>
                    <RadioGroup value={contactChannel} onValueChange={setContactChannel}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="LINE" id="line" />
                          <Label htmlFor="line">LINE</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Facebook" id="facebook" />
                          <Label htmlFor="facebook">Facebook</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Tel" id="tel" />
                          <Label htmlFor="tel">โทรศัพท์</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* ข้อมูลเครดิต */}
                {selectedCustomerData?.type === "credit" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">ข้อมูลเครดิต</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label>วงเงินเครดิต</Label>
                          <p className="font-semibold">฿{selectedCustomerData.creditLimit?.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label>ประเภทเครดิต</Label>
                          <p className="font-semibold">
                            {selectedCustomerData.creditType === "amount" ? "ตามจำนวนเงิน" : "ตามจำนวนบิล"}
                          </p>
                        </div>
                        <div>
                          <Label>จำนวนวัน</Label>
                          <p className="font-semibold">{selectedCustomerData.creditDays} วัน</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* เลือกที่อยู่จัดส่ง */}
                {selectedCustomerData && (
                  <div>
                    <Label>เลือกที่อยู่จัดส่ง</Label>
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                      {selectedCustomerData.addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                          <Label htmlFor={address.id} className="text-sm leading-relaxed">
                            {address.address}{" "}
                            {address.isDefault && (
                              <Badge variant="secondary" className="ml-2">
                                ค่าเริ่มต้น
                              </Badge>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* เลือกสินค้า */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-semibold">รายการสินค้า</Label>
                    <Button onClick={addOrderItem} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มสินค้า
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {orderItems.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-5 gap-4 items-end">
                            <div>
                              <Label>สินค้า</Label>
                              <Select
                                value={item.productId}
                                onValueChange={(value) => updateOrderItem(index, "productId", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกสินค้า" />
                                </SelectTrigger>
                                <SelectContent>
                                  {products.map((product) => (
                                    <SelectItem key={product.id} value={product.id}>
                                      {product.name} - ฿{product.price}/{product.unit}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>จำนวน</Label>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateOrderItem(index, "quantity", Number(e.target.value))}
                                min="1"
                              />
                            </div>

                            <div>
                              <Label>ส่วนลด (บาท)</Label>
                              <Input
                                type="number"
                                value={item.discount}
                                onChange={(e) => updateOrderItem(index, "discount", Number(e.target.value))}
                                min="0"
                              />
                            </div>

                            <div>
                              <Label>ราคารวม</Label>
                              <p className="font-semibold">
                                ฿{(() => {
                                  const product = products.find((p) => p.id === item.productId)
                                  if (!product) return 0
                                  return (product.price * item.quantity - item.discount).toLocaleString()
                                })()}
                              </p>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeOrderItem(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* ส่วนลดทั้งบิลและค่าส่ง */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>ส่วนลดทั้งบิล (บาท)</Label>
                    <Input
                      type="number"
                      value={totalDiscount}
                      onChange={(e) => setTotalDiscount(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label>ค่าส่งสินค้า (บาท)</Label>
                    <Input
                      type="number"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(Number(e.target.value))}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label>ขนส่ง</Label>
                    <Select value={shippingMethod} onValueChange={setShippingMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกขนส่ง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerry">Kerry Express</SelectItem>
                        <SelectItem value="thailand_post">ไปรษณีย์ไทย</SelectItem>
                        <SelectItem value="flash">Flash Express</SelectItem>
                        <SelectItem value="j&t">J&T Express</SelectItem>
                        <SelectItem value="pickup">รับเอง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* หมายเหตุ */}
                <div>
                  <Label>หมายเหตุ</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="หมายเหตุเพิ่มเติม..."
                    rows={3}
                  />
                </div>

                {/* สรุปคำสั่งซื้อ */}
                <Card>
                  <CardHeader>
                    <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {orderItems.map((item, index) => {
                        const product = products.find((p) => p.id === item.productId)
                        if (!product) return null
                        return (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {product.name} x {item.quantity} {product.unit}
                            </span>
                            <span>฿{(product.price * item.quantity - item.discount).toLocaleString()}</span>
                          </div>
                        )
                      })}

                      <Separator />

                      <div className="flex justify-between text-sm">
                        <span>ยอดรวมสินค้า</span>
                        <span>฿{calculateOrderSummary().subtotal.toLocaleString()}</span>
                      </div>

                      {totalDiscount > 0 && (
                        <div className="flex justify-between text-sm text-red-600">
                          <span>ส่วนลดทั้งบิล</span>
                          <span>-฿{totalDiscount.toLocaleString()}</span>
                        </div>
                      )}

                      {shippingCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>ค่าส่งสินค้า</span>
                          <span>฿{shippingCost.toLocaleString()}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-semibold">
                        <span>ยอดรวมทั้งสิ้น</span>
                        <span>฿{calculateOrderSummary().total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ปุ่มต่างๆ */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearForm}>
                    เคลียร์ข้อมูล
                  </Button>

                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Send className="w-4 h-4 mr-2" />
                          ส่งไป LINE
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>ยืนยันการส่งข้อมูล</AlertDialogTitle>
                          <AlertDialogDescription>ต้องการส่งข้อมูลคำสั่งซื้อไปยัง LINE ใช่หรือไม่?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSendToLine}>ใช่</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>สร้างคำสั่งซื้อ</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>ยืนยันการสร้างคำสั่งซื้อ</AlertDialogTitle>
                          <AlertDialogDescription>ต้องการยืนยันการสร้างคำสั่งซื้อใช่หรือไม่?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCreateOrder}>ใช่</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showSalesDialog} onOpenChange={setShowSalesDialog}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">ดูยอดสรุป</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">สรุปยอดขาย</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">ยอดรวมทั้งหมด</span>
                  <span className="text-xl font-bold text-blue-800">฿{totalAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">ยอดที่ชำระแล้ว</span>
                  <span className="text-xl font-bold text-green-800">฿{totalPaid.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">ยอดค้างชำระ</span>
                  <span className="text-xl font-bold text-red-800">฿{totalUnpaid.toLocaleString()}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 bg-transparent"
                  onClick={() => setShowSalesDialog(false)}
                >
                  ปิด
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {["pending", "packing", "delivering", "completed"].map((status) => (
          <Card key={status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-center">
                {orderStatusMap[status as keyof typeof orderStatusMap].label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold">{orders.filter((o) => o.orderStatus === status).length}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
            {/* ค้นหา */}
            <div>
              <Label htmlFor="search">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ค้นหาด้วยรหัสคำสั่งซื้อหรือชื่อลูกค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* ประเภทลูกค้า */}
            <div>
              <Label>ประเภทลูกค้า</Label>
              <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทลูกค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="บุคคล">บุคคล</SelectItem>
                  <SelectItem value="บริษัท">บริษัท</SelectItem>
                  <SelectItem value="ร้านค้า">ร้านค้า</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ช่องทางการสั่งซื้อ */}
            <div>
              <Label>ช่องทางการสั่งซื้อ</Label>
              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกช่องทาง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="LINE">LINE</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Shopee">Shopee</SelectItem>
                  <SelectItem value="Lazada">Lazada</SelectItem>
                  <SelectItem value="เว็บไซต์">เว็บไซต์</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* สถานะคำสั่งซื้อ */}
            <div>
              <Label>สถานะคำสั่งซื้อ</Label>
              <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="pending">รอยืนยันคำสั่งซื้อ</SelectItem>
                  <SelectItem value="packing">รอแพ็คของ</SelectItem>
                  <SelectItem value="delivering">รอจัดส่ง</SelectItem>
                  <SelectItem value="completed">จัดส่งแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* สถานะการชำระเงิน */}
            <div>
              <Label>สถานะการชำระเงิน</Label>
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="unpaid">รอชำระเงิน</SelectItem>
                  <SelectItem value="partially_paid">ชำระบางส่วน</SelectItem>
                  <SelectItem value="paid">ชำระเงินแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* สถานะการพิมพ์เอกสาร */}
            <div>
              <Label>สถานะการพิมพ์เอกสาร</Label>
              <Select value={printStatusFilter} onValueChange={setPrintStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="printed">พิมพ์แล้ว</SelectItem>
                  <SelectItem value="not_printed">ยังไม่พิมพ์</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* วันที่สั่ง */}
            <div>
              <Label>วันที่สั่ง</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* วันที่รับสินค้า */}
            <div>
              <Label>วันที่รับสินค้า</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !receiveDateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {receiveDateFrom ? format(receiveDateFrom, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={receiveDateFrom} onSelect={setReceiveDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>รายการคำสั่งซื้อ</CardTitle>
            <CardDescription>
              แสดง {filteredOrders.length} รายการจากทั้งหมด {orders.length} รายการ
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="rowsPerPage" className="whitespace-nowrap">
              แสดงต่อหน้า:
            </Label>
            <Select
              value={String(rowsPerPage)}
              onValueChange={(val) => {
                setRowsPerPage(Number.parseInt(val))
                setPage(1) // reset page
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่คำสั่งซื้อ</TableHead>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>ช่องทางการสั่งซื้อ</TableHead>
                  <TableHead>วันที่สั่งซื้อ</TableHead>
                  <TableHead>วันที่ต้องการรับสินค้า</TableHead>
                  <TableHead>สถานะคำสั่งซื้อ</TableHead>
                  <TableHead>สถานะการชำระเงิน</TableHead>
                  <TableHead>พิมพ์เอกสาร</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {order.channel}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(order.orderDate), "dd/MM/yyyy", { locale: th })}</TableCell>
                    <TableCell>{format(new Date(order.receiveDate), "dd/MM/yyyy", { locale: th })}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("border", orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].color)}
                      >
                        {orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border",
                          paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].color,
                        )}
                      >
                        {paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-package`}
                            checked={order.documents.packageLabel}
                            onCheckedChange={(checked) =>
                              handleDocumentChange(order.id, "packageLabel", checked as boolean)
                            }
                          />
                          <Label htmlFor={`${order.id}-package`} className="text-sm font-normal cursor-pointer">
                            ใบปะหน้าพัสดุ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-packing`}
                            checked={order.documents.packingList}
                            onCheckedChange={(checked) =>
                              handleDocumentChange(order.id, "packingList", checked as boolean)
                            }
                          />
                          <Label htmlFor={`${order.id}-packing`} className="text-sm font-normal cursor-pointer">
                            Packing List
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-pick`}
                            checked={order.documents.pickList}
                            onCheckedChange={(checked) =>
                              handleDocumentChange(order.id, "pickList", checked as boolean)
                            }
                          />
                          <Label htmlFor={`${order.id}-pick`} className="text-sm font-normal cursor-pointer">
                            Pick List
                          </Label>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              ก่อนหน้า
            </Button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              ถัดไป
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { OrdersPage }
export default OrdersPage
