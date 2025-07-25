"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Banknote,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Mock data for customers
const customersData = [
  {
    id: "CUST-001",
    name: "นายสมชาย ใจดี",
    phone: "082-123-4567",
    email: "somchai@email.com",
    address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110",
    type: "credit",
    creditLimit: 50000,
    currentDebt: 15000,
    joinDate: "2023-01-15",
    lastOrderDate: "2024-01-15",
    totalOrders: 25,
    totalSpent: 125000,
    status: "active",
  },
  {
    id: "CUST-002",
    name: "นางสาวมาลี สวยงาม",
    phone: "083-234-5678",
    email: "malee@email.com",
    address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "cash",
    creditLimit: 0,
    currentDebt: 0,
    joinDate: "2023-03-20",
    lastOrderDate: "2024-01-14",
    totalOrders: 18,
    totalSpent: 89000,
    status: "active",
  },
  {
    id: "CUST-003",
    name: "บริษัท อาหารทะเล จำกัด",
    phone: "084-345-6789",
    email: "seafood@company.com",
    address: "789 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
    type: "credit",
    creditLimit: 200000,
    currentDebt: 85000,
    joinDate: "2022-11-10",
    lastOrderDate: "2024-01-13",
    totalOrders: 45,
    totalSpent: 450000,
    status: "active",
  },
  {
    id: "CUST-004",
    name: "นายประยุทธ์ รักทะเล",
    phone: "085-456-7890",
    email: "prayut@email.com",
    address: "321 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    type: "cash",
    creditLimit: 0,
    currentDebt: 0,
    joinDate: "2023-07-05",
    lastOrderDate: "2024-01-10",
    totalOrders: 12,
    totalSpent: 45000,
    status: "inactive",
  },
]

const customerTypeConfig = {
  credit: { label: "เครดิต", color: "bg-blue-50 text-blue-600 border-blue-200", icon: CreditCard },
  cash: { label: "เงินสด", color: "bg-green-50 text-green-600 border-green-200", icon: Banknote },
}

const statusConfig = {
  active: { label: "ใช้งาน", color: "bg-green-50 text-green-600 border-green-200" },
  inactive: { label: "ไม่ใช้งาน", color: "bg-gray-50 text-gray-600 border-gray-200" },
}

export const CustomerManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // Filter customers
  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || customer.type === typeFilter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate statistics
  const totalCustomers = filteredCustomers.length
  const activeCustomers = filteredCustomers.filter((c) => c.status === "active").length
  const creditCustomers = filteredCustomers.filter((c) => c.type === "credit").length
  const totalDebt = filteredCustomers.reduce((sum, customer) => sum + customer.currentDebt, 0)

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  const handleViewCustomer = (customerId: string) => {
    alert(`ดูรายละเอียดลูกค้า: ${customerId}`)
  }

  const handleEditCustomer = (customerId: string) => {
    alert(`แก้ไขข้อมูลลูกค้า: ${customerId}`)
  }

  const handleDeleteCustomer = (customerId: string) => {
    alert(`ลบลูกค้า: ${customerId}`)
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าที่ใช้งาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ลูกค้าเครดิต</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{creditCustomers}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">หนี้ค้างรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">฿{totalDebt.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              ค้นหาและกรองข้อมูล
            </CardTitle>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มลูกค้าใหม่
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                ล้างตัวกรอง
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-2 block">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ชื่อ, เบอร์โทร, หรืออีเมล..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">ประเภทลูกค้า</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
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
              <Label className="text-sm font-medium mb-2 block">สถานะ</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="active">ใช้งาน</SelectItem>
                  <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">รายการลูกค้า</CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} จาก {filteredCustomers.length}{" "}
                รายการ
              </div>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-20">
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
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">รหัสลูกค้า</TableHead>
                  <TableHead className="font-semibold">ข้อมูลลูกค้า</TableHead>
                  <TableHead className="font-semibold">ประเภท</TableHead>
                  <TableHead className="font-semibold">ข้อมูลเครดิต</TableHead>
                  <TableHead className="font-semibold">สถิติการสั่งซื้อ</TableHead>
                  <TableHead className="font-semibold">สถานะ</TableHead>
                  <TableHead className="font-semibold text-center">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">{customer.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{customer.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {customer.address.substring(0, 30)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={customerTypeConfig[customer.type as keyof typeof customerTypeConfig].color}>
                        {customerTypeConfig[customer.type as keyof typeof customerTypeConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {customer.type === "credit" ? (
                        <div className="space-y-1 text-sm">
                          <div>วงเงิน: ฿{customer.creditLimit.toLocaleString()}</div>
                          <div className="text-red-600">หนี้ค้าง: ฿{customer.currentDebt.toLocaleString()}</div>
                          <div className="text-green-600">
                            คงเหลือ: ฿{(customer.creditLimit - customer.currentDebt).toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>คำสั่งซื้อ: {customer.totalOrders} ครั้ง</div>
                        <div>ยอดรวม: ฿{customer.totalSpent.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {new Date(customer.lastOrderDate).toLocaleDateString("th-TH")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                        {statusConfig[customer.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCustomer(customer.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCustomer(customer.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>ไม่พบลูกค้าที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                หน้า {currentPage} จาก {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  ก่อนหน้า
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
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

export default CustomerManagementPage
