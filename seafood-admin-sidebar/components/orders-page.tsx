"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CreateOrderModal } from "@/components/create-order-modal"

// Mock data for orders
const ordersData = [
  {
    id: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    customerPhone: "081-234-5678",
    items: [
      { name: "กุ้งแม่น้ำ", quantity: 2, unit: "กก.", price: 450 },
      { name: "ปลาทูน่า", quantity: 1, unit: "กก.", price: 320 },
    ],
    total: 1220,
    status: "pending",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    paymentMethod: "cash",
    notes: "ส่งก่อน 10:00 น.",
  },
  {
    id: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerPhone: "02-123-4567",
    items: [
      { name: "หอยแมลงภู่", quantity: 5, unit: "กก.", price: 180 },
      { name: "ปูม้า", quantity: 3, unit: "ตัว", price: 800 },
    ],
    total: 3300,
    status: "confirmed",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    paymentMethod: "transfer",
    notes: "ลูกค้าประจำ ให้ส่วนลด 5%",
  },
  {
    id: "ORD-003",
    customerName: "ร้านอาหาร สมุทรสาคร",
    customerPhone: "034-567-890",
    items: [
      { name: "ปลาแซลมอน", quantity: 2, unit: "กก.", price: 650 },
      { name: "กุ้งขาว", quantity: 3, unit: "กก.", price: 380 },
    ],
    total: 2440,
    status: "shipping",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-15",
    paymentMethod: "credit",
    notes: "",
  },
  {
    id: "ORD-004",
    customerName: "นางสาวมาลี สวยงาม",
    customerPhone: "089-876-5432",
    items: [{ name: "หอยเชลล์", quantity: 1, unit: "กก.", price: 220 }],
    total: 220,
    status: "delivered",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-14",
    paymentMethod: "cash",
    notes: "ส่งถึงแล้ว ลูกค้าพอใจ",
  },
  {
    id: "ORD-005",
    customerName: "โรงแรม สีฟ้า",
    customerPhone: "076-111-2222",
    items: [
      { name: "ปลาหมึกกล้วย", quantity: 4, unit: "กก.", price: 280 },
      { name: "กุ้งแม่น้ำ", quantity: 1, unit: "กก.", price: 450 },
    ],
    total: 1570,
    status: "cancelled",
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-13",
    paymentMethod: "transfer",
    notes: "ลูกค้ายกเลิก เนื่องจากเปลี่ยนเมนู",
  },
]

interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    unit: string
    price: number
  }>
  total: number
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate: string
  paymentMethod: "cash" | "transfer" | "credit"
  notes: string
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ordersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showCreateOrder, setShowCreateOrder] = useState(false)

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleCreateOrder = (orderData: any) => {
    const newOrder: Order = {
      id: orderData.id,
      customerName: orderData.customer.name,
      customerPhone: orderData.customer.phone,
      items: orderData.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
      })),
      total: orderData.pricing.total,
      status: "pending",
      orderDate: new Date().toISOString().split("T")[0],
      deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      paymentMethod: orderData.customer.type === "cash" ? "cash" : "credit",
      notes: orderData.notes || "",
    }

    setOrders([newOrder, ...orders])
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "รอดำเนินการ", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      confirmed: { label: "ยืนยันแล้ว", color: "bg-blue-100 text-blue-800 border-blue-200" },
      shipping: { label: "กำลังจัดส่ง", color: "bg-purple-100 text-purple-800 border-purple-200" },
      delivered: { label: "จัดส่งแล้ว", color: "bg-green-100 text-green-800 border-green-200" },
      cancelled: { label: "ยกเลิก", color: "bg-red-100 text-red-800 border-red-200" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "shipping":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <Package className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Calculate statistics
  const totalOrders = filteredOrders.length
  const pendingOrders = filteredOrders.filter((o) => o.status === "pending").length
  const completedOrders = filteredOrders.filter((o) => o.status === "delivered").length
  const totalRevenue = filteredOrders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-8 font-['Inter',sans-serif]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-600 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-500" />
              คำสั่งซื้อทั้งหมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-600 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-500" />
              รอดำเนินการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-600 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              เสร็จสิ้น
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-600 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-emerald-500" />
              รายได้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">฿{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-slate-800">ค้นหาและกรองข้อมูล</CardTitle>
            <Button
              onClick={() => setShowCreateOrder(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              สร้างคำสั่งซื้อใหม่
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ, ชื่อลูกค้า หรือเบอร์โทร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56 h-14 text-lg rounded-xl border-slate-200 shadow-sm">
                <SelectValue placeholder="สถานะคำสั่งซื้อ" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                <SelectItem value="all" className="rounded-lg">
                  ทุกสถานะ
                </SelectItem>
                <SelectItem value="pending" className="rounded-lg">
                  รอดำเนินการ
                </SelectItem>
                <SelectItem value="confirmed" className="rounded-lg">
                  ยืนยันแล้ว
                </SelectItem>
                <SelectItem value="shipping" className="rounded-lg">
                  กำลังจัดส่ง
                </SelectItem>
                <SelectItem value="delivered" className="rounded-lg">
                  จัดส่งแล้ว
                </SelectItem>
                <SelectItem value="cancelled" className="rounded-lg">
                  ยกเลิก
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full md:w-auto h-14 px-6 rounded-xl border-slate-200 hover:bg-slate-50 shadow-sm bg-transparent"
            >
              <X className="h-5 w-5 mr-2" />
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">รายการคำสั่งซื้อ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50 border-b border-slate-200">
                    <TableHead className="font-bold text-slate-700 py-4">รหัสคำสั่งซื้อ</TableHead>
                    <TableHead className="font-bold text-slate-700">ลูกค้า</TableHead>
                    <TableHead className="font-bold text-slate-700">รายการสินค้า</TableHead>
                    <TableHead className="font-bold text-slate-700">ยอดรวม</TableHead>
                    <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                    <TableHead className="font-bold text-slate-700">วันที่สั่ง</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50 border-b border-slate-100">
                      <TableCell className="py-4">
                        <div className="font-bold text-slate-800">{order.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-800">{order.customerName}</div>
                          <div className="text-sm text-slate-600">{order.customerPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm text-slate-700">
                              {item.name} ({item.quantity} {item.unit})
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-xs text-slate-500">และอีก {order.items.length - 2} รายการ</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-xl text-slate-800">฿{order.total.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadge(order.status).color} border rounded-lg px-3 py-1 font-medium flex items-center w-fit`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-2">{getStatusBadge(order.status).label}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-slate-700">{new Date(order.orderDate).toLocaleDateString("th-TH")}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                            className="h-10 w-10 p-0 rounded-lg border-slate-200 hover:bg-slate-50"
                          >
                            <Eye className="h-4 w-4 text-slate-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-lg border-slate-200 hover:bg-slate-50 bg-transparent"
                          >
                            <Edit className="h-4 w-4 text-slate-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-lg border-pink-200 hover:bg-pink-50 text-pink-600 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Package className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <p className="text-xl font-medium text-slate-600">ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-3xl rounded-2xl border-slate-200 shadow-xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-slate-800">รายละเอียดคำสั่งซื้อ {selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-8 p-6">
              {/* Customer Information */}
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  ข้อมูลลูกค้า
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-600 font-medium">ชื่อลูกค้า</Label>
                    <div className="text-lg font-semibold text-slate-800">{selectedOrder.customerName}</div>
                  </div>
                  <div>
                    <Label className="text-slate-600 font-medium">เบอร์โทรศัพท์</Label>
                    <div className="text-lg font-semibold text-slate-800">{selectedOrder.customerPhone}</div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-500" />
                  ข้อมูลคำสั่งซื้อ
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label className="text-slate-600 font-medium">วันที่สั่ง</Label>
                    <div className="text-lg font-semibold text-slate-800">
                      {new Date(selectedOrder.orderDate).toLocaleDateString("th-TH")}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-600 font-medium">วันที่จัดส่ง</Label>
                    <div className="text-lg font-semibold text-slate-800">
                      {new Date(selectedOrder.deliveryDate).toLocaleDateString("th-TH")}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-600 font-medium">สถานะ</Label>
                    <Badge
                      className={`${getStatusBadge(selectedOrder.status).color} border rounded-lg px-3 py-1 font-medium flex items-center w-fit mt-1`}
                    >
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-2">{getStatusBadge(selectedOrder.status).label}</span>
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">รายการสินค้า</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-200"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-slate-600">
                          {item.quantity} {item.unit} × ฿{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-slate-800">
                        ฿{(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-slate-800">ยอดรวมทั้งสิ้น</span>
                  <span className="text-3xl font-bold text-emerald-600">฿{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

   
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">หมายเหตุ</h3>
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-slate-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-4 p-6 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={() => setShowOrderDetails(false)}
              className="px-8 py-3 rounded-xl border-slate-200 hover:bg-slate-50"
            >
              ปิด
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Order Modal */}
      <CreateOrderModal isOpen={showCreateOrder} onClose={() => setShowCreateOrder(false)} onSave={handleCreateOrder} />
    </div>
  )
}
