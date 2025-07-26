"use client"

import * as React from "react"
import Link from "next/link"
import {
  Edit,
  Search,
  Package,
  Plus,
  Power,
  PowerOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog"
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

// Types
interface Product {
  id: string
  name: string
  image: string
  price: number
  unit: string
  category: string
  status: "active" | "low_stock" | "out_of_stock"
  isActive: boolean
  description?: string
  stock?: number
  createdAt?: string
  updatedAt?: string
}

// Sample product data with additional details
const initialProducts: Product[] = [
  {
    id: "1",
    name: "แซลมอนสด",
    image: "/placeholder.svg?height=60&width=60&text=แซลมอน",
    price: 450,
    unit: "กิโลกรัม",
    category: "ปลา",
    status: "active",
    isActive: true,
    description: "แซลมอนสดนำเข้าจากนอร์เวย์ คุณภาพพรีเมียม เนื้อนุ่ม รสชาติเข้มข้น เหมาะสำหรับทำซาชิมิ",
    stock: 25,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "กุ้งขาวใหญ่",
    image: "/placeholder.svg?height=60&width=60&text=กุ้งขาว",
    price: 320,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    status: "active",
    isActive: true,
    description: "กุ้งขาวใหญ่สดใหม่ เนื้อหวาน เหมาะสำหรับทำอาหารทุกประเภท ขนาด 16-20 ตัวต่อกิโลกรัม",
    stock: 18,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
  },
  {
    id: "3",
    name: "ปลาทูน่าสด",
    image: "/placeholder.svg?height=60&width=60&text=ทูน่า",
    price: 380,
    unit: "กิโลกรัม",
    category: "ปลา",
    status: "active",
    isActive: true,
    description: "ปลาทูน่าสดคุณภาพสูง เนื้อแน่น สีสวย เหมาะสำหรับทำซาชิมิและสเต็ก",
    stock: 12,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
  },
  {
    id: "4",
    name: "หอยแมลงภู่",
    image: "/placeholder.svg?height=60&width=60&text=หอยแมลงภู่",
    price: 180,
    unit: "กิโลกรัม",
    category: "หอย",
    status: "low_stock",
    isActive: true,
    description: "หอยแมลงภู่สดใหม่ เนื้อหวาน เหมาะสำหรับต้มยำและผัดกะเพรา",
    stock: 3,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
  {
    id: "5",
    name: "ปูม้าสด",
    image: "/placeholder.svg?height=60&width=60&text=ปูม้า",
    price: 250,
    unit: "ตัว",
    category: "ปู",
    status: "active",
    isActive: false,
    description: "ปูม้าสดขนาดใหญ่ เนื้อเต็ม รสชาติหวานมัน น้ำหนักประมาณ 400-500 กรัมต่อตัว",
    stock: 8,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
  },
  {
    id: "6",
    name: "ปลาหมึกกล้วย",
    image: "/placeholder.svg?height=60&width=60&text=ปลาหมึกกล้วย",
    price: 220,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    status: "active",
    isActive: true,
    description: "ปลาหมึกกล้วยสดใหม่ เนื้อนุ่ม เหมาะสำหรับทำยำและผัด",
    stock: 15,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
  {
    id: "7",
    name: "หอยเชลล์",
    image: "/placeholder.svg?height=60&width=60&text=หอยเชลล์",
    price: 420,
    unit: "กิโลกรัม",
    category: "หอย",
    status: "out_of_stock",
    isActive: true,
    description: "หอยเชลล์นำเข้า เนื้อหวานมัน เหมาะสำหรับทำซุปและผัด",
    stock: 0,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
  },
  {
    id: "8",
    name: "กุ้งมังกร",
    image: "/placeholder.svg?height=60&width=60&text=กุ้งมังกร",
    price: 850,
    unit: "ตัว",
    category: "กุ้ง",
    status: "out_of_stock",
    isActive: false,
    description: "กุ้งมังกรขนาดใหญ่ น้ำหนักประมาณ 300-400 กรัมต่อตัว เนื้อหวานเด่น",
    stock: 0,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
  },
  {
    id: "9",
    name: "ปลาอินทรีย์เค็ม",
    image: "/placeholder.svg?height=60&width=60&text=ปลาอินทรีย์",
    price: 300,
    unit: "กิโลกรัม",
    category: "ปลา",
    status: "low_stock",
    isActive: true,
    description: "ปลาอินทรีย์เค็มแห้ง รสชาติเข้มข้น เหมาะสำหรับทำแกงและต้ม",
    stock: 5,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
  },
  {
    id: "10",
    name: "หอยนางรม",
    image: "/placeholder.svg?height=60&width=60&text=หอยนางรม",
    price: 200,
    unit: "ตัว",
    category: "หอย",
    status: "active",
    isActive: true,
    description: "หอยนางรมสดใหม่ เนื้อครีมมี่ เหมาะสำหรับทานสดและย่าง",
    stock: 30,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
  },
  {
    id: "11",
    name: "กุ้งแม่น้ำ",
    image: "/placeholder.svg?height=60&width=60&text=กุ้งแม่น้ำ",
    price: 400,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    status: "low_stock",
    isActive: true,
    description: "กุ้งแม่น้ำสดใหม่ เนื้อหวานกรอบ เหมาะสำหรับทำต้มยำและผัด",
    stock: 7,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
  },
  {
    id: "12",
    name: "ปลาทูสด",
    image: "/placeholder.svg?height=60&width=60&text=ปลาทู",
    price: 150,
    unit: "กิโลกรัม",
    category: "ปลา",
    status: "active",
    isActive: true,
    description: "ปลาทูสดใหม่ เนื้อนุ่ม เหมาะสำหรับทำแกงและย่าง ราคาประหยัด",
    stock: 40,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
  },
  {
    id: "13",
    name: "ปูทะเล",
    image: "/placeholder.svg?height=60&width=60&text=ปูทะเล",
    price: 280,
    unit: "ตัว",
    category: "ปู",
    status: "out_of_stock",
    isActive: true,
    description: "ปูทะเลสดใหม่ เนื้อหวาน เหมาะสำหรับทำผัดพริกไทยดำและต้มยำ",
    stock: 0,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
  },
  {
    id: "14",
    name: "ปลาหมึกยักษ์",
    image: "/placeholder.svg?height=60&width=60&text=ปลาหมึกยักษ์",
    price: 350,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    status: "active",
    isActive: false,
    description: "ปลาหมึกยักษ์สดใหม่ เนื้อแน่น เหมาะสำหรับทำยำและผัด",
    stock: 10,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
  },
  {
    id: "15",
    name: "หอยแครง",
    image: "/placeholder.svg?height=60&width=60&text=หอยแครง",
    price: 160,
    unit: "กิโลกรัม",
    category: "หอย",
    status: "low_stock",
    isActive: true,
    description: "หอยแครงสดใหม่ เนื้อหวาน เหมาะสำหรับทำต้มยำและลาบ",
    stock: 4,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
  },
  {
    id: "16",
    name: "กุ้งแดง",
    image: "/placeholder.svg?height=60&width=60&text=กุ้งแดง",
    price: 370,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    status: "active",
    isActive: true,
    description: "กุ้งแดงสดใหม่ เนื้อหวานกรอบ สีสวย เหมาะสำหรับทำแกงและต้มยำ",
    stock: 22,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
  },
  {
    id: "17",
    name: "ปลาเก๋า",
    image: "/placeholder.svg?height=60&width=60&text=ปลาเก๋า",
    price: 600,
    unit: "กิโลกรัม",
    category: "ปลา",
    status: "low_stock",
    isActive: true,
    description: "ปลาเก๋าสดใหม่ เนื้อขาวนุ่ม รสชาติหวานธรรมชาติ เหมาะสำหรับนึ่งมะนาว",
    stock: 6,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
  },
  {
    id: "18",
    name: "หอยหลอด",
    image: "/placeholder.svg?height=60&width=60&text=หอยหลอด",
    price: 190,
    unit: "กิโลกรัม",
    category: "หอย",
    status: "active",
    isActive: true,
    description: "หอยหลอดสดใหม่ เนื้อกรอบหวาน เหมาะสำหรับทำยำและผัด",
    stock: 16,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
  },
  {
    id: "19",
    name: "ปูไข่",
    image: "/placeholder.svg?height=60&width=60&text=ปูไข่",
    price: 350,
    unit: "ตัว",
    category: "ปู",
    status: "active",
    isActive: true,
    description: "ปูไข่สดใหม่ มีไข่เต็ม รสชาติหวานมัน เหมาะสำหรับทำแกงและผัด",
    stock: 12,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
  },
  {
    id: "20",
    name: "ปลาหมึกหอม",
    image: "/placeholder.svg?height=60&width=60&text=ปลาหมึกหอม",
    price: 240,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    status: "low_stock",
    isActive: true,
    description: "ปลาหมึกหอมสดใหม่ เนื้อนุ่มหอม เหมาะสำหรับทำยำและผัดกะเพรา",
    stock: 8,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
  },
]

const categories = ["ทั้งหมด", "ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]
const activeStatusOptions = ["ทั้งหมด", "ใช้งาน", "ไม่ใช้งาน"]
const productStatusOptions = ["ทั้งหมด", "พร้อมจำหน่าย", "สต็อกต่ำ", "หมด"]

const statusMap = {
  active: { label: "พร้อมจำหน่าย", variant: "default" as const },
  low_stock: { label: "สต็อกต่ำ", variant: "secondary" as const },
  out_of_stock: { label: "หมด", variant: "destructive" as const },
}

// Product Detail Dialog Component
const ProductDetailDialog = ({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white shadow-lg border-4 border-white">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=160&width=160"
                    }}
                  />
                </div>
              </div>

              {/* Product Title & Key Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <Badge variant="outline" className="border-gray-200 bg-gray-100 text-gray-700 mb-3">
                    {product.category}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <div className="text-3xl font-bold text-green-600">฿{product.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">ต่อ {product.unit}</div>
                  </div>
                  {product.stock !== undefined && (
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <div className="text-xl font-semibold text-gray-900">{product.stock}</div>
                      <div className="text-sm text-gray-500">คงเหลือ</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`${
                      product.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : product.status === "low_stock"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {statusMap[product.status].label}
                  </Badge>
                  <Badge
                    className={`${
                      product.isActive
                        ? "bg-gray-100 text-gray-800 border-gray-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {product.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">รายละเอียดสินค้า</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Product Details Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-gray-600" />
                  ข้อมูลสินค้า
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">รหัสสินค้า</span>
                    <span className="font-medium text-gray-900">#{product.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">หน่วยขาย</span>
                    <span className="font-medium text-gray-900">{product.unit}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">หมวดหมู่</span>
                    <span className="font-medium text-gray-900">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* System Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  ข้อมูลระบบ
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">วันที่เพิ่ม</span>
                    <span className="font-medium text-gray-900">
                      {product.createdAt ? new Date(product.createdAt).toLocaleDateString("th-TH") : "ไม่ระบุ"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">แก้ไขล่าสุด</span>
                    <span className="font-medium text-gray-900">
                      {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString("th-TH") : "ไม่ระบุ"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">สถานะ</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span className="font-medium text-gray-900">{product.isActive ? "ใช้งาน" : "ไม่ใช้งาน"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="px-8 h-12 text-base">
                ปิด
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProductsPage = () => {
  const [products, setProducts] = React.useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("ทั้งหมด")
  const [activeFilter, setActiveFilter] = React.useState("ทั้งหมด")
  const [statusFilter, setStatusFilter] = React.useState("ทั้งหมด")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)
  const [isLoading, setIsLoading] = React.useState(false)
  const [updatingProductId, setUpdatingProductId] = React.useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false)
  const { toast } = useToast()

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "ทั้งหมด" || product.category === categoryFilter
      const matchesActive =
        activeFilter === "ทั้งหมด" ||
        (activeFilter === "ใช้งาน" && product.isActive) ||
        (activeFilter === "ไม่ใช้งาน" && !product.isActive)
      const matchesStatus =
        statusFilter === "ทั้งหมด" ||
        (statusFilter === "พร้อมจำหน่าย" && product.status === "active") ||
        (statusFilter === "สต็อกต่ำ" && product.status === "low_stock") ||
        (statusFilter === "หมด" && product.status === "out_of_stock")

      return matchesSearch && matchesCategory && matchesActive && matchesStatus
    })
  }, [products, searchTerm, categoryFilter, activeFilter, statusFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, categoryFilter, activeFilter, statusFilter])

  const handleToggleActive = async (productId: string) => {
    setUpdatingProductId(productId)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, isActive: !product.isActive } : product,
        ),
      )
      const product = products.find((p) => p.id === productId)
      toast({
        title: "อัปเดตสำเร็จ",
        description: `${product?.name} ได้รับการ${product?.isActive ? "ปิด" : "เปิด"}ใช้งานแล้ว`,
      })
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะสินค้าได้",
        variant: "destructive",
      })
    } finally {
      setUpdatingProductId(null)
    }
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailDialogOpen(true)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("ทั้งหมด")
    setActiveFilter("ทั้งหมด")
    setStatusFilter("ทั้งหมด")
  }

  // Statistics calculations
  const stats = React.useMemo(() => {
    const totalProducts = products.length
    const activeProducts = products.filter((p) => p.isActive).length
    const inactiveProducts = products.filter((p) => !p.isActive).length
    const outOfStockProducts = products.filter((p) => p.status === "out_of_stock").length
    return { totalProducts, activeProducts, inactiveProducts, outOfStockProducts }
  }, [products])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าใช้งาน</CardTitle>
            <Power className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าไม่ใช้งาน</CardTitle>
            <PowerOff className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inactiveProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStockProducts}</div>
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
            <div className="w-full md:w-48">
              <Label>สถานะการใช้งาน</Label>
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  {activeStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Label>สถานะสินค้า</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  {productStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายการสินค้า</CardTitle>
              <CardDescription>
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} จาก {filteredProducts.length} รายการ
                (ทั้งหมด {stats.totalProducts} รายการ)
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">รูปภาพ</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead className="w-24">ราคาขาย</TableHead>
                  <TableHead className="w-20">หน่วย</TableHead>
                  <TableHead className="w-24">หมวดหมู่</TableHead>
                  <TableHead className="w-32">สถานะสินค้า</TableHead>
                  <TableHead className="w-48 text-center">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา
                    </TableCell>
                  </TableRow>
                ) : (
                  currentProducts.map((product) => (
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
                      <TableCell className="font-medium text-sm">{product.name}</TableCell>
                      <TableCell>
                        <span className="font-medium text-xs">฿{product.price.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="text-xs">{product.unit}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-blue-200 bg-blue-50 text-blue-700">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs whitespace-nowrap ${
                            product.status === "active"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : product.status === "low_stock"
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-red-200 bg-red-50 text-red-700"
                          }`}
                        >
                          {statusMap[product.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                            className="h-8 px-2 text-xs bg-transparent"
                            title="ดูรายละเอียด"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            ดู
                          </Button>
                          <Button variant="outline" size="sm" asChild className="h-8 px-2 text-xs bg-transparent">
                            <Link href={`/products/${product.id}/edit`}>
                              <Edit className="h-3 w-3 mr-1" />
                              แก้ไข
                            </Link>
                          </Button>
                          <div className="flex items-center gap-1">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <div className="flex items-center gap-1">
                                  {updatingProductId === product.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Switch
                                      checked={product.isActive}
                                      onCheckedChange={() => {}}
                                      className="scale-75 cursor-pointer"
                                      disabled={updatingProductId === product.id}
                                    />
                                  )}
                                </div>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>ยืนยันการ{product.isActive ? "ปิด" : "เปิด"}ใช้งานสินค้า</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    คุณแน่ใจหรือไม่ที่จะ{product.isActive ? "ปิด" : "เปิด"}ใช้งานสินค้า "{product.name}"
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleToggleActive(product.id)}
                                    className={
                                      product.isActive
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-600 hover:bg-green-700"
                                    }
                                  >
                                    {product.isActive ? "ปิดใช้งาน" : "เปิดใช้งาน"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <span
                              className={`text-xs font-medium ${product.isActive ? "text-green-700" : "text-red-600"}`}
                            >
                              {product.isActive ? "เปิด" : "ปิด"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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

      {/* Product Detail Dialog */}
      <ProductDetailDialog product={selectedProduct} open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} />
    </div>
  )
}

export { ProductsPage }
export default ProductsPage
