"use client"

import * as React from "react"
import { format } from "date-fns"
import { Truck, Plus, Search, Phone, User, Printer, Upload, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample delivery data
const initialDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    customerAddress: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    driverName: "นายสมศักดิ์ ขับรถ",
    vehiclePlate: "กข-1234",
    driverPhone: "081-111-2222",
    status: "preparing",
    productImage: "/placeholder.svg?height=60&width=60&text=Salmon",
    deliveryDate: "2024-01-15",
    notes: "ส่งก่อน 14:00 น.",
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerAddress: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    driverName: "นายประยุทธ์ ส่งของ",
    vehiclePlate: "คง-5678",
    driverPhone: "089-333-4444",
    status: "shipped",
    productImage: "/placeholder.svg?height=60&width=60&text=Shrimp",
    deliveryDate: "2024-01-15",
    notes: "ติดต่อล่วงหน้า 30 นาที",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    customerAddress: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    driverName: "นายวิชัย จัดส่ง",
    vehiclePlate: "จฉ-9012",
    driverPhone: "082-555-6666",
    status: "delivered",
    productImage: "/placeholder.svg?height=60&width=60&text=Tuna",
    deliveryDate: "2024-01-14",
    notes: "",
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    customerAddress: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    driverName: "นายสมชาย ขนส่ง",
    vehiclePlate: "ชซ-3456",
    driverPhone: "083-777-8888",
    status: "preparing",
    productImage: "/placeholder.svg?height=60&width=60&text=Crab",
    deliveryDate: "2024-01-15",
    notes: "ใช้ประตูหลัง",
  },
]

// Sample pending orders (orders that haven't been assigned for delivery)
const pendingOrders = [
  {
    id: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    customerAddress: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    totalAmount: 3200,
    orderDate: "2024-01-15",
  },
  {
    id: "ORD-006",
    customerName: "โรงแรมสีฟู้ด พาราไดซ์",
    customerAddress: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    totalAmount: 25400,
    orderDate: "2024-01-15",
  },
]

const statusMap = {
  preparing: { label: "กำลังเตรียม", variant: "secondary" as const },
  shipped: { label: "กำลังจัดส่ง", variant: "default" as const },
  delivered: { label: "จัดส่งแล้ว", variant: "destructive" as const },
}

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = React.useState(initialDeliveries)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isAddDeliveryOpen, setIsAddDeliveryOpen] = React.useState(false)

  // Add delivery form state
  const [selectedOrder, setSelectedOrder] = React.useState("")
  const [driverName, setDriverName] = React.useState("")
  const [vehiclePlate, setVehiclePlate] = React.useState("")
  const [driverPhone, setDriverPhone] = React.useState("")
  const [deliveryNotes, setDeliveryNotes] = React.useState("")
  const [productImage, setProductImage] = React.useState<string | null>(null)

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProductImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedOrderData = pendingOrders.find((order) => order.id === selectedOrder)
    if (!selectedOrderData) return

    const newDelivery = {
      id: `DEL-${String(deliveries.length + 1).padStart(3, "0")}`,
      orderId: selectedOrder,
      customerName: selectedOrderData.customerName,
      customerAddress: selectedOrderData.customerAddress,
      driverName,
      vehiclePlate,
      driverPhone,
      status: "preparing" as const,
      productImage: productImage || "/placeholder.svg?height=60&width=60&text=Product",
      deliveryDate: format(new Date(), "yyyy-MM-dd"),
      notes: deliveryNotes,
    }

    setDeliveries([...deliveries, newDelivery])

    // Reset form
    setSelectedOrder("")
    setDriverName("")
    setVehiclePlate("")
    setDriverPhone("")
    setDeliveryNotes("")
    setProductImage(null)
    setIsAddDeliveryOpen(false)
  }

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus as "preparing" | "shipped" | "delivered" }
          : delivery,
      ),
    )
  }

  const totalDeliveries = deliveries.length
  const preparingCount = deliveries.filter((d) => d.status === "preparing").length
  const shippedCount = deliveries.filter((d) => d.status === "shipped").length
  const deliveredCount = deliveries.filter((d) => d.status === "delivered").length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">การจัดส่ง</h1>
          <p className="text-muted-foreground">จัดการการจัดส่งและติดตามสถานะ</p>
        </div>
        <Dialog open={isAddDeliveryOpen} onOpenChange={setIsAddDeliveryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มการจัดส่งใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>เพิ่มการจัดส่งใหม่</DialogTitle>
              <DialogDescription>เลือกคำสั่งซื้อและกรอกข้อมูลการจัดส่ง</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDelivery} className="space-y-3">
              <div>
                <Label htmlFor="order-select">เลือกคำสั่งซื้อ *</Label>
                <Select value={selectedOrder} onValueChange={setSelectedOrder} required>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคำสั่งซื้อที่ต้องการจัดส่ง" />
                  </SelectTrigger>
                  <SelectContent>
                    {pendingOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.id} - {order.customerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <Label htmlFor="driver-name">ชื่อคนขับ *</Label>
                  <Input
                    id="driver-name"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="กรอกชื่อคนขับ"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vehicle-plate">ทะเบียนรถ *</Label>
                  <Input
                    id="vehicle-plate"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder="กข-1234"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="driver-phone">เบอร์โทรคนขับ *</Label>
                  <Input
                    id="driver-phone"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="081-234-5678"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor="delivery-notes">หมายเหตุการจัดส่ง</Label>
                  <Textarea
                    id="delivery-notes"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="หมายเหตุเพิ่มเติม..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label>รูปภาพสินค้า</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center">
                    {productImage ? (
                      <div className="relative inline-block">
                        <img
                          src={productImage || "/placeholder.svg"}
                          alt="Product preview"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute -top-1 -right-1 h-6 w-6 p-0 bg-transparent"
                          onClick={() => setProductImage(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                        <p className="text-xs text-gray-600">อัพโหลดรูปภาพ</p>
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 cursor-pointer text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  เพิ่มการจัดส่ง
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDeliveryOpen(false)}>
                  ยกเลิก
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">การจัดส่งทั้งหมด</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำลังเตรียม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{preparingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำลังจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shippedCount}</div>
          </CardContent>
        </Card>
        <Card>
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
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
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

            <div className="w-full md:w-48">
              <Label>สถานะการจัดส่ง</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="preparing">กำลังเตรียม</SelectItem>
                  <SelectItem value="shipped">กำลังจัดส่ง</SelectItem>
                  <SelectItem value="delivered">จัดส่งแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการจัดส่ง</CardTitle>
          <CardDescription>
            แสดง {filteredDeliveries.length} รายการจากทั้งหมด {totalDeliveries} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">รหัส</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead className="w-32">คนขับ</TableHead>
                  <TableHead className="w-24">ทะเบียน</TableHead>
                  <TableHead className="w-32">เบอร์โทร</TableHead>
                  <TableHead className="w-32">สถานะ</TableHead>
                  <TableHead className="w-16">รูปภาพ</TableHead>
                  <TableHead className="w-40 text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium text-sm">{delivery.orderId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{delivery.customerName}</p>
                        <p
                          className="text-xs text-muted-foreground truncate max-w-[200px]"
                          title={delivery.customerAddress}
                        >
                          {delivery.customerAddress}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{delivery.driverName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{delivery.vehiclePlate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{delivery.driverPhone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select value={delivery.status} onValueChange={(value) => handleStatusUpdate(delivery.id, value)}>
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preparing">กำลังเตรียม</SelectItem>
                          <SelectItem value="shipped">กำลังจัดส่ง</SelectItem>
                          <SelectItem value="delivered">จัดส่งแล้ว</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={delivery.productImage || "/placeholder.svg"}
                          alt="Product"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=40&width=40"
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          ดู
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                          <Printer className="h-3 w-3 mr-1" />
                          พิมพ์
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { DeliveryPage }
export default DeliveryPage
