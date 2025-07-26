"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  ShoppingCart,
  Printer,
  Save,
  History,
  X,
  TrendingUp,
  Receipt,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent } from "@/components/ui/tabs"

// Sample product data
const products = [
  {
    id: "1",
    name: "แซลมอนสด",
    price: 450,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Salmon",
    stock: 25,
  },
  {
    id: "2",
    name: "กุ้งขาวใหญ่",
    price: 320,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    image: "/placeholder.svg?height=120&width=120&text=Shrimp",
    stock: 15,
  },
  {
    id: "3",
    name: "ปลาทูน่าสด",
    price: 380,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Tuna",
    stock: 12,
  },
  {
    id: "4",
    name: "หอยแมลงภู่",
    price: 180,
    unit: "กิโลกรัม",
    category: "หอย",
    image: "/placeholder.svg?height=120&width=120&text=Mussel",
    stock: 30,
  },
  {
    id: "5",
    name: "ปูม้าสด",
    price: 250,
    unit: "ตัว",
    category: "ปู",
    image: "/placeholder.svg?height=120&width=120&text=Crab",
    stock: 8,
  },
  {
    id: "6",
    name: "ปลาหมึกสด",
    price: 220,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    image: "/placeholder.svg?height=120&width=120&text=Squid",
    stock: 20,
  },
  {
    id: "7",
    name: "หอยเชลล์",
    price: 420,
    unit: "กิโลกรัม",
    category: "หอย",
    image: "/placeholder.svg?height=120&width=120&text=Scallop",
    stock: 5,
  },
  {
    id: "8",
    name: "กุ้งมังกร",
    price: 850,
    unit: "ตัว",
    category: "กุ้ง",
    image: "/placeholder.svg?height=120&width=120&text=Lobster",
    stock: 3,
  },
]

const categories = ["ทั้งหมด", "ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]

interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  total: number
}

interface SavedOrder {
  id: string
  items: CartItem[]
  timestamp: Date
  customerNotes: string
  paymentMethod: string
  discount: number
  discountType: "percent" | "amount"
}

interface SaleRecord {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  discountType: "percent" | "amount"
  total: number
  paymentMethod: string
  timestamp: Date
  customerNotes: string
}

const POSPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("ทั้งหมด")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = React.useState("cash")
  const [customerNotes, setCustomerNotes] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [discountType, setDiscountType] = React.useState<"percent" | "amount">("percent")
  const [savedOrders, setSavedOrders] = React.useState<SavedOrder[]>([])
  const [salesHistory, setSalesHistory] = React.useState<SaleRecord[]>([
    // Sample data for demonstration
    {
      id: "SALE-1704067200000",
      items: [
        { id: "1", name: "แซลมอนสด", price: 450, unit: "กิโลกรัม", quantity: 2, total: 900 },
        { id: "2", name: "กุ้งขาวใหญ่", price: 320, unit: "กิโลกรัม", quantity: 1, total: 320 },
      ],
      subtotal: 1220,
      discount: 10,
      discountType: "percent",
      total: 1098,
      paymentMethod: "cash",
      timestamp: new Date(2024, 0, 1, 14, 30),
      customerNotes: "ลูกค้าประจำ",
    },
    {
      id: "SALE-1704070800000",
      items: [{ id: "3", name: "ปลาทูน่าสด", price: 380, unit: "กิโลกรัม", quantity: 1, total: 380 }],
      subtotal: 380,
      discount: 0,
      discountType: "percent",
      total: 380,
      paymentMethod: "transfer",
      timestamp: new Date(2024, 0, 1, 15, 45),
      customerNotes: "",
    },
    {
      id: "SALE-1704074400000",
      items: [
        { id: "8", name: "กุ้งมังกร", price: 850, unit: "ตัว", quantity: 2, total: 1700 },
        { id: "7", name: "หอยเชลล์", price: 420, unit: "กิโลกรัม", quantity: 1, total: 420 },
      ],
      subtotal: 2120,
      discount: 100,
      discountType: "amount",
      total: 2020,
      paymentMethod: "transfer",
      timestamp: new Date(2024, 0, 1, 16, 20),
      customerNotes: "สั่งพิเศษ",
    },
  ])
  const [showReceiptPreview, setShowReceiptPreview] = React.useState(false)
  const [showSalesHistory, setShowSalesHistory] = React.useState(false)
  const [showSavedOrders, setShowSavedOrders] = React.useState(false)
  const [selectedSaleRecord, setSelectedSaleRecord] = React.useState<SaleRecord | null>(null)
  const [dateFilter, setDateFilter] = React.useState("today")

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory
    return matchesSearch && matchesCategory && product.stock > 0
  })

  // Add product to cart
  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item,
        ),
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          quantity: 1,
          total: product.price,
        },
      ])
    }
  }

  // Update quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item,
        ),
      )
    }
  }

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    setCustomerNotes("")
    setDiscount(0)
    setDiscountType("percent")
  }

  // Save current order
  const saveOrder = () => {
    if (cartItems.length === 0) return

    const newSavedOrder: SavedOrder = {
      id: `ORDER-${Date.now()}`,
      items: [...cartItems],
      timestamp: new Date(),
      customerNotes,
      paymentMethod,
      discount,
      discountType,
    }

    setSavedOrders([...savedOrders, newSavedOrder])
    clearCart()
    alert("บันทึกคำสั่งซื้อเรียบร้อย!")
  }

  // Load saved order
  const loadSavedOrder = (savedOrder: SavedOrder) => {
    setCartItems(savedOrder.items)
    setCustomerNotes(savedOrder.customerNotes)
    setPaymentMethod(savedOrder.paymentMethod)
    setDiscount(savedOrder.discount)
    setDiscountType(savedOrder.discountType)
    setShowSavedOrders(false)
  }

  // Delete saved order
  const deleteSavedOrder = (orderId: string) => {
    setSavedOrders(savedOrders.filter((order) => order.id !== orderId))
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = discountType === "percent" ? (subtotal * discount) / 100 : discount
  const total = Math.max(0, subtotal - discountAmount)

  // Handle sale confirmation
  const handleConfirmSale = () => {
    if (cartItems.length === 0) return

    const saleRecord: SaleRecord = {
      id: `SALE-${Date.now()}`,
      items: [...cartItems],
      subtotal,
      discount,
      discountType,
      total,
      paymentMethod,
      timestamp: new Date(),
      customerNotes,
    }

    setSalesHistory([saleRecord, ...salesHistory])
    setShowReceiptPreview(true)
  }

  // Handle print receipt
  const handlePrintReceipt = () => {
    console.log("Printing receipt...")
    clearCart()
    setShowReceiptPreview(false)
  }

  // Calculate filtered sales based on date filter
  const filteredSales = React.useMemo(() => {
    const now = new Date()
    let filteredRecords = salesHistory

    switch (dateFilter) {
      case "today":
        filteredRecords = salesHistory.filter((sale) => {
          const saleDate = new Date(sale.timestamp)
          return saleDate.toDateString() === now.toDateString()
        })
        break
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filteredRecords = salesHistory.filter((sale) => {
          const saleDate = new Date(sale.timestamp)
          return saleDate >= weekAgo
        })
        break
      case "month":
        filteredRecords = salesHistory.filter((sale) => {
          const saleDate = new Date(sale.timestamp)
          return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear()
        })
        break
      default:
        filteredRecords = salesHistory
    }

    return filteredRecords.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [salesHistory, dateFilter])

  // Calculate sales summary
  const salesSummary = React.useMemo(() => {
    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0)
    const totalTransactions = filteredSales.length
    const cashSales = filteredSales
      .filter((sale) => sale.paymentMethod === "cash")
      .reduce((sum, sale) => sum + sale.total, 0)
    const transferSales = filteredSales
      .filter((sale) => sale.paymentMethod === "transfer")
      .reduce((sum, sale) => sum + sale.total, 0)
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0

    // Top selling products
    const productSales: { [key: string]: { name: string; quantity: number; revenue: number } } = {}
    filteredSales.forEach((sale) => {
      sale.items.forEach((item) => {
        if (productSales[item.id]) {
          productSales[item.id].quantity += item.quantity
          productSales[item.id].revenue += item.total
        } else {
          productSales[item.id] = {
            name: item.name,
            quantity: item.quantity,
            revenue: item.total,
          }
        }
      })
    })

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return {
      totalSales,
      totalTransactions,
      cashSales,
      transferSales,
      averageTransaction,
      topProducts,
      records: filteredSales,
    }
  }, [filteredSales])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ขายหน้าร้าน (POS)</h1>
          <div className="flex gap-3">
            <Dialog open={showSalesHistory} onOpenChange={setShowSalesHistory}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <History className="w-5 h-5 mr-2" />
                  ประวัติการขาย
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh]">
                <DialogHeader></DialogHeader>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsContent value="overview" className="space-y-6">
                    {/* Date Filter */}
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium">ช่วงเวลา:</Label>
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">วันนี้</SelectItem>
                          <SelectItem value="week">7 วันที่ผ่านมา</SelectItem>
                          <SelectItem value="month">เดือนนี้</SelectItem>
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sales Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-600">ยอดขายรวม</p>
                              <p className="text-2xl font-bold text-blue-700">
                                ฿{salesSummary.totalSales.toLocaleString()}
                              </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-600">จำนวนบิล</p>
                              <p className="text-2xl font-bold text-green-700">{salesSummary.totalTransactions}</p>
                            </div>
                            <Receipt className="w-8 h-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-orange-600">เงินสด</p>
                              <p className="text-2xl font-bold text-orange-700">
                                ฿{salesSummary.cashSales.toLocaleString()}
                              </p>
                            </div>
                            <Banknote className="w-8 h-8 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-600">โอนเงิน</p>
                              <p className="text-2xl font-bold text-purple-700">
                                ฿{salesSummary.transferSales.toLocaleString()}
                              </p>
                            </div>
                            <CreditCard className="w-8 h-8 text-purple-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">ค่าเฉลี่ยต่อบิล</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold text-gray-700">
                            ฿{salesSummary.averageTransaction.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">อัตราการชำระ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>เงินสด:</span>
                            <span className="font-semibold">
                              {salesSummary.totalSales > 0
                                ? ((salesSummary.cashSales / salesSummary.totalSales) * 100).toFixed(1)
                                : 0}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>โอนเงิน:</span>
                            <span className="font-semibold">
                              {salesSummary.totalSales > 0
                                ? ((salesSummary.transferSales / salesSummary.totalSales) * 100).toFixed(1)
                                : 0}
                              %
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <Dialog open={showSavedOrders} onOpenChange={setShowSavedOrders}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Save className="w-5 h-5 mr-2" />
                  คำสั่งซื้อที่พัก ({savedOrders.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>คำสั่งซื้อที่พักไว้</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96 pr-4">
                  <div className="space-y-3">
                    {savedOrders.map((order) => (
                      <Card key={order.id} className="shadow-sm border rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-lg">{order.id}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(order.timestamp).toLocaleString("th-TH")}
                              </div>
                              <div className="text-sm mt-2 text-gray-700">
                                {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}
                              </div>
                              <div className="font-bold text-xl mt-3 text-blue-600">
                                ฿
                                {(
                                  order.items.reduce((sum, item) => sum + item.total, 0) -
                                  (order.discountType === "percent"
                                    ? (order.items.reduce((sum, item) => sum + item.total, 0) * order.discount) / 100
                                    : order.discount)
                                ).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => loadSavedOrder(order)}>
                                เปิด
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteSavedOrder(order.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {savedOrders.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">ไม่มีคำสั่งซื้อที่พักไว้</div>
                    )}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Panel - Product Selection */}
        <div className="flex-1 flex flex-col">
          {/* Search and Category Filter */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className="h-12 px-6 rounded-xl"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-3 gap-4 pb-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 rounded-xl"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square mb-3 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=120&width=120"
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-blue-600">฿{product.price}</p>
                        <p className="text-sm text-muted-foreground">/{product.unit}</p>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {product.stock} {product.unit}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Shopping Cart */}
        <div className="w-[420px] flex flex-col">
          <Card className="flex-1 flex flex-col rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <ShoppingCart className="h-6 w-6" />
                ตรวจสอบรายการ ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Cart Items */}
              <ScrollArea className="flex-1 px-6 pr-4 max-h-[200px]">
                {cartItems.length === 0 ? (
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    <div className="text-center">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg">ไม่มีสินค้าในตะกร้า</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ฿{item.price} / {item.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-lg bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-lg bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">฿{item.total.toLocaleString()}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t">
                  <div className="space-y-4 mb-6">
                    {/* Discount Input */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium">ส่วนลด:</Label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant={discountType === "percent" ? "default" : "outline"}
                            size="sm"
                            className="flex-1 h-12"
                            onClick={() => setDiscountType("percent")}
                          >
                            %
                          </Button>
                          <Button
                            variant={discountType === "amount" ? "default" : "outline"}
                            size="sm"
                            className="flex-1 h-12"
                            onClick={() => setDiscountType("amount")}
                          >
                            ฿
                          </Button>
                        </div>
                        <Input
                          type="number"
                          min="0"
                          max={discountType === "percent" ? "100" : subtotal.toString()}
                          value={discount || ""}
                          onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                          className="h-10"
                          placeholder="กรอกจำนวนส่วนลด"
                        />
                      </div>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-lg text-red-600">
                        <span>
                          ส่วนลด ({discount}
                          {discountType === "percent" ? "%" : "฿"}):
                        </span>
                        <span>-฿{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-bold text-xl">
                      <span>ยอดสุทธิ:</span>
                      <span className="text-blue-600">฿{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <Label className="text-base font-medium mb-3 block">วิธีการชำระเงิน:</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-6">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer text-base">
                          <Banknote className="h-5 w-5" />
                          เงินสด
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer text-base">
                          <CreditCard className="h-5 w-5" />
                          โอนเงิน
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleConfirmSale}
                      className="w-full h-14 text-lg font-bold rounded-xl"
                      disabled={cartItems.length === 0}
                    >
                      ยืนยันการขาย
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={saveOrder}
                        className="h-12 rounded-xl bg-transparent"
                        disabled={cartItems.length === 0}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        พักคำสั่งซื้อ
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="h-12 rounded-xl bg-transparent"
                        disabled={cartItems.length === 0}
                      >
                        <X className="w-4 h-4 mr-2" />
                        ล้างตะกร้า
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Preview Dialog */}
      <Dialog open={showReceiptPreview} onOpenChange={setShowReceiptPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">ตัวอย่างใบเสร็จ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-bold">ร้านอาหารทะเลสด</h2>
              <p className="text-sm text-muted-foreground">123 ถนนสุขุมวิท กรุงเทพฯ</p>
              <p className="text-sm text-muted-foreground">โทร: 02-123-4567</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>วันที่:</span>
                <span>{new Date().toLocaleString("th-TH")}</span>
              </div>
              <div className="flex justify-between">
                <span>การชำระ:</span>
                <span>{paymentMethod === "cash" ? "เงินสด" : "โอนเงิน"}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <div>{item.name}</div>
                    <div className="text-muted-foreground">
                      {item.quantity} x ฿{item.price}
                    </div>
                  </div>
                  <div>฿{item.total.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>ยอดรวม:</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>
                    ส่วนลด ({discount}
                    {discountType === "percent" ? "%" : "฿"}):
                  </span>
                  <span>-฿{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>ยอดสุทธิ:</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
            </div>

            {customerNotes && (
              <>
                <Separator />
                <div className="text-sm">
                  <div className="font-medium">หมายเหตุ:</div>
                  <div className="text-muted-foreground">{customerNotes}</div>
                </div>
              </>
            )}

            <div className="text-center text-sm text-muted-foreground border-t pt-4">ขอบคุณที่ใช้บริการ</div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowReceiptPreview(false)} className="flex-1">
                ยกเลิก
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    พิมพ์และทำรายการใหม่
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการพิมพ์ใบเสร็จ</AlertDialogTitle>
                    <AlertDialogDescription>คุณต้องการพิมพ์ใบเสร็จและทำรายการขายใหม่ใช่หรือไม่?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePrintReceipt}>พิมพ์</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sale Record Detail Dialog */}
      {selectedSaleRecord && (
        <Dialog open={!!selectedSaleRecord} onOpenChange={() => setSelectedSaleRecord(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>รายละเอียดการขาย</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <Badge variant="outline" className="font-mono">
                  {selectedSaleRecord.id}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(selectedSaleRecord.timestamp).toLocaleString("th-TH")}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">รายการสินค้า:</h4>
                {selectedSaleRecord.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <div>{item.name}</div>
                      <div className="text-muted-foreground">
                        {item.quantity} × ฿{item.price} / {item.unit}
                      </div>
                    </div>
                    <div className="font-semibold">฿{item.total.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>ยอดรวม:</span>
                  <span>฿{selectedSaleRecord.subtotal.toLocaleString()}</span>
                </div>
                {selectedSaleRecord.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>
                      ส่วนลด ({selectedSaleRecord.discount}
                      {selectedSaleRecord.discountType === "percent" ? "%" : "฿"}):
                    </span>
                    <span>
                      -฿
                      {(selectedSaleRecord.discountType === "percent"
                        ? (selectedSaleRecord.subtotal * selectedSaleRecord.discount) / 100
                        : selectedSaleRecord.discount
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>ยอดสุทธิ:</span>
                  <span>฿{selectedSaleRecord.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">การชำระเงิน:</span>
                <Badge variant={selectedSaleRecord.paymentMethod === "cash" ? "default" : "secondary"}>
                  {selectedSaleRecord.paymentMethod === "cash" ? "เงินสด" : "โอนเงิน"}
                </Badge>
              </div>

              {selectedSaleRecord.customerNotes && (
                <>
                  <Separator />
                  <div>
                    <div className="font-medium text-sm">หมายเหตุ:</div>
                    <div className="text-sm text-muted-foreground">{selectedSaleRecord.customerNotes}</div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export { POSPage }
export default POSPage
