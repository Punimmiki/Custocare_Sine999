"use client"

import { useState } from "react"
import { X, TrendingUp, Package, DollarSign, BarChart3, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  id: string
  customerName: string
  customerType: "credit" | "cash"
  orderDate: string
  deliveryDate: string
  totalPrice: number
  orderStatus: string
  paymentStatus: string
  products: string[]
}

interface OrderSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
}

export function OrderSummaryModal({ isOpen, onClose, orders }: OrderSummaryModalProps) {
  const [summaryPeriod, setSummaryPeriod] = useState("today")

  // Calculate summary statistics
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const statusCounts = {
    pending: orders.filter((o) => o.orderStatus === "pending_confirm").length,
    packing: orders.filter((o) => o.orderStatus === "packing").length,
    shipping: orders.filter((o) => o.orderStatus === "ready_to_ship").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
  }

  const customerTypeCounts = {
    credit: orders.filter((o) => o.customerType === "credit").length,
    cash: orders.filter((o) => o.customerType === "cash").length,
  }

  const paymentCounts = {
    paid: orders.filter((o) => o.paymentStatus === "paid").length,
    unpaid: orders.filter((o) => o.paymentStatus === "unpaid").length,
    partial: orders.filter((o) => o.paymentStatus === "partially_paid").length,
  }

  // Calculate outstanding amount
  const totalOutstanding = orders
    .filter((o) => o.customerType === "credit" && o.paymentStatus !== "paid")
    .reduce((sum, order) => sum + order.totalPrice, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl border-gray-200 shadow-xl">
        <DialogHeader className="pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
              สรุปยอดขาย
            </DialogTitle>
            <div className="flex items-center gap-4">
              <Select value={summaryPeriod} onValueChange={setSummaryPeriod}>
                <SelectTrigger className="w-40 border-gray-300 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">วันนี้</SelectItem>
                  <SelectItem value="week">สัปดาห์นี้</SelectItem>
                  <SelectItem value="month">เดือนนี้</SelectItem>
                  <SelectItem value="year">ปีนี้</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={onClose} className="border-gray-300 bg-transparent rounded-2xl">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-3xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-blue-800 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  คำสั่งซื้อทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">{totalOrders}</div>
                <div className="text-sm text-blue-700 mt-1">รายการ</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-3xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-green-800 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  รายได้รวม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">฿{totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-green-700 mt-1">บาท</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-3xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-purple-800 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  ค่าเฉลี่ยต่อออเดอร์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-900">฿{averageOrderValue.toLocaleString()}</div>
                <div className="text-sm text-purple-700 mt-1">บาท</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 rounded-3xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-red-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  ยอดค้างชำระทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-900">฿{totalOutstanding.toLocaleString()}</div>
                <div className="text-sm text-red-700 mt-1">บาท</div>
              </CardContent>
            </Card>
          </div>

          {/* Status Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Status */}
            <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">สถานะคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700">รอยืนยัน</span>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">{statusCounts.pending} รายการ</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-2xl">
                  <span className="text-gray-700">รอแพ็ค</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {statusCounts.packing} รายการ
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-2xl">
                  <span className="text-gray-700">รอจัดส่ง</span>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    {statusCounts.shipping} รายการ
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-2xl">
                  <span className="text-gray-700">จัดส่งแล้ว</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {statusCounts.delivered} รายการ
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">สถานะการชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-2xl">
                  <span className="text-gray-700">ชำระแล้ว</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">{paymentCounts.paid} รายการ</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-2xl">
                  <span className="text-gray-700">ชำระบางส่วน</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {paymentCounts.partial} รายการ
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-2xl">
                  <span className="text-gray-700">ยังไม่ชำระ</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">{paymentCounts.unpaid} รายการ</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Type Breakdown */}
          <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">ประเภทลูกค้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">ลูกค้าเครดิต</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-800">{customerTypeCounts.credit}</div>
                    <div className="text-sm text-blue-600">รายการ</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">ลูกค้าเงินสด</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-800">{customerTypeCounts.cash}</div>
                    <div className="text-sm text-green-600">รายการ</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-8 py-3 border-gray-300 hover:bg-gray-50 bg-transparent rounded-2xl"
          >
            ปิด
          </Button>
          <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl">ส่งออกรายงาน</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
