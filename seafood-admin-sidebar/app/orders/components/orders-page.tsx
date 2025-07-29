"use client"

import React from "react"
import { CalendarIcon, Search, Plus, ChevronLeft, ChevronRight, Eye, CreditCard, Banknote } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Link from "next/link"

const orders = [
  {
    id: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    channel: "Line",
    orderDate: "2024-01-15",
    receiveDate: "2024-01-20",
    totalPrice: 2450,
    orderStatus: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "cash",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 2, unit: "กิโลกรัม", price: 250, total: 500 },
      { name: "กุ้งขาว", quantity: 1, unit: "กิโลกรัม", price: 180, total: 180 },
    ],
    shippingAddress: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110",
    notes: "ต้องการสินค้าสดใหม่",
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
    paymentMethod: "scb",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: false,
    },
    items: [
      { name: "ปลาแซลมอน", quantity: 10, unit: "กิโลกรัม", price: 450, total: 4500 },
      { name: "หอยแมลงภู่", quantity: 5, unit: "กิโลกรัม", price: 120, total: 600 },
    ],
    shippingAddress: "789 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    notes: "สำหรับงานเลี้ยงบริษัท",
  },
  {
    id: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    channel: "Tel",
    orderDate: "2024-01-14",
    receiveDate: "2024-01-19",
    totalPrice: 1200,
    orderStatus: "delivering",
    paymentStatus: "paid",
    paymentMethod: "kbank",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: true,
    },
    items: [
      { name: "กุ้งขาว", quantity: 2, unit: "กิโลกรัม", price: 180, total: 360 },
      { name: "หอยแมลงภู่", quantity: 3, unit: "กิโลกรัม", price: 120, total: 360 },
    ],
    shippingAddress: "456 ถนนพระราม 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500",
    notes: "",
  },
  {
    id: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    channel: "Line",
    orderDate: "2024-01-14",
    receiveDate: "2024-01-18",
    totalPrice: 15600,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "bbl",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 20, unit: "กิโลกรัม", price: 250, total: 5000 },
      { name: "ปลาแซลมอน", quantity: 15, unit: "กิโลกรัม", price: 450, total: 6750 },
      { name: "กุ้งขาว", quantity: 10, unit: "กิโลกรัม", price: 180, total: 1800 },
    ],
    shippingAddress: "321 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    notes: "สำหรับร้านอาหาร ต้องการคุณภาพดี",
  },
  {
    id: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    channel: "Facebook",
    orderDate: "2024-01-13",
    receiveDate: "2024-01-21",
    totalPrice: 3200,
    orderStatus: "pending",
    paymentStatus: "partially_paid",
    paymentMethod: "cash",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
    items: [
      { name: "ปลาแซลมอน", quantity: 5, unit: "กิโลกรัม", price: 450, total: 2250 },
      { name: "กุ้งขาว", quantity: 3, unit: "กิโลกรัม", price: 180, total: 540 },
    ],
    shippingAddress: "654 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900",
    notes: "ชำระเงินมัดจำแล้ว 1,500 บาท",
  },
  {
    id: "ORD-006",
    customerName: "โรงแรมสีฟู้ด พาราไดซ์",
    channel: "Tel",
    orderDate: "2024-01-13",
    receiveDate: "2024-01-20",
    totalPrice: 25400,
    orderStatus: "packing",
    paymentStatus: "paid",
    paymentMethod: "scb",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: false,
      pickList: true,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 30, unit: "กิโลกรัม", price: 250, total: 7500 },
      { name: "ปลาแซลมอน", quantity: 25, unit: "กิโลกรัม", price: 450, total: 11250 },
      { name: "กุ้งขาว", quantity: 20, unit: "กิโลกรัม", price: 180, total: 3600 },
      { name: "หอยแมลงภู่", quantity: 15, unit: "กิโลกรัม", price: 120, total: 1800 },
    ],
    shippingAddress: "888 ถนนสุขุมวิท แขวงพระโขนง เขตวัฒนา กรุงเทพฯ 10110",
    notes: "สำหรับบุฟเฟ่ต์โรงแรม ต้องการจัดส่งเช้า 6 โมง",
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

const bankMap = {
  cash: { name: "เงินสด", color: "bg-green-100 text-green-800" },
  scb: { name: "ไทยพาณิชย์", color: "bg-purple-100 text-purple-800" },
  kbank: { name: "กสิกรไทย", color: "bg-green-100 text-green-800" },
  bbl: { name: "กรุงเทพ", color: "bg-blue-100 text-blue-800" },
  ktb: { name: "กรุงไทย", color: "bg-blue-100 text-blue-800" },
  tmb: { name: "ทหารไทย", color: "bg-yellow-100 text-yellow-800" },
} as const

export function OrdersPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [customerTypeFilter, setCustomerTypeFilter] = React.useState("all")
  const [channelFilter, setChannelFilter] = React.useState("all")
  const [orderStatusFilter, setOrderStatusFilter] = React.useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = React.useState("all")
  const [printStatusFilter, setPrintStatusFilter] = React.useState("all")
  const [dateFrom, setDateFrom] = React.useState<Date>()
  const [receiveDateFrom, setReceiveDateFrom] = React.useState<Date>()
  const [showSalesDialog, setShowSalesDialog] = React.useState(false)
  const [showOrderDetail, setShowOrderDetail] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null)
  const [summaryDateFrom, setSummaryDateFrom] = React.useState<Date>()
  const [summaryDateTo, setSummaryDateTo] = React.useState<Date>()
  const [activeCardFilter, setActiveCardFilter] = React.useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  // คำนวณยอดต่างๆ ตาม filter วันที่
  const getFilteredOrdersForSummary = () => {
    return orders.filter((order) => {
      const orderDate = new Date(order.orderDate)
      const matchesFromDate = !summaryDateFrom || orderDate >= summaryDateFrom
      const matchesToDate = !summaryDateTo || orderDate <= summaryDateTo
      return matchesFromDate && matchesToDate
    })
  }

  const filteredOrdersForSummary = getFilteredOrdersForSummary()
  const totalAmount = filteredOrdersForSummary.reduce((sum, o) => sum + o.totalPrice, 0)
  const totalPaid = filteredOrdersForSummary
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalPrice, 0)
  const totalUnpaid = filteredOrdersForSummary
    .filter((o) => o.paymentStatus === "unpaid" || o.paymentStatus === "partially_paid")
    .reduce((sum, o) => sum + o.totalPrice, 0)

  // คำนวณยอดตามธนาคาร
  const paidOrdersByBank = filteredOrdersForSummary
    .filter((o) => o.paymentStatus === "paid")
    .reduce(
      (acc, order) => {
        const bank = order.paymentMethod
        if (!acc[bank]) {
          acc[bank] = 0
        }
        acc[bank] += order.totalPrice
        return acc
      },
      {} as Record<string, number>,
    )

  // คำสั่งซื้อล่าสุด (5 รายการ)
  const latestOrders = filteredOrdersForSummary
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5)

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    customerTypeFilter,
    channelFilter,
    orderStatusFilter,
    paymentStatusFilter,
    printStatusFilter,
    dateFrom,
    receiveDateFrom,
    activeCardFilter,
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handleCardFilter = (filterType: string) => {
    // Reset all filters first
    setSearchTerm("")
    setCustomerTypeFilter("all")
    setChannelFilter("all")
    setPaymentStatusFilter("all")
    setPrintStatusFilter("all")
    setDateFrom(undefined)
    setReceiveDateFrom(undefined)

    // Apply the selected card filter
    if (activeCardFilter === filterType) {
      // If clicking the same card, reset all filters
      setActiveCardFilter(null)
      setOrderStatusFilter("all")
    } else {
      setActiveCardFilter(filterType)
      setOrderStatusFilter(filterType)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setCustomerTypeFilter("all")
    setChannelFilter("all")
    setOrderStatusFilter("all")
    setPaymentStatusFilter("all")
    setPrintStatusFilter("all")
    setDateFrom(undefined)
    setReceiveDateFrom(undefined)
    setActiveCardFilter(null)
  }

  const handleDocumentChange = (orderId: string, documentType: string, checked: boolean) => {
    console.log(`Order ${orderId}: ${documentType} = ${checked}`)
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setShowOrderDetail(true)
  }

  return (
    <div className="space-y-6">
      {/* Navbar */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">คำสั่งซื้อ</h1>
        <div className="flex gap-2">
          <Button
            asChild
            className="rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg"
          >
            <Link href="/orders/create">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มคำสั่งซื้อ
            </Link>
          </Button>

          {/* Order Detail Dialog */}
          <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 rounded-3xl shadow-2xl">
              <DialogHeader>
                <DialogTitle>รายละเอียดคำสั่งซื้อ {selectedOrder?.id}</DialogTitle>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-6 py-4">
                  {/* ข้อมูลลูกค้า */}
                  <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">ข้อมูลลูกค้า</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">ชื่อลูกค้า</Label>
                          <p className="text-sm">{selectedOrder.customerName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">ประเภทลูกค้า</Label>
                          <Badge variant="outline" className="ml-2">
                            {selectedOrder.customerType}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">ช่องทางการสั่งซื้อ</Label>
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                            {selectedOrder.channel}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">วิธีการจัดส่ง</Label>
                          <p className="text-sm">{selectedOrder.deliveryMethod}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ข้อมูลคำสั่งซื้อ */}
                  <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">ข้อมูลคำสั่งซื้อ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">วันที่สั่งซื้อ</Label>
                          <p className="text-sm">
                            {format(new Date(selectedOrder.orderDate), "dd/MM/yyyy", { locale: th })}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">วันที่ต้องการรับสินค้า</Label>
                          <p className="text-sm">
                            {format(new Date(selectedOrder.receiveDate), "dd/MM/yyyy", { locale: th })}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">สถานะคำสั่งซื้อ</Label>
                          <Badge
                            variant="outline"
                            className={cn(
                              "ml-2 border",
                              orderStatusMap[selectedOrder.orderStatus as keyof typeof orderStatusMap].color,
                            )}
                          >
                            {orderStatusMap[selectedOrder.orderStatus as keyof typeof orderStatusMap].label}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">สถานะการชำระเงิน</Label>
                          <Badge
                            variant="outline"
                            className={cn(
                              "ml-2 border",
                              paymentStatusMap[selectedOrder.paymentStatus as keyof typeof paymentStatusMap].color,
                            )}
                          >
                            {paymentStatusMap[selectedOrder.paymentStatus as keyof typeof paymentStatusMap].label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ที่อยู่จัดส่ง */}
                  <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">ที่อยู่จัดส่ง</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedOrder.shippingAddress}</p>
                    </CardContent>
                  </Card>

                  {/* รายการสินค้า */}
                  <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">รายการสินค้า</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-center">ชื่อสินค้า</TableHead>
                              <TableHead className="text-center">จำนวน</TableHead>
                              <TableHead className="text-center">หน่วย</TableHead>
                              <TableHead className="text-center">ราคาต่อหน่วย</TableHead>
                              <TableHead className="text-center">ราคารวม</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="text-center">{item.name}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-center">{item.unit}</TableCell>
                                <TableCell className="text-center">฿{item.price.toLocaleString()}</TableCell>
                                <TableCell className="text-center">฿{item.total.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-end">
                        <div className="text-right">
                          <div className="text-lg font-semibold">
                            ยอดรวมทั้งสิ้น: ฿{selectedOrder.totalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* หมายเหตุ */}
                  {selectedOrder.notes && (
                    <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg">หมายเหตุ</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedOrder.notes}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* สถานะเอกสาร */}
                  <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">สถานะเอกสาร</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={selectedOrder.documents.packageLabel} disabled />
                          <Label className="text-sm">ใบปะหน้าพัสดุ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={selectedOrder.documents.packingList} disabled />
                          <Label className="text-sm">Packing List</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={selectedOrder.documents.pickList} disabled />
                          <Label className="text-sm">Pick List</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowOrderDetail(false)}
                      className="border-0 shadow-sm rounded-2xl hover:shadow-md bg-transparent"
                    >
                      ปิด
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={showSalesDialog} onOpenChange={setShowSalesDialog}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg">
                ดูยอดสรุป
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 rounded-3xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-center">สรุปยอดขาย</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Filter วันที่ */}
                <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-sm">กรองตามวันที่</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>จากวันที่</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !summaryDateFrom && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {summaryDateFrom ? format(summaryDateFrom, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={summaryDateFrom}
                              onSelect={setSummaryDateFrom}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>ถึงวันที่</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !summaryDateTo && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {summaryDateTo ? format(summaryDateTo, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={summaryDateTo} onSelect={setSummaryDateTo} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSummaryDateFrom(undefined)
                          setSummaryDateTo(undefined)
                        }}
                        className="border-0 shadow-sm rounded-xl hover:shadow-md"
                      >
                        ล้างตัวกรอง
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* คำสั่งซื้อล่าสุด */}
                <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-sm">คำสั่งซื้อล่าสุด</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {latestOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                        >
                          <div>
                            <div className="font-medium text-sm">{order.id}</div>
                            <div className="text-xs text-gray-500">{order.customerName}</div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(order.orderDate), "dd/MM/yyyy", { locale: th })}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">฿{order.totalPrice.toLocaleString()}</div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].color,
                              )}
                            >
                              {paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].label}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* สรุปยอด */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>

                {/* ยอดตามธนาคาร */}
                <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-sm">ยอดที่ชำระแล้วแยกตามธนาคาร</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(paidOrdersByBank).map(([bank, amount]) => (
                        <div key={bank} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                          <div className="flex items-center space-x-2">
                            {bank === "cash" ? <Banknote className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                            <span className="text-sm font-medium">
                              {bankMap[bank as keyof typeof bankMap]?.name || bank}
                            </span>
                          </div>
                          <span className="text-sm font-bold">฿{amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  className="w-full mt-6 bg-transparent border-0 shadow-sm rounded-2xl hover:shadow-md"
                  onClick={() => setShowSalesDialog(false)}
                >
                  ปิด
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Summary Cards - Now clickable */}
      <div className="grid grid-cols-4 gap-4">
        {["pending", "packing", "delivering", "completed"].map((status) => (
          <Card
            key={status}
            className={`cursor-pointer transition-all hover:shadow-md border-0 shadow-sm rounded-2xl bg-white ${
              activeCardFilter === status ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleCardFilter(status)}
          >
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

      {/* Active Filter Indicator */}
      {activeCardFilter && (
        <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-sm border-0">
          <div className="text-sm text-blue-800">
            <strong>กำลังกรองข้อมูล:</strong> {orderStatusMap[activeCardFilter as keyof typeof orderStatusMap].label}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCardFilter("")}
            className="h-7 px-3 text-xs bg-white rounded-xl border-0 shadow-sm hover:shadow-md"
          >
            ล้างตัวกรอง
          </Button>
        </div>
      )}

      {/* Filters */}
      <Card className="border-0 shadow-sm rounded-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md"
          >
            ล้างตัวกรอง
          </Button>
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
                  <SelectItem value="ลูกค้าเงินสด">ลูกค้าเงินสด</SelectItem>
                  <SelectItem value="ลูกค้าเครดิต">ลูกค้าเครดิต</SelectItem>
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
                  <SelectItem value="Line">Line</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Tel">Tel</SelectItem>
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
      <Card className="border-0 shadow-sm rounded-2xl bg-white">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>รายการคำสั่งซื้อ</CardTitle>
            <CardDescription>
              แสดง {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} จาก {filteredOrders.length} รายการ
              (ทั้งหมด {orders.length} รายการ)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="itemsPerPage" className="text-sm">
              แสดง:
            </Label>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">รายการ</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">เลขที่คำสั่งซื้อ</TableHead>
                  <TableHead className="text-center">ชื่อลูกค้า</TableHead>
                  <TableHead className="text-center">ช่องทางการสั่งซื้อ</TableHead>
                  <TableHead className="text-center">วันที่สั่งซื้อ</TableHead>
                  <TableHead className="text-center">วันที่ต้องการรับสินค้า</TableHead>
                  <TableHead className="text-center">สถานะคำสั่งซื้อ</TableHead>
                  <TableHead className="text-center">สถานะการชำระเงิน</TableHead>
                  <TableHead className="text-center">พิมพ์เอกสาร</TableHead>
                  <TableHead className="text-center">เพิ่มเติม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-center">{order.id}</TableCell>
                    <TableCell className="text-center">{order.customerName}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {order.channel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {format(new Date(order.orderDate), "dd/MM/yyyy", { locale: th })}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(new Date(order.receiveDate), "dd/MM/yyyy", { locale: th })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn("border", orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].color)}
                      >
                        {orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
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
                    <TableCell className="text-center">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-package`}
                            checked={order.documents.packageLabel}
                            onCheckedChange={(checked) => handleDocumentChange(order.id, "packageLabel", checked)}
                          />
                          <Label htmlFor={`${order.id}-package`} className="text-sm font-normal cursor-pointer">
                            ใบปะหน้าพัสดุ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-packing`}
                            checked={order.documents.packingList}
                            onCheckedChange={(checked) => handleDocumentChange(order.id, "packingList", checked)}
                          />
                          <Label htmlFor={`${order.id}-packing`} className="text-sm font-normal cursor-pointer">
                            Packing List
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${order.id}-pick`}
                            checked={order.documents.pickList}
                            onCheckedChange={(checked) => handleDocumentChange(order.id, "pickList", checked)}
                          />
                          <Label htmlFor={`${order.id}-pick`} className="text-sm font-normal cursor-pointer">
                            Pick List
                          </Label>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                        className="border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                หน้า {currentPage} จาก {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 px-3 border-0 shadow-sm rounded-xl hover:shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  ก่อนหน้า
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="h-8 w-8 p-0 border-0 shadow-sm rounded-xl hover:shadow-md"
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 px-3 border-0 shadow-sm rounded-xl hover:shadow-md"
                >
                  ถัดไป
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
