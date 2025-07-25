"use client"

import * as React from "react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, Package, Truck, Download, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for reports
const dailySalesData = [
  { date: "01/01", sales: 45000, orders: 12 },
  { date: "02/01", sales: 52000, orders: 15 },
  { date: "03/01", sales: 38000, orders: 9 },
  { date: "04/01", sales: 61000, orders: 18 },
  { date: "05/01", sales: 55000, orders: 16 },
  { date: "06/01", sales: 67000, orders: 20 },
  { date: "07/01", sales: 72000, orders: 22 },
  { date: "08/01", sales: 58000, orders: 17 },
  { date: "09/01", sales: 63000, orders: 19 },
  { date: "10/01", sales: 69000, orders: 21 },
  { date: "11/01", sales: 74000, orders: 23 },
  { date: "12/01", sales: 81000, orders: 25 },
  { date: "13/01", sales: 76000, orders: 24 },
  { date: "14/01", sales: 68000, orders: 20 },
  { date: "15/01", sales: 85000, orders: 27 },
]

const outstandingCreditData = [
  {
    id: "1",
    customerName: "บริษัท อาหารทะเล จำกัด",
    phone: "02-123-4567",
    creditLimit: 50000,
    outstandingBalance: 12500,
    lastPayment: "2024-01-10",
    daysPastDue: 5,
  },
  {
    id: "2",
    customerName: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    creditLimit: 30000,
    outstandingBalance: 8750,
    lastPayment: "2024-01-08",
    daysPastDue: 7,
  },
  {
    id: "3",
    customerName: "โรงแรมสีฟู้ด พาราไดซ์",
    phone: "02-987-6543",
    creditLimit: 100000,
    outstandingBalance: 25400,
    lastPayment: "2024-01-12",
    daysPastDue: 3,
  },
  {
    id: "4",
    customerName: "ร้านซีฟู้ดริมทะเล",
    phone: "081-555-7777",
    creditLimit: 40000,
    outstandingBalance: 15200,
    lastPayment: "2024-01-05",
    daysPastDue: 10,
  },
]

const topSellingProductsData = [
  { name: "แซลมอนสด", sales: 145, revenue: 65250, color: "#0088FE" },
  { name: "กุ้งขาวใหญ่", sales: 128, revenue: 40960, color: "#00C49F" },
  { name: "ปลาทูน่าสด", sales: 96, revenue: 36480, color: "#FFBB28" },
  { name: "หอยแมลงภู่", sales: 87, revenue: 15660, color: "#FF8042" },
  { name: "ปูม้าสด", sales: 65, revenue: 16250, color: "#8884D8" },
  { name: "ปลาหมึกสด", sales: 54, revenue: 11880, color: "#82CA9D" },
]

const deliverySummaryData = [
  { status: "กำลังเตรียม", count: 8, color: "#FFBB28" },
  { status: "กำลังจัดส่ง", count: 12, color: "#0088FE" },
  { status: "จัดส่งแล้ว", count: 45, color: "#00C49F" },
]

const ReportsPage = () => {
  const [dateRange, setDateRange] = React.useState("15days")
  const [reportType, setReportType] = React.useState("sales")

  // Calculate summary statistics
  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0)
  const totalOrders = dailySalesData.reduce((sum, day) => sum + day.orders, 0)
  const avgOrderValue = totalSales / totalOrders
  const totalOutstanding = outstandingCreditData.reduce((sum, customer) => sum + customer.outstandingBalance, 0)
  const totalDeliveries = deliverySummaryData.reduce((sum, status) => sum + status.count, 0)

  const formatCurrency = (value: number) => {
    return `฿${value.toLocaleString()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`วันที่: ${label}`}</p>
          <p className="text-blue-600">{`ยอดขาย: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-green-600">{`จำนวนออเดอร์: ${payload[1]?.value || 0} รายการ`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รายงาน</h1>
          <p className="text-muted-foreground">รายงานยอดขายและสถิติต่างๆ</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 วัน</SelectItem>
              <SelectItem value="15days">15 วัน</SelectItem>
              <SelectItem value="30days">30 วัน</SelectItem>
              <SelectItem value="90days">90 วัน</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            ส่งออก
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จำนวนออเดอร์</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ค่าเฉลี่ยต่อออเดอร์</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(Math.round(avgOrderValue))}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.8%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดค้างชำระ</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5.2%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Sales Report */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              รายงานยอดขายรายวัน
            </CardTitle>
            <CardDescription>ยอดขายและจำนวนออเดอร์ใน 15 วันที่ผ่านมา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar yAxisId="right" dataKey="orders" fill="#8884d8" opacity={0.3} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              สินค้าขายดี
            </CardTitle>
            <CardDescription>สินค้าที่ขายได้มากที่สุด 6 อันดับแรก</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topSellingProductsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="sales"
                  >
                    {topSellingProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} ชิ้น`, props.payload.name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {topSellingProductsData.slice(0, 3).map((product, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                    <span>{product.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.sales} ชิ้น</div>
                    <div className="text-muted-foreground">{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              สรุปการจัดส่ง
            </CardTitle>
            <CardDescription>สถานะการจัดส่งในปัจจุบัน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliverySummaryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value} รายการ`, "จำนวน"]} />
                  <Bar dataKey="count" fill="#8884d8">
                    {deliverySummaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {deliverySummaryData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.count}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Credit Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            รายงานลูกหนี้ค้างชำระ
          </CardTitle>
          <CardDescription>รายชื่อลูกค้าที่มีหนี้ค้างชำระ - ยอดรวม {formatCurrency(totalOutstanding)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>เบอร์โทร</TableHead>
                  <TableHead>วงเงินเครดิต</TableHead>
                  <TableHead>ยอดค้างชำระ</TableHead>
                  <TableHead>การชำระล่าสุด</TableHead>
                  <TableHead>วันเกินกำหนด</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outstandingCreditData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.customerName}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{formatCurrency(customer.creditLimit)}</TableCell>
                    <TableCell className="font-medium text-red-600">
                      {formatCurrency(customer.outstandingBalance)}
                    </TableCell>
                    <TableCell>{format(new Date(customer.lastPayment), "dd/MM/yyyy", { locale: th })}</TableCell>
                    <TableCell>
                      <span className={customer.daysPastDue > 7 ? "text-red-600 font-medium" : "text-yellow-600"}>
                        {customer.daysPastDue} วัน
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.daysPastDue > 7 ? "destructive" : "secondary"}>
                        {customer.daysPastDue > 7 ? "เกินกำหนด" : "ใกล้ครบกำหนด"}
                      </Badge>
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

export { ReportsPage }
export default ReportsPage
