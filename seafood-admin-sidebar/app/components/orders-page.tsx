"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  Printer,
  X,
  FileText,
  Receipt,
  Truck,
  Phone,
  MessageSquare,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CreateOrderModal } from "@/components/create-order-modal"

// Mock data for orders with enhanced fields
const ordersData = [
  {
    id: "ORD-2024-001",
    customerName: "นายสมชาย ใจดี",
    customerType: "credit",
    contactChannel: "line",
    contactInfo: "LINE: @somchai123",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    totalPrice: 2450,
    orderStatus: "pending_confirm",
    paymentStatus: "unpaid",
    shippingMethod: "own_delivery",
    products: ["กุ้งแม่น้ำ 2กก.", "ปลาทูน่า 1กก."],
    documentsPrinted: {
      shippingLabel: false,
      packingList: false,
      pickList: false,
    },
  },
  {
    id: "ORD-2024-002",
    customerName: "นางสาวมาลี สวยงาม",
    customerType: "cash",
    contactChannel: "phone",
    contactInfo: "โทร: 082-345-6789",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    totalPrice: 1890,
    orderStatus: "packing",
    paymentStatus: "paid",
    shippingMethod: "kerry",
    products: ["หอยแมลงภู่ 3กก.", "ปูม้า 1ตัว"],
    documentsPrinted: {
      shippingLabel: true,
      packingList: true,
      pickList: false,
    },
  },
  {
    id: "ORD-2024-003",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerType: "credit",
    contactChannel: "facebook",
    contactInfo: "FB: SeafoodCorp",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-15",
    totalPrice: 5670,
    orderStatus: "ready_to_ship",
    paymentStatus: "partially_paid",
    shippingMethod: "own_delivery",
    products: ["กุ้งแม่น้ำ 5กก.", "ปลาทูน่า 3กก.", "หอยแมลงภู่ 2กก."],
    documentsPrinted: {
      shippingLabel: true,
      packingList: true,
      pickList: true,
    },
  },
  {
    id: "ORD-2024-004",
    customerName: "ร้านอาหารทะเลสด",
    customerType: "credit",
    contactChannel: "line",
    contactInfo: "LINE: @seafoodrest",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-14",
    totalPrice: 3240,
    orderStatus: "delivered",
    paymentStatus: "paid",
    shippingMethod: "flash",
    products: ["ปลาทูน่า 4กก.", "กุ้งแม่น้ำ 2กก."],
    documentsPrinted: {
      shippingLabel: true,
      packingList: true,
      pickList: true,
    },
  },
  {
    id: "ORD-2024-005",
    customerName: "นายประยุทธ์ รักทะเล",
    customerType: "cash",
    contactChannel: "phone",
    contactInfo: "โทร: 084-567-8901",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-14",
    totalPrice: 1560,
    orderStatus: "pending_confirm",
    paymentStatus: "unpaid",
    shippingMethod: "own_delivery",
    products: ["หอยแมลงภู่ 4กก."],
    documentsPrinted: {
      shippingLabel: false,
      packingList: false,
      pickList: false,
    },
  },
  {
    id: "ORD-2024-006",
    customerName: "นางวิมล ชอบกิน",
    customerType: "credit",
    contactChannel: "line",
    contactInfo: "LINE: @wimon_eat",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-14",
    totalPrice: 2890,
    orderStatus: "packing",
    paymentStatus: "paid",
    shippingMethod: "kerry",
    products: ["กุ้งแม่น้ำ 3กก.", "ปูม้า 2ตัว"],
    documentsPrinted: {
      shippingLabel: true,
      packingList: false,
      pickList: false,
    },
  },
  {
    id: "ORD-2024-007",
    customerName: "โรงแรมสีฟ้า",
    customerType: "credit",
    contactChannel: "facebook",
    contactInfo: "FB: BlueHotel",
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-13",
    totalPrice: 7850,
    orderStatus: "delivered",
    paymentStatus: "paid",
    shippingMethod: "own_delivery",
    products: ["กุ้งแม่น้ำ 8กก.", "ปลาทูน่า 5กก.", "หอยแมลงภู่ 3กก."],
    documentsPrinted: {
      shippingLabel: true,
      packingList: true,
      pickList: true,
    },
  },
  {
    id: "ORD-2024-008",
    customerName: "นายสุรชัย ปลาใหญ่",
    customerType: "cash",
    contactChannel: "phone",
    contactInfo: "โทร: 085-678-9012",
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-13",
    totalPrice: 4320,
    orderStatus: "ready_to_ship",
    paymentStatus: "partially_paid",
    shippingMethod: "flash",
    products: ["ปลาทูน่า 6กก.", "กุ้งแม่น้ำ 1กก."],
    documentsPrinted: {
      shippingLabel: true,
      packingList: true,
      pickList: false,
    },
  },
]

// Configuration objects
const orderStatusConfig = {
  pending_confirm: {
    label: "รอยืนยันคำสั่งซื้อ",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dotColor: "bg-gray-400",
  },
  packing: { label: "รอแพ็คของ", color: "bg-yellow-50 text-yellow-600 border-yellow-200", dotColor: "bg-yellow-400" },
  ready_to_ship: {
    label: "รอจัดส่ง",
    color: "bg-orange-50 text-orange-600 border-orange-200",
    dotColor: "bg-orange-400",
  },
  delivered: { label: "จัดส่งแล้ว", color: "bg-green-50 text-green-600 border-green-200", dotColor: "bg-green-400" },
}

const paymentStatusConfig = {
  unpaid: { label: "ยังไม่ชำระ", color: "bg-red-50 text-red-600 border-red-200", dotColor: "bg-red-400" },
  partially_paid: {
    label: "ชำระบางส่วน",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    dotColor: "bg-yellow-400",
  },
  paid: { label: "ชำระแล้ว", color: "bg-green-50 text-green-600 border-green-200", dotColor: "bg-green-400" },
}

const contactChannelConfig = {
  line: { label: "LINE", icon: MessageSquare, color: "text-green-600" },
  facebook: { label: "Facebook", icon: Facebook, color: "text-blue-600" },
  phone: { label: "โทรศัพท์", icon: Phone, color: "text-purple-600" },
}

const shippingMethodConfig = {
  own_delivery: { label: "ขนส่งเอง", color: "bg-blue-50 text-blue-600 border-blue-200" },
  kerry: { label: "Kerry Express", color: "bg-purple-50 text-purple-600 border-purple-200" },
  flash: { label: "Flash Express", color: "bg-orange-50 text-orange-600 border-orange-200" },
}

// Helper function to format date to dd/mm/yy
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString().slice(-2)
  return `${day}/${month}/${year}`
}

// Helper function to convert dd/mm/yy to ISO date
const parseDate = (dateString: string) => {
  if (!dateString) return ""
  const [day, month, year] = dateString.split("/")
  const fullYear = year.length === 2 ? `20${year}` : year
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

interface OrdersPageProps {
  onShowOrderSummary?: () => void
}

export const OrdersPage = ({ onShowOrderSummary }: OrdersPageProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all")
  const [shippingFilter, setShippingFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")
  const [documentFilter, setDocumentFilter] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [jumpToPage, setJumpToPage] = useState("")

  const [showCreateOrder, setShowCreateOrder] = useState(false)

  // Filter orders based on all criteria
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
    const matchesCustomerType = customerTypeFilter === "all" || order.customerType === customerTypeFilter
    const matchesShipping = shippingFilter === "all" || order.shippingMethod === shippingFilter

    const matchesProduct =
      productFilter === "all" ||
      order.products.some((product) => product.toLowerCase().includes(productFilter.toLowerCase()))

    // Document filters - multi-select
    const matchesDocument =
      documentFilter.length === 0 ||
      documentFilter.some((filter) => {
        if (filter === "shippingLabel") return !order.documentsPrinted.shippingLabel
        if (filter === "packingList") return !order.documentsPrinted.packingList
        if (filter === "pickList") return !order.documentsPrinted.pickList
        return false
      })

    // Date filter
    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = order.orderDate === "2024-01-15"
    } else if (dateFilter === "week") {
      matchesDate = new Date(order.orderDate) >= new Date("2024-01-09")
    } else if (dateFilter === "month") {
      matchesDate = new Date(order.orderDate) >= new Date("2024-01-01")
    } else if (dateFilter === "custom" && startDate && endDate) {
      const orderDate = new Date(parseDate(startDate))
      const start = new Date(parseDate(startDate))
      const end = new Date(parseDate(endDate))
      matchesDate = orderDate >= start && orderDate <= end
    }

    // Delivery date filter
    let matchesDeliveryDate = true
    if (deliveryDate) {
      matchesDeliveryDate = order.deliveryDate === parseDate(deliveryDate)
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPayment &&
      matchesCustomerType &&
      matchesShipping &&
      matchesProduct &&
      matchesDocument &&
      matchesDate &&
      matchesDeliveryDate
    )
  })

  // Calculate statistics
  const statusCounts = {
    pending_confirm: filteredOrders.filter((o) => o.orderStatus === "pending_confirm").length,
    packing: filteredOrders.filter((o) => o.orderStatus === "packing").length,
    ready_to_ship: filteredOrders.filter((o) => o.orderStatus === "ready_to_ship").length,
    delivered: filteredOrders.filter((o) => o.orderStatus === "delivered").length,
  }

  const totalOutstanding = filteredOrders
    .filter((o) => o.customerType === "credit" && o.paymentStatus !== "paid")
    .reduce((sum, order) => sum + order.totalPrice, 0)

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPaymentFilter("all")
    setCustomerTypeFilter("all")
    setShippingFilter("all")
    setProductFilter("all")
    setDocumentFilter([])
    setDateFilter("all")
    setStartDate("")
    setEndDate("")
    setDeliveryDate("")
    setCurrentPage(1)
  }

  const handleViewDetails = (orderId: string) => {
    alert(`ดูรายละเอียดคำสั่งซื้อ: ${orderId}`)
  }

  const handlePrintDocument = (orderId: string, documentType: string) => {
    alert(`พิมพ์${documentType}: ${orderId}`)
  }

  const getContactChannelIcon = (channel: string) => {
    const config = contactChannelConfig[channel as keyof typeof contactChannelConfig]
    if (!config) return null
    const Icon = config.icon
    return <Icon className={`h-4 w-4 ${config.color}`} />
  }

  const handleCreateNewOrder = () => {
    setShowCreateOrder(true)
  }

  const handleSaveNewOrder = (orderData: any) => {
    console.log("New order:", orderData)
    alert(`สร้างคำสั่งซื้อ ${orderData.id} สำเร็จ!`)
  }

  const handleJumpToPage = () => {
    const pageNum = Number.parseInt(jumpToPage)
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
      setJumpToPage("")
    }
  }

  const handleDocumentFilterChange = (value: string, checked: boolean) => {
    if (checked) {
      setDocumentFilter([...documentFilter, value])
    } else {
      setDocumentFilter(documentFilter.filter((item) => item !== value))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <div className="space-y-6">
        {/* Status Summary Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-gray-600">รอยืนยันคำสั่งซื้อ</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{statusCounts.pending_confirm}</div>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm font-medium text-gray-600">รอแพ็คของ</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600">{statusCounts.packing}</div>
              </div>
              <Package className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium text-gray-600">รอจัดส่ง</span>
                </div>
                <div className="text-3xl font-bold text-orange-600">{statusCounts.ready_to_ship}</div>
              </div>
              <Truck className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm font-medium text-gray-600">จัดส่งแล้ว</span>
                </div>
                <div className="text-3xl font-bold text-green-600">{statusCounts.delivered}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">ค้นหาและกรองข้อมูล</h2>
            <div className="flex gap-3">
              <Button
                onClick={handleCreateNewOrder}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl h-12"
              >
                + สร้างคำสั่งซื้อใหม่
              </Button>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-2xl border-gray-300 bg-transparent h-12"
              >
                <X className="h-4 w-4 mr-2" />
                ล้างตัวกรอง
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Search Bar */}
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ค้นหาด้วยชื่อลูกค้า หรือชื่อสินค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                />
              </div>
            </div>

            {/* Filter Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">ประเภทลูกค้า</Label>
                <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-2xl">
                    <SelectValue placeholder="ประเภทลูกค้า" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="credit">เครดิต</SelectItem>
                    <SelectItem value="cash">เงินสด</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">ขนส่ง</Label>
                <Select value={shippingFilter} onValueChange={setShippingFilter}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-2xl">
                    <SelectValue placeholder="ขนส่ง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="own_delivery">ขนส่งเอง</SelectItem>
                    <SelectItem value="kerry">Kerry Express</SelectItem>
                    <SelectItem value="flash">Flash Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">สถานะคำสั่งซื้อ</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-2xl">
                    <SelectValue placeholder="สถานะคำสั่งซื้อ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="pending_confirm">รอยืนยันคำสั่งซื้อ</SelectItem>
                    <SelectItem value="packing">รอแพ็คของ</SelectItem>
                    <SelectItem value="ready_to_ship">รอจัดส่ง</SelectItem>
                    <SelectItem value="delivered">จัดส่งแล้ว</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">สถานะการชำระเงิน</Label>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-2xl">
                    <SelectValue placeholder="สถานะการชำระเงิน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="unpaid">ยังไม่ชำระ</SelectItem>
                    <SelectItem value="partially_paid">ชำระบางส่วน</SelectItem>
                    <SelectItem value="paid">ชำระแล้ว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">สถานะการพิมพ์เอกสาร</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 border-gray-300 rounded-2xl w-full justify-between bg-transparent"
                    >
                      <span className="text-gray-500">
                        {documentFilter.length === 0 ? "เลือกเอกสาร" : `เลือกแล้ว ${documentFilter.length} รายการ`}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shippingLabel"
                          checked={documentFilter.includes("shippingLabel")}
                          onCheckedChange={(checked) => handleDocumentFilterChange("shippingLabel", checked as boolean)}
                        />
                        <label htmlFor="shippingLabel" className="text-sm">
                          Shipping Label
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="packingList"
                          checked={documentFilter.includes("packingList")}
                          onCheckedChange={(checked) => handleDocumentFilterChange("packingList", checked as boolean)}
                        />
                        <label htmlFor="packingList" className="text-sm">
                          Packing List
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pickList"
                          checked={documentFilter.includes("pickList")}
                          onCheckedChange={(checked) => handleDocumentFilterChange("pickList", checked as boolean)}
                        />
                        <label htmlFor="pickList" className="text-sm">
                          Pick List
                        </label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">วันที่สั่ง</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-12 border-gray-300 rounded-2xl">
                    <SelectValue placeholder="ช่วงเวลา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="today">วันนี้</SelectItem>
                    <SelectItem value="week">สัปดาห์นี้</SelectItem>
                    <SelectItem value="month">เดือนนี้</SelectItem>
                    <SelectItem value="custom">กำหนดเอง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">วันที่รับสินค้า</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="dd/mm/yy"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                  />
                </div>
              </div>

              <div></div>
            </div>

            {dateFilter === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">วันที่เริ่มต้น</Label>
                  <Input
                    placeholder="dd/mm/yy"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">วันที่สิ้นสุด</Label>
                  <Input
                    placeholder="dd/mm/yy"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">รายการคำสั่งซื้อ</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  แสดง {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} จาก {filteredOrders.length} รายการ
                </div>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-20 h-8 border-gray-300 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 py-3 w-32">เลขที่คำสั่งซื้อ</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-48">ชื่อลูกค้า</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-40">ช่องทางการสั่งซื้อ</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-32">วันที่สั่งซื้อ</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-32">วันที่ต้องการรับสินค้า</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-40">สถานะคำสั่งซื้อ</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-40">สถานะการชำระเงิน</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-48">สถานะการพิมพ์เอกสาร</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center w-32">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="font-medium text-blue-600 py-4">{order.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{order.customerName}</div>
                        <Badge
                          className={`text-xs ${
                            order.customerType === "credit"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-green-50 text-green-600 border-green-200"
                          }`}
                        >
                          {order.customerType === "credit" ? "เครดิต" : "เงินสด"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getContactChannelIcon(order.contactChannel)}
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {contactChannelConfig[order.contactChannel as keyof typeof contactChannelConfig]?.label}
                          </div>
                          <div className="text-gray-500 text-xs">{order.contactInfo}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{formatDate(order.orderDate)}</TableCell>
                    <TableCell className="text-gray-600">{formatDate(order.deliveryDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${orderStatusConfig[order.orderStatus as keyof typeof orderStatusConfig].dotColor}`}
                        ></div>
                        <Badge
                          className={`text-xs border whitespace-nowrap ${orderStatusConfig[order.orderStatus as keyof typeof orderStatusConfig].color}`}
                        >
                          {orderStatusConfig[order.orderStatus as keyof typeof orderStatusConfig].label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig].dotColor}`}
                        ></div>
                        <Badge
                          className={`text-xs border whitespace-nowrap ${paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig].color}`}
                        >
                          {paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig].label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`shipping-${order.id}`}
                            checked={order.documentsPrinted.shippingLabel}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`shipping-${order.id}`} className="text-xs text-gray-600">
                            Shipping Label
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`packing-${order.id}`}
                            checked={order.documentsPrinted.packingList}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`packing-${order.id}`} className="text-xs text-gray-600">
                            Packing List
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`pick-${order.id}`}
                            checked={order.documentsPrinted.pickList}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`pick-${order.id}`} className="text-xs text-gray-600">
                            Pick List
                          </label>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(order.id)}
                          className="h-8 w-8 p-0 border-gray-300 rounded-2xl"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-gray-300 bg-transparent rounded-2xl"
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handlePrintDocument(order.id, "Shipping Label")}>
                              <Receipt className="mr-2 h-4 w-4" />
                              Shipping Label
                              {!order.documentsPrinted.shippingLabel && (
                                <div className="ml-2 w-2 h-2 bg-red-400 rounded-full"></div>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrintDocument(order.id, "Packing List")}>
                              <FileText className="mr-2 h-4 w-4" />
                              Packing List
                              {!order.documentsPrinted.packingList && (
                                <div className="ml-2 w-2 h-2 bg-red-400 rounded-full"></div>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrintDocument(order.id, "Pick List")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Pick List
                              {!order.documentsPrinted.pickList && (
                                <div className="ml-2 w-2 h-2 bg-red-400 rounded-full"></div>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-gray-300 rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-gray-300 rounded-2xl"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Jump to page:</span>
                <Input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleJumpToPage()
                    }
                  }}
                  className="w-16 h-8 text-center border-gray-300 rounded-2xl"
                  placeholder="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleJumpToPage}
                  className="border-gray-300 rounded-2xl bg-transparent"
                >
                  Go
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateOrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        onSave={handleSaveNewOrder}
      />
    </div>
  )
}

export default OrdersPage
