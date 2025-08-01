"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import {
  Edit,
  Search,
  CreditCard,
  Banknote,
  MessageCircle,
  UserPlus,
  Phone,
  Eye,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch" // Import Switch component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample product data for customer purchases - เพิ่มหน่วยนับ
const customerPurchases = {
  "1": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 0,
      lastPurchaseDate: "2024-01-15",
      quantity: 2,
      unit: "กิโลกรัม",
    },
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 20,
      lastPurchaseDate: "2024-01-10",
      quantity: 1,
      unit: "กิโลกรัม",
    },
  ],
  "2": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 50,
      lastPurchaseDate: "2024-01-14",
      quantity: 5,
      unit: "กิโลกรัม",
    },
    {
      id: "P003",
      name: "ปลาทูน่าสด",
      lastPrice: 380,
      discount: 30,
      lastPurchaseDate: "2024-01-12",
      quantity: 3,
      unit: "กิโลกรัม",
    },
    {
      id: "P004",
      name: "หอยเชลล์",
      lastPrice: 150,
      discount: 0,
      lastPurchaseDate: "2024-01-08",
      quantity: 2,
      unit: "กิโลกรัม",
    },
  ],
  "3": [
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 15,
      lastPurchaseDate: "2024-01-13",
      quantity: 1,
      unit: "กิโลกรัม",
    },
  ],
  "4": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 40,
      lastPurchaseDate: "2024-01-12",
      quantity: 4,
      unit: "กิโลกรัม",
    },
    {
      id: "P005",
      name: "ปูทะเล",
      lastPrice: 320,
      discount: 25,
      lastPurchaseDate: "2024-01-10",
      quantity: 2,
      unit: "ตัว",
    },
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 0,
      lastPurchaseDate: "2024-01-05",
      quantity: 3,
      unit: "กิโลกรัม",
    },
  ],
  "5": [
    {
      id: "P003",
      name: "ปลาทูน่าสด",
      lastPrice: 380,
      discount: 0,
      lastPurchaseDate: "2024-01-10",
      quantity: 1,
      unit: "กิโลกรัม",
    },
  ],
  "6": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 60,
      lastPurchaseDate: "2024-01-09",
      quantity: 8,
      unit: "กิโลกรัม",
    },
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 35,
      lastPurchaseDate: "2024-01-07",
      quantity: 6,
      unit: "กิโลกรัม",
    },
    {
      id: "P003",
      name: "ปลาทูน่าสด",
      lastPrice: 380,
      discount: 45,
      lastPurchaseDate: "2024-01-05",
      quantity: 4,
      unit: "กิโลกรัม",
    },
    {
      id: "P004",
      name: "หอยเชลล์",
      lastPrice: 150,
      discount: 10,
      lastPurchaseDate: "2024-01-03",
      quantity: 5,
      unit: "กิโลกรัม",
    },
    {
      id: "P005",
      name: "ปูทะเล",
      lastPrice: 320,
      discount: 30,
      lastPurchaseDate: "2024-01-01",
      quantity: 3,
      unit: "ตัว",
    },
  ],
  "7": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 0,
      lastPurchaseDate: "2024-01-08",
      quantity: 1,
      unit: "กิโลกรัม",
    },
  ],
  "8": [
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 10,
      lastPurchaseDate: "2024-01-07",
      quantity: 2,
      unit: "กิโลกรัม",
    },
    {
      id: "P003",
      name: "ปลาทูน่าสด",
      lastPrice: 380,
      discount: 20,
      lastPurchaseDate: "2024-01-06",
      quantity: 1,
      unit: "กิโลกรัม",
    },
  ],
  "9": [
    {
      id: "P004",
      name: "หอยเชลล์",
      lastPrice: 150,
      discount: 5,
      lastPurchaseDate: "2024-01-05",
      quantity: 3,
      unit: "กิโลกรัม",
    },
  ],
  "10": [
    {
      id: "P005",
      name: "ปูทะเล",
      lastPrice: 320,
      discount: 15,
      lastPurchaseDate: "2024-01-04",
      quantity: 1,
      unit: "ตัว",
    },
  ],
  "11": [
    {
      id: "P001",
      name: "ปลาแซลมอนสด",
      lastPrice: 450,
      discount: 25,
      lastPurchaseDate: "2024-01-03",
      quantity: 2,
      unit: "กิโลกรัม",
    },
  ],
  "12": [
    {
      id: "P002",
      name: "กุ้งแม่น้ำ",
      lastPrice: 280,
      discount: 0,
      lastPurchaseDate: "2024-01-02",
      quantity: 4,
      unit: "กิโลกรัม",
    },
  ],
}

// Sample customer data (expanded for pagination)
const initialCustomers = [
  {
    id: "1",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-15",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "2",
    name: "บริษัท อาหารทะเล จำกัด",
    phone: "02-123-4567",
    address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "credit" as const,
    creditLimit: 50000,
    outstandingBalance: 12500,
    unpaidBills: 3,
    overdueDays: 15,
    overdueAmount: 12500,
    lastOrderDate: "2024-01-14",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "3",
    name: "นางสาวมาลี สวยงาม",
    phone: "089-876-5432",
    address: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-13",
    lineNotifications: true,
    isActive: false,
  },
  {
    id: "4",
    name: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    address: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    type: "credit" as const,
    creditLimit: 30000,
    outstandingBalance: 8750,
    unpaidBills: 2,
    overdueDays: 7,
    overdueAmount: 8750,
    lastOrderDate: "2024-01-12",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "5",
    name: "นายประยุทธ์ รักทะเล",
    phone: "081-555-9999",
    address: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-10",
    lineNotifications: false,
    isActive: false,
  },
  {
    id: "6",
    name: "โรงแรมสีฟู้ด พาราไดซ์",
    phone: "02-987-6543",
    address: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    type: "credit" as const,
    creditLimit: 100000,
    outstandingBalance: 25400,
    unpaidBills: 5,
    overdueDays: 22,
    overdueAmount: 25400,
    lastOrderDate: "2024-01-09",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "7",
    name: "นายวิชัย ธุรกิจดี",
    phone: "081-111-2222",
    address: "111 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-08",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "8",
    name: "ร้านซีฟู้ดแสนอร่อย",
    phone: "02-333-4444",
    address: "222 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900",
    type: "credit" as const,
    creditLimit: 40000,
    outstandingBalance: 5000,
    unpaidBills: 1,
    overdueDays: 5,
    overdueAmount: 5000,
    lastOrderDate: "2024-01-07",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "9",
    name: "นางสุดา ปลาสด",
    phone: "089-555-6666",
    address: "333 ถนนบางนา แขวงบางนา เขตบางนา กรุงเทพฯ 10260",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-06",
    lineNotifications: true,
    isActive: false,
  },
  {
    id: "10",
    name: "บริษัท ทะเลไทย จำกัด",
    phone: "02-777-8888",
    address: "444 ถนนสาทร แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    type: "credit" as const,
    creditLimit: 80000,
    outstandingBalance: 15000,
    unpaidBills: 2,
    overdueDays: 10,
    overdueAmount: 15000,
    lastOrderDate: "2024-01-05",
    lineNotifications: true,
    isActive: true,
  },
  {
    id: "11",
    name: "นายสมศักดิ์ รักปลา",
    phone: "081-999-0000",
    address: "555 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
    type: "cash" as const,
    creditLimit: 0,
    outstandingBalance: 0,
    unpaidBills: 0,
    overdueDays: 0,
    overdueAmount: 0,
    lastOrderDate: "2024-01-04",
    lineNotifications: false,
    isActive: true,
  },
  {
    id: "12",
    name: "ร้านกุ้งปู ปลาหมึก",
    phone: "02-111-2222",
    address: "666 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    type: "credit" as const,
    creditLimit: 25000,
    outstandingBalance: 3000,
    unpaidBills: 1,
    overdueDays: 3,
    overdueAmount: 3000,
    lastOrderDate: "2024-01-03",
    lineNotifications: true,
    isActive: false,
  },
]

const CustomersPage = () => {
  const [customers, setCustomers] = React.useState(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [lineFilter, setLineFilter] = React.useState("all")
  const [activeCardFilter, setActiveCardFilter] = React.useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>(null)
  const [customerProducts, setCustomerProducts] = React.useState(customerPurchases)
  const [editingDiscounts, setEditingDiscounts] = React.useState<{ [key: string]: number }>({})
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || customer.type === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.isActive) ||
      (statusFilter === "inactive" && !customer.isActive)
    const matchesLine =
      lineFilter === "all" ||
      (lineFilter === "enabled" && customer.lineNotifications) ||
      (lineFilter === "disabled" && !customer.lineNotifications)
    return matchesSearch && matchesType && matchesStatus && matchesLine
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, typeFilter, statusFilter, lineFilter, activeCardFilter])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handleCardFilter = (filterType: string) => {
    // Reset all filters first
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
    setLineFilter("all")

    // Apply the selected card filter
    if (activeCardFilter === filterType) {
      // If clicking the same card, reset all filters
      setActiveCardFilter(null)
    } else {
      setActiveCardFilter(filterType)
      switch (filterType) {
        case "all":
          // Show all customers - filters already reset above
          break
        case "credit":
          setTypeFilter("credit")
          break
        case "cash":
          setTypeFilter("cash")
          break
        case "line":
          setLineFilter("enabled")
          setStatusFilter("active") // เพิ่มการกรองเฉพาะลูกค้าที่ใช้งานอยู่
          break
      }
    }
  }

  const handleLineNotificationToggle = (customerId: string, enabled: boolean) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? { ...customer, lineNotifications: enabled } : customer,
      ),
    )
  }

  const handleStatusToggle = (customerId: string, isActive: boolean) => {
    setCustomers(customers.map((customer) => (customer.id === customerId ? { ...customer, isActive } : customer)))
  }

  const handleDiscountChange = (customerId: string, productId: string, discount: number) => {
    const key = `${customerId}-${productId}`
    setEditingDiscounts((prev) => ({
      ...prev,
      [key]: discount,
    }))
  }

  const handleSaveDiscount = (customerId: string, productId: string) => {
    const key = `${customerId}-${productId}`
    const newDiscount = editingDiscounts[key]
    if (newDiscount !== undefined) {
      setCustomerProducts((prev) => ({
        ...prev,
        [customerId]:
          prev[customerId]?.map((product) =>
            product.id === productId ? { ...product, discount: newDiscount } : product,
          ) || [],
      }))
      // Remove from editing state
      setEditingDiscounts((prev) => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }
  }

  const getCustomerById = (id: string) => {
    return customers.find((customer) => customer.id === id)
  }

  const getCustomerProducts = (customerId: string) => {
    return customerProducts[customerId] || []
  }

  const getLatestPurchaseDate = (customerId: string) => {
    const products = getCustomerProducts(customerId)
    if (products.length === 0) return null
    const latestDate = products.reduce((latest, product) => {
      const productDate = new Date(product.lastPurchaseDate)
      return productDate > latest ? productDate : latest
    }, new Date(products[0].lastPurchaseDate))
    return latestDate
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.isActive).length
  const inactiveCustomers = customers.filter((c) => !c.isActive).length
  const creditCustomers = customers.filter((c) => c.type === "credit").length
  const cashCustomers = customers.filter((c) => c.type === "cash").length
  const lineEnabledCustomers = customers.filter((c) => c.lineNotifications && c.isActive).length // เฉพาะลูกค้าที่ใช้งานอยู่

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">จัดการลูกค้า</h1>
          <p className="text-muted-foreground">จัดการข้อมูลลูกค้าและวงเงินเครดิต</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/customers/create">
            <UserPlus className="h-4 w-4 mr-2" />
            เพิ่มลูกค้าใหม่
          </Link>
        </Button>
      </div>

      {/* Stats Cards - Now clickable */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeCardFilter === "all" ? "border-primary" : ""
          }`}
          onClick={() => handleCardFilter("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">{totalCustomers}</div>
            <div className="text-xs text-muted-foreground mt-1">
              ใช้งาน: {activeCustomers} | ไม่ใช้งาน: {inactiveCustomers}
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeCardFilter === "credit" ? "border-primary" : ""
          }`}
          onClick={() => handleCardFilter("credit")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าเครดิต</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl text-blue-700">{creditCustomers}</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeCardFilter === "cash" ? "border-primary" : ""
          }`}
          onClick={() => handleCardFilter("cash")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าเงินสด</CardTitle>
            <Banknote className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl text-amber-700">{cashCustomers}</div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            activeCardFilter === "line" ? "border-primary" : ""
          }`}
          onClick={() => handleCardFilter("line")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เปิด LINE แจ้งเตือน</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl text-green-700">{lineEnabledCustomers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Filter Indicator */}
      {activeCardFilter && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800">
            <strong>กำลังกรองข้อมูล:</strong> {activeCardFilter === "all" && "ลูกค้าทั้งหมด"}
            {activeCardFilter === "credit" && "ลูกค้าเครดิต"}
            {activeCardFilter === "cash" && "ลูกค้าเงินสด"}
            {activeCardFilter === "line" && "ลูกค้าที่เปิด LINE แจ้งเตือน"}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCardFilter("")}
            className="h-6 px-2 text-xs bg-white"
          >
            ล้างตัวกรอง
          </Button>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 min-w-0">
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
            <div className="w-full sm:w-48">
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
            <div className="w-full sm:w-48">
              <Label>สถานะ</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="active">ใช้งาน</SelectItem>
                  <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Label>LINE แจ้งเตือน</Label>
              <Select value={lineFilter} onValueChange={setLineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือก LINE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="enabled">เปิดใช้งาน</SelectItem>
                  <SelectItem value="disabled">ปิดใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
                setStatusFilter("all")
                setLineFilter("all")
                setActiveCardFilter(null)
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายชื่อลูกค้า</CardTitle>
              <CardDescription>
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} จาก {filteredCustomers.length}{" "}
                รายการ (ทั้งหมด {totalCustomers} รายการ)
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
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28 text-center">ลูกค้า</TableHead>
                  <TableHead className="w-28 text-center">เบอร์โทร</TableHead>
                  <TableHead className="w-20 text-center">ประเภท</TableHead>
                  <TableHead className="w-28 text-center">วงเงินเครดิต</TableHead>
                  <TableHead className="w-20 text-center">บิลค้าง</TableHead>
                  <TableHead className="w-20 text-center">วันค้าง</TableHead>
                  <TableHead className="w-28 text-center">ค้างชำระ</TableHead>
                  <TableHead className="w-24 text-center">คำสั่งซื้อล่าสุด</TableHead>
                  <TableHead className="w-20 text-center">LINE</TableHead>
                  <TableHead className="w-40 text-center">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCustomers.map((customer) => (
                  <TableRow key={customer.id} className={!customer.isActive ? "opacity-60" : ""}>
                    <TableCell className="text-center">
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]" title={customer.address}>
                          {customer.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          !customer.isActive
                            ? "border-gray-300 bg-gray-100 text-gray-500"
                            : customer.type === "credit"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
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
                    <TableCell className="text-center">
                      {customer.type === "credit" ? (
                        <div className="text-xs">
                          <div className="font-medium">฿{customer.creditLimit.toLocaleString()}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.unpaidBills > 0 ? (
                        <span className="text-xs font-medium text-orange-600">{customer.unpaidBills}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.overdueDays > 0 ? (
                        <span
                          className={`text-xs font-medium ${
                            customer.overdueDays > 30
                              ? "text-red-600"
                              : customer.overdueDays > 15
                                ? "text-orange-600"
                                : "text-yellow-600"
                          }`}
                        >
                          {customer.overdueDays}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {customer.overdueAmount > 0 ? (
                        <span className="text-xs font-medium text-red-600">
                          ฿{customer.overdueAmount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      {format(new Date(customer.lastOrderDate), "dd/MM/yyyy", { locale: th })}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Switch
                          checked={customer.lineNotifications}
                          onCheckedChange={(checked) => handleLineNotificationToggle(customer.id, checked)}
                          disabled={!customer.isActive} // Disable if customer is inactive
                          className={`
                            scale-75
                            w-11 h-6 rounded-full relative transition-colors
                            ${!customer.isActive ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 data-[state=checked]:bg-green-500"}
                          `}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                              <Eye className="h-3 w-3 mr-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดลูกค้า - {customer.name}</DialogTitle>
                              <DialogDescription>ข้อมูลการซื้อและส่วนลดของลูกค้า</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <Label className="text-sm font-medium">ชื่อลูกค้า</Label>
                                  <p className="text-sm">{customer.name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">เบอร์โทร</Label>
                                  <p className="text-sm">{customer.phone}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <Label className="text-sm font-medium">ที่อยู่</Label>
                                  <p className="text-sm">{customer.address}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">ประเภทลูกค้า</Label>
                                  <p className="text-sm">{customer.type === "credit" ? "เครดิต" : "เงินสด"}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">สถานะ</Label>
                                  <p className={`text-sm ${customer.isActive ? "text-green-700" : "text-red-600"}`}>
                                    {customer.isActive ? "กำลังใช้งานอยู่" : "ไม่ได้ใช้งาน"}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">วันที่ซื้อล่าสุด</Label>
                                  <p className="text-sm">
                                    {getLatestPurchaseDate(customer.id)
                                      ? format(getLatestPurchaseDate(customer.id)!, "dd/MM/yyyy", { locale: th })
                                      : "ไม่มีข้อมูล"}
                                  </p>
                                </div>
                              </div>

                              {/* Products Table */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">รายการสินค้าที่เคยซื้อ</h3>
                                {getCustomerProducts(customer.id).length > 0 ? (
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="text-center">ชื่อสินค้า</TableHead>
                                          <TableHead className="w-24 text-center">ราคาล่าสุด</TableHead>
                                          <TableHead className="w-28 text-center">จำนวนที่ซื้อ</TableHead>
                                          <TableHead className="w-32 text-center">
                                            ส่วนลดปัจจุบัน
                                            <br />
                                            <span className="text-xs text-muted-foreground">(บาท/หน่วย)</span>
                                          </TableHead>
                                          <TableHead className="w-32 text-center">
                                            ตั้งส่วนลดใหม่
                                            <br />
                                            <span className="text-xs text-muted-foreground">(บาท/หน่วย)</span>
                                          </TableHead>
                                          <TableHead className="w-28 text-center">วันที่ซื้อล่าสุด</TableHead>
                                          <TableHead className="w-20 text-center">การดำเนินการ</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {getCustomerProducts(customer.id).map((product) => {
                                          const editKey = `${customer.id}-${product.id}`
                                          const isEditing = editingDiscounts.hasOwnProperty(editKey)
                                          return (
                                            <TableRow key={product.id}>
                                              <TableCell className="font-medium text-center">{product.name}</TableCell>
                                              <TableCell className="text-center">
                                                ฿{product.lastPrice.toLocaleString()}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <span className="font-medium">
                                                  {product.quantity} {product.unit}
                                                </span>
                                              </TableCell>
                                              <TableCell className="text-center">
                                                {product.discount > 0 ? (
                                                  <span className="text-green-600 font-medium">
                                                    ฿{product.discount.toLocaleString()}
                                                  </span>
                                                ) : (
                                                  <span className="text-muted-foreground">ไม่มี</span>
                                                )}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <Input
                                                  type="number"
                                                  placeholder="0"
                                                  value={isEditing ? editingDiscounts[editKey] : ""}
                                                  onChange={(e) =>
                                                    handleDiscountChange(
                                                      customer.id,
                                                      product.id,
                                                      Number(e.target.value),
                                                    )
                                                  }
                                                  className="w-24 h-8 text-xs"
                                                  min="0"
                                                />
                                              </TableCell>
                                              <TableCell className="text-xs text-center">
                                                {format(new Date(product.lastPurchaseDate), "dd/MM/yyyy", {
                                                  locale: th,
                                                })}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <Button
                                                  size="sm"
                                                  onClick={() => handleSaveDiscount(customer.id, product.id)}
                                                  className="h-8 px-2 text-xs"
                                                  disabled={!isEditing}
                                                >
                                                  <Save className="h-3 w-3" />
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          )
                                        })}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-muted-foreground">ไม่มีข้อมูลการซื้อสินค้า</div>
                                )}
                              </div>

                              {/* Note */}
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>หมายเหตุ:</strong> ส่วนลดจะคำนวณเป็นบาทต่อหน่วย เมื่อลูกค้าทำการสั่งซื้อใหม่
                                  ระบบจะดึงข้อมูลส่วนลดล่าสุดมาใช้อัตโนมัติ
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" asChild className="h-8 px-2 text-xs bg-transparent">
                          <Link href={`/customers/${customer.id}/edit`}>
                            <Edit className="h-3 w-3 mr-1" />
                            แก้ไข
                          </Link>
                        </Button>
                        <div className="flex items-center gap-1">
                          <Switch
                            checked={customer.isActive}
                            onCheckedChange={(checked) => handleStatusToggle(customer.id, checked)}
                            // นำ className เดิมกลับมา
                            className="scale-75 data-[state=checked]:bg-green-500 bg-gray-200 rounded-full w-11 h-6 relative transition-colors"
                          ></Switch>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {currentCustomers.map((customer) => (
              <Card key={customer.id} className={!customer.isActive ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{customer.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{customer.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            !customer.isActive
                              ? "border-gray-300 bg-gray-100 text-gray-500"
                              : customer.type === "credit"
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          {customer.type === "credit" ? "เครดิต" : "เงินสด"}
                        </Badge>
                        <Badge
                          variant={customer.isActive ? "outline" : "secondary"}
                          className={`text-xs ${
                            customer.isActive ? "border-green-200 bg-green-50 text-green-700" : ""
                          }`}
                        >
                          {customer.isActive ? "ใช้งาน" : "ไม่ใช้งาน"}
                        </Badge>
                      </div>
                    </div>

                    {/* Address */}
                    <p className="text-xs text-muted-foreground line-clamp-2">{customer.address}</p>

                    {/* Credit/Outstanding Info */}
                    {customer.type === "credit" && (
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">วงเงิน:</span>
                          <span className="ml-1 font-medium">฿{customer.creditLimit.toLocaleString()}</span>
                        </div>
                        {customer.outstandingBalance > 0 && (
                          <div>
                            <span className="text-muted-foreground">ค้างชำระ:</span>
                            <span className="ml-1 font-medium text-red-600">
                              ฿{customer.outstandingBalance.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Overdue Info */}
                    {(customer.unpaidBills > 0 || customer.overdueDays > 0 || customer.overdueAmount > 0) && (
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">บิลค้าง:</span>
                          <span className="ml-1 font-medium text-orange-600">{customer.unpaidBills}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">วันค้าง:</span>
                          <span
                            className={`ml-1 font-medium ${
                              customer.overdueDays > 30
                                ? "text-red-600"
                                : customer.overdueDays > 15
                                  ? "text-orange-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {customer.overdueDays}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ยอดค้าง:</span>
                          <span className="ml-1 font-medium text-red-600">
                            ฿{customer.overdueAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Last Order & LINE */}
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-muted-foreground">คำสั่งซื้อล่าสุด:</span>
                        <span className="ml-1">
                          {format(new Date(customer.lastOrderDate), "dd/MM/yyyy", { locale: th })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={customer.lineNotifications}
                          onCheckedChange={(checked) => handleLineNotificationToggle(customer.id, checked)}
                          disabled={!customer.isActive} // Disable if customer is inactive
                          className={`
                            scale-75
                            w-11 h-6 rounded-full relative transition-colors
                            ${!customer.isActive ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 data-[state=checked]:bg-green-500"}
                          `}
                        />
                        <MessageCircle
                          className={`h-3 w-3 ${
                            !customer.isActive
                              ? "text-gray-400"
                              : customer.lineNotifications
                                ? "text-green-600"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent">
                              <Eye className="h-3 w-3 mr-1" />
                              ดู
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดลูกค้า - {customer.name}</DialogTitle>
                              <DialogDescription>ข้อมูลการซื้อและส่วนลดของลูกค้า</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <Label className="text-sm font-medium">ชื่อลูกค้า</Label>
                                  <p className="text-sm">{customer.name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">เบอร์โทร</Label>
                                  <p className="text-sm">{customer.phone}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <Label className="text-sm font-medium">ที่อยู่</Label>
                                  <p className="text-sm">{customer.address}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">ประเภทลูกค้า</Label>
                                  <p className="text-sm">{customer.type === "credit" ? "เครดิต" : "เงินสด"}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">สถานะ</Label>
                                  <p className={`text-sm ${customer.isActive ? "text-green-700" : "text-red-600"}`}>
                                    {customer.isActive ? "กำลังใช้งานอยู่" : "ไม่ได้ใช้งาน"}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">วันที่ซื้อล่าสุด</Label>
                                  <p className="text-sm">
                                    {getLatestPurchaseDate(customer.id)
                                      ? format(getLatestPurchaseDate(customer.id)!, "dd/MM/yyyy", { locale: th })
                                      : "ไม่มีข้อมูล"}
                                  </p>
                                </div>
                              </div>

                              {/* Products Table */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">รายการสินค้าที่เคยซื้อ</h3>
                                {getCustomerProducts(customer.id).length > 0 ? (
                                  <div className="rounded-md border overflow-x-auto">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead className="text-center">ชื่อสินค้า</TableHead>
                                          <TableHead className="w-24 text-center">ราคาล่าสุด</TableHead>
                                          <TableHead className="w-28 text-center">จำนวนที่ซื้อ</TableHead>
                                          <TableHead className="w-32 text-center">
                                            ส่วนลดปัจจุบัน
                                            <br />
                                            <span className="text-xs text-muted-foreground">(บาท/หน่วย)</span>
                                          </TableHead>
                                          <TableHead className="w-32 text-center">
                                            ตั้งส่วนลดใหม่
                                            <br />
                                            <span className="text-xs text-muted-foreground">(บาท/หน่วย)</span>
                                          </TableHead>
                                          <TableHead className="w-28 text-center">วันที่ซื้อล่าสุด</TableHead>
                                          <TableHead className="w-20 text-center">การดำเนินการ</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {getCustomerProducts(customer.id).map((product) => {
                                          const editKey = `${customer.id}-${product.id}`
                                          const isEditing = editingDiscounts.hasOwnProperty(editKey)
                                          return (
                                            <TableRow key={product.id}>
                                              <TableCell className="font-medium text-center">{product.name}</TableCell>
                                              <TableCell className="text-center">
                                                ฿{product.lastPrice.toLocaleString()}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <span className="font-medium">
                                                  {product.quantity} {product.unit}
                                                </span>
                                              </TableCell>
                                              <TableCell className="text-center">
                                                {product.discount > 0 ? (
                                                  <span className="text-green-600 font-medium">
                                                    ฿{product.discount.toLocaleString()}
                                                  </span>
                                                ) : (
                                                  <span className="text-muted-foreground">ไม่มี</span>
                                                )}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <Input
                                                  type="number"
                                                  placeholder="0"
                                                  value={isEditing ? editingDiscounts[editKey] : ""}
                                                  onChange={(e) =>
                                                    handleDiscountChange(
                                                      customer.id,
                                                      product.id,
                                                      Number(e.target.value),
                                                    )
                                                  }
                                                  className="w-24 h-8 text-xs"
                                                  min="0"
                                                />
                                              </TableCell>
                                              <TableCell className="text-xs text-center">
                                                {format(new Date(product.lastPurchaseDate), "dd/MM/yyyy", {
                                                  locale: th,
                                                })}
                                              </TableCell>
                                              <TableCell className="text-center">
                                                <Button
                                                  size="sm"
                                                  onClick={() => handleSaveDiscount(customer.id, product.id)}
                                                  className="h-8 px-2 text-xs"
                                                  disabled={!isEditing}
                                                >
                                                  <Save className="h-3 w-3" />
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          )
                                        })}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-muted-foreground">ไม่มีข้อมูลการซื้อสินค้า</div>
                                )}
                              </div>

                              {/* Note */}
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>หมายเหตุ:</strong> ส่วนลดจะคำนวณเป็นบาทต่อหน่วย เมื่อลูกค้าทำการสั่งซื้อใหม่
                                  ระบบจะดึงข้อมูลส่วนลดล่าสุดมาใช้อัตโนมัติ
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" asChild className="h-8 px-3 text-xs bg-transparent">
                          <Link href={`/customers/${customer.id}/edit`}>
                            <Edit className="h-3 w-3 mr-1" />
                            แก้ไข
                          </Link>
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={customer.isActive}
                          onCheckedChange={(checked) => handleStatusToggle(customer.id, checked)}
                          // นำ className เดิมกลับมา
                          className="scale-75 data-[state=checked]:bg-green-500 bg-gray-200 rounded-full w-11 h-6 relative transition-colors"
                        />
                        <span className={`text-xs ${customer.isActive ? "text-green-700" : "text-red-600"}`}>
                          {customer.isActive ? "เปิด" : "ปิด"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
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

export { CustomersPage }
export default CustomersPage
