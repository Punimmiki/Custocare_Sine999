"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Edit, Search, Trash2, CreditCard, Banknote, MessageCircle, UserPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample customer data
const initialCustomers = [
  {
    id: "1",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    lastOrderDate: "2024-01-15",
    lineNotifications: true,
  },
  {
    id: "2",
    name: "บริษัท อาหารทะเล จำกัด",
    phone: "02-123-4567",
    address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "credit" as const,
    creditLimit: 50000,
    outstandingBalance: 12500,
    lastOrderDate: "2024-01-14",
    lineNotifications: false,
  },
  {
    id: "3",
    name: "นางสาวมาลี สวยงาม",
    phone: "089-876-5432",
    address: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    lastOrderDate: "2024-01-13",
    lineNotifications: true,
  },
  {
    id: "4",
    name: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    address: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    type: "credit" as const,
    creditLimit: 30000,
    outstandingBalance: 8750,
    lastOrderDate: "2024-01-12",
    lineNotifications: true,
  },
  {
    id: "5",
    name: "นายประยุทธ์ รักทะเล",
    phone: "081-555-9999",
    address: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    lastOrderDate: "2024-01-10",
    lineNotifications: false,
  },
  {
    id: "6",
    name: "โรงแรมสีฟู้ด พาราไดซ์",
    phone: "02-987-6543",
    address: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    type: "credit" as const,
    creditLimit: 100000,
    outstandingBalance: 25400,
    lastOrderDate: "2024-01-09",
    lineNotifications: true,
  },
]

const CustomersPage = () => {
  const [customers, setCustomers] = React.useState(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || customer.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleLineNotificationToggle = (customerId: string, enabled: boolean) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? { ...customer, lineNotifications: enabled } : customer,
      ),
    )
  }

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((customer) => customer.id !== customerId))
  }

  const totalCustomers = customers.length
  const creditCustomers = customers.filter((c) => c.type === "credit").length
  const totalOutstanding = customers.reduce((sum, c) => sum + c.outstandingBalance, 0)
  const lineEnabledCustomers = customers.filter((c) => c.lineNotifications).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">จัดการลูกค้า</h1>
          <p className="text-muted-foreground">จัดการข้อมูลลูกค้าและวงเงินเครดิต</p>
        </div>
        <Button asChild>
          <Link href="/customers/create">
            <UserPlus className="h-4 w-4 mr-2" />
            เพิ่มลูกค้าใหม่
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าเครดิต</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดค้างชำระรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalOutstanding.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เปิด LINE แจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lineEnabledCustomers}</div>
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
                  placeholder="ค้นหาด้วยชื่อ, เบอร์โทร, หรือที่อยู่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <Label>ประเภทลูกค้า</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="cash">เงินสด</SelectItem>
                  <SelectItem value="credit">เครดิต</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายชื่อลูกค้า</CardTitle>
          <CardDescription>
            แสดง {filteredCustomers.length} รายการจากทั้งหมด {totalCustomers} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>เบอร์โทร</TableHead>
                  <TableHead>ที่อยู่</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>วงเงินเครดิต</TableHead>
                  <TableHead>ยอดค้างชำระ</TableHead>
                  <TableHead>คำสั่งซื้อล่าสุด</TableHead>
                  <TableHead>LINE แจ้งเตือน</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell className="max-w-xs truncate" title={customer.address}>
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.type === "credit" ? "default" : "secondary"}>
                        <div className="flex items-center gap-1">
                          {customer.type === "credit" ? (
                            <CreditCard className="h-3 w-3" />
                          ) : (
                            <Banknote className="h-3 w-3" />
                          )}
                          {customer.type === "credit" ? "เครดิต" : "เงินสด"}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {customer.type === "credit" ? (
                        <span className="font-medium">฿{customer.creditLimit.toLocaleString()}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.outstandingBalance > 0 ? (
                        <span className="font-medium text-red-600">
                          ฿{customer.outstandingBalance.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(customer.lastOrderDate), "dd/MM/yyyy", { locale: th })}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={customer.lineNotifications}
                          onCheckedChange={(checked) => handleLineNotificationToggle(customer.id, checked)}
                        />
                        <MessageCircle
                          className={`h-4 w-4 ${customer.lineNotifications ? "text-green-600" : "text-gray-400"}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/customers/${customer.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" />
                            แก้ไข
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              ลบ
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ยืนยันการลบลูกค้า</AlertDialogTitle>
                              <AlertDialogDescription>
                                คุณแน่ใจหรือไม่ที่จะลบลูกค้า "{customer.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCustomer(customer.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบลูกค้า
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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

export { CustomersPage }
export default CustomersPage
