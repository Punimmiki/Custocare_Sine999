"use client"

import * as React from "react"
import Link from "next/link"
import { Edit, Search, Trash2, Package, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "แซลมอนสด",
    image: "/placeholder.svg?height=60&width=60",
    price: 450,
    unit: "กิโลกรัม",
    category: "ปลา",
    stock: 25,
    status: "active",
  },
  {
    id: "2",
    name: "กุ้งขาวใหญ่",
    image: "/placeholder.svg?height=60&width=60",
    price: 320,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    stock: 15,
    status: "active",
  },
  {
    id: "3",
    name: "ปลาทูน่าสด",
    image: "/placeholder.svg?height=60&width=60",
    price: 380,
    unit: "กิโลกรัม",
    category: "ปลา",
    stock: 12,
    status: "active",
  },
  {
    id: "4",
    name: "หอยแมลง",
    image: "/placeholder.svg?height=60&width=60",
    price: 180,
    unit: "กิโลกรัม",
    category: "หอย",
    stock: 30,
    status: "active",
  },
  {
    id: "5",
    name: "ปูม้าสด",
    image: "/placeholder.svg?height=60&width=60",
    price: 250,
    unit: "ตัว",
    category: "ปู",
    stock: 8,
    status: "active",
  },
  {
    id: "6",
    name: "ปลาหมึกสด",
    image: "/placeholder.svg?height=60&width=60",
    price: 220,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    stock: 20,
    status: "active",
  },
  {
    id: "7",
    name: "หอยเชลล์",
    image: "/placeholder.svg?height=60&width=60",
    price: 420,
    unit: "กิโลกรัม",
    category: "หอย",
    stock: 5,
    status: "low_stock",
  },
  {
    id: "8",
    name: "กุ้งมังกร",
    image: "/placeholder.svg?height=60&width=60",
    price: 850,
    unit: "ตัว",
    category: "กุ้ง",
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "9",
    name: "ปลาเก๋า",
    image: "/placeholder.svg?height=60&width=60",
    price: 320,
    unit: "กิโลกรัม",
    category: "ปลา",
    stock: 18,
    status: "active",
  },
  {
    id: "10",
    name: "หอยนางรม",
    image: "/placeholder.svg?height=60&width=60",
    price: 280,
    unit: "โหล",
    category: "หอย",
    stock: 12,
    status: "active",
  },
]

const categories = ["ทั้งหมด", "ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]

const statusMap = {
  active: { label: "พร้อมจำหน่าย", variant: "default" as const },
  low_stock: { label: "สต็อกต่ำ", variant: "secondary" as const },
  out_of_stock: { label: "หมด", variant: "destructive" as const },
}

const ProductsPage = () => {
  const [products, setProducts] = React.useState(initialProducts)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("ทั้งหมด")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "ทั้งหมด" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.status === "low_stock").length
  const outOfStockProducts = products.filter((p) => p.status === "out_of_stock").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">จัดการสินค้า</h1>
          <p className="text-muted-foreground">จัดการสินค้าและคลังสินค้า</p>
        </div>
        <Button asChild>
          <Link href="/products/create">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มสินค้าใหม่
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าทั้งหมด</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">พร้อมจำหน่าย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สต็อกต่ำ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
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
              <Label htmlFor="search">ค้นหาสินค้า</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ค้นหาด้วยชื่อสินค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <Label>หมวดหมู่</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("ทั้งหมด")
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
          <CardDescription>
            แสดง {filteredProducts.length} รายการจากทั้งหมด {totalProducts} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รูปภาพ</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>ราคา</TableHead>
                  <TableHead>หน่วย</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>คงเหลือ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <span className="font-medium">฿{product.price.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 10
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {product.stock} {product.unit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusMap[product.status as keyof typeof statusMap].variant}>
                        {statusMap[product.status as keyof typeof statusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/products/${product.id}/edit`}>
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
                              <AlertDialogTitle>ยืนยันการลบสินค้า</AlertDialogTitle>
                              <AlertDialogDescription>
                                คุณแน่ใจหรือไม่ที่จะลบสินค้า "{product.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบสินค้า
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

export { ProductsPage }
export default ProductsPage
