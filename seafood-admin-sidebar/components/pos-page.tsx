"use client"

import { useState } from "react"
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  Receipt,
  X,
  Grid3X3,
  List,
  Pause,
  Play,
  Printer,
  Percent,
  Truck,
  BarChart3,
  Package,
  Clock,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for products
const productsData = [
  {
    id: "PROD-001",
    name: "กุ้งแม่น้ำ",
    image: "/placeholder.svg?height=120&width=120",
    price: 450,
    unit: "กก.",
    category: "กุ้ง",
    stock: 25,
    description: "กุ้งแม่น้ำสดใหม่ ขนาดใหญ่",
  },
  {
    id: "PROD-002",
    name: "ปลาทูน่า",
    image: "/placeholder.svg?height=120&width=120",
    price: 320,
    unit: "กก.",
    category: "ปลา",
    stock: 18,
    description: "ปลาทูน่าสดจากทะเลอันดามัน",
  },
  {
    id: "PROD-003",
    name: "หอยแมลงภู่",
    image: "/placeholder.svg?height=120&width=120",
    price: 180,
    unit: "กก.",
    category: "หอย",
    stock: 30,
    description: "หอยแมลงภู่สดจากฟาร์ม",
  },
  {
    id: "PROD-004",
    name: "ปูม้า",
    image: "/placeholder.svg?height=120&width=120",
    price: 800,
    unit: "ตัว",
    category: "ปู",
    stock: 12,
    description: "ปูม้าขนาดใหญ่ น้ำหนัก 500-600 กรัม",
  },
  {
    id: "PROD-005",
    name: "ปลาแซลมอน",
    image: "/placeholder.svg?height=120&width=120",
    price: 650,
    unit: "กก.",
    category: "ปลา",
    stock: 8,
    description: "ปลาแซลมอนนำเข้าจากนอร์เวย์",
  },
  {
    id: "PROD-006",
    name: "หอยเชลล์",
    image: "/placeholder.svg?height=120&width=120",
    price: 220,
    unit: "กก.",
    category: "หอย",
    stock: 15,
    description: "หอยเชลล์สดขนาดกลาง",
  },
  {
    id: "PROD-007",
    name: "ปลาหมึกกล้วย",
    image: "/placeholder.svg?height=120&width=120",
    price: 280,
    unit: "กก.",
    category: "ปลาหมึก",
    stock: 20,
    description: "ปลาหมึกกล้วยสดขนาดกลาง",
  },
  {
    id: "PROD-008",
    name: "กุ้งขาว",
    image: "/placeholder.svg?height=120&width=120",
    price: 380,
    unit: "กก.",
    category: "กุ้ง",
    stock: 30,
    description: "กุ้งขาวสดจากฟาร์ม ขนาด 30-40 ตัว/กก.",
  },
  {
    id: "PROD-009",
    name: "ปลาเก๋า",
    image: "/placeholder.svg?height=120&width=120",
    price: 420,
    unit: "กก.",
    category: "ปลา",
    stock: 10,
    description: "ปลาเก๋าสดจากทะเลไทย",
  },
  {
    id: "PROD-010",
    name: "หอยลาย",
    image: "/placeholder.svg?height=120&width=120",
    price: 150,
    unit: "กก.",
    category: "หอย",
    stock: 25,
    description: "หอยลายสดขนาดกลาง",
  },
  {
    id: "PROD-011",
    name: "ปลาหมึกยักษ์",
    image: "/placeholder.svg?height=120&width=120",
    price: 350,
    unit: "กก.",
    category: "ปลาหมึก",
    stock: 8,
    description: "ปลาหมึกยักษ์สดขนาดใหญ่",
  },
  {
    id: "PROD-012",
    name: "ปูนิ่ม",
    image: "/placeholder.svg?height=120&width=120",
    price: 600,
    unit: "ตัว",
    category: "ปู",
    stock: 15,
    description: "ปูนิ่มสดพร้อมทำอาหาร",
  },
]

const categories = ["ทั้งหมด", "กุ้ง", "ปลา", "หอย", "ปู", "ปลาหมึก"]

interface Product {
  id: string
  name: string
  image: string
  price: number
  unit: string
  category: string
  stock: number
  description: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface HeldOrder {
  id: string
  items: CartItem[]
  timestamp: Date
  total: number
}

export function POSPage() {
  const [products, setProducts] = useState<Product[]>(productsData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [paymentMethod, setPaymentMethod] = useState("cash")

  // Discount settings
  const [discountType, setDiscountType] = useState<"percent" | "amount">("percent")
  const [discountValue, setDiscountValue] = useState("")

  // Delivery fee
  const [deliveryFee, setDeliveryFee] = useState("")

  // Dialogs
  const [showReceiptPreview, setShowReceiptPreview] = useState(false)
  const [showHeldOrders, setShowHeldOrders] = useState(false)
  const [showDailySales, setShowDailySales] = useState(false)

  // Daily sales summary (mock data)
  const [dailySales] = useState({
    totalOrders: 127,
    totalSales: 45280,
    totalItems: 342,
    lastSaleTime: "14:35",
  })

  // Filter products based on category only
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory
    return matchesCategory && product.stock > 0
  })

  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id)
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  // Update quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    const product = products.find((p) => p.id === productId)
    if (product && newQuantity > product.stock) {
      alert(`สต็อกไม่เพียงพอ มีเพียง ${product.stock} ${product.unit}`)
      return
    }

    setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
    setDiscountValue("")
    setDeliveryFee("")
  }

  // Hold current order
  const holdOrder = () => {
    if (cart.length === 0) {
      alert("ไม่มีสินค้าในตะกร้า")
      return
    }

    const heldOrder: HeldOrder = {
      id: `HOLD-${Date.now()}`,
      items: [...cart],
      timestamp: new Date(),
      total: calculateTotal(),
    }

    setHeldOrders([...heldOrders, heldOrder])
    clearCart()
    alert("พักคำสั่งซื้อเรียบร้อยแล้ว")
  }

  // Resume held order
  const resumeOrder = (heldOrder: HeldOrder) => {
    setCart(heldOrder.items)
    setHeldOrders(heldOrders.filter((order) => order.id !== heldOrder.id))
    setShowHeldOrders(false)
  }

  // Delete held order
  const deleteHeldOrder = (orderId: string) => {
    setHeldOrders(heldOrders.filter((order) => order.id !== orderId))
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const calculateDiscount = () => {
    const discountNum = Number.parseFloat(discountValue) || 0
    if (discountType === "percent") {
      return (subtotal * discountNum) / 100
    } else {
      return discountNum
    }
  }

  const discountAmount = calculateDiscount()
  const deliveryAmount = Number.parseFloat(deliveryFee) || 0

  const calculateTotal = () => {
    return subtotal - discountAmount + deliveryAmount
  }

  const total = calculateTotal()

  // Handle sale confirmation
  const handleConfirmSale = () => {
    if (cart.length === 0) {
      alert("กรุณาเลือกสินค้าก่อนทำการขาย")
      return
    }
    setShowReceiptPreview(true)
  }

  const processSale = () => {
    // In a real application, this would process the sale
    alert(`ขายสำเร็จ! ยอดรวม ฿${total.toLocaleString()}`)
    clearCart()
    setShowReceiptPreview(false)
  }

  const printReceipt = () => {
    // In a real application, this would print the receipt
    window.print()
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "สต็อกต่ำ", color: "bg-pink-100 text-pink-700 border-pink-200" }
    if (stock <= 15) return { label: "สต็อกปานกลาง", color: "bg-orange-100 text-orange-700 border-orange-200" }
    return { label: "สต็อกเพียงพอ", color: "bg-emerald-100 text-emerald-700 border-emerald-200" }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-800">ระบบขายหน้าร้าน</h1>
            <p className="text-slate-500 text-lg">SeaFresh - ธุรกิจอาหารทะเล</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Daily Sales Button */}
            <Button
              variant="outline"
              onClick={() => setShowDailySales(true)}
              className="h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200 min-w-[160px]"
            >
              <BarChart3 className="h-5 w-5 mr-3 text-slate-600" />
              <span className="text-slate-700 font-medium">ดูยอดขายวันนี้</span>
            </Button>

            {/* Held Orders Button */}
            <Button
              variant="outline"
              onClick={() => setShowHeldOrders(true)}
              className="relative h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200 min-w-[160px]"
            >
              <Pause className="h-5 w-5 mr-3 text-slate-600" />
              <span className="text-slate-700 font-medium">พักคำสั่งซื้อ</span>
              {heldOrders.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full border-2 border-white shadow-sm">
                  {heldOrders.length}
                </Badge>
              )}
            </Button>

            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200 min-w-[160px] bg-blue-50 border-blue-200"
              >
                <ShoppingCart className="h-5 w-5 mr-3 text-blue-600" />
                <span className="text-blue-700 font-medium">{cart.length} รายการ</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200 min-w-[160px] bg-slate-800 text-white hover:bg-slate-700"
              >
                <span className="text-xl font-bold">฿{total.toLocaleString()}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden gap-6 p-6">
        {/* Product Selection Panel - Left Side */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Product Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">รายการสินค้า</h2>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter - Expanded */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1 h-14 text-lg rounded-xl border-slate-200 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-lg rounded-lg">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-1 shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="lg"
                  onClick={() => setViewMode("grid")}
                  className={`h-12 px-6 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white text-slate-800 shadow-sm" : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="lg"
                  onClick={() => setViewMode("list")}
                  className={`h-12 px-6 rounded-lg transition-all duration-200 ${
                    viewMode === "list" ? "bg-white text-slate-800 shadow-sm" : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 overflow-y-auto p-8">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <Card
                      key={product.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-slate-200 rounded-2xl overflow-hidden bg-white"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=120&width=120&query=seafood+product`
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-slate-800 line-clamp-2 min-h-[3rem] leading-tight">
                            {product.name}
                          </h3>
                          <div className="flex items-baseline justify-between">
                            <div className="text-2xl font-bold text-slate-800">฿{product.price.toLocaleString()}</div>
                            <div className="text-sm text-slate-500 font-medium">/{product.unit}</div>
                          </div>
                          <div className="flex items-center justify-center pt-1">
                            <Badge className={`${stockStatus.color} border rounded-lg px-3 py-1 text-sm font-medium`}>
                              {product.stock} {product.unit}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <Card
                      key={product.id}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.99] border-slate-200 rounded-xl overflow-hidden bg-white"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=80&width=80&query=seafood+product`
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3 className="font-bold text-xl text-slate-800 leading-tight">{product.name}</h3>
                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{product.description}</p>
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">
                                  ฿{product.price.toLocaleString()}
                                </span>
                                <span className="text-base text-slate-500 font-medium">/{product.unit}</span>
                              </div>
                              <Badge className={`${stockStatus.color} border rounded-lg px-2 py-1 text-sm font-medium`}>
                                {product.stock} {product.unit}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <div className="text-8xl mb-8">🐟</div>
                <p className="text-2xl font-medium text-slate-600 mb-2">ไม่พบสินค้าที่ค้นหา</p>
                <p className="text-lg text-slate-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Cart Panel - Right Side */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {/* Cart Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">ตะกร้าสินค้า</h2>
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg px-4 py-2"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  ล้างทั้งหมด
                </Button>
              )}
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8">
                <ShoppingCart className="h-24 w-24 mb-8 text-slate-300" />
                <p className="text-2xl font-medium text-slate-600 mb-2">ตะกร้าว่าง</p>
                <p className="text-lg text-center text-slate-500">เลือกสินค้าจากด้านซ้ายเพื่อเริ่มขาย</p>
              </div>
            ) : (
              <div className="p-8">
                {/* Cart Items */}
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.product.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-slate-800 flex-1 pr-3 leading-tight">
                          {item.product.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="h-8 w-8 p-0 text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-10 w-10 p-0 rounded-full border-slate-200 hover:bg-slate-50"
                          >
                            <Minus className="h-4 w-4 text-slate-600" />
                          </Button>
                          <div className="mx-4 text-xl font-bold text-slate-800 min-w-[40px] text-center">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-10 w-10 p-0 rounded-full border-slate-200 hover:bg-slate-50"
                          >
                            <Plus className="h-4 w-4 text-slate-600" />
                          </Button>
                        </div>

                        {/* Price per unit */}
                        <div className="text-center">
                          <div className="text-xs text-slate-500 mb-1">ราคา/หน่วย</div>
                          <div className="text-base font-bold text-slate-700">
                            ฿{item.product.price.toLocaleString()}/{item.product.unit}
                          </div>
                        </div>

                        {/* Total price */}
                        <div className="text-center">
                          <div className="text-xs text-slate-500 mb-1">ราคารวม</div>
                          <div className="text-xl font-bold text-slate-800">
                            ฿{(item.product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Section */}
                <div className="space-y-4 mb-8">
                  <Label className="text-xl font-bold text-slate-800">ส่วนลด</Label>
                  <div className="flex gap-4">
                    <Select
                      value={discountType}
                      onValueChange={(value: "percent" | "amount") => setDiscountType(value)}
                    >
                      <SelectTrigger className="w-40 h-16 text-lg rounded-xl border-slate-200 shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                        <SelectItem value="percent" className="rounded-lg">
                          <div className="flex items-center text-lg">
                            <Percent className="h-5 w-5 mr-3 text-slate-600" />
                            เปอร์เซ็นต์
                          </div>
                        </SelectItem>
                        <SelectItem value="amount" className="rounded-lg">
                          <div className="flex items-center text-lg">
                            <span className="text-lg font-bold mr-3 text-slate-600">฿</span>
                            จำนวนเงิน
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="0"
                      className="flex-1 h-16 text-lg rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                    />
                  </div>
                </div>

                {/* Shipping Cost */}
                <div className="space-y-4 mb-8">
                  <Label className="text-xl font-bold text-slate-800 flex items-center">
                    <Truck className="h-6 w-6 mr-3 text-slate-600" />
                    ค่าส่งสินค้า
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    placeholder="0"
                    className="h-16 text-lg rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                  />
                </div>

                {/* Total Amount */}
                <div className="bg-blue-50 p-8 rounded-2xl mb-8 border border-blue-200">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg text-slate-700">
                      <span>ยอดรวมสินค้า:</span>
                      <span className="font-bold">฿{subtotal.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-lg text-pink-600">
                        <span>ส่วนลด:</span>
                        <span className="font-bold">-฿{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {deliveryAmount > 0 && (
                      <div className="flex justify-between text-lg text-blue-600">
                        <span>ค่าส่งสินค้า:</span>
                        <span className="font-bold">+฿{deliveryAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator className="my-4 bg-blue-200" />
                    <div className="flex justify-between text-3xl font-bold">
                      <span className="text-slate-800">ยอดรวมสุทธิ:</span>
                      <span className="text-slate-800">฿{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6 mb-8">
                  <Label className="text-xl font-bold text-slate-800">วิธีการชำระเงิน</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={paymentMethod === "cash" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setPaymentMethod("cash")}
                      className={`h-16 text-lg font-bold rounded-xl transition-all duration-200 ${
                        paymentMethod === "cash"
                          ? "bg-slate-800 text-white shadow-lg border-2 border-slate-800"
                          : "border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <Banknote className="h-6 w-6 mr-3" />
                      เงินสด
                    </Button>
                    <Button
                      variant={paymentMethod === "transfer" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setPaymentMethod("transfer")}
                      className={`h-16 text-lg font-bold rounded-xl transition-all duration-200 ${
                        paymentMethod === "transfer"
                          ? "bg-slate-800 text-white shadow-lg border-2 border-slate-800"
                          : "border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      <CreditCard className="h-6 w-6 mr-3" />
                      โอนเงิน
                    </Button>
                  </div>
                </div>

                {/* Confirm Sale Button */}
                <Button
                  onClick={handleConfirmSale}
                  className="w-full h-20 text-2xl font-bold bg-blue-500 hover:bg-blue-600 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl"
                  size="lg"
                >
                  <Receipt className="h-8 w-8 mr-4 text-white" />
                  <span className="text-white">ยืนยันการขาย</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daily Sales Summary Modal */}
      <Dialog open={showDailySales} onOpenChange={setShowDailySales}>
        <DialogContent className="max-w-2xl rounded-3xl border-slate-200 shadow-xl">
          <DialogHeader className="pb-8">
            <DialogTitle className="text-2xl font-bold text-center text-slate-800">สรุปยอดขายประจำวัน</DialogTitle>
            <p className="text-center text-slate-500 text-base">วันที่ {new Date().toLocaleDateString("th-TH")}</p>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 px-8 pb-8">
            {/* Total Orders */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">จำนวนออเดอร์</p>
                  <div className="text-3xl font-bold text-slate-800">{dailySales.totalOrders}</div>
                </div>
              </div>
            </div>

            {/* Total Sales */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mr-4">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">ยอดขายรวม</p>
                  <div className="text-3xl font-bold text-slate-800">฿{dailySales.totalSales.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Total Items */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">จำนวนสินค้า</p>
                  <div className="text-3xl font-bold text-slate-800">{dailySales.totalItems}</div>
                </div>
              </div>
            </div>

            {/* Last Sale Time */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">ขายล่าสุด</p>
                  <div className="text-3xl font-bold text-slate-800">{dailySales.lastSaleTime} น.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8">
            <Button
              onClick={() => setShowDailySales(false)}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-medium shadow-sm"
            >
              ปิด
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Preview Dialog */}
      <Dialog open={showReceiptPreview} onOpenChange={setShowReceiptPreview}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border-slate-200 shadow-xl">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold text-center text-slate-800">ตัวอย่างใบเสร็จ</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 font-mono text-sm bg-slate-50 p-6 rounded-xl">
            {/* Store Header */}
            <div className="text-center border-b border-slate-200 pb-4">
              <h3 className="font-bold text-xl text-slate-800">SeaFresh</h3>
              <p className="text-slate-600">ธุรกิจอาหารทะเล</p>
              <p className="text-slate-600">123 ถนนทะเลสาบ ตำบลปลาสด</p>
              <p className="text-slate-600">โทร: 038-123-456</p>
            </div>

            {/* Receipt Details */}
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>วันที่:</span>
                <span>{new Date().toLocaleDateString("th-TH")}</span>
              </div>
              <div className="flex justify-between">
                <span>เวลา:</span>
                <span>{new Date().toLocaleTimeString("th-TH")}</span>
              </div>
              <div className="flex justify-between">
                <span>การชำระ:</span>
                <span>{paymentMethod === "cash" ? "เงินสด" : "โอนเงิน"}</span>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* Items */}
            <div className="space-y-3 text-slate-700">
              {cart.map((item) => (
                <div key={item.product.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="flex-1 font-medium">{item.product.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>
                      {item.quantity} x ฿{item.product.price.toLocaleString()}
                    </span>
                    <span className="font-bold">฿{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-slate-200" />

            {/* Totals */}
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>ยอดรวม:</span>
                <span className="font-bold">฿{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-pink-600">
                  <span>ส่วนลด:</span>
                  <span className="font-bold">-฿{discountAmount.toLocaleString()}</span>
                </div>
              )}
              {deliveryAmount > 0 && (
                <div className="flex justify-between text-blue-600">
                  <span>ค่าส่งสินค้า:</span>
                  <span className="font-bold">+฿{deliveryAmount.toLocaleString()}</span>
                </div>
              )}
              <Separator className="bg-slate-200" />
              <div className="flex justify-between font-bold text-lg text-slate-800">
                <span>ยอดสุทธิ:</span>
                <span>฿{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-slate-200 text-slate-600">
              <p>ขอบคุณที่ใช้บริการ</p>
              <p>โทร: 038-123-456</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => setShowReceiptPreview(false)}
              className="flex-1 h-14 rounded-xl border-slate-200 hover:bg-slate-50"
            >
              <X className="h-5 w-5 mr-2" />
              ยกเลิก
            </Button>
            <Button
              onClick={printReceipt}
              variant="outline"
              className="flex-1 h-14 rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
            >
              <Printer className="h-5 w-5 mr-2" />
              พิมพ์
            </Button>
            <Button
              onClick={processSale}
              className="flex-1 h-14 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
            >
              <Receipt className="h-5 w-5 mr-2" />
              ยืนยัน
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Held Orders Dialog */}
      <Dialog open={showHeldOrders} onOpenChange={setShowHeldOrders}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border-slate-200 shadow-xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-slate-800">คำสั่งซื้อที่พัก</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-6">
            {heldOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Pause className="h-20 w-20 mx-auto mb-6 text-slate-300" />
                <p className="text-xl font-medium text-slate-600">ไม่มีคำสั่งซื้อที่พัก</p>
              </div>
            ) : (
              heldOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-pink-400 rounded-xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-slate-800">{order.id}</h4>
                        <p className="text-slate-600">{order.timestamp.toLocaleString("th-TH")}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">฿{order.total.toLocaleString()}</div>
                        <div className="text-slate-600">{order.items.length} รายการ</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => resumeOrder(order)}
                        className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm"
                        size="sm"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        เปิดคำสั่งซื้อ
                      </Button>
                      <Button
                        onClick={() => deleteHeldOrder(order.id)}
                        variant="outline"
                        size="sm"
                        className="h-12 px-4 text-pink-600 hover:text-pink-700 border-pink-200 hover:bg-pink-50 rounded-xl"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
