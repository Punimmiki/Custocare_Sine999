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
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"

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
    deliveryDate: "2024-07-27",
    notes: "ส่งก่อน 14:00 น.",
    items: [
      { name: "ปลาทูน่าสด", quantity: 5, unit: "กิโลกรัม", price: 250, total: 1250 },
      { name: "กุ้งขาว", quantity: 2, unit: "กิโลกรัม", price: 400, total: 800 },
      { name: "หอยแมลงภู่", quantity: 3, unit: "กิโลกรัม", price: 180, total: 540 },
    ],
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
    deliveryDate: "2024-07-28",
    notes: "ติดต่อล่วงหน้า 30 นาที",
    items: [
      { name: "ปลาแซลมอนสด", quantity: 10, unit: "กิโลกรัม", price: 450, total: 4500 },
      { name: "ปูม้า", quantity: 4, unit: "ตัว", price: 300, total: 1200 },
      { name: "หอยเชลล์", quantity: 2, unit: "กิโลกรัม", price: 220, total: 440 },
    ],
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
    deliveryDate: "2024-07-26",
    notes: "",
    items: [
      { name: "ปลาทับทิมแดง", quantity: 3, unit: "กิโลกรัม", price: 320, total: 960 },
      { name: "กุ้งแชบ๊วย", quantity: 1, unit: "กิโลกรัม", price: 500, total: 500 },
    ],
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
  const { toast } = useToast()

  const today = format(new Date(), "yyyy-MM-dd")
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")

  // Print function - เหลือแค่ฟังก์ชันเดียว
  const handlePrintOrder = (delivery: any) => {
    toast({
      title: "กำลังพิมพ์ใบคำสั่งซื้อ",
      description: `พิมพ์ใบคำสั่งซื้อสำหรับ ${delivery.orderId} - ${delivery.customerName}`,
    })

    // คำนวณยอดรวม
    const subtotal = delivery.items?.reduce((sum: number, item: any) => sum + item.total, 0) || 0
    const vat = subtotal * 0.07 // VAT 7%
    const grandTotal = subtotal + vat

    const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">ใบคำสั่งซื้อ</h1>
        <p style="margin: 5px 0; color: #666;">Purchase Order</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <strong>รหัสคำสั่งซื้อ:</strong> ${delivery.orderId}<br>
          <strong>วันที่สั่งซื้อ:</strong> ${format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}<br>
        </div>
        <div style="text-align: right;">
          <strong>สถานะ:</strong> ${statusMap[delivery.status as keyof typeof statusMap]?.label}<br>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="background-color: #f5f5f5; padding: 10px; margin: 0 0 15px 0;">ข้อมูลลูกค้า</h3>
        <div style="padding-left: 10px;">
          <strong>ชื่อลูกค้า:</strong> ${delivery.customerName}<br>
          <strong>ที่อยู่จัดส่ง:</strong> ${delivery.customerAddress}<br>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="background-color: #f5f5f5; padding: 10px; margin: 0 0 15px 0;">รายการสินค้า</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">รายการ</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">จำนวน</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">หน่วย</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">ราคา/หน่วย</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">รวม</th>
            </tr>
          </thead>
          <tbody>
            ${
              delivery.items
                ?.map(
                  (item: any) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.unit}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.price.toLocaleString()} บาท</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.total.toLocaleString()} บาท</td>
              </tr>
            `,
                )
                .join("") ||
              '<tr><td colspan="5" style="border: 1px solid #ddd; padding: 8px; text-align: center;">ไม่มีรายการสินค้า</td></tr>'
            }
          </tbody>
        </table>

        <div style="text-align: right; margin-top: 20px;">
          <table style="margin-left: auto; border-collapse: collapse;">
            <tr>
              <td style="padding: 5px 15px; text-align: right;"><strong>ยอดรวม:</strong></td>
              <td style="padding: 5px 15px; text-align: right; border-bottom: 1px solid #ddd;">${subtotal.toLocaleString()} บาท</td>
            </tr>
            <tr>
              <td style="padding: 5px 15px; text-align: right;"><strong>ภาษีมูลค่าเพิ่ม 7%:</strong></td>
              <td style="padding: 5px 15px; text-align: right; border-bottom: 1px solid #ddd;">${vat.toLocaleString()} บาท</td>
            </tr>
            <tr>
              <td style="padding: 5px 15px; text-align: right; font-size: 18px;"><strong>ยอดรวมทั้งสิ้น:</strong></td>
              <td style="padding: 5px 15px; text-align: right; font-size: 18px; font-weight: bold; border-bottom: 2px solid #000;">${grandTotal.toLocaleString()} บาท</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="background-color: #f5f5f5; padding: 10px; margin: 0 0 15px 0;">ข้อมูลการจัดส่ง</h3>
        <div style="padding-left: 10px;">
          <strong>คนขับ:</strong> ${delivery.driverName}<br>
          <strong>เบอร์โทรศัพท์:</strong> ${delivery.driverPhone}<br>
          <strong>ทะเบียนรถ:</strong> ${delivery.vehiclePlate}<br>
          <strong>ประเภทรถ:</strong> ${delivery.vehicleType}<br>
          <strong>ผู้ให้บริการ:</strong> ${delivery.serviceProvider}<br>
        </div>
      </div>

      ${
        delivery.notes
          ? `
      <div style="margin-bottom: 30px;">
        <h3 style="background-color: #f5f5f5; padding: 10px; margin: 0 0 15px 0;">หมายเหตุ</h3>
        <div style="padding-left: 10px;">
          ${delivery.notes}
        </div>
      </div>
      `
          : ""
      }

      <div style="margin-top: 50px; display: flex; justify-content: space-between;">
        <div style="text-align: center; width: 200px;">
          <div style="border-top: 1px solid #000; padding-top: 5px;">
            ลายเซ็นผู้สั่งซื้อ
          </div>
          <div style="margin-top: 20px;">
            วันที่: _______________
          </div>
        </div>
        <div style="text-align: center; width: 200px;">
          <div style="border-top: 1px solid #000; padding-top: 5px;">
            ลายเซ็นผู้รับ
          </div>
          <div style="margin-top: 20px;">
            วันที่: _______________
          </div>
        </div>
      </div>

      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 15px;">
        พิมพ์เมื่อ: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: th })}
      </div>
    </div>`

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

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
        <Link href="/delivery/create">
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

            <div className="mb-4">
              <Label>วันที่ส่ง</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deliveryDateFilter && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deliveryDateFilter
                      ? format(new Date(deliveryDateFilter), "dd/MM/yyyy", { locale: th })
                      : "เลือกวันที่ส่ง"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deliveryDateFilter ? new Date(deliveryDateFilter) : undefined}
                    onSelect={(date) => {
                      if (date) setDeliveryDateFilter(date.toISOString()) // หรือ format ให้เป็น 'yyyy-MM-dd'
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                    <TableHead className="min-w-[80px] text-center">รหัส</TableHead>
                    <TableHead className="min-w-[120px] text-center">ลูกค้า</TableHead>
                    <TableHead className="min-w-[120px] text-center">คนขับ</TableHead>
                    <TableHead className="min-w-[100px] text-center">ทะเบียน</TableHead>
                    <TableHead className="min-w-[120px] text-center">เบอร์โทร</TableHead>
                    <TableHead className="min-w-[100px] text-center">ประเภทรถ</TableHead>
                    <TableHead className="min-w-[130px] text-center">ผู้ให้บริการ</TableHead>
                    <TableHead className="min-w-[120px] text-center">วันที่จัดส่ง</TableHead>
                    <TableHead className="min-w-[100px] text-center">สถานะ</TableHead>
                    <TableHead className="min-w-[140px] text-center">การดำเนินการ</TableHead>
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
                        <TableCell className="font-medium text-sm truncate text-center">{delivery.orderId}</TableCell>
                        <TableCell className="text-center">
                          <div>
                            <p className="font-medium text-sm truncate" title={delivery.customerName}>
                              {delivery.customerName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate" title={delivery.driverName}>
                              {delivery.driverName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Truck className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{delivery.vehiclePlate}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{delivery.driverPhone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm truncate text-center" title={delivery.vehicleType}>
                          {delivery.vehicleType}
                        </TableCell>
                        <TableCell className="text-sm truncate text-center" title={delivery.serviceProvider}>
                          {delivery.serviceProvider}
                        </TableCell>
                        <TableCell className="text-sm text-center">
                          <div className="flex items-center justify-center gap-1">
                            <CalendarDays className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={statusMap[delivery.status as keyof typeof statusMap]?.className}>
                            {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                                  <Eye className="h-3 w-3 mr-1" />
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

                            {/* เปลี่ยนจาก DropdownMenu เป็น Button ธรรมดา */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-xs bg-transparent"
                              onClick={() => handlePrintOrder(delivery)}
                            >
                              <Printer className="h-3 w-3 mr-1" />
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
