"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, DollarSign, Package, Users, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for reports
const salesData = {
  daily: {
    revenue: 45600,
    orders: 23,
    customers: 18,
    avgOrder: 1982,
    growth: 12.5,
  },
  weekly: {
    revenue: 298400,
    orders: 156,
    customers: 89,
    avgOrder: 1913,
    growth: 8.3,
  },
  monthly: {
    revenue: 1245600,
    orders: 634,
    customers: 287,
    avgOrder: 1965,
    growth: 15.7,
  },
}

const topProducts = [
  { name: "กุ้งแม่น้ำ", sales: 125600, quantity: 280, growth: 18.5 },
  { name: "ปลาทูน่า", sales: 89400, quantity: 279, growth: 12.3 },
  { name: "หอยแมลงภู่", sales: 67800, quantity: 377, growth: -5.2 },
  { name: "ปูม้า", sales: 156000, quantity: 195, growth: 25.8 },
  { name: "ปลาแซลมอน", sales: 78000, quantity: 120, growth: 8.9 },
]

const topCustomers = [
  { name: "บริษัท อาหารทะเล จำกัด", orders: 45, revenue: 234500, type: "credit" },
  { name: "โรงแรมสีฟ้า", orders: 32, revenue: 189600, type: "credit" },
  { name: "ร้านอาหารทะเลสด", orders: 28, revenue: 156700, type: "credit" },
  { name: "นายสมชาย ใจดี", orders: 15, revenue: 89400, type: "cash" },
  { name: "นางสาวมาลี สวยงาม", orders: 12, revenue: 67800, type: "cash" },
]

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "นายสมชาย ใจดี",
    amount: 2450,
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-002",
    customer: "บริษัท อาหารทะเล จำกัด",
    amount: 5670,
    status: "shipping",
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-003",
    customer: "โรงแรมสีฟ้า",
    amount: 7850,
    status: "delivered",
    date: "2024-01-14",
  },
  {
    id: "ORD-2024-004",
    customer: "ร้านอาหารทะเลสด",
    amount: 3240,
    status: "packing",
    date: "2024-01-14",
  },
  {
    id: "ORD-2024-005",
    customer: "นางสาวมาลี สวยงาม",
    amount: 1890,
    status: "delivered",
    date: "2024-01-13",
  },
]

export function ReportsDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily")
  const [selectedReport, setSelectedReport] = useState("overview")

  const currentData = salesData[selectedPeriod as keyof typeof salesData]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { label: "จัดส่งแล้ว", color: "bg-green-100 text-green-800 border-green-200" },
      shipping: { label: "กำลังจัดส่ง", color: "bg-blue-100 text-blue-800 border-blue-200" },
      packing: { label: "กำลังแพ็ค", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      pending: { label: "รอดำเนินการ", color: "bg-gray-100 text-gray-800 border-gray-200" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth > 0
    return (
      <span className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <TrendingUp className={`h-4 w-4 mr-1 ${isPositive ? "" : "rotate-180"}`} />
        {Math.abs(growth)}%
      </span>
    )
  }

  return (
    <div className="space-y-8 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">รายงานและสถิติ</h1>
          <p className="text-slate-600 mt-2">ภาพรวมการขายและข้อมูลสำคัญของธุรกิจ</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48 h-12 rounded-xl border-slate-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily">วันนี้</SelectItem>
              <SelectItem value="weekly">สัปดาห์นี้</SelectItem>
              <SelectItem value="monthly">เดือนนี้</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 shadow-sm">
            <Download className="h-5 w-5 mr-2" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-blue-800 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              รายได้รวม
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">฿{currentData.revenue.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              {formatGrowth(currentData.growth)}
              <span className="text-sm text-blue-700 ml-2">เทียบกับช่วงก่อน</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-green-800 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              คำสั่งซื้อ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{currentData.orders}</div>
            <div className="text-sm text-green-700 mt-2">รายการ</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-purple-800 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              ลูกค้า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{currentData.customers}</div>
            <div className="text-sm text-purple-700 mt-2">คน</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-orange-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              ค่าเฉลี่ย/ออเดอร์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">฿{currentData.avgOrder.toLocaleString()}</div>
            <div className="text-sm text-orange-700 mt-2">บาท</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">สินค้าขายดี</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{product.name}</div>
                      <div className="text-sm text-slate-600">{product.quantity} หน่วย</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">฿{product.sales.toLocaleString()}</div>
                    <div className="text-sm">{formatGrowth(product.growth)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">ลูกค้าใหญ่</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{customer.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{customer.orders} ออเดอร์</span>
                        <Badge
                          className={
                            customer.type === "credit"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }
                        >
                          {customer.type === "credit" ? "เครดิต" : "เงินสด"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">฿{customer.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">คำสั่งซื้อล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b border-slate-200">
                  <TableHead className="font-bold text-slate-700">รหัสคำสั่งซื้อ</TableHead>
                  <TableHead className="font-bold text-slate-700">ลูกค้า</TableHead>
                  <TableHead className="font-bold text-slate-700">ยอดรวม</TableHead>
                  <TableHead className="font-bold text-slate-700">สถานะ</TableHead>
                  <TableHead className="font-bold text-slate-700">วันที่</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50 border-b border-slate-100">
                    <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                    <TableCell className="font-semibold text-slate-800">{order.customer}</TableCell>
                    <TableCell className="font-bold text-xl text-slate-800">฿{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusBadge(order.status).color} border rounded-lg px-3 py-1 font-medium`}
                      >
                        {getStatusBadge(order.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{new Date(order.date).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-slate-50 bg-transparent"
                      >
                        <Eye className="h-4 w-4 text-slate-600" />
                      </Button>
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
