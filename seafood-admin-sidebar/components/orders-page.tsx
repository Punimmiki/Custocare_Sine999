"use client"

import * as React from "react"
import { CalendarIcon, Eye, Printer, Search } from "lucide-react"
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
import { cn } from "@/lib/utils"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    orderDate: "2024-01-15",
    totalPrice: 2450,
    orderStatus: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    orderDate: "2024-01-15",
    totalPrice: 8900,
    orderStatus: "packing",
    paymentStatus: "paid",
  },
  {
    id: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    orderDate: "2024-01-14",
    totalPrice: 1200,
    orderStatus: "delivering",
    paymentStatus: "paid",
  },
  {
    id: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    orderDate: "2024-01-14",
    totalPrice: 15600,
    orderStatus: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    orderDate: "2024-01-13",
    totalPrice: 3200,
    orderStatus: "pending",
    paymentStatus: "partially_paid",
  },
  {
    id: "ORD-006",
    customerName: "โรงแรมสีฟู้ด พาราไดซ์",
    orderDate: "2024-01-13",
    totalPrice: 25400,
    orderStatus: "packing",
    paymentStatus: "paid",
  },
]

const orderStatusMap = {
  pending: { label: "รอดำเนินการ", variant: "secondary" as const },
  packing: { label: "กำลังแพ็ค", variant: "default" as const },
  delivering: { label: "กำลังจัดส่ง", variant: "outline" as const },
  completed: { label: "เสร็จสิ้น", variant: "destructive" as const },
}

const paymentStatusMap = {
  unpaid: { label: "ยังไม่ชำระ", variant: "destructive" as const },
  partially_paid: { label: "ชำระบางส่วน", variant: "secondary" as const },
  paid: { label: "ชำระแล้ว", variant: "default" as const },
}

export function OrdersPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [dateFrom, setDateFrom] = React.useState<Date>()
  const [dateTo, setDateTo] = React.useState<Date>()

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter

    const orderDate = new Date(order.orderDate)
    const matchesDateRange = (!dateFrom || orderDate >= dateFrom) && (!dateTo || orderDate <= dateTo)

    return matchesSearch && matchesStatus && matchesDateRange
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">คำสั่งซื้อ</h1>
        <p className="text-muted-foreground">จัดการและติดตามคำสั่งซื้อทั้งหมด</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">คำสั่งซื้อทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอดำเนินการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.orderStatus === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำลังจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.orderStatus === "delivering").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูลtt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
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

            <div className="w-full md:w-48">
              <Label>สถานะคำสั่งซื้อ</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="pending">รอดำเนินการ</SelectItem>
                  <SelectItem value="packing">กำลังแพ็ค</SelectItem>
                  <SelectItem value="delivering">กำลังจัดส่ง</SelectItem>
                  <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <div>
                <Label>วันที่เริ่มต้น</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground",
                      )}
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

              <div>
                <Label>วันที่สิ้นสุด</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setDateFrom(undefined)
                setDateTo(undefined)
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการคำสั่งซื้อ</CardTitle>
          <CardDescription>
            แสดง {filteredOrders.length} รายการจากทั้งหมด {orders.length} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสคำสั่งซื้อ</TableHead>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>วันที่สั่งซื้อ</TableHead>
                  <TableHead>ราคารวม</TableHead>
                  <TableHead>สถานะคำสั่งซื้อ</TableHead>
                  <TableHead>สถานะการชำระเงิน</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{format(new Date(order.orderDate), "dd/MM/yyyy", { locale: th })}</TableCell>
                    <TableCell>฿{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].variant}>
                        {orderStatusMap[order.orderStatus as keyof typeof orderStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].variant}>
                        {paymentStatusMap[order.paymentStatus as keyof typeof paymentStatusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          ดูรายละเอียด
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-1" />
                          พิมพ์ใบเบิก
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
