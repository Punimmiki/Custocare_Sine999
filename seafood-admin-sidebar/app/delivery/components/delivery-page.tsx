"use client"

import * as React from "react"
import Link from "next/link"
import { format, addDays, parseISO } from "date-fns"
import { th } from "date-fns/locale" // Import Thai locale for date-fns
import { Truck, Plus, Search, Phone, User, Printer, Eye, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Sample delivery data
const initialDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    customerAddress: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    driverName: "นายสมศักดิ์ ขับรถ",
    vehiclePlate: "กข-1234",
    vehicleType: "รถกระบะ",
    serviceProvider: "Kerry Express",
    driverPhone: "081-111-2222",
    status: "preparing",
    deliveryDate: "2024-07-27", // Today
    notes: "ส่งก่อน 14:00 น.",
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerAddress: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    driverName: "นายประยุทธ์ ส่งของ",
    vehiclePlate: "คง-5678",
    vehicleType: "รถตู้",
    serviceProvider: "Flash Express",
    driverPhone: "089-333-4444",
    status: "shipped",
    deliveryDate: "2024-07-28", // Tomorrow
    notes: "ติดต่อล่วงหน้า 30 นาที",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    customerAddress: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    driverName: "นายวิชัย จัดส่ง",
    vehiclePlate: "จฉ-9012",
    vehicleType: "รถกระบะ",
    serviceProvider: "ไปรษณีย์ไทย",
    driverPhone: "082-555-6666",
    status: "delivered",
    deliveryDate: "2024-07-26", // Yesterday
    notes: "",
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    customerAddress: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    driverName: "นายสมชาย ขนส่ง",
    vehiclePlate: "ชซ-3456",
    vehicleType: "รถบรรทุก",
    serviceProvider: "Kerry Express",
    driverPhone: "083-777-8888",
    status: "preparing",
    deliveryDate: "2024-07-27", // Today
    notes: "ใช้ประตูหลัง",
  },
  {
    id: "DEL-005",
    orderId: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    customerAddress: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    driverName: "นายสมศักดิ์ ขับรถ",
    vehiclePlate: "กข-1235",
    vehicleType: "รถกระบะ",
    serviceProvider: "Flash Express",
    driverPhone: "081-111-2223",
    status: "shipped",
    deliveryDate: "2024-07-28", // Tomorrow
    notes: "โทรแจ้งก่อนเข้า",
  },
  {
    id: "DEL-006",
    orderId: "ORD-006",
    customerName: "ร้านอาหารญี่ปุ่น",
    customerAddress: "111 ถนนพลับพลา แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    driverName: "นายสมบัติ ส่งด่วน",
    vehiclePlate: "ดต-7890",
    vehicleType: "รถจักรยานยนต์",
    serviceProvider: "J&T Express",
    driverPhone: "084-999-1111",
    status: "delivered",
    deliveryDate: "2024-07-25",
    notes: "ส่งถึงแล้ว",
  },
  {
    id: "DEL-007",
    orderId: "ORD-007",
    customerName: "โรงแรมแกรนด์",
    customerAddress: "222 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    driverName: "นายวิชัย จัดส่ง",
    vehiclePlate: "จฉ-9012",
    vehicleType: "รถกระบะ",
    serviceProvider: "DHL",
    driverPhone: "082-555-6666",
    status: "preparing",
    deliveryDate: "2024-07-27",
    notes: "ส่งที่ห้องครัว",
  },
  {
    id: "DEL-008",
    orderId: "ORD-008",
    customerName: "ตลาดสดบางซื่อ",
    customerAddress: "333 ถนนประชาชื่น แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 10800",
    driverName: "นายสมชาย ขนส่ง",
    vehiclePlate: "ชซ-3456",
    vehicleType: "รถบรรทุก",
    serviceProvider: "Kerry Express",
    driverPhone: "083-777-8888",
    status: "shipped",
    deliveryDate: "2024-07-28",
    notes: "เข้าตลาดตอน 5 โมงเช้า",
  },
  {
    id: "DEL-009",
    orderId: "ORD-009",
    customerName: "ร้านซีฟู้ดริมทะเล",
    customerAddress: "444 ถนนสุขุมวิท แขวงพระโขนง เขตวัฒนา กรุงเทพฯ 10110",
    driverName: "นายประยุทธ์ ส่งของ",
    vehiclePlate: "คง-5678",
    vehicleType: "รถตู้",
    serviceProvider: "Flash Express",
    driverPhone: "089-333-4444",
    status: "delivered",
    deliveryDate: "2024-07-26",
    notes: "ส่งเรียบร้อย",
  },
  {
    id: "DEL-010",
    orderId: "ORD-010",
    customerName: "บริษัท เฟรชมาร์ท จำกัด",
    customerAddress: "555 ถนนพระราม 4 แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110",
    driverName: "นายสมศักดิ์ ขับรถ",
    vehiclePlate: "กข-1235",
    vehicleType: "รถกระบะ",
    serviceProvider: "ไปรษณีย์ไทย",
    driverPhone: "081-111-2223",
    status: "preparing",
    deliveryDate: "2024-07-27",
    notes: "ส่งก่อน 10 โมง",
  },
  {
    id: "DEL-011",
    orderId: "ORD-011",
    customerName: "ร้านอาหารเวียดนาม",
    customerAddress: "666 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    driverName: "นายสมบัติ ส่งด่วน",
    vehiclePlate: "ดต-7890",
    vehicleType: "รถจักรยานยนต์",
    serviceProvider: "J&T Express",
    driverPhone: "084-999-1111",
    status: "shipped",
    deliveryDate: "2024-07-28",
    notes: "โทรก่อนส่ง",
  },
  {
    id: "DEL-012",
    orderId: "ORD-012",
    customerName: "โรงพยาบาลเอกชน",
    customerAddress: "777 ถนนพญาไท แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400",
    driverName: "นายวิชัย จัดส่ง",
    vehiclePlate: "จฉ-9012",
    vehicleType: "รถกระบะ",
    serviceProvider: "DHL",
    driverPhone: "082-555-6666",
    status: "delivered",
    deliveryDate: "2024-07-25",
    notes: "ส่งที่แผนกโภชนาการ",
  },
]

const statusMap = {
  preparing: {
    label: "รอแพ็ค",
    className: "bg-yellow-100 text-yellow-600 border-yellow-200",
  },
  shipped: {
    label: "รอส่ง",
    className: "bg-blue-100 text-blue-600 border-blue-200",
  },
  delivered: {
    label: "จัดส่งแล้ว",
    className: "bg-green-100 text-green-600 border-green-200",
  },
}

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = React.useState(initialDeliveries)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = React.useState("all")
  const [serviceProviderFilter, setServiceProviderFilter] = React.useState("all")
  const [deliveryDateFilter, setDeliveryDateFilter] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  const today = format(new Date(), "yyyy-MM-dd")
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")

  const filteredDeliveries = React.useMemo(() => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
      const matchesVehicleType = vehicleTypeFilter === "all" || delivery.vehicleType === vehicleTypeFilter
      const matchesServiceProvider =
        serviceProviderFilter === "all" || delivery.serviceProvider === serviceProviderFilter

      let matchesDate = true
      if (deliveryDateFilter) {
        const deliveryDate = parseISO(delivery.deliveryDate)
        const filterDate = parseISO(deliveryDateFilter)
        matchesDate = format(deliveryDate, "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd")
      }

      return matchesSearch && matchesStatus && matchesVehicleType && matchesServiceProvider && matchesDate
    })
  }, [deliveries, searchTerm, statusFilter, vehicleTypeFilter, serviceProviderFilter, deliveryDateFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDeliveries = filteredDeliveries.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, vehicleTypeFilter, serviceProviderFilter, deliveryDateFilter])

  const totalDeliveries = deliveries.length
  const preparingCount = deliveries.filter((d) => d.status === "preparing").length
  const shippedCount = deliveries.filter((d) => d.status === "shipped").length
  const deliveredCount = deliveries.filter((d) => d.status === "delivered").length

  const allVehicleTypes = Array.from(new Set(initialDeliveries.map((d) => d.vehicleType)))
  const allServiceProviders = Array.from(new Set(initialDeliveries.map((d) => d.serviceProvider)))

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setVehicleTypeFilter("all")
    setServiceProviderFilter("all")
    setDeliveryDateFilter("")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">การจัดส่ง</h1>
          <p className="text-muted-foreground">จัดการการจัดส่งและติดตามสถานะ</p>
        </div>
        <Link href="/products/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มการจัดส่งใหม่
          </Button>
        </Link>
      </div>

      {/* Stats Cards (Clickable for filtering) */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors",
            statusFilter === "all" && "border-primary",
          )}
          onClick={() => setStatusFilter("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">การจัดส่งทั้งหมด</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors",
            statusFilter === "preparing" && "border-primary",
          )}
          onClick={() => setStatusFilter("preparing")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอแพ็ค</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{preparingCount}</div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors",
            statusFilter === "shipped" && "border-primary",
          )}
          onClick={() => setStatusFilter("shipped")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shippedCount}</div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors",
            statusFilter === "delivered" && "border-primary",
          )}
          onClick={() => setStatusFilter("delivered")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จัดส่งแล้ว</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            ล้างตัวกรอง
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-full">
              <Label htmlFor="search">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ, ชื่อลูกค้า, คนขับ, หรือทะเบียนรถ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <Label>สถานะการจัดส่ง</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="preparing">รอแพ็ค</SelectItem>
                  <SelectItem value="shipped">รอส่ง</SelectItem>
                  <SelectItem value="delivered">จัดส่งแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ประเภทรถ</Label>
              <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทรถ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allVehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ผู้ให้บริการ</Label>
              <Select value={serviceProviderFilter} onValueChange={setServiceProviderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกผู้ให้บริการ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allServiceProviders.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="delivery-date">วันที่ส่ง</Label>
              <Input
                id="delivery-date"
                type="date"
                value={deliveryDateFilter}
                onChange={(e) => setDeliveryDateFilter(e.target.value)}
                placeholder="เลือกวันที่ส่ง"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries Table */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายการจัดส่ง</CardTitle>
              <CardDescription>
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredDeliveries.length)} จาก {filteredDeliveries.length}{" "}
                รายการ (ทั้งหมด {totalDeliveries} รายการ)
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
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[80px]">รหัส</TableHead>
                    <TableHead className="min-w-[120px]">ลูกค้า</TableHead>
                    <TableHead className="min-w-[120px]">คนขับ</TableHead>
                    <TableHead className="min-w-[100px]">ทะเบียน</TableHead>
                    <TableHead className="min-w-[120px]">เบอร์โทร</TableHead>
                    <TableHead className="min-w-[100px]">ประเภทรถ</TableHead>
                    <TableHead className="min-w-[130px]">ผู้ให้บริการ</TableHead>
                    <TableHead className="min-w-[120px]">วันที่จัดส่ง</TableHead>
                    <TableHead className="min-w-[100px]">สถานะ</TableHead>
                    <TableHead className="min-w-[140px] text-right">การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDeliveries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        ไม่พบการจัดส่งที่ตรงกับเงื่อนไขการค้นหา
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium text-sm truncate">{delivery.orderId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm truncate" title={delivery.customerName}>
                              {delivery.customerName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate" title={delivery.driverName}>
                              {delivery.driverName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{delivery.vehiclePlate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{delivery.driverPhone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm truncate" title={delivery.vehicleType}>
                          {delivery.vehicleType}
                        </TableCell>
                        <TableCell className="text-sm truncate" title={delivery.serviceProvider}>
                          {delivery.serviceProvider}
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusMap[delivery.status as keyof typeof statusMap]?.className}>
                            {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                                  <Eye className="h-3 w-3 mr-1" />
                                  ดู
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-center">รายละเอียดการจัดส่ง</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {/* Delivery Images */}
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                      <img
                                        src="/placeholder.svg?height=80&width=80"
                                        alt="Delivery image 1"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                      <img
                                        src="/placeholder.svg?height=80&width=80"
                                        alt="Delivery image 2"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                      <img
                                        src="/placeholder.svg?height=80&width=80"
                                        alt="Delivery image 3"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                  </div>

                                  {/* Delivery Details */}
                                  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">รหัส:</span>
                                      <span className="font-medium">{delivery.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">ลูกค้า:</span>
                                      <span className="font-medium">{delivery.customerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">คนขับ:</span>
                                      <span className="font-medium">{delivery.driverName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">เบอร์โทร:</span>
                                      <span className="font-medium">{delivery.driverPhone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">ทะเบียนรถ:</span>
                                      <span className="font-medium">{delivery.vehiclePlate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">ประเภทรถ:</span>
                                      <span className="font-medium">{delivery.vehicleType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">ผู้ให้บริการ:</span>
                                      <span className="font-medium">{delivery.serviceProvider}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">วันที่จัดส่ง:</span>
                                      <span className="font-medium">
                                        {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">สถานะ:</span>
                                      <Badge
                                        className={statusMap[delivery.status as keyof typeof statusMap]?.className}
                                      >
                                        {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                                      </Badge>
                                    </div>
                                    {delivery.notes && (
                                      <div className="pt-2 border-t">
                                        <span className="text-muted-foreground text-xs">หมายเหตุ:</span>
                                        <div className="mt-1 text-sm">{delivery.notes}</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                              <Printer className="h-3 w-3 mr-1" />
                              พิมพ์
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-6 pb-4">
              <div className="text-sm text-muted-foreground">
                หน้า {currentPage} จาก {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 px-2"
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
                        className="h-8 w-8 p-0"
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
                  className="h-8 px-2"
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

export { DeliveryPage }
export default DeliveryPage
